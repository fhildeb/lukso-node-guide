---
sidebar_label: "7.7 Service Automation"
sidebar_position: 7
description: "Automate your LUKSO node startup using systemd to ensure validator services restart after reboots, crashes, or power outages. Includes secure password handling and permission configuration."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 7.7 Service Automation

By default, blockchain clients are not automatically starting whenever there has been a power outage or crash on your node system. This means additional manual work by logging into the node and restarting clients or services. As the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) manages all blockchain clients in the background, we can add a startup script to run every time on boot.

:::tip

Automatically restarting individual execution, consensus, or validator clients after failure requires a 🐳 [Docker](/docs/theory/node-operation/client-setups.md) or 🗂️ [Custom Setup](/docs/theory/node-operation/client-setups.md). However, [**Grafana Notifications**](/docs/guides/alert-systems/grafana-notifications.md) will inform you when specific processes stopped working.

:::

:::warning

Automation is only possible from [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) _Version 0.8.1_ onwards. Make sure to [update to the latest version](http://localhost:3000/docs/guides/maintenance/client-updates).

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Stop Node Operation

Depending on your setup method, there are different ways to stop your node before applying updates.

<Tabs groupId="setup">
  <TabItem value="cli" label="LUKSO CLI" default>

```sh
cd <lukso-working-directory>
lukso stop
```

:::info

Exchange `<lukso-working-directory>` with the path of the node folder.

:::

</TabItem> <TabItem value="automation" label="Service Automation">

```sh
sudo systemctl stop lukso-validator
```

</TabItem>
</Tabs>

<details>
<summary>Force Client Shutdown</summary>

<Tabs>
<TabItem value="geth" label="Geth">

```sh
sudo pkill geth
```

</TabItem> <TabItem value="erigon" label="Erigon">

```sh
sudo pkill erigon
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```sh
sudo pkill nethermind
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
sudo pkill besu
```

</TabItem> <TabItem value="teku" label="Teku">

```sh
sudo pkill teku
```

</TabItem> <TabItem value="nimbus2" label="Nimbus-Eth2">

```sh
sudo pkill nimbus_beacon_node
sudo pkill nimbus_validator_client
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

```sh
sudo pkill lighthouse
```

:::tip

The Lighthouse client uses a single binary for both the consensus and validator processes.

:::

</TabItem> <TabItem value="prysm" label="Prysm">

```sh
sudo pkill prysm
sudo pkill validator
```

</TabItem>
</Tabs>

</details>

## 2. Create System User

As the staking node requests the validator wallet's password every time during startup, we have to write the password into a file, similar to how credentials are handled within the [Dynamic DNS](/docs/guides/modifications/dynamic-dns.md) setup. To mitigate security risks, a separate user will be added to exclusively run the node service and read the password file.

Running services as a system user with minimal privileges is a typical best practice, as the service is not allowed to write outside of the specific client folders. It limits the potential damage if the software is somehow compromised, and hides the private credentials for the rest of the system. The node's user won't be able to write to directories on the system or execute commands. Use the system's user creation tool to add a new one.

```sh
sudo adduser --system lukso-validator-worker --group --no-create-home
```

<details>
    <summary>Full Command Explanation</summary>

| Flag                              | Description                                                                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| <nobr> `--system` </nobr>         | Creates a system user, used to run services and daemons rather than for people to log in with.  |
| <nobr> `--group` </nobr>          | Creates a new group with the same name as the user.                                             |
| <nobr> `--no-create-home` </nobr> | Prevents the creation of a home directory, as the user is only meant to run a specific service. |

</details>

If you want to confirm that the user has been created, you can search for it within the password file, housing all essential information for each user account. Using the search tool _grep_, we can check if the user exists within the file.

```sh
grep "lukso-validator-worker" /etc/passwd
```

The output should look similar to this:

```text
lukso-validator-worker:x:120:126::/home/lukso-validator-worker:/usr/sbin/nologin
```

## 3. Add Password File

If you run a validator node, you will need to create two new files: one for the password and one for the service automation. Start by creating a new directory for these service files directly within your node folder, where the new system user will have access to.

:::tip

This step can be skipped for regular nodes that do not run validators.

:::

```sh
# Move to Home Directory
cd

# Open Node Folder
cd <lukso-working-directory>

# Create Service Folder
mkdir static

# Move into Folder
cd static
```

Continue to add a password file using your preferred text editor, write down your password on a single line, then save and exit.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
# Create Password File
vim ./<your-filename>

# Example Name
vim ./client_dependencies
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
# Create Password File
nano ./<your-filename>

# Example Name
nano ./client_dependencies
```

</TabItem>
</Tabs>

:::info

Exchange `<your-filename>` with a generic name, so even with access, users dont immediately know there is's a password.

:::

:::tip

Access to this password file will be restricted within the [Configure Access Rights](#5-restrict-access-rights) section.

:::

## 4. Add Startup Script

After creating the password file, you can create the second service automation file, starting up the LUKSO CLI with your preferred settings and checking the network connection before doing so. Verifying that the internet connection is up before the clients are started is essential to avoid stalls or manual interventions.

If there was a power outage, the node might resume work before the router was restarted or could even connect to the internet service provider. Instead, the startup script can try to ping a public Google service first and resume work once the request was fulfilled. Otherwise, the script will wait retry. Start by creating the startup file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
vim ./lukso_startup.sh
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
nano ./lukso_startup.sh
```

</TabItem>
</Tabs>

Then continue to write down or paste the startup schedule:

<Tabs groupId="network-type">
  <TabItem value="mainnet-node" label="Mainnet Node" default>

```sh
#!/bin/bash
# Try to ping Google Server
while ! ping -c1 google.com &>/dev/null
do
    echo "Internet down. Google could not be pinged, retrying in 5 seconds."
    sleep 5
done
echo "Internet up. Starting the LUKSO Mainnet Node."
# If internet is up, continue with next command
exec /usr/local/bin/lukso start \
        --checkpoint-sync
```

</TabItem> <TabItem value="testnet-node" label="Testnet Node">

```sh
#!/bin/bash
# Try to ping Google Server
while ! ping -c1 google.com &>/dev/null
do
    echo "Internet down. Google could not be pinged, retrying in 5 seconds."
    sleep 5
done
echo "Internet up. Starting the LUKSO Testnet Node."
# If internet is up, continue with next command
exec /usr/local/bin/lukso start \
        --testnet \
        --checkpoint-sync
```

</TabItem>
  <TabItem value="mainnet-validator" label="Mainnet Validator" default>

```sh
#!/bin/bash
# Try to ping Google Server
while ! ping -c1 google.com &>/dev/null
do
    echo "Internet down. Google could not be pinged, retrying in 5 seconds."
    sleep 5
done
echo "Internet up. Starting the LUKSO Mainnet Validator."
# If internet is up, continue with next command
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync
```

:::info

Exchange the following properties:

- `<your-generic-password-file>` with the name of your password file
- `<your-fee-recipient-address>` with your wallet address to receive validator income.

:::

</TabItem> <TabItem value="testnet-validator" label="Testnet Validator">

```sh
#!/bin/bash
# Try to ping Google Server
while ! ping -c1 google.com &>/dev/null
do
    echo "Internet down. Google could not be pinged, retrying in 5 seconds."
    sleep 5
done
echo "Internet up. Starting the LUKSO Testnet Validator."
# If internet is up, continue with next command
exec /usr/local/bin/lukso start \
        --testnet \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync
```

:::info

Exchange the following properties:

- `<your-generic-password-file>` with the name of your password file
- `<your-fee-recipient-address>` with your wallet address to receive validator income.

:::

</TabItem>
</Tabs>

<details>
    <summary>Full Command Explanation</summary>

| Parameter                                  | Description                                                       |
| ------------------------------------------ | ----------------------------------------------------------------- |
| <nobr> `c1` </nobr>                        | Specifies to send a single package before stopping.               |
| <nobr> `&>/dev/null` </nobr>               | Discard the output of the ping, as its not needed.                |
| <nobr> `testnet` </nobr>                   | Runs the node on the testnet instead of the mainnet.              |
| <nobr> `validator` </nobr>                 | Runs the node with validator keys to participate in staking.      |
| <nobr> `validator-wallet-password` </nobr> | Dymanic path to the password file based on the script's location. |
| <nobr> `transaction-fee-recipient` </nobr> | Attaches the wallet address that will receive staking rewards.    |
| <nobr> `checkpoint-sync` </nobr>           | Speeds up synchronization by lazy-loading full blockchain data.   |

</details>

:::tip

Additional flags can be attached to further customize your node, like [configuring the slasher service](./slasher-configuration.md), [specifying a node name](./custom-node-name.md), or [setting a validator graffiti](validator-graffiti.md). The startup script will automatically read all the client configuration files within the node folder. However, keep in mind that you will always have to add another backslash `\` if you attach several flags across multiple lines.

:::

:::warning

In case you are modifying the startup script, make sure to [restrict permissions](#5-restrict-access-rights) as regular user wont have access to it.

:::

## 5. Restrict Access Rights

To protect sensitive credentials and ensure system security, we need to restrict file access. Additional permission management prevents unauthorized access to the password file and startup script to ensure only the dedicated user can start the node.

:::info

Within the commands, exchange the following properties:

- `<user-name>` with the name of the user you're logging into the node.
- `<lukso-working-directory>` with the name of your node folder
- `<your-generic-password-file>` with the name of your password file

:::

**5.1 Change Node Folder Owner**: Set the new _lukso-validator-worker_ as owner of all node directory files and configs.

```sh
sudo chown -R lukso-validator-worker:lukso-validator-worker /home/<user-name>/<lukso-working-directory>
```

**5.2 Change LUKSO CLI Owner**: Set the new _lukso-validator-worker_ as owner of the LUKSO CLI and binaries.

```sh
sudo chown lukso-validator-worker:lukso-validator-worker /usr/local/bin/lukso
```

**5.3 Grant Node Folder Access**: Ensure the regular user still has permission to access logs and the working directory.

```sh
sudo chmod -R 750 /home/<user-name>/<lukso-working-directory>
sudo chmod 755 /home/<user-name>/<lukso-working-directory>
```

**5.4 Restrict Password File**: Ensure that only the _lukso-validator-worker_ can read the password to start the node.

```sh
sudo chmod 400 /home/<user-name>/<lukso-working-directory>/static/<your-generic-password-file>
```

**5.5 Restrict Startup Script**: Ensure that only the _lukso-validator-worker_ can start up the node.

```sh
sudo chmod 500 /home/<user-name>/<lukso-working-directory>/static/lukso_startup.sh
```

**5.6 Check User Access**: Ensure that the _lukso-validator-worker_ can access the full path to the node directory.

```sh
namei -l /home/<user-name>/<lukso-working-directory>
```

The output should look like the following:

```text
f: /home/<user-name>/<lukso-working-directory>
drwxr-xr-x root                    root                    /
drwxr-xr-x root                    root                    home
drwxr-x--- <user-name>             <user-name>             <user-name>
drwxr-xr-x lukso-validator-worker  lukso-validator-worker  <lukso-working-directory>
```

:::warning

By looking at the first column, you need to verify that users can read and access `r-x` all parent folders of the node folder. Without access `---` to intermediate directories, they cant access any of the underlying folders they became the owner of.

:::

**5.7 Check User Access**: Grant access to the _user_ directory and verify _lukso-validator-worker_ can access the node folder.

```sh
sudo chmod 755 /home/<user-name>
namei -l /home/<user-name>/<lukso-working-directory>
```

The output should look like the following:

```text
f: /home/<user-name>/<lukso-working-directory>
drwxr-xr-x root                    root                    /
drwxr-xr-x root                    root                    home
drwxr-xr-x <user-name>             <user-name>             <user-name>
drwxr-xr-x lukso-validator-worker  lukso-validator-worker  <lukso-working-directory>
```

## 6. Configure Service File

After the user, files, and permissions are in place, you can configure the actual system service that is going to execute our startup script once the system boots. Create a new service file in the system's directory using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/systemd/system/lukso-validator.service
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
sudo nano /etc/systemd/system/lukso-validator.service
```

</TabItem>
</Tabs>

Then continue to write down or paste the service properties and descriptions for your preferred logging tool.

<Tabs groupId="logging-tool">
  <TabItem value="journal" label="Journal Logging" default>

```text
[Unit]
Description=LUKSO Validator Service
Documentation=https://github.com/lukso-network/tools-lukso-cli
Wants=network-online.target
After=network-online.target

[Service]
User=lukso-validator-worker
Group=lukso-validator-worker
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/<user-name>/<lukso-working-directory>
ExecStart=/home/<user-name>/<lukso-working-directory>/static/lukso_startup.sh
ExecStop=/usr/local/bin/lukso stop
SyslogIdentifier=lukso-validator
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

</TabItem> <TabItem value="system" label="System Logging">

```text
[Unit]
Description=LUKSO Validator Service
Documentation=https://github.com/lukso-network/tools-lukso-cli
Wants=network-online.target
After=network-online.target

[Service]
User=lukso-validator-worker
Group=lukso-validator-worker
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/<user-name>/<lukso-working-directory>
ExecStart=/home/<user-name>/<lukso-working-directory>/static/lukso_startup.sh
ExecStop=/usr/local/bin/lukso stop
SyslogIdentifier=lukso-validator
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
```

</TabItem>
</Tabs>

<details>
    <summary>Full Property Explanation</summary>

| Property           | Description                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `Description`      | A human-readable label for the service, shown in `systemctl status`.                             |
| `Documentation`    | URL to relevant documentation for setup or troubleshooting.                                      |
| `Wants`            | The service should try to start `network-online.target` before starting the validator service.   |
| `After`            | Ensures the service starts only after the network is online via `network-online.target`.         |
| `User`             | Executes the service as the `lukso-validator-worker` user.                                       |
| `Group`            | Executes the service under the `lukso-validator-worker` group.                                   |
| `Type`             | Set to `oneshot`, meaning the command runs once and considers the service to be started.         |
| `RemainAfterExit`  | Keeps the service in an active state, even when exited, to save logs for long-running processes. |
| `WorkingDirectory` | Defines that the service command will be executed in the `<lukso-working-directory>`.            |
| `ExecStart`        | The `lukso_startup.sh` script that will be started from the service.                             |
| `ExecStop`         | Command to stop the validator service using `lukso stop` once clients are up and running.        |
| `SyslogIdentifier` | Tags logs from the service with `lukso-validator` to help distinguish them.                      |
| `StandardOutput`   | Sends regular service logs to the journal or syslog system.                                      |
| `StandardError`    | Sends error service logs to the journal or syslog system.                                        |
| `WantedBy`         | Binds the service to the `multi-user.target`, so it starts during all boot processes.            |

</details>

:::info

Exchange the following properties:

- `<user-name>` with the name of the user you're logging into the node.
- `<lukso-working-directory>` with the name of your node folder

:::

:::warning

Ensure there are no missing or unintended spaces, characters or linebreaks before saving the service configuration.

:::

:::danger

In case you set different `User` and `Group` names, ensure that they are spelled correctly within the service file. If the exact user name cant be found, system services will fall back to use the `root` permissions, creating security risks.

:::

After you saved and exited the service file, you will need to update the system manager configuration, ensuring that all file changes are included within the current system setup. Use the system control command to reload them.

```sh
sudo systemctl daemon-reload
```

## 7. Restart the Node

After setting up the service and configuring file access, you can enable and start the system service.

**7.1 Enable Start Boot**: Enable autostarts of the node process during system boot.

```sh
sudo systemctl enable lukso-validator
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/multi-user.target.wants/validator-validator.service → /etc/systemd/system/lukso-validator.service.
```

**7.2 Startup Service**: Once enabled, you can start the automated node startup using the system control command:

```sh
sudo systemctl start lukso-validator
```

## 8. Check Service Status

You can fetch the current status from the system control to check if the node service is running and configured correctly. The command will display whether it is active, enabled, or disabled and show recent log entries.

```sh
sudo systemctl status lukso-validator
```

The output should look similar to this:

```text
● validator.service - LUKSO Validator Node
     Loaded: loaded (/etc/systemd/system/validator.service; enabled; vendor preset: enabled)
     Active: active (exited) since [DATE] UTC; [TIME] ago
       Docs: https://github.com/lukso-network/tools-lukso-cli
   Main PID: 9096 (code=exited, status=0/SUCCESS)
      Tasks: 26 (limit: 4694)
     Memory: 1.1G
     CGroup: /system.slice/validator.service
             [PID] geth --config=./configs/testnet/geth/geth.toml
             ├─[PID] prysm --log-file=./testnet-logs/prysm_2025-06-06_14-43-01.log --accept-terms-of-use --config-file=./configs/testn>
             └─[PID] validator --accept-terms-of-use --config-file=./configs/testnet/prysm/validator.yaml --log-file=./testnet-logs/va>

[DATE] [TIME] [USER] validator[9096]: time="2025-06-06T14:43:13Z" level=info msg="✅  Validator started! Use 'luk>
[DATE] [TIME] [USER] validator[9096]: time="2025-06-06T14:43:13Z" level=info msg="🎉  Clients have been started. >
...
[DATE] [TIME] [USER] systemd[1]: Finished LUKSO Validator Node.
```

:::tip

You can still check the status of the node using the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli), however, you always have to use the superuser permission.
As you have a separate user to run the service, only _root_ or _lukso-validator-worker_ are permitted to fetch the service information like `lukso status` or `lukso logs`. By default, the CLI will always show the processes as stopped, even if they are running.

:::

```sh
# Move to Home Directory
cd

# Enter Node Folder
cd <lukso-working-directory>

# Check Processes
sudo lukso status
```

:::info

Exchange `<lukso-working-directory>` with the path of the node folder.

:::

Depending on the clients you use, output should look similar to this:

```sh
INFO[0000] PID 9409 - Execution ([EXECUTION_CLIENT_NAME]): Running 🟢
INFO[0000] PID 9419 - Consensus ([CONSENSUS_CLIENT_NAME]): Running 🟢
INFO[0000] PID 9426 - Validator ([VALIDATOR_CLIENT_NAME]): Running 🟢
```

## Maintenance

Proper maintenance ensures that all the components are working as intended and can be updated on the fly.

:::warning

The service starts the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) as if its directly run within your node folder, just by a specific user with limited permissions and the exclusive right to view the validator password. All CLI commands can be executed as before using root permissions, however, never execute `sudo lukso start`, as it will restart the clients with full root privilages, entailing security risks.

:::

**Logging**: Check the latest status of the system service.

<Tabs groupId="logging-tool">
  <TabItem value="journal" label="Journal Logging" default>

```sh
sudo journalctl -f -u lukso-validator
```

</TabItem> <TabItem value="system" label="System Logging">

```sh
sudo tail -f /var/log/syslog | grep lukso-validator
```

</TabItem>
</Tabs>

:::tip

Further details about checking client logs files can be found on the [**Problem Scanning**](/docs/guides/maintenance/problem-scanning.md) page.

:::

**Starting**: If you made any changes or updates to configuration, reload the system daemon and start the node.

```sh
sudo systemctl daemon-reload
sudo systemctl restart lukso-validator
```

**Stopping**: You can stop all the node clients and parent processes using the system control.

```sh
sudo systemctl stop lukso-validator
```

:::tip

Further information about system control or logging can be found on the [**Utility Tools**](/docs/theory/node-operation/utility-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

## Revert Setup

If something went wrong, you can remove the user or delete the service and related files all together.

:::info

Within the commands, exchange the following properties:

- `<user-name>` with the name of the user you're logging into the node.
- `<lukso-working-directory>` with the name of your node folder

:::

**1. Stop and Disable Service**: Stop the clients and remove it's service link from the system's boot.

```sh
sudo systemctl stop lukso-validator
sudo systemctl disable lukso-validator
```

**2. Change Folder Ownership**: Change the owner of the node folder back to your regular node user.

```sh
sudo chown -R <user-name>:<user-name> /home/<user-name>/<your-working-directory>
```

**3. Change LUKSO CLI Ownership**: Revert the ownership of the LUKSO CLI back to as it was before.

```sh
sudo chown root:root /usr/local/bin/lukso
```

**4. Restrict User Directory**: Set exclusively access to your user's home directory again.

```sh
sudo chmod 750 /home/<user-name>
```

**5. Remove System User**: Remove the _lukso-validator-worker_ user, group, and files, so there is no orphaned data.

```sh
sudo deluser --remove-all-files lukso-validator-worker
sudo delgroup lukso-validator-worker
```

**6. Remove Service File**: Delete the configurations and reload the system daemon.

```sh
sudo rm /etc/systemd/system/lukso-validator.service
sudo systemctl daemon-reload
```

**7. Remove Startup Files**: Delete the password file and startup script within the node folder.

```sh
rm -rf <lukso-working-directory>/static
```

---
sidebar_label: "7.6 Dynamic DNS"
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 7.6 Dynamic DNS

Blockchain clients typically do not remain a persistent connection and rely on static or temporary IP addresses that can change over time and cause connection issues to other peers in the network. Instead of using IP addresses, Dynamic DNS can be used to link your changing IP to a fixed hostname.

:::tip

Further details about **DDNS**, setups, and providers can be found on the [**Dynamic DNS**](/docs/theory/node-operation/dynamic-dns.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::warning

The **Nimbus-Eth2** client does not support DDNS, as it's able to automatically detect public IP changes to update it's address accordingly. Instead of a dynamic DNS, please refer to the [**Public IP Setup**](/docs/guides/modifications/public-ip-setup.md) to configure automatic IP updates.

:::

## 1. Registration

[NO-IP](https://www.noip.com/) is one of the free and recommended DDNS providers. The service comes with plug-and-play installation and scripts, ideal for regular node setups. Within the free service, you will receive emails to extend the hostname once a month that needs to be confirmed to keep the hostname active. For little money, the domain ownership will be extended without further maintenance.

**1.1 Register on the Page**: Use _email_ and _password_ to create a new account on the [NO-IP Webpage](https://www.noip.com/).

**1.2 Choose a Hostname**: Choose a _hostname_ of your choice from the _ddns.net_ category.

**1.3 Verify your Email**: Complete the registration by confirming your email and optional payment.

**1.4 Improve Security**: Set _2FA_, a _username_, and add a _security question_ to protect against malicious actors.

:::info

Once the account is set up, the following steps are performed on your 📟 **node server**.

:::

## 2. Installation

To connect your node with the [NO-IP](https://www.noip.com/) service, you have to install their package.

**2.1 Download the NOIP Software**: Get the [latest stable build](https://www.noip.com/download) of _DUC_ for _Linux_ and install it within the source directory.

```sh
# Move to Home Directory
cd

# Download Software
sudo wget --content-disposition https://www.noip.com/download/linux/latest
```

The output should be similar to this:

```sh
[DATE] [TIME] (11.8 MB/s) - ‘noip-duc_3.3.0.tar.gz’ saved [4896895/4896895]
```

:::tip

Always sick to stable releases. As of July 2025, _Version 3.3.0_ is the latest stable release.

:::

**2.2 Extract the Tape Archive**: Unpack the archive file using the downloaded build tool and move into it's binary.

```sh
sudo tar xf noip-duc_3.3.0.tar.gz
cd noip-duc_3.3.0/binaries
```

:::info

The `tar` command will extract `x` the tape archive into its previous packaged files `f`.

:::

:::warning

The folder name will vary depending on the installed version.

:::

**2.3 Install the Binary**: Install the executable binary file of your architecture using the system's package manager.

<Tabs groupId="architecture">
  <TabItem value="amd" label="AMD" default>

```sh
# Enhence Permissions for Local Installation
sudo chown _apt /var/lib/update-notifier/package-data-downloads/partial/

# Install Binary
sudo apt install ./noip-duc_3.3.0_amd64.deb

# Return to Home Directory
cd
```

</TabItem> <TabItem value="arm" label="ARM">

```sh
# Enhence Permissions for Local Installation
sudo chown _apt /var/lib/update-notifier/package-data-downloads/partial/

# Install Binary
sudo apt install ./noip-duc_3.3.0_arm64.deb

# Return to Home Directory
cd
```

</TabItem>
</Tabs>

:::info

You will have to enhence the permissions for the package manager's default `_apt` user to be able to write into the partial download directory, used for installing local packages that have been pre-downloaded to the system.

:::

**2.4 Verify Installation**: Check the installation folder and service files of the installed package.

```sh
dpkg -L noip-duc
```

The output should look similar to:

```text
/usr
/usr/share
/usr/share/doc
/usr/share/doc/noip-duc
/usr/share/doc/noip-duc/README.md
/lib
/lib/systemd
/lib/systemd/system
/lib/systemd/system/noip-duc.service
/usr/share/doc/noip-duc/copyright
/usr/bin
/usr/bin/noip-duc
```

**2.5 Check Executable**: Try to call the service directly from the terminal to ensure it can be called by the system.

```sh
noip-duc
```

The output should look similar to:

```text
USAGE:
    noip-duc [OPTIONS] --username <USERNAME> --password <PASSWORD>

For more information try --help
```

**2.6 Delete Installation Files**: After the installed package and executable have been verified, delete the installation files.

```sh
sudo rm -rf noip-duc_3.3.0 noip-duc_3.3.0.tar.gz
```

:::warning

The folder name will vary depending on the installed version.

:::

## 3. User Configuration

Since the service will be automatically starting and running, we need to set login credentials and preferences.

**3.1 Create User Config File**: Create the file with all your DDNS credentials and preferences using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/default/noip-duc
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
sudo nano /etc/default/noip-duc
```

</TabItem>
</Tabs>

**3.2 Write User Configurations**: Input all your preferences and DDNS update interval, then save and exit the file.

```text
NOIP_USERNAME=<your-noip-username>
NOIP_PASSWORD=<your-noip-password>
NOIP_HOSTNAMES=<your-ddns-hostname>
NOIP_CHECK_INTERVAL=5m
```

:::info

The following properties need to be exchanged:

- `<your-noip-username>` with your NOIP email
- `<your-noip-password>` with your NOIP password
- `<your-ddns-hostname>` with your DDNS hostname ending on `.ddns.net`

:::

**3.3 Update Permissions**: For better security, locking down the permissions so only the root user can access credentials.

```sh
sudo chmod 600 /etc/default/noip-duc
sudo chown root:root /etc/default/noip-duc
```

## 4. Service Configuration

The setup already installed a default NOIP service file that can be used to allow automatic startups during boot and restarts on failures. We can further modify the default service file to also check for logging, an online network connection.

**4.1 Open Service Config File**: Further customize the service file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
sudo vim /lib/systemd/system/noip-duc.service
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
sudo nano /lib/systemd/system/noip-duc.service
```

</TabItem>
</Tabs>

**4.2 Update Service Configurations**: Add further preferences for network autages and restarts, then save and exit the file.

<Tabs groupId="logging-tool">
  <TabItem value="journal" label="Journal Logging" default>

```text
[Unit]
Description=No-IP Dynamic Update Client
After=network.target auditd.service syslog.target network-online.target
Wants=network-online.target

[Service]
EnvironmentFile=/etc/default/noip-duc
ExecStart=/usr/bin/noip-duc
Restart=on-failure
Type=simple
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

</TabItem> <TabItem value="system" label="System Logging">

```text
[Unit]
Description=No-IP Dynamic Update Client
After=network.target auditd.service syslog.target network-online.target
Wants=network-online.target

[Service]
EnvironmentFile=/etc/default/noip-duc
ExecStart=/usr/bin/noip-duc
Restart=on-failure
Type=simple
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
```

</TabItem>
</Tabs>

<details>
    <summary>Full Property Explanation</summary>

| Property          | Description                                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Description`     | A human-readable description of the service shown in `systemctl status`.                                                                                                                                                                                                                                                                                         |
| `After`           | - `network.target`: Ensures networking setup enabled before service is started. <br /> - `auditd.service`: Ensures audit daemon is initialized before service is started. <br /> - `syslog.target`: Ensures system logging is ready before service is started. <br /> - `network-online.target`: Waits for network to be fully online before service is started. |
| `Wants`           | Tries to fullfil `network-online.target` but might start even if there is a temporary downtime.                                                                                                                                                                                                                                                                  |
| `EnvironmentFile` | Path to the `/lib/systemd/system/noip-duc.service` configuration file.                                                                                                                                                                                                                                                                                           |
| `ExecStart`       | Link to binary at `/usr/bin/noip-duc`, started with the terminal command of the service.                                                                                                                                                                                                                                                                         |
| `Restart`         | Restarts the service `on-failure` for a variety of reasons.                                                                                                                                                                                                                                                                                                      |
| `Type`            | Indicates running at a `simple` service in the foreground without forking.                                                                                                                                                                                                                                                                                       |
| `StandardOutput`  | Sends regular service logs to the journal or syslog system.                                                                                                                                                                                                                                                                                                      |
| `StandardError`   | Sends error service logs to the journal or syslog system.                                                                                                                                                                                                                                                                                                        |
| `WantedBy`        | Starts the service automatically during the system's normal multi-user boot.                                                                                                                                                                                                                                                                                     |

</details>

:::warning

Ensure there are no missing or unintended spaces, characters or linebreaks before saving the service configuration.

:::

## 5. DDNS Startup

After both, the user and service configuration are set in place, we can start the DDNS tool.

**5.1 Reaload Service Configs**: Reload the previously modified system manager configuration for all services.

```sh
sudo systemctl daemon-reload
```

**5.2 Enable Autostarts**: Use the system control to create a symbolic link to enable startups during boot.

```sh
sudo systemctl enable noip-duc
```

The output should be similar to:

```text
Created symlink /etc/systemd/system/noip.service → /lib/systemd/system/noip-duc.service.
Created symlink /etc/systemd/system/multi-user.target.wants/noip-duc.service → /lib/systemd/system/noip-duc.service.
```

**5.3 Start the Service**: Use the system control to start the DDNS service with the configured user credentials and preferences.

```sh
sudo systemctl start noip-duc
```

**5.4 Verify Status**: Use the system control to fetch the current status and check if it's running correctly.

```sh
sudo systemctl status noip-duc
```

:::info

The status will display whether it is active, enabled, or disabled and show any recent log entries.

:::

The output should look similar to this:

```text
● noip-duc.service - No-IP Dynamic Update Client
     Loaded: loaded (/lib/systemd/system/noip-duc.service; enabled; vendor preset: enabled)
     Active: active (running) since [DATE] UTC; [TIME] ago
   Main PID: 288425 (noip-duc)
      Tasks: 1 (limit: 38033)
     Memory: 388.0K
        CPU: 7ms
     CGroup: /system.slice/noip-duc.service
             └─288425 /usr/bin/noip-duc

[DATE] [TIME] [USER] systemd[1]: Started No-IP Dynamic Update Client.
[DATE] [TIME] [USER] noip-duc[288425]: [DATE-TIME INFO  noip_duc::public_ip] Attempting to get IP with method Dns(No-IP Anycast DNS Tools)
[DATE] [TIME] [USER] noip-duc[288425]: [DATE-TIME INFO  noip_duc::observer] got new ip; current=[YOUR_PUBLIC_IP], previous=0.0.0.0
[DATE] [TIME] [USER] noip-duc[288425]: [DATE-TIME INFO  noip_duc::observer] update successful; current=[YOUR_PUBLIC_IP], previous=0.0.0.0
[DATE] [TIME] [USER] noip-duc[288425]: [DATE-TIME INFO  noip_duc::observer] checking ip again in 5m
...
```

Remember your DDNS hostname or copy it to a notepad, as it will be necessary for the client updates.

## 6. Stop Node Operation

Depending on your setup method, there are different ways to stop your node before linking your DDNS hostname.

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

## 7. Client DNS Update

Depending on your consensus client, the DDNS hostname can be set with different properties.

<Tabs groupId="client">
<TabItem value="prysm" label="Prysm">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/prysm/
vim prysm.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/prysm/
nano prysm.yaml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="teku" label="Teku">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/teku/
vim teku.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/teku/
nano teku.yaml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/lighthouse/
vim lighthouse.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/lighthouse/
nano lighthouse.toml
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path to the node folder.
- `<network>` with the name of your node's network.

:::

Set the DDNS hostname within the settings, then save and exit the file.

<Tabs groupId="client">
<TabItem value="prysm" label="Prysm">

In case the _p2p-host-ip_ property is set, disable it by putting a hash _#_ in front:

```text
# Previous Value Examples
p2p-host-ip: '0.0.0.0'
p2p-host-ip: '<your-ip-address>'

# Updated Value
#p2p-host-ip: '0.0.0.0'
#p2p-host-ip: '<your-ip-address>'
```

Then add the _p2p-host-dns_ property into a new line of the file:

```text
# Added Property
p2p-host-dns: '<your-ddns-hostname>'
```

</TabItem> <TabItem value="teku" label="Teku">

Update the _p2p-advertised-ip_ property.

```text
# Default Value Examples
p2p-advertised-ip: 0.0.0.0
p2p-advertised-ip: '<your-ip-address>'

# Updated Value
p2p-advertised-ip: '<your-ddns-hostname>'
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

Update the _enr-address_ property.

```text
# Default Value Examples
enr-address = "0.0.0.0"
enr-address = '<your-ip-address>'

# Updated Value
enr-address = '<your-ddns-hostname>'
```

</TabItem>
</Tabs>

:::info

Exchange `<your-ddns-hostname>` with the actual address of the DDNS hostname ending on `.ddns.net`.

:::

:::warning

Ensure there are no missing spaces, characters or unintended linebreaks before saving the configuration file.

:::

## 8. Restart the Node

Depending on your setup method, there are different ways to start your node after the DDNS hostname was added.

<Tabs groupId="setup">
  <TabItem value="clinode" label="LUKSO CLI Node" default>

```sh
cd <lukso-working-directory>
lukso start --checkpoint-sync
```

:::info

Exchange `<lukso-working-directory>` with the path of the node folder.

:::

</TabItem> <TabItem value="clivalidator" label="LUKSO CLI Validator" default>

```sh
cd <lukso-working-directory>
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync
```

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path of the node folder
- `<your-fee-recipient-address>` with the wallet address receiving staking profits

:::

</TabItem> <TabItem value="automation" label="Service Automation">

```sh
sudo systemctl start lukso-validator
```

</TabItem>
</Tabs>

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

:::tip

You should now have a stable and permanent blockchain connection. Wait some hours before [rechecking your peer count](/docs/guides/modifications/peer-count-limits.md).

:::

## Maintenance

Proper maintenance ensures that all the components are working as intended and can be updated on the fly.

**Logging**: Check the latest status of the system service.

<Tabs groupId="logging-tool">
  <TabItem value="journal" label="Journal Logging" default>

```sh
sudo journalctl -f -u noip-duc
```

</TabItem> <TabItem value="system" label="System Logging">

```sh
sudo tail -f /var/log/syslog | grep noip-duc
```

</TabItem>
</Tabs>

:::tip

Further details about checking client logs files can be found on the [**Problem Scanning**](/docs/guides/maintenance/problem-scanning.md) page.

:::

**Starting**: If you made any changes or updates to configuration, reload the system daemon and start the node.

```sh
sudo systemctl daemon-reload
sudo systemctl restart noip-duc
```

**Stopping**: You can stop all the node clients and parent processes using the system control.

```sh
sudo systemctl stop noip-duc
```

:::tip

Further information about system control or logging can be found on the [**Utility Tools**](/docs/theory/node-operation/utility-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

## Revert Setup

If something went wrong, you can remove the service and related files all together.

**1. Stop and Disable Service**: Stop the tool and remove it's service link from the system's boot.

```sh
sudo systemctl stop noip-duc
sudo systemctl disable noip-duc
```

**2. Remove the Service File**: Delete the configuration and reload the system daemon.

```sh
sudo rm /lib/systemd/system/noip-duc.service
sudo systemctl daemon-reload
```

**3. Remove Software Package**: Delete the binary and optional configuration files using the package management tool.

```sh
# Remove Software
sudo apt remove noip-duc

# Remove Software and Configuration
sudo apt purge noip-duc
```

**4. Update Client Configuration**: Stop the node, update your DDNS or IP address, and restart the clients.

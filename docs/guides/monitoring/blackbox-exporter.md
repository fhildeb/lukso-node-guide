---
sidebar_label: "8.5 Blackbox Exporter"
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 8.5 Blackbox Exporter

The Blackbox Exporter probes server endpoints and monitors the ping time between the node machine and two DNS servers. This information can be crucial in diagnosing network-related issues or delays.

:::tip

Further details about node analytics can be found on the [**Monitoring Tools**](/docs/theory/node-operation/monitoring-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Create System User

Running services as a system user with minimal privileges is a best practice, limiting damage if compromised. The Blackbox Exporter user will only be able to read and execute service-specific files. Use the system's user creation tool to add a new one.

```sh
sudo adduser --system blackbox-exporter-worker --group --no-create-home
```

<details>
<summary>Full Command Explanation</summary>

| Flag                              | Description                                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| <nobr> `--system` </nobr>         | Creates a system user, used to run services and daemons rather than for people to log in with. |
| <nobr> `--group` </nobr>          | Creates a new group with the same name as the user.                                            |
| <nobr> `--no-create-home` </nobr> | Prevents creation of a home directory since the service does not need one.                     |

</details>

If you want to confirm that the user has been created, you can search for it within the password file, housing all essential information for each user account. Using the search tool grep, we can check if the user exists within the file.

```sh
grep "blackbox-exporter-worker" /etc/passwd
```

The output should look similar to this:

```text
blackbox-exporter-worker:x:116:122::/home/blackbox-exporter-worker:/usr/sbin/nologin
```

## 2. Install Blackbox Exporter

To add the Blackbox Exporter tool to your node, you have to install it's package.

:::tip

Depending on the [Current Blackbox Exporter Release](https://github.com/prometheus/blackbox_exporter/releases/) the version and filenames might differ. Please ensure to use the latest release for best security and stability. As of **July 2025** it is version **0.27.0**.

:::

**2.1 Download Archive**: Move to the home directory and download the latest version.

```sh
cd
wget https://github.com/prometheus/blackbox_exporter/releases/download/v0.27.0/blackbox_exporter-0.27.0.linux-amd64.tar.gz
```

**2.2 Extract Files**: Unpack the archive using Ubuntu’s archiving tool.

```sh
tar xzfv blackbox_exporter-0.27.0.linux-amd64.tar.gz
```

:::info

The `tar` command extracts `x` the uncompressed `z` archive from the file path `f` using verbose `v` status messages.

:::

**2.3 Move Binary to System Path**: Move the Blackbox Exporter binary to your system path.

```sh
sudo cp blackbox_exporter-0.27.0.linux-amd64/blackbox_exporter /usr/local/bin/
```

**2.4 Set Ownership and Permissions**: Set the correct owner and access rights.

```sh
sudo chown blackbox-exporter-worker:blackbox-exporter-worker /usr/local/bin/blackbox_exporter
sudo chmod 755 /usr/local/bin/blackbox_exporter
```

**2.5 Cleanup Files**: Delete leftover archive and extracted folder.

```sh
rm -rf blackbox_exporter-0.27.0.linux-amd64
rm blackbox_exporter-0.27.0.linux-amd64.tar.gz
```

## 3. Extend Network Capabilities

The Blackbox Exporter needs raw socket access to perform ping-based probes. Grant this capability:

```sh
sudo setcap cap_net_raw+ep /usr/local/bin/blackbox_exporter
```

<details>
<summary>Full Command Explanation</summary>

| Flag                            | Description                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| <nobr> `setcap` </nobr>         | Sets Linux capabilities on an executable like `/usr/local/bin/blackbox_exporter`.  |
| <nobr> `cap_net_raw+ep` </nobr> | Effectively `e` permitts `p` the capability to use raw and packet network sockets. |

</details>

## 4. Probing Configuration

Create a configuration file that will be used for the pings from the node to the servers.

**4.1 Create Config Directory and File**: Choose a separate folder and create a config file using your preferred text editor.

```sh
sudo mkdir /etc/blackbox_exporter/
```

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/blackbox_exporter/blackbox.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
sudo nano /etc/blackbox_exporter/blackbox.yaml
```

</TabItem>
</Tabs>

**4.2 Paste Configuration**: Add the preferred server call properties.

```text
modules:
  icmp:
    prober: icmp
    timeout: 10s
    icmp:
      preferred_ip_protocol: ipv4
```

:::warning

Ensure the correct formatting of double-spaces the configuration to take effect correctly.

:::

**4.3 Restrict Permissions**: Change the ownership of the configuration file to the service user.

```sh
sudo chown -R blackbox-exporter-worker:blackbox-exporter-worker /etc/blackbox_exporter/
```

## 5. Service Configuration

Once the binary and ping files are in place, we can create a service configuration for the exporter, so it automatically starts during boot and restarts during crashes. The configuration will also check for logging before it starts up and uses the previously created user.

**5.1 Create Service File**: Create a system service file using your preferred text editor.

<Tabs groupId="editor">
<TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/systemd/system/blackbox_exporter.service
```

</TabItem>
<TabItem value="nano" label="Nano">

```sh
sudo nano /etc/systemd/system/blackbox_exporter.service
```

</TabItem>
</Tabs>

**5.2 Add Configuration**: Paste the following content using your preferred logging tool, then save and exit the file.

<Tabs groupId="logging-tool">
<TabItem value="journal" label="Journal Logging" default>

```text
[Unit]
Description=Blackbox Exporter
Documentation=https://github.com/prometheus/blackbox_exporter
After=network.target network-online.target

[Service]
User=blackbox-exporter-worker
Group=blackbox-exporter-worker
Type=simple
ExecStart=/usr/local/bin/blackbox_exporter --config.file /etc/blackbox_exporter/blackbox.yaml
Restart=always
RestartSec=5
SyslogIdentifier=blackbox_exporter
StandardOutput=journal
StandardError=journal
ProtectSystem=full
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

</TabItem>
<TabItem value="system" label="System Logging">

```text
[Unit]
Description=Blackbox Exporter
Documentation=https://github.com/prometheus/blackbox_exporter
After=network.target network-online.target

[Service]
User=blackbox-exporter-worker
Group=blackbox-exporter-worker
Type=simple
ExecStart=/usr/local/bin/blackbox_exporter --config.file /etc/blackbox_exporter/blackbox.yaml
Restart=always
RestartSec=5
SyslogIdentifier=blackbox_exporter
StandardOutput=syslog
StandardError=syslog
ProtectSystem=full
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

</TabItem>
</Tabs>

<details>
<summary>Full Property Explanation</summary>

| Property           | Description                                                                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Description`      | A human-readable description of the service shown in `systemctl status`.                                                                                                          |
| `Documentation`    | Link to documentation of the software that is being used for this service file.                                                                                                   |
| `After`            | - `network.target`: Ensures networking setup enabled before service is started. <br /> - `network-online.target`: Waits for network to be fully online before service is started. |
| `User`             | Executes the service as the `blackbox-exporter-worker` user.                                                                                                                      |
| `Group`            | Executes the service under the `blackbox-exporter-worker` group.                                                                                                                  |
| `Type`             | Indicates running at a `simple` service in the foreground without forking into a daemon process.                                                                                  |
| `ExecStart`        | Link to binary at `/usr/local/bin/blackbox_exporter`, started with the terminal command.                                                                                          |
| `Restart`          | Restarts the service `always` for a variety of reasons, errors, or timeouts.                                                                                                      |
| `RestartSec`       | Delay in seconds before restarting the service.                                                                                                                                   |
| `SyslogIdentifier` | Tags logs from the service with `json_exporter` to help distinguish them from other logs.                                                                                         |
| `StandardOutput`   | Sends regular service logs to the journal or syslog system.                                                                                                                       |
| `StandardError`    | Sends error service logs to the journal or syslog system.                                                                                                                         |
| `ProtectSystem`    | Restricts filesystem write access outside of the service runtime.                                                                                                                 |
| `NoNewPrivileges`  | Prevents privilege escalation which processes can be apply for.                                                                                                                   |
| `PrivateTmp`       | Creates an isolated `/tmp` directory for the service.                                                                                                                             |
| `WantedBy`         | Binds the service to the `multi-user.target`, so it starts during all boot processes.                                                                                             |

</details>

:::warning

If you renamed the user, make sure to update both `User` and `Group` values to prevent running the service as `root`.

:::

## 6. Start the Exporter Service

After setting up the service, you can enable and start the systemd service.

**6.1 Reload Daemon**: Reload the system daemon to include the new service.

```sh
sudo systemctl daemon-reload
```

**6.2 Start Exporter**: Start the Node Exporter service using the system control.

```sh
sudo systemctl start blackbox_exporter
```

**6.3 Enable Autostart**: Enable the service to start automatically during boot.

```sh
sudo systemctl enable blackbox_exporter
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/multi-user.target.wants/blackbox_exporter.service → /etc/systemd/system/blackbox_exporter.service.
```

## 7. Check Service Status

You can fetch the current status from the system control to check if the Blackbox Exporter service is running and configured correctly. The command will display whether it is active, enabled, or disabled and show recent log entries.

```sh
sudo systemctl status blackbox_exporter
```

The output should look similar to this:

```text
● blackbox_exporter.service - Blackbox Exporter
     Loaded: loaded (/etc/systemd/system/blackbox_exporter.service; enabled; vendor preset: enabled)
     Active: active (running) since [DATE]; [TIME] ago
       Docs: https://github.com/prometheus/blackbox_exporter
   Main PID: 27272 (blackbox_exporter)
      Tasks: 7 (limit: 38043)
     Memory: 2.4M
        CPU: 8ms
     CGroup: /system.slice/blackbox_exporter.service
             └─27272 /usr/local/bin/blackbox_exporter --config.file /etc/blackbox_exporter/blackbox.>

[DATE] [USER] systemd[1]: Started Blackbox Exporter.
[DATE] [USER] blackbox_exporter[27272]: ts=2023-05-18T09:11:09.531Z caller=main.go:78 >...
...
```

## Maintenance

Proper maintenance ensures that all the components are working as intended and can be updated on the fly.

**Logging**: Check the latest status of the system service.

<Tabs groupId="logging-tool">
<TabItem value="journal" label="Journal Logging" default>

```sh
sudo journalctl -f -u blackbox_exporter
```

</TabItem>
<TabItem value="system" label="System Logging">

```sh
sudo tail -f /var/log/syslog | grep blackbox_exporter
```

</TabItem>
</Tabs>

**Restarting**: If you made any changes or updates to configuration, reload the system daemon and start the exporter.

```sh
sudo systemctl daemon-reload
sudo systemctl restart blackbox_exporter
```

**Stopping**: You can stop the exporter using the system control.

```sh
sudo systemctl stop blackbox_exporter
```

:::tip

Further information about system control or logging can be found on the [**Utility Tools**](/docs/theory/node-operation/utility-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

## Revert Setup

If something went wrong, you can remove the user or delete the service and related files all together.

**1. Stop and Disable Service**: Stop the tool and remove it's service link from the system's boot.

```sh
sudo systemctl stop blackbox_exporter
sudo systemctl disable blackbox_exporter
```

**2. Remove the Service and Config Files**: Delete the configurations and reload the system daemon.

```sh
sudo rm /etc/systemd/system/blackbox_exporter.service
sudo rm -rf /etc/blackbox_exporter
sudo systemctl daemon-reload
```

**3. Delete Binary**: Remove the executable Blackbox Exporter from your system.

```sh
sudo rm -rf /usr/local/bin/blackbox_exporter
```

**4. Remove User and Group**: Prune the user and all it's cached configurations.

```sh
sudo deluser --remove-all-files blackbox-exporter-worker
sudo delgroup blackbox-exporter-worker
```

---
sidebar_label: "8.3 Node Exporter"
sidebar_position: 3
description: "Install and configure the Node Exporter to collect system-level metrics like CPU, memory, disk, and network usage from your LUKSO node server."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 8.3 Node Exporter

The Node Exporter collects machine metrics like memory, disk space, processor usage, and network statistics, providing visibility for system health and performance. It's an essential tool for monitoring resource consumption on blockchain nodes.

:::tip

Further details about node analytics can be found on the [**Monitoring Tools**](/docs/theory/node-operation/monitoring-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Create System User

Running services as a system user with minimal privileges is a best practice, limiting damage if compromised. The JSON Exporter user will only be able to read and execute service-specific files. Use the system's user creation tool to add a new one.

```sh
sudo adduser --system node-exporter-worker --group --no-create-home
```

<details>
<summary>Full Command Explanation</summary>

| Flag                              | Description                                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| <nobr> `--system` </nobr>         | Creates a system user, used to run services and daemons rather than for people to log in with. |
| <nobr> `--group` </nobr>          | Creates a new group with the same name as the user.                                            |
| <nobr> `--no-create-home` </nobr> | Prevents creation of a home directory since the service does not need one.                     |

</details>

If you want to confirm that the user has been created, you can search for it within the password file, housing all essential information for each user account. Using the search tool _grep_, we can check if the user exists within the file.

```sh
grep "node-exporter-worker" /etc/passwd
```

The output should look similar to this:

```text
node-exporter-worker:x:114:120::/home/node-exporter-worker:/usr/sbin/nologin
```

## 2. Install Node Exporter

To add the Node Exporter tool to your node, you have to install it's package.

:::tip

Depending on the [Current Node Exporter Release](https://github.com/prometheus/node_exporter/releases/) the version and filenames might differ. Please ensure to use the latest release for best security and stability. As of **July 2025** it is version **1.9.1**.

:::

**2.1 Download Archive**: Move to the home directory and download the latest version.

```sh
cd
wget https://github.com/prometheus/node_exporter/releases/download/v1.9.1/node_exporter-1.9.1.linux-amd64.tar.gz
```

**2.2 Extract Files**: Unpack the archive using Ubuntu’s archiving tool.

```sh
tar xzfv node_exporter-1.9.1.linux-amd64.tar.gz
```

:::info

The `tar` command extracts `x` the uncompressed `z` archive from the file path `f` using verbose `v` status messages.

:::

**2.3 Move Binary to System Path**: Move the Node Exporter binary to your system path.

```sh
sudo cp node_exporter-1.9.1.linux-amd64/node_exporter /usr/local/bin/
```

**2.4 Assign Permissions**: Set the correct owner and access rights.

```sh
sudo chown node-exporter-worker:node-exporter-worker /usr/local/bin/node_exporter
sudo chmod 755 /usr/local/bin/node_exporter
```

<details>
  <summary>Full Command Descriptions</summary>

| **Setting**                                           | **Description**                                                     |
| ----------------------------------------------------- | ------------------------------------------------------------------- |
| <nobr> `sudo chown <user>:<user> <directory>` </nobr> | Assign ownership to a single folder or file.                        |
| <nobr> `sudo chmod 755 <directory>` </nobr>           | Set readable permissions for everyone, typically for general files. |

</details>

**2.5 Cleanup Installation Files**: Delete leftover archive and extracted folder.

```sh
rm -rf node_exporter-1.9.1.linux-amd64
rm node_exporter-1.9.1.linux-amd64.tar.gz
```

## 3. Service Configuration

Once the binary file is in place, we can create a service configuration for the exporter, so it automatically starts during boot and restarts during crashes. The configuration will also check for logging before it starts up and uses the previously created user.

**3.1 Create Service File**: Create a system service file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/systemd/system/node_exporter.service
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
nano vim /etc/systemd/system/node_exporter.service
```

</TabItem>
</Tabs>

**3.2 Add Configuration**: Paste the following content using your preferred logging tool, then save and exit the file.

<Tabs groupId="logging-tool">
  <TabItem value="journal" label="Journal Logging" default>

```text
[Unit]
Description=Node Exporter
Documentation=https://github.com/prometheus/node_exporter

[Service]
User=node-exporter-worker
Group=node-exporter-worker
Type=simple
ExecStart=/usr/local/bin/node_exporter
Restart=always
RestartSec=5
SyslogIdentifier=node_exporter
StandardOutput=journal
StandardError=journal
ProtectSystem=full
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

</TabItem> <TabItem value="system" label="System Logging">

```text
[Unit]
Description=Node Exporter
Documentation=https://github.com/prometheus/node_exporter

[Service]
User=node-exporter-worker
Group=node-exporter-worker
Type=simple
ExecStart=/usr/local/bin/node_exporter
Restart=always
RestartSec=5
SyslogIdentifier=node_exporter
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

| Property           | Description                                                                           |
| ------------------ | ------------------------------------------------------------------------------------- |
| `Description`      | A human-readable description of the service shown in `systemctl status`.              |
| `Documentation`    | Link to documentation of the software that is being used for this service file.       |
| `User`             | Executes the service as the `node-exporter-worker` user.                              |
| `Group`            | Executes the service under the `node-exporter-worker` group.                          |
| `Type`             | Indicates running at a `simple` service in the foreground without forking.            |
| `ExecStart`        | Link to binary at `/usr/local/bin/node_exporter`, started with the terminal command.  |
| `Restart`          | Restarts the service `always` for a variety of reasons, errors, or timeouts.          |
| `RestartSec`       | Delay in seconds before restarting the service.                                       |
| `SyslogIdentifier` | Tags logs from the service with `node_exporter` to help distinguish them.             |
| `StandardOutput`   | Sends regular service logs to the journal or syslog system.                           |
| `StandardError`    | Sends error service logs to the journal or syslog system.                             |
| `ProtectSystem`    | Restricts filesystem write access outside of the service runtime.                     |
| `NoNewPrivileges`  | Prevents privilege escalation which processes can be apply for.                       |
| `PrivateTmp`       | Creates an isolated `/tmp` directory for the service.                                 |
| `WantedBy`         | Binds the service to the `multi-user.target`, so it starts during all boot processes. |

</details>

:::warning

If you renamed the user, make sure to update both `User` and `Group` values to prevent running the service as `root`.

:::

## 4. Start the Exporter Service

After setting up the service, you can enable and start the system service.

**4.1 Reload Daemon**: Reload the system daemon to include the new service.

```sh
sudo systemctl daemon-reload
```

**4.2 Start Service**: Start the Node Exporter service using the system control.

```sh
sudo systemctl start node_exporter
```

**4.3 Enable Autostart on Boot**: Enable the service to start automatically during boot.

```sh
sudo systemctl enable node_exporter
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/multi-user.target.wants/node_exporter.service → /etc/systemd/system/node_exporter.service.
```

## 5. Check Service Status

You can fetch the current status from the system control to check if the Node Exporter service is running and configured correctly. The command will display whether it is active, enabled, or disabled and show recent log entries.

```sh
sudo systemctl status node_exporter
```

The output should look similar to this:

```text
● node_exporter.service - Node Exporter
     Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; >
     Active: active (running) since [DATE]; [TIME] ago
       Docs: https://github.com/prometheus/node_exporter
   Main PID: 22812 (node_exporter)
      Tasks: 5 (limit: 38043)
     Memory: 2.8M
        CPU: 10ms
     CGroup: /system.slice/node_exporter.service
             └─22812 /usr/local/bin/node_exporter
```

## Maintenance

Proper maintenance ensures that all the components are working as intended and can be updated on the fly.

**Logging**: Check the latest status of the system service.

<Tabs groupId="logging-tool">
  <TabItem value="journal" label="Journal Logging" default>

```sh
sudo journalctl -f -u node_exporter
```

</TabItem> <TabItem value="system" label="System Logging">

```sh
sudo tail -f /var/log/syslog | grep node_exporter
```

</TabItem>
</Tabs>

**Starting**: If you made any changes or updates to configuration, reload the system daemon and start the exporter.

```sh
sudo systemctl daemon-reload
sudo systemctl restart node_exporter
```

**Stopping**: You can stop the exporter using the system control.

```sh
sudo systemctl stop node_exporter
```

:::tip

Further information about system control or logging can be found on the [**Utility Tools**](/docs/theory/node-operation/utility-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

## Revert Setup

If something went wrong, you can remove the user or delete the service and related files all together.

**1. Stop and Disable the Service**: Stop the tool and remove it's service link from the system's boot.

```sh
sudo systemctl stop node_exporter
sudo systemctl disable node_exporter
```

**2. Remove the Service File**: Delete the configuration and reload the system daemon.

```sh
sudo rm /etc/systemd/system/node_exporter.service
sudo systemctl daemon-reload
```

**3. Delete Binary**: Remove the executable Node Exporter from your system.

```sh
sudo rm -rf /usr/local/bin/node_exporter
```

**4. Remove User and Group**: Prune the user and all it's cached configurations.

```sh
sudo deluser --remove-all-files node-exporter-worker
sudo delgroup node-exporter-worker
```

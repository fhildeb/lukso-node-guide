---
sidebar_label: "8.7 Grafana"
sidebar_position: 7
description: "Learn how to securely install, configure, and run Grafana as a service to visualize node metrics collected through Prometheus."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 8.7 Grafana

Grafana is an analytics and interactive visualization tool that connects to the previously configured [Prometheus](/docs/guides/monitoring/prometheus.md) tool to display real-time metrics, logs, and alerting dashboards. This guide walks you through the process of installing Grafana and configuring it to run as a dedicated background service.

:::tip

Further details about node analytics can be found on the [**Monitoring Tools**](/docs/theory/node-operation/monitoring-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Create System User

Running services as a system user with minimal privileges is a best practice, limiting damage if compromised. The Blackbox Exporter user will only be able to read and execute service-specific files. Use the system's user creation tool to add a new one.

```sh
sudo adduser --system grafana-server-worker --group --no-create-home
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
grep "grafana-server-worker" /etc/passwd
```

The output should look similar to this:

```text
grafana-server-worker:x:117:123::/home/grafana-server-worker:/usr/sbin/nologin
```

## 2. Install Grafana

To add the Grafana server to your node, you have to install it's package. In the case of Grafana, the setup is more extensive than downloading a single executable and adding it to the binary tree yourself. We therefore use the package manager APT, which is also used for regular Linux or Ubuntu software. To verify the package's authenticity, we must first add the Grafana GPG software key to our system's keyring folder.

:::tip

Further information about package management can be found on the [**Utility Tools**](/docs/theory/node-operation/utility-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

**2.1 Add GPG Key**: Download and save Grafana's signing key to the system’s keyring.

```sh
cd
curl -fsSL https://packages.grafana.com/gpg.key|sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/grafana.gpg
```

<details>
<summary>Full Command Explanation</summary>

| Flag        | Description                                                                           |
| ----------- | ------------------------------------------------------------------------------------- |
| `-f`        | Fails silently on errors to ensure the scripts does not continue on broken responses. |
| `-s`        | Silent mode to suppress progress output.                                              |
| `-S`        | Shows errors even in silent mode.                                                     |
| `-L`        | Follows redirects to the updated download location.                                   |
| `\|`        | Sends the output of `curl` directly into the `gpg` command.                           |
| `--dearmor` | Converts the ASCII key to binary so it can be used by APT.                            |
| `-o`        | Defines the output location and stores the binary key in the trusted GPG folder.      |

</details>

**2.2 Key Verification**: Verify if the Grafana Key was added using the _gpg_ command.

```sh
gpg --no-default-keyring --keyring /etc/apt/trusted.gpg.d/grafana.gpg --list-keys
```

<details>
<summary>Full Command Explanation</summary>

| Flag                   | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| `--no-default-keyring` | Avoids loading the user’s default keyring in `~/.gnupg`.              |
| `--keyring`            | Explicitly defines which keyring to use for listing trusted GPG keys. |
| `--list-keys`          | Displays all public keys of a specified keyring for verification.     |

</details>

You should find an entry similar to this:

```text
/etc/apt/trusted.gpg.d/grafana.gpg
----------------------------------
pub   rsa3072 2023-01-06 [SC] [expires: DATE]
      0E22EB88E39E12277A7760AE9E439B102CF3C0C6
uid           [ unknown] Grafana Labs <engineering@grafana.com>
sub   rsa3072 2023-01-06 [E] [expires: DATE]
```

**2.3 List Repository**: Add Grafana to the trusted repository list, to allow it's installation.

```sh
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
```

Press _Enter_ to continue fetching all the necessary packages.

:::info

The `add-apt-repository` is the standard way to add additional repositories to your sources in Ubuntu and many other Debian-based systems. However, it requires additional software packages that were installed during the [**Software Preparation**](/docs/guides/monitoring/software-preparation.md). Ensure you've completed the previous steps.

:::

**2.4 Update Package List**: Update the package list using the previous Grafana GPG key.

```sh
sudo apt update
```

**2.5 List Grafana Versions**: Check available Grafana versions that can be installed.

```sh
apt list -a grafana
```

**2.6 Install Grafana**: Download the latest supported Grafana build from the package list.

<Tabs groupId="grafana">
  <TabItem value="latest" label="Latest Grafana Version" default>

```sh
sudo apt install grafana
```

</TabItem> <TabItem value="9.5.2" label="Grafana Version 9.5.2">

```sh
sudo apt install grafana=9.5.2
```

</TabItem>
</Tabs>

**2.7 Freeze Updates**: Put Grafana Updates on hold so dashboards dont break during regular package updates.

```sh
sudo apt-mark hold grafana
```

**2.8 Set Binary Permissions**: Set the correct owner and access rights for the executables.

```sh
sudo chown -R grafana-server-worker:grafana-server-worker /usr/sbin/grafana
sudo chown -R grafana-server-worker:grafana-server-worker /usr/sbin/grafana-server
sudo chmod 755 /usr/sbin/grafana
sudo chmod 755 /usr/sbin/grafana-server
```

**2.9 Set File Permissions**: Set the correct owner and access rights for the configuration and log files.

```sh
sudo chown -R grafana-server-worker:grafana-server-worker /etc/grafana
sudo chown -R grafana-server-worker:grafana-server-worker /var/lib/grafana
sudo chown -R grafana-server-worker:grafana-server-worker /var/log/grafana
sudo chmod 755 /var/lib/grafana
```

## 3. Service Configuration

Once the Grafana software was installed with the correct permissions, we can update it's default service configuration, that automatically starts Grafana during boot and restarts during crashes. The updated configuration will also check for logging and an internet connection before it starts up and uses the previously created user.

:::tip

Most of the default configuration remains untouched. Compare the content and only add missing or updated properties.

:::

**4.1 Create Service File**: Create a system service file using your preferred text editor.

<Tabs groupId="editor">
<TabItem value="vim" label="Vim" default>

```sh
sudo vim /lib/systemd/system/grafana-server.service
```

</TabItem>
<TabItem value="nano" label="Nano">

```sh
sudo nano /lib/systemd/system/grafana-server.service
```

</TabItem>
</Tabs>

**4.2 Add Configuration**: Paste the following content using your preferred logging tool, then save and exit the file.

:::tip

Further details on Journal and System Logging can be found on the [**Utility Tools**](/docs/theory/node-operation/utility-tools.md) page in the the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

<Tabs groupId="logging-tool">
<TabItem value="journal" label="Journal Logging" default>

```text
[Unit]
Description=Grafana instance
Documentation=http://docs.grafana.org
Wants=network-online.target
After=network.target network-online.target postgresql.service mariadb.service mysql.service influxdb.service

[Service]
EnvironmentFile=/etc/default/grafana-server
User=grafana-server-worker
Group=grafana-server-worker
Type=simple
Restart=on-failure
WorkingDirectory=/usr/share/grafana
RuntimeDirectory=grafana
RuntimeDirectoryMode=0750
ExecStart=/usr/share/grafana/bin/grafana server                                     \
                            --config=${CONF_FILE}                                   \
                            --pidfile=${PID_FILE_DIR}/grafana-server.pid            \
                            --packaging=deb                                         \
                            cfg:default.paths.logs=${LOG_DIR}                       \
                            cfg:default.paths.data=${DATA_DIR}                      \
                            cfg:default.paths.plugins=${PLUGINS_DIR}                \
                            cfg:default.paths.provisioning=${PROVISIONING_CFG_DIR}

LimitNOFILE=10000
TimeoutStopSec=20
CapabilityBoundingSet=
DeviceAllow=
LockPersonality=true
MemoryDenyWriteExecute=false
NoNewPrivileges=true
PrivateDevices=true
PrivateTmp=true
ProtectClock=true
ProtectControlGroups=true
ProtectHome=true
ProtectHostname=true
ProtectKernelLogs=true
ProtectKernelModules=true
ProtectKernelTunables=true
ProtectProc=invisible
ProtectSystem=full
RemoveIPC=true
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
RestrictNamespaces=true
RestrictRealtime=true
RestrictSUIDSGID=true
SystemCallArchitectures=native
UMask=0027
RestartSec=5
SyslogIdentifier=grafana-server
StandardOutput=journal
StandardError=journal
PrivateUsers=true

[Install]
WantedBy=multi-user.target
```

</TabItem>
<TabItem value="system" label="System Logging">

```text
[Unit]
Description=Grafana instance
Documentation=http://docs.grafana.org
Wants=network-online.target
After=network.target network-online.target postgresql.service mariadb.service mysql.service influxdb.service

[Service]
EnvironmentFile=/etc/default/grafana-server
User=grafana-server-worker
Group=grafana-server-worker
Type=simple
Restart=on-failure
WorkingDirectory=/usr/share/grafana
RuntimeDirectory=grafana
RuntimeDirectoryMode=0750
ExecStart=/usr/share/grafana/bin/grafana server                                     \
                            --config=${CONF_FILE}                                   \
                            --pidfile=${PID_FILE_DIR}/grafana-server.pid            \
                            --packaging=deb                                         \
                            cfg:default.paths.logs=${LOG_DIR}                       \
                            cfg:default.paths.data=${DATA_DIR}                      \
                            cfg:default.paths.plugins=${PLUGINS_DIR}                \
                            cfg:default.paths.provisioning=${PROVISIONING_CFG_DIR}

LimitNOFILE=10000
TimeoutStopSec=20
CapabilityBoundingSet=
DeviceAllow=
LockPersonality=true
MemoryDenyWriteExecute=false
NoNewPrivileges=true
PrivateDevices=true
PrivateTmp=true
ProtectClock=true
ProtectControlGroups=true
ProtectHome=true
ProtectHostname=true
ProtectKernelLogs=true
ProtectKernelModules=true
ProtectKernelTunables=true
ProtectProc=invisible
ProtectSystem=full
RemoveIPC=true
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
RestrictNamespaces=true
RestrictRealtime=true
RestrictSUIDSGID=true
SystemCallArchitectures=native
UMask=0027
RestartSec=5
SyslogIdentifier=grafana-server
StandardOutput=syslog
StandardError=syslog
PrivateUsers=true

[Install]
WantedBy=multi-user.target
```

</TabItem>
</Tabs>

<details>
<summary>Full Property Explanation</summary>

| Property                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Description`             | A human-readable description of the service shown in `systemctl status`.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Documentation`           | Link to documentation of the software that is being used for this service file.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Wants`                   | The service should try to start `network-online.target` before starting Grafana.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `After`                   | - `network.target`: Ensures networking setup is enabled before the service is started. <br/> - `network-online.target`: Waits for the network to be fully online. <br/> - `postgresql.service`: Ensures the PostgreSQL database service is started. <br/> - `mariadb.service`: Waits for the MariaDB backend database to launch. <br/> - `mysql.service`: Ensures the MySQL server is running for data sourcing. <br/> - `influxdb.service`: Waits for the InfluxDB database as dashboard dependency. |
|                           |
| `EnvironmentFile`         | Specifies a file containing the service's environment variables used during startup.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `User`                    | Executes the service as the `grafana-server-worker` user.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `Group`                   | Executes the service under the `grafana-server-worker` group.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `Type`                    | Indicates running at a `simple` service in the foreground without forking.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `Restart`                 | Restarts the service `on-failure` for a variety of reasons.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `WorkingDirectory`        | Sets the working directory for the executed process.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `RuntimeDirectory`        | Sets the runtime directory before start, removed when the service stops.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `RuntimeDirectoryMode`    | Sets the file mode permissions for the runtime directory.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `ExecStart`               | Link to binary at `/usr/share/grafana/bin/grafana`, started with the command.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `LimitNOFILE`             | Controls the maximum number of file descriptors the service can open.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `TimeoutStopSec`          | Specifies the maximum time the service should stop before being forcibly terminated.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `LockPersonality`         | The service's kernel personality setting will be locked to prevent changes.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `MemoryDenyWriteExecute`  | Determines whether the service can create writable and executable memory mappings.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `NoNewPrivileges`         | Prevents privilege escalation which processes can be apply for.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `PrivateDevices`          | The service will not have access to any physical devices.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `PrivateTmp`              | Creates an isolated `/tmp` directory for the service.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `ProtectClock`            | The service cannot change the system clock if enabled.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `ProtectControlGroups`    | Prevents the service from altering process resource limits and accounting settings.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `ProtectHome`             | Used to prevent the service from accessing the user's home directories.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `ProtectHostname`         | The service cannot change the system's hostname if enabled.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ProtectKernelLogs`       | Prevents the service to access sensitive kernel log ring data.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `ProtectKernelModules`    | Prevents the service from altering the system's hardware capabilities.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `ProtectKernelTunables`   | Denies modifying kernel variables, restricting its ability to alter the system's behavior.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `ProtectProc`             | Restricts the visibility of other processes in `/proc`.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `ProtectSystem`           | Specifies where the service can write files to the disk.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `RemoveIPC`               | If enabled, it ill remove all connection objects when logging out.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `RestrictAddressFamilies` | Restricts the socket address families the service can use.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `RestrictNamespaces`      | Limits the types of Linux namespaces the process can access.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `RestrictRealtime`        | Blocks acquiring real-time scheduling of the operation system.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `RestrictSUIDSGID`        | Restricts creation or use of privilege files.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `SystemCallArchitectures` | Restricts the system calls the service can execute to a specific architecture.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `UMask`                   | Sets the default file creation permissions for the service.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `WantedBy`                | Binds the service to the `multi-user.target`, so it starts during all boot processes.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `RestartSec`              | Delay in seconds before restarting the service.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `SyslogIdentifier`        | Tags logs from the service with `grafana-server` to help distinguish them.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `StandardOutput`          | Sends regular service logs to the journal or syslog system.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `StandardError`           | Sends error service logs to the journal or syslog system.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `PrivateUsers`            | Runs the service in its own namespace mapped to `nobody` and `nogroup`.                                                                                                                                                                                                                                                                                                                                                                                                                               |

</details>

:::warning

If you renamed the user, make sure to update both `User` and `Group` values to prevent running the service as `root`.

:::

## 5. Start the Grafana Service

After setting up the service, you can enable and start the system service.

**5.1 Reload Daemon**: Reload the system daemon to include the new service.

```sh
sudo systemctl daemon-reload
```

**5.2 Start Service**: Start the Grafana service using the system control.

```sh
sudo systemctl start grafana-server
```

**5.3 Enable Autostart on Boot**: Enable the service to start automatically during boot.

```sh
sudo systemctl enable grafana-server
```

The output should look similar to this:

```text
Synchronizing state of grafana-server.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install enable grafana-server
Created symlink /etc/systemd/system/multi-user.target.wants/grafana-server.service → /lib/systemd/system/grafana-server.service.
```

## 6. Check Service Status

You can fetch the current status from the system control to check if the Grafana service is running and configured correctly. The command will display whether it is active, enabled, or disabled and show recent log entries.

```sh
sudo systemctl status grafana-server
```

The output should look similar to this:

```text
● grafana-server.service - Grafana instance
     Loaded: loaded (/lib/systemd/system/grafana-server.service; enabled; vendo>
     Active: active (running) since [DATE] UTC; [TIME] ago
       Docs: http://docs.grafana.org
   Main PID: 84000 (grafana)
      Tasks: 17 (limit: 38043)
     Memory: 65.7M
        CPU: 3.855s
     CGroup: /system.slice/grafana-server.service
             └─84000 /usr/share/grafana/bin/grafana server --config=/etc/grafan>

[DATE] [TIME] [USER] grafana[84000]: logger=modules t=2023-05-18T15:09:2>...
...
```

## 7. Adjusting the Time Zone

To solve issues when having different timezones set on your node and your personal computer, but also ensure sure that metrics have the correct timestamp, you can update the default time settings which Grafana is applying under the hood.

**7.1 Verify Timezone**: Check if the wanted timezone is already set on your node.

```sh
timedatectl
```

**7.2 Update Timezone**: If there is an time offset, update your node's timezone.

```sh
sudo timedatectl set-timezone <your-timezone>
```

:::info

Exchange `<your-timezone>` with one of the [Available Timezone Names](https://gist.github.com/adamgen/3f2c30361296bbb45ada43d83c1ac4e5).

:::

:::tip

Timestamp changes take immediate effect for all services and log files.

:::

## Maintenance

Proper maintenance ensures that all the components are working as intended and can be updated on the fly.
**Logging**: Check the latest status of the system service.

<Tabs groupId="logging-tool">
<TabItem value="journal" label="Journal Logging" default>

```sh
sudo journalctl -f -u grafana-server
```

</TabItem>
<TabItem value="system" label="System Logging">

```sh
sudo tail -f /var/log/syslog | grep grafana-server
```

</TabItem>
</Tabs>

**Restarting**: If you made any changes or updates to configuration, reload the system daemon and start the exporter.

```sh
sudo systemctl daemon-reload
sudo systemctl restart grafana-server
```

**Stopping**: You can stop the exporter using the system control.

```sh
sudo systemctl stop grafana-server
```

:::tip

Further information about system control or logging can be found on the [**Utility Tools**](/docs/theory/node-operation/utility-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

## Revert Setup

If something went wrong, you can remove the user or delete the service and related files all together.

**1. Stop and Disable Service**: Stop the tool and remove it's service link from the system's boot.

```sh
sudo systemctl stop grafana-server
sudo systemctl disable grafana-server
```

**2. Change Binary Ownership**: Change the owner of the Grafana and Grafana Server executables.

```sh
sudo chown -R root:root /usr/sbin/grafana
sudo chown -R root:root /usr/sbin/grafana-server
```

**3. Change Folder Ownership**: Change the owner of the configuration and database folers.

```sh
sudo chown -R root:root /etc/grafana
sudo chown -R root:root /var/lib/grafana
sudo chown -R root:root /var/log/grafana
```

**4. Remove the Service and Config Files**: Delete all service files and reload the system daemon.

```sh
sudo rm /lib/systemd/system/grafana-server.service
sudo rm -rf /etc/grafana
sudo rm -rf /var/lib/grafana
sudo rm -rf /var/log/grafana
sudo systemctl daemon-reload
```

**5. Delete Binary**: Remove the executable Grafana and Grafana Server from your system.

```sh
sudo rm -rf /usr/sbin/grafana-server
sudo rm -rf /usr/sbin/grafana
```

**6. Remove User and Group**: Prune the user and all it's cached configurations.

```sh
sudo deluser --remove-all-files grafana-server-worker
sudo delgroup grafana-server-worker
```

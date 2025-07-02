---
sidebar_label: "8.4 JSON Exporter"
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 8.4 JSON Exporter

The JSON Exporter fetches data from JSON endpoints, like the LYX price from CoinGecko. Having access to live price metrics allows you to monitor market performance and monitor financial metrics against validator number or participation rate.

:::tip

Further details about node analytics can be found on the [**Monitoring Tools**](/docs/theory/node-operation/monitoring-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Create System User

Running services as a system user with minimal privileges is a best practice, limiting damage if compromised. The JSON Exporter user will only be able to read and execute service-specific files. Use the system's user creation tool to add a new one.

```sh
sudo adduser --system json-exporter-worker --group --no-create-home
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
grep "json-exporter-worker" /etc/passwd
```

The output should look similar to this:

```text
json-exporter-worker:x:115:121::/home/json-exporter-worker:/usr/sbin/nologin
```

## 2. Install JSON Exporter

To add the JSON Exporter tool to your node, you have to install it's package.

:::tip

Depending on the [Current JSON Exporter Release](https://github.com/prometheus-community/json_exporter/releases/) the version and filenames might differ. Please ensure to use the latest release for best security and stability. As of **July 2025** it is version **0.7.0**.

:::

**2.1 Download Archive**: Move to the home directory and download the latest version.

```sh
cd
wget https://github.com/prometheus-community/json_exporter/releases/download/v0.7.0/json_exporter-0.7.0.linux-amd64.tar.gz
```

**2.2 Extract Files**: Unpack the archive using Ubuntu’s archiving tool.

```sh
tar json_exporter-0.7.0.linux-amd64.tar.gz
```

:::info

The `tar` command extracts `x` the uncompressed `z` archive from the file path `f` using verbose `v` status messages.

:::

**2.3 Move Binary to System Path**: Move the JSON Exporter binary to your system path.

```sh
sudo cp json_exporter-0.7.0.linux-amd64/json_exporter /usr/local/bin/
```

**2.4 Assign Permissions**: Set the correct owner and access rights.

```sh
sudo chown json-exporter-worker:json-exporter-worker /usr/local/bin/json_exporter
sudo chmod 755 /usr/local/bin/json_exporter
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
rm -rf json_exporter-0.7.0.linux-amd64
rm json_exporter-0.7.0.linux-amd64.tar.gz
```

## 3. Price Configuration

Create a configuration file that will be used for the API call to fetch the current LYX price.

**3.1 Create Config Directory and File**: Choose a separate folder and create a config file using your preferred text editor.

```sh
sudo mkdir /etc/json_exporter/
```

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/json_exporter/json_exporter.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
sudo nano /etc/json_exporter/json_exporter.yaml
```

</TabItem>
</Tabs>

**3.2 Paste Configuration**: Add the CoinGecko API configuration structure.

<Tabs groupId="currency">
  <TabItem value="euro" label="EUR" default>

```text
modules:
  default:
    metrics:
    - name: lyxeur
      path: "{.lukso-token.eur}"
      help: LUKSO (LYX) Price in EUR
```

</TabItem> <TabItem value="usd" label="USD">

```text
modules:
  default:
    metrics:
    - name: lyxusd
      path: "{.lukso-token.usd}"
      help: LUKSO (LYX) Price in USD
```

</TabItem>
</Tabs>

:::warning

Ensure the correct formatting of double-spaces for the correct use of the API calls.

:::

**3.3 Restrict Permissions**: Change the ownership of the configuration file to the service user.

```sh
sudo chown -R json-exporter-worker:json-exporter-worker /etc/json_exporter/
```

## 4. Service Configuration

Once the binary and API files are in place, we can create a service configuration for the exporter, so it automatically starts during boot and restarts during crashes. The configuration will also check for logging before it starts up and uses the previously created user.

**4.1 Create Service File**: Create a system service file using your preferred text editor.

<Tabs groupId="editor">
<TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/systemd/system/json_exporter.service
```

</TabItem>
<TabItem value="nano" label="Nano">

```sh
sudo nano /etc/systemd/system/json_exporter.service
```

</TabItem>
</Tabs>

**4.2 Add Configuration**: Paste the following content using your preferred logging tool, then save and exit the file.

<Tabs groupId="logging-tool">
<TabItem value="journal" label="Journal Logging" default>

```text
[Unit]
Description=JSON Exporter
Documentation=https://github.com/prometheus-community/json_exporter
After=network.target network-online.target

[Service]
User=json-exporter-worker
Group=json-exporter-worker
Type=simple
ExecStart=/usr/local/bin/json_exporter --config.file /etc/json_exporter/json_exporter.yaml
Restart=always
RestartSec=5
SyslogIdentifier=json_exporter
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
Description=JSON Exporter
Documentation=https://github.com/prometheus-community/json_exporter
After=network.target network-online.target

[Service]
User=json-exporter-worker
Group=json-exporter-worker
Type=simple
ExecStart=/usr/local/bin/json_exporter --config.file /etc/json_exporter/json_exporter.yaml
Restart=always
RestartSec=5
SyslogIdentifier=json_exporter
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
| `User`             | Executes the service as the `json-exporter-worker` user.                                                                                                                          |
| `Group`            | Executes the service under the `json-exporter-worker` group.                                                                                                                      |
| `Type`             | Indicates running at a `simple` service in the foreground without forking into a daemon process.                                                                                  |
| `ExecStart`        | Link to binary at `/usr/local/bin/json_exporter`, started with the terminal command.                                                                                              |
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

## 5. Start the Exporter Service

After setting up the service, you can enable and start the systemd service.

**5.1 Reload Daemon**: Reload the system daemon to include the new service.

```sh
sudo systemctl daemon-reload
```

**5.2 Start Service**: Start the Node Exporter service using the system control.

```sh
sudo systemctl start json_exporter
```

**5.3 Enable Autostart on Boot**: Enable the service to start automatically during boot.

```sh
sudo systemctl enable json_exporter
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/multi-user.target.wants/json_exporter.service → /etc/systemd/system/json_exporter.service.
```

## 6. Check Service Status

You can fetch the current status from the system control to check if the JSON Exporter service is running and configured correctly. The command will display whether it is active, enabled, or disabled and show recent log entries.

```sh
sudo systemctl status json_exporter
```

The output should look similar to this:

```text
● json_exporter.service - JSON Exporter
     Loaded: loaded (/etc/systemd/system/json_exporter.service; enabled; vendor preset: enab>
     Active: active (running) since [DATE]; [TIME] ago
       Docs: https://github.com/prometheus-community/json_exporter
   Main PID: 88174 (json_exporter)
      Tasks: 14 (limit: 38043)
     Memory: 7.6M
        CPU: 139ms
     CGroup: /system.slice/json_exporter.service
             └─88174 /usr/local/bin/json_exporter --config.file /etc/json_exporter/json_expo>

[DATE] [TIME] [USER] json_exporter[88174]: net/http.HandlerFunc.ServeHTTP(0xc00002408>...
```

## Maintenance

Proper maintenance ensures that all the components are working as intended and can be updated on the fly.

**Logging**: Check the latest status of the system service.

<Tabs groupId="logging-tool">
<TabItem value="journal" label="Journal Logging" default>

```sh
sudo journalctl -f -u json_exporter
```

</TabItem>
<TabItem value="system" label="System Logging">

```sh
sudo tail -f /var/log/syslog | grep json_exporter
```

</TabItem>
</Tabs>

**Restarting**: If you made any changes or updates to configuration, reload the system daemon and start the exporter.

```sh
sudo systemctl daemon-reload
sudo systemctl restart json_exporter
```

**Stopping**: You can stop the exporter using the system control.

```sh
sudo systemctl stop json_exporter
```

:::tip

Further information about system control or logging can be found on the [**Utility Tools**](/docs/theory/node-operation/utility-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

## Revert Setup

If something went wrong, you can remove the user or delete the service and related files all together.

**1. Stop and Disable the Service**: Stop the tool and remove it's service link from the system's boot.

```sh
sudo systemctl stop json_exporter
sudo systemctl disable json_exporter
```

**2. Remove the Service and Config Files**: Delete the configurations and reload the system daemon.

```sh
sudo rm /etc/systemd/system/json_exporter.service
sudo rm -rf /etc/json_exporter
sudo systemctl daemon-reload
```

**3. Delete Binary**: Remove the executable JSON Exporter from your system.

```sh
sudo rm -rf /usr/local/bin/json_exporter
```

**4. Remove User and Group**: Prune the user and all it's cached configurations.

```sh
sudo deluser --remove-all-files json-exporter-worker
sudo delgroup json-exporter-worker
```

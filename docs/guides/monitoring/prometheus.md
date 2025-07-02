---
sidebar_label: "8.6 Prometheus"
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 8.6 Prometheus

Prometheus is a time-series database and monitoring system that collects, stores, and queries metrics from various sources like our previously set up [Node Exporter](/docs/guides/monitoring/node-exporter.md), [JSON Exporter](/docs/guides/monitoring/json-exporter.md), and [Blackbox Exporter](/docs/guides/monitoring/blackbox-exporter.md). The guide explains how to set up the local Prometheus server and it's configuration to gather and unify all those metrics.

:::tip

Further details about node analytics can be found on the [**Monitoring Tools**](/docs/theory/node-operation/monitoring-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Create System User

Running services as a system user with minimal privileges is a best practice, limiting damage if compromised. The Blackbox Exporter user will only be able to read and execute service-specific files. Use the system's user creation tool to add a new one.

```sh
sudo adduser --system prometheus-worker --group --no-create-home
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
grep "prometheus-worker" /etc/passwd
```

The output should look similar to this:

```text
prometheus-worker:x:117:123::/home/prometheus-worker:/usr/sbin/nologin
```

## 2. Install Prometeus

To add the Prometheus tool to your node, you have to install it's package.

:::tip

Depending on the [Current Prometheus Release](https://github.com/prometheus/prometheus/releases/) the version and filenames might differ. Please ensure to use the latest **LTS Release** for best security and stability. As of **July 2025** it is version **2.53.5**. A full list of versions and categorized releases can be viewed on the official [Prometheus Download Page](https://prometheus.io/download/).

:::

**2.1 Download Archive**: Move to the home directory and download the latest version.

```sh
cd
wget https://github.com/prometheus/prometheus/releases/download/v2.53.5/prometheus-2.53.5.linux-amd64.tar.gz
```

**2.2 Extract Files**: Unpack the archive using Ubuntu’s archiving tool.

```sh
tar xzfv prometheus-2.53.5.linux-amd64.tar.gz
```

:::info

The `tar` command extracts `x` the uncompressed `z` archive from the file path `f` using verbose `v` status messages.

:::

**2.3 Navigate into the Folder**: Move into the extracted archive to view the executables.

```sh
sudo cd prometheus-2.53.5.linux-amd64
```

:::info

You will see **Promtool** and **Prometheus** showing up as executable programs that will both have to be installed.

| Tool         | Description                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| `prometheus` | The main Prometheus server that scrapes and stores metrics, and exposes it's database for querying.    |
| `promtool`   | The utility tool used for validating, and debugging Prometheus configuration files and alerting rules. |

:::

**2.4 Move Binary to System Path**: Move the Promtool and Prometheus binaries to your system path.

```sh
sudo cp prometheus /usr/local/bin/
sudo cp promtool /usr/local/bin/
```

**2.5 Set Ownership and Permissions**: Set the correct owner and access rights.

```sh
sudo chown -R prometheus-worker:prometheus-worker /usr/local/bin/prometheus
sudo chown -R prometheus-worker:prometheus-worker /usr/local/bin/promtool
sudo chmod 755 /usr/local/bin/prometheus
sudo chmod 755 /usr/local/bin/promtool
```

<details>
  <summary>Full Command Descriptions</summary>

| **Setting**                                           | **Description**                                                     |
| ----------------------------------------------------- | ------------------------------------------------------------------- |
| <nobr> `sudo chown <user>:<user> <directory>` </nobr> | Assign ownership to a single folder or file.                        |
| <nobr> `sudo chmod 755 <directory>` </nobr>           | Set readable permissions for everyone, typically for general files. |

</details>

**2.6 Cleanup Installation Files**: Delete leftover archive and extracted folder.

```sh
rm -rf prometheus-2.53.5.linux-amd64
rm prometheus-2.53.5.linux-amd64.tar.gz
```

## 3. Dataset Configuration

After the executables have been set up, you must create a separate configuration file for the Prometheus server to collect all of the exporter's information, and specify where to scrape, how often to scrape, and how what to do with the data.

**3.1 Create Necessary Directories**: Create all folders to exclude permission errors during operation.

```sh
sudo mkdir -p /etc/prometheus/console_libraries /etc/prometheus/consoles /etc/prometheus/files_sd /etc/prometheus/rules /etc/prometheus/rules.d /var/lib/prometheus
```

:::tip

If folders already exist, they remain untouched. Otherwise, an empty folder will be created.

:::

<details>
  <summary>Full Folder Descriptions</summary>

| Path                                | Purpose                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `/etc/prometheus/console_libraries` | Shared library snippets used by console dashboards.                       |
| `/etc/prometheus/consoles`          | Web UI dashboard templates rendered on the Prometheus server.             |
| `/etc/prometheus/files_sd`          | File-based discovery configs for port metrics.                            |
| `/etc/prometheus/rules`             | Custom alerting and recording rule files.                                 |
| `/etc/prometheus/rules.d`           | Subdirectory for service rules like the validator, node, and ping checks. |
| `/var/lib/prometheus`               | Storage folder for all collected metrics.                                 |

</details>

**3.2 Create Config File**: Create a Prometheus configuration using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/prometheus/prometheus.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
sudo nano /etc/prometheus/prometheus.yaml
```

</TabItem>
</Tabs>

**3.3 Paste Configuration**: Add the settings and exporter jobs to the configuration structure based on your client and currency.

:::tip

All properties will later on be used within the Grafana Dashboard to fetch the token prices and build metrics based on your node. The Prometheus data endpoints include the following sources:

- **Prometheus**: Compiling All Data Sources and Database Storage
- **Consensus Client**: Validator Count, Uptime, Connection, Participation Rate
- **Node Exporter**: Storage Demand, Processor Utilization, Heat Distribution, Disk Utilization
- **Blackbox Exporter**: Google and Cloudflare Pings, Latency Checks, Network Uptime
- **JSON Exporter**: Daily and Weekly Income, Staking Position, Market Behaviour
- **Validator Client**: Attestations and Proposals

:::

<Tabs groupId="currency">
  <TabItem value="euro" label="EUR" default>

<Tabs groupId="client">
<TabItem value="teku-nimbus" label="Teku & Nimbus-Eth2">

```text
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9090']
  - job_name: 'consensus-validator-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:8008']
  - job_name: 'node-exporter-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9100']
  - job_name: 'google-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 8.8.8.8
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'cloudflare-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 1.1.1.1
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'json-exporter-job'
    static_configs:
    - targets:
      - 127.0.0.1:7979
  - job_name: 'json'
    metrics_path: /probe
    static_configs:
    - targets:
      - https://api.coingecko.com/api/v3/simple/price?ids=lukso-token&vs_currencies=eur
    relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      replacement: 127.0.0.1:7979
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

```text
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9090']
  - job_name: 'consensus-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:5054']
  - job_name: 'node-exporter-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9100']
  - job_name: 'validator-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:5064']
  - job_name: 'google-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 8.8.8.8
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'cloudflare-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 1.1.1.1
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'json-exporter-job'
    static_configs:
    - targets:
      - 127.0.0.1:7979
  - job_name: 'json'
    metrics_path: /probe
    static_configs:
    - targets:
      - https://api.coingecko.com/api/v3/simple/price?ids=lukso-token&vs_currencies=eur
    relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      replacement: 127.0.0.1:7979
```

</TabItem> <TabItem value="prysm" label="Prysm">

```text
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9090']
  - job_name: 'consensus-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:8080']
  - job_name: 'node-exporter-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9100']
  - job_name: 'validator-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:8081']
  - job_name: 'google-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 8.8.8.8
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'cloudflare-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 1.1.1.1
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'json-exporter-job'
    static_configs:
    - targets:
      - 127.0.0.1:7979
  - job_name: 'json'
    metrics_path: /probe
    static_configs:
    - targets:
      - https://api.coingecko.com/api/v3/simple/price?ids=lukso-token&vs_currencies=eur
    relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      replacement: 127.0.0.1:7979
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="usd" label="USD">

<Tabs groupId="client">
<TabItem value="teku-nimbus" label="Teku & Nimbus-Eth2">

```text
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9090']
  - job_name: 'consensus-validator-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:8008']
  - job_name: 'node-exporter-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9100']
  - job_name: 'google-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 8.8.8.8
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'cloudflare-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 1.1.1.1
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'json-exporter-job'
    static_configs:
    - targets:
      - 127.0.0.1:7979
  - job_name: 'json'
    metrics_path: /probe
    static_configs:
    - targets:
      - https://api.coingecko.com/api/v3/simple/price?ids=lukso-token&vs_currencies=usd
    relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      replacement: 127.0.0.1:7979
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

```text
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9090']
  - job_name: 'consensus-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:5054']
  - job_name: 'node-exporter-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9100']
  - job_name: 'validator-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:5064']
  - job_name: 'google-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 8.8.8.8
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'cloudflare-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 1.1.1.1
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'json-exporter-job'
    static_configs:
    - targets:
      - 127.0.0.1:7979
  - job_name: 'json'
    metrics_path: /probe
    static_configs:
    - targets:
      - https://api.coingecko.com/api/v3/simple/price?ids=lukso-token&vs_currencies=usd
    relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      replacement: 127.0.0.1:7979
```

</TabItem> <TabItem value="prysm" label="Prysm">

```text
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9090']
  - job_name: 'consensus-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:8080']
  - job_name: 'node-exporter-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9100']
  - job_name: 'validator-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:8081']
  - job_name: 'google-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 8.8.8.8
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'cloudflare-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 1.1.1.1
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'json-exporter-job'
    static_configs:
    - targets:
      - 127.0.0.1:7979
  - job_name: 'json'
    metrics_path: /probe
    static_configs:
    - targets:
      - https://api.coingecko.com/api/v3/simple/price?ids=lukso-token&vs_currencies=usd
    relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      replacement: 127.0.0.1:7979
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

:::tip

**Teku** and **Nimbus-Eth2** expose the consensus and validator data through one single port. Therefore their Prometheus configuration combines both, the `consensus-client-job` and the `validator-client-job` into a single job.

:::

<details>
  <summary>Global Settings and Scrape Parameter Descriptions</summary>

| Setting               | Description                                                                     |
| --------------------- | ------------------------------------------------------------------------------- |
| `scrape_interval`     | How often Prometheus collects data from all targets, usually every `15s`.       |
| `evaluation_interval` | How often recording or alerting rules are evaluated, usually every `15s`.       |
| `job_name`            | Identifier for each target group that listens to a local port.                  |
| `metrics_path`        | Path where metrics are exposed, usually `/metrics` or `/probe`.                 |
| `params`              | Used in Blackbox or JSON Exporter to pass query strings or URLs                 |
| `static_configs`      | List of targets to scrape, like the `host:port` of each service.                |
| `relabel_configs`     | Modified target labels, that map addresses to Blackbox or set an instance name. |

</details>

<details>
  <summary>Full Prometheus Job Descriptions</summary>

| Job Name                         | Description                                                               |
| -------------------------------- | ------------------------------------------------------------------------- |
| `prometheus-job`                 | Scrapes internal metrics from the Prometheus server itself.               |
| `consensus-client-job`           | Collects blockchain metrics from the consensus client.                    |
| `validator-client-job`           | Pulls activity and performance data from the validator client.            |
| `consensus-validator-client-job` | Collects blockchain metrics from the consensus and validator client.      |
| `node-exporter-job`              | Gathers hardware and OS metrics from the node using Node Exporter.        |
| `google-ping-job`                | Uses Blackbox Exporter to probe Google DNS.                               |
| `cloudflare-ping-job`            | Uses Blackbox Exporter to probe Cloudflare DNS.                           |
| `json-exporter-job`              | Gathers staking metrics and API data from the JSON Exporter.              |
| `json`                           | Sends requests to CoinGecko API through JSON Exporter for LYX price data. |

</details>

:::warning

Ensure the correct formatting of double-spaces so that the Prometheus server functions correctly.

:::

**3.4 Restrict Permissions**: Change the ownership and restrict execution within configuration folders to the service user.

```sh
# Prometheus Configuration, Files, Logging
sudo chown -R prometheus-worker:prometheus-worker /etc/prometheus

# Prometheus Database
sudo chown -R prometheus-worker:prometheus-worker /var/lib/prometheus
sudo chmod 755 /var/lib/prometheus
```

## 4. Service Configuration

Once the binary and ping files are in place, we can create a service configuration for the exporter, so it automatically starts during boot and restarts during crashes. The configuration will also check for logging and an internet connection before it starts up and uses the previously created user.

**4.1 Create Service File**: Create a system service file using your preferred text editor.

<Tabs groupId="editor">
<TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/systemd/system/prometheus.service
```

</TabItem>
<TabItem value="nano" label="Nano">

```sh
sudo nano /etc/systemd/system/prometheus.service
```

</TabItem>
</Tabs>

**4.2 Add Configuration**: Paste the following content using your preferred logging tool, then save and exit the file.

<Tabs groupId="logging-tool">
<TabItem value="journal" label="Journal Logging" default>

```text
[Unit]
Description=Prometheus
Documentation=https://github.com/prometheus/prometheus
Wants=network-online.target
After=network.target network-online.target

[Service]
User=prometheus-worker
Group=prometheus-worker
Type=simple
ExecStart=/usr/local/bin/prometheus                               \
    --config.file /etc/prometheus/prometheus.yaml                 \
    --storage.tsdb.path /var/lib/prometheus/                      \
    --storage.tsdb.retention.time=31d                             \
    --web.console.templates=/etc/prometheus/consoles              \
    --web.console.libraries=/etc/prometheus/console_libraries
ExecReload=/bin/kill -HUP $MAINPIDRestart=always
RestartSec=5
SyslogIdentifier=prometheus
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
Description=Prometheus
Documentation=https://github.com/prometheus/prometheus
Wants=network-online.target
After=network.target network-online.target

[Service]
User=prometheus-worker
Group=prometheus-worker
Type=simple
ExecStart=/usr/local/bin/prometheus                               \
    --config.file /etc/prometheus/prometheus.yaml                 \
    --storage.tsdb.path /var/lib/prometheus/                      \
    --storage.tsdb.retention.time=31d                             \
    --web.console.templates=/etc/prometheus/consoles              \
    --web.console.libraries=/etc/prometheus/console_libraries
ExecReload=/bin/kill -HUP $MAINPIDRestart=always
RestartSec=5
SyslogIdentifier=prometheus
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
| `Wants`            | The service should try to start `network-online.target` before starting Prometheus.                                                                                               |
| `After`            | - `network.target`: Ensures networking setup enabled before service is started. <br /> - `network-online.target`: Waits for network to be fully online before service is started. |
| `User`             | Executes the service as the `json-exporter-worker` user.                                                                                                                          |
| `Group`            | Executes the service under the `json-exporter-worker` group.                                                                                                                      |
| `Type`             | Indicates running at a `simple` service in the foreground without forking into a daemon process.                                                                                  |
| `ExecStart`        | - Link to binary at `/usr/local/bin/prometheus`, started with the terminal command.                                                                                               |
| `ExecReload`       | Sends a `kill` signal to the main process to restart and re-read all configuration files.                                                                                         |
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

## 5. Start the Prometheus Service

After setting up the service, you can enable and start the systemd service.

**5.1 Reload Daemon**: Reload the system daemon to include the new service.

```sh
sudo systemctl daemon-reload
```

**5.2 Start Service**: Start the Prometheus service using the system control.

```sh
sudo systemctl start prometheus
```

**5.3 Enable Autostart on Boot**: Enable the service to start automatically during boot.

```sh
sudo systemctl enable prometheus
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/multi-user.target.wants/prometheus.service → /etc/systemd/system/prometheus.service.
```

## 6. Check Service Status

You can fetch the current status from the system control to check if the Prometheus service is running and configured correctly. The command will display whether it is active, enabled, or disabled and show recent log entries.

```sh
sudo systemctl status prometheus
```

The output should look similar to this:

```text
● prometheus.service - Prometheus
     Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
     Active: active (running) since [DATE] UTC; [TIME] ago
       Docs: https://github.com/prometheus/prometheus
   Main PID: 29468 (prometheus)
      Tasks: 17 (limit: 38043)
     Memory: 27.4M
        CPU: 293ms
     CGroup: /system.slice/prometheus.service
             └─29468 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yaml --storage.ts>

[DATE] [TIME] [USER] prometheus[29468]: ts=2023-05-18T09:43:54.539Z caller=head.go:536 level=info > ...
...
```

## Maintenance

Proper maintenance ensures that all the components are working as intended and can be updated on the fly.

Proper maintenance ensures that all the components are working as intended and can be updated on the fly.

**Logging**: Check the latest status of the system service.

<Tabs groupId="logging-tool">
<TabItem value="journal" label="Journal Logging" default>

```sh
sudo journalctl -f -u prometheus
```

</TabItem>
<TabItem value="system" label="System Logging">

```sh
sudo tail -f /var/log/syslog | grep prometheus
```

</TabItem>
</Tabs>

**Restarting**: If you made any changes or updates to configuration, reload the system daemon and start the exporter.

```sh
sudo systemctl daemon-reload
sudo systemctl restart prometheus
```

**Stopping**: You can stop the exporter using the system control.

```sh
sudo systemctl stop prometheus
```

:::tip

Further information about system control or logging can be found on the [**Utility Tools**](/docs/theory/node-operation/utility-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

## Revert Setup

If something went wrong, you can remove the user or delete the service and related files all together.

**1. Stop and Disable Service**: Stop the tool and remove it's service link from the system's boot.

```sh
sudo systemctl stop prometheus
sudo systemctl disable prometheus
```

**2. Change Binary Ownership**: Change the owner of the Prometheus and Promtool executables.

```sh
sudo chown -R root:root /usr/local/bin/prometheus
sudo chown -R root:root /usr/local/bin/promtool
```

**3. Change Folder Ownership**: Change the owner of the configuration and database folers.

```sh
sudo chown -R root:root /etc/prometheus
sudo chown -R root:root /var/lib/prometheus
```

**4. Remove the Service and Config Files**: Delete all service files and reload the system daemon.

```sh
sudo rm /etc/systemd/system/prometheus.service
sudo rm -rf /etc/prometheus
sudo rm -rf /var/lib/prometheus/
sudo systemctl daemon-reload
```

**5. Delete Binary**: Remove the executable Prometheus and Promtool from your system.

```sh
sudo rm -rf /usr/local/bin/prometheus
sudo rm -rf /usr/local/bin/promtool
```

**6. Remove User and Group**: Prune the user and all it's cached configurations.

```sh
sudo deluser --remove-all-files prometheus-worker
sudo delgroup prometheus-worker
```

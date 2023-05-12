# 7. Node Monitoring

Local node monitoring is the process of observing and tracking the performance, health, and status of a blockchain validator node within a network. This monitoring ensures that the validator node is functioning correctly, efficiently, and securely. By regularly gathering and analyzing key performance metrics, such as CPU usage, memory consumption, disk space, network latency, and the number of connected peers, local node monitoring helps identify potential issues and bottlenecks, enabling prompt corrective actions. Additionally, monitoring the validator's activity, such as the number of proposed and validated blocks, can provide insights into the overall performance and contribution of the node to the blockchain network.

## 7.1 Install Core Tools for Monitoring

As effective node monitoring is essential for maintaining a reliable and secure distributed ledger and fostering trust within the blockchain ecosystem, we follow up with installing three core packages needed to download and execute such software:

- **wget**: Utility for non-interactive download of files from the Web. It supports HTTP, HTTPS, and FTP protocols, as well as retrieval through HTTP proxies. It's particularly useful for downloading files from the command line, automating downloads, or when a graphical user interface is not available, like on our server installation.
- **make**: Build automation tool that automatically builds executable programs and libraries from source code by reading files called Makefiles, which specify how to derive the target program. It's widely used in software development for compiling and linking source code files.
- **git**: Distributed version control system for tracking changes in source code during software development, allowing developers to collaborate, clone and manage software projects effectively. It will help us downloading code repositories.

```sh
sudo apt install wget make git
```

TODO:

## Monitoring

Sets up a dashboard to monitor state of a node machine, node, and validators.

> **_NOTE:_** Following steps are performed on personal machine.

Access a remote node machine

```shell=
ssh lukso
```

## Monitoring Port Setup

| CLIENT     | DESCRIPTION       | TCP PORT     |
| ---------- | ----------------- | ------------ |
| LIGHTHOUSE | Prometheus        | 9090         |
| LIGHTHOUSE | Grafana           | not built-in |
| LIGHTHOUSE | Ethereum JSON-RPC | 8545         |
| PRYSM      | Prometheus        | 9090         |
| PRYSM      | Grafana           | 8080         |
| PRYSM      | Ethereum JSON-RPC | 8545         |

### Prometheus

```shell=
sudo adduser --system prometheus --group --no-create-home
```

Identify latest version for `linux-amd64` [here](https://prometheus.io/download/), e.g. `2.34.0`. Install prometheus by replacing `{VERSION}` in the following:

```shell=
cd
wget https://github.com/prometheus/prometheus/releases/download/v{VERSION}/prometheus-{VERSION}.linux-amd64.tar.gz
tar xzvf prometheus-{VERSION}.linux-amd64.tar.gz
cd prometheus-{VERSION}.linux-amd64
sudo cp promtool /usr/local/bin/
sudo cp prometheus /usr/local/bin/
sudo chown root:root /usr/local/bin/promtool /usr/local/bin/prometheus
sudo chmod 755 /usr/local/bin/promtool /usr/local/bin/prometheus
cd
rm prometheus-{VERSION}.linux-amd64.tar.gz
rm -rf prometheus-{VERSION}.linux-amd64
```

#### Configure

```shell=
sudo mkdir -p /etc/prometheus/console_libraries /etc/prometheus/consoles /etc/prometheus/files_sd /etc/prometheus/rules /etc/prometheus/rules.d
```

Edit configuration file:

```shell=
sudo vim /etc/prometheus/prometheus.yml
```

The content of configuration file:

```
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9090']
  - job_name: 'beacon node'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:8080']
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9100']
  - job_name: 'validator'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:8081']
  - job_name: 'ping_google'
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
  - job_name: 'ping_cloudflare'
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
  - job_name: json_exporter
    static_configs:
    - targets:
      - 127.0.0.1:7979
  - job_name: json
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

Prepare data directory for prometheus:

```shell=
sudo chown -R prometheus:prometheus /etc/prometheus
sudo mkdir /var/lib/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
sudo chmod 755 /var/lib/prometheus
```

Open port to access to metrics. This is optional, only for external use:

```shell=
sudo ufw allow 9090/tcp
```

#### Configure Service

```shell=
sudo vim /etc/systemd/system/prometheus.service
```

The content of service configuration file:

```
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
Restart=always
RestartSec=5
ExecStart=/usr/local/bin/prometheus \
	--config.file /etc/prometheus/prometheus.yml \
	--storage.tsdb.path /var/lib/prometheus/ \
	--storage.tsdb.retention.time=31d \
	--web.console.templates=/etc/prometheus/consoles \
	--web.console.libraries=/etc/prometheus/console_libraries
ExecReload=/bin/kill -HUP $MAINPID

[Install]
WantedBy=multi-user.target
```

Enable service:

```shell=
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
```

### Grafana

Install:

```shell=
cd
sudo apt-get install -y apt-transport-https
sudo apt-get install -y software-properties-common wget
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
sudo apt-get update
sudo apt-get install grafana-enterprise
```

#### Configure Service

```shell=
sudo vim /lib/systemd/system/grafana-server.service
```

The content of service configuration file:

```
[Unit]
Description=Grafana instance
Documentation=http://docs.grafana.org
Wants=network-online.target
After=network-online.target
After=postgresql.service mariadb.service mysql.service

[Service]
EnvironmentFile=/etc/default/grafana-server
User=grafana
Group=grafana
Type=simple
Restart=on-failure
WorkingDirectory=/usr/share/grafana
RuntimeDirectory=grafana
RuntimeDirectoryMode=0750
ExecStart=/usr/sbin/grafana-server \
                            --config=${CONF_FILE} \
                            --pidfile=${PID_FILE_DIR}/grafana-server.pid \
                            --packaging=deb \
                            cfg:default.paths.logs=${LOG_DIR} \
                            cfg:default.paths.data=${DATA_DIR} \
                            cfg:default.paths.plugins=${PLUGINS_DIR} \
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
PrivateUsers=true
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

[Install]
Alias=grafana.service
WantedBy=multi-user.target
```

Enable service:

```shell=
sudo systemctl daemon-reload
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```

Open port to access to metrics. This is optional, only for external use:

```shell=
sudo ufw allow 3000/tcp
```

#### Configure Dashboard

Login to grafana by navigating to webrowser `http://192.168.86.29:3000`. Replace `192.168.86.29` with IP of your node machine. This is same IP used to ssh.

Default credentials are username and password `admin`. Set a new secure (long) password when prompted by grafana.

##### Data Source

1. On the left-hand menu, hover over the gear menu and click on `Data Sources`
2. Then click on the Add Data Source button
3. Hover over the Prometheus card on screen, then click on the Select button
4. Enter http://127.0.0.1:9090/ into the URL field, then click Save & Test

##### Install Dashboard

1. Hover over the plus symbol icon in the left-hand menu, then click on Import
2. Copy and paste [the dashboard](/grafana/dashboard.json) into the `Import via panel json` text box on the screen
3. Then click the Load button
4. Then click the Import button

##### Enable Alerts

1. On the left-hand menu, hover over the alarm menue and click on `Notification channels`
2. Click on `New channel`
3. Select `Type` and [configure](https://grafana.com/docs/grafana/latest/alerting/old-alerting/notifications/)

On lukso dashboard:

1. Scroll down on a dashboard to `Alerts` section
2. Select each alert and click `Edit`
3. In `Alert` tab, select notifications `send to`
4. Save and repeat for each alert

### Node Exporter

Monitors node stats:

```shell=
sudo adduser --system node_exporter --group --no-create-home
```

Install:

```shell=
cd
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz
tar xzvf node_exporter-1.0.1.linux-amd64.tar.gz
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin/
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter
rm node_exporter-1.0.1.linux-amd64.tar.gz
rm -rf node_exporter-1.0.1.linux-amd64
```

#### Configure Service

```shell=
sudo vim /etc/systemd/system/node_exporter.service
```

The content of service configuration file:

```
[Unit]
Description=Node Exporter

[Service]
Type=simple
Restart=always
RestartSec=5
User=node_exporter
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
```

Enable service:

```shell=
sudo systemctl daemon-reload
sudo systemctl start node_exporter
sudo systemctl enable node_exporter
```

### Json Exporter

#### Prerequisites

Check `go` version if installed:

```shell=
go version
```

If it is less than `1.17.7` please install following:

```shell=
wget https://dl.google.com/go/go1.17.7.linux-amd64.tar.gz
sudo tar -xvf go1.17.7.linux-amd64.tar.gz
rm go1.17.7.linux-amd64.tar.gz
sudo mv go /usr/local/go-1.17.7
sudo ln -sf /usr/local/go-1.17.7/bin/go /usr/bin/go
go version
```

#### Build and Install

User:

```shell=
sudo adduser --system json_exporter --group --no-create-home
```

Install:

```shell=
cd
git clone https://github.com/prometheus-community/json_exporter.git
cd json_exporter
make build
sudo cp json_exporter /usr/local/bin/
sudo chown json_exporter:json_exporter /usr/local/bin/json_exporter
cd
rm -rf json_exporter
```

#### Configure

```shell=
sudo mkdir /etc/json_exporter
sudo chown json_exporter:json_exporter /etc/json_exporter
```

Setup `LYX` token price:

```shell=
sudo vim /etc/json_exporter/json_exporter.yml
```

The content of configuration file:

```
metrics:
- name: lyxusd
  path: "{.lukso-token.usd}"
  help: Lukso (LYX) price in USD
```

Change ownership of configuration file:

```shell=
sudo chown json_exporter:json_exporter /etc/json_exporter/json_exporter.yml
```

#### Configure Service

```shell=
sudo vim /etc/systemd/system/json_exporter.service
```

The content of service configuration file:

```
[Unit]
Description=JSON Exporter

[Service]
Type=simple
Restart=always
RestartSec=5
User=json_exporter
ExecStart=/usr/local/bin/json_exporter --config.file /etc/json_exporter/json_exporter.yml

[Install]
WantedBy=multi-user.target
```

Enable service:

```shell=
sudo systemctl daemon-reload
sudo systemctl start json_exporter
sudo systemctl enable json_exporter
```

### Ping

Pings google and cloudflare to track latency. This is optional.

```shell=
sudo adduser --system blackbox_exporter --group --no-create-home
```

Install:

```shell=
cd
wget https://github.com/prometheus/blackbox_exporter/releases/download/v0.18.0/blackbox_exporter-0.18.0.linux-amd64.tar.gz
tar xvzf blackbox_exporter-0.18.0.linux-amd64.tar.gz
sudo cp blackbox_exporter-0.18.0.linux-amd64/blackbox_exporter /usr/local/bin/
sudo chown blackbox_exporter:blackbox_exporter /usr/local/bin/blackbox_exporter
sudo chmod 755 /usr/local/bin/blackbox_exporter
rm blackbox_exporter-0.18.0.linux-amd64.tar.gz
rm -rf blackbox_exporter-0.18.0.linux-amd64
```

Enable ping permissions:

```shell=
sudo setcap cap_net_raw+ep /usr/local/bin/blackbox_exporter
```

#### Configure

```shell=
sudo mkdir /etc/blackbox_exporter
sudo chown blackbox_exporter:blackbox_exporter /etc/blackbox_exporter
```

```shell=
sudo vim /etc/blackbox_exporter/blackbox.yml
```

The content of configuration file:

```
modules:
        icmp:
                prober: icmp
                timeout: 10s
                icmp:
                        preferred_ip_protocol: ipv4
```

Change ownership of configuration file:

```shell=
sudo chown blackbox_exporter:blackbox_exporter /etc/blackbox_exporter/blackbox.yml
```

#### Configure Service

```shell=
sudo vim /etc/systemd/system/blackbox_exporter.service
```

The content of service configuration file:

```
[Unit]
Description=Blackbox Exporter

[Service]
Type=simple
Restart=always
RestartSec=5
User=blackbox_exporter
ExecStart=/usr/local/bin/blackbox_exporter --config.file /etc/blackbox_exporter/blackbox.yml

[Install]
WantedBy=multi-user.target
```

Enable service:

```shell=
sudo systemctl daemon-reload
sudo systemctl start blackbox_exporter
sudo systemctl enable blackbox_exporter
```

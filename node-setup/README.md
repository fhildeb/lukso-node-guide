# EVM Validator Node

This section provides a guide to setting up a LUKSO or other validator node in the home environment. It's recommended to choose a dedicated machine to run a node.

## 1.1 Operating System Download

> You need a USB device with at least 2GB

1. Download [Ubuntu 22.04.2 Server](https://ubuntu.com/download/server)
2. Create a Bootable USB Drive
   - Windows: [Rufus Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-overview)
   - Linux: [Disk Creator Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-ubuntu#1-overview)
   - MacOS: [Etcher Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-macos#1-overview)
3. Disconnect the USB Drive

## 1.2 Hardware Setup

> I chose an expensive and professional setup because I plan to use the slasher functionality and run multiple networks from one node, partly via docker images on top of the LUKSO CLI. Please understand that this is not mandatory. The minimum requirements to run a LUKSO node can be read in the network section of the [official documentation](https://docs.lukso.tech/networks/).

- Ubuntu 22.04.2 Server
- Barebone Intel NUC 10 (NUC10i7FNHN)
  - **Processor**: Intel Core i7-10710U (4.7 GHz, 6 Cores, 12 Threads)
  - **Housing**: Akasa Turing FX for Intel NUC 10 (A-NUC52-M1B)
  - **RAM**: Crucial 32GB DDR4 Kit (2x16GB, 2666MHz, CT2K16G4SFRA266)
  - **Storage**: Samsung 970 EVO Plus M.2 NVMe SSD 2TB (PCIe 3.0, 3.500 MB/s Read, 3.300 MB/s Write, MZ-V7S2T0BW)

I spent around 1100 €. The current prices should be below that at best. I assembled the node myself because I wanted to run a fanless machine. The bespoke housing improves the temperatures and reduces noise. It also eliminates the maintenance of moving parts.

Note that you also need thermal paste and screwdrivers and might want to add WiFi antennas immediately if the machine is planned to serve as a home server. It's only about 10 €, but you will save yourself a ton of work re-assembling the whole setup as they sit right behind the motherboard. The antennas can then be unscrewed from their attached base and do not bother your server setup.

The memory may not be sufficient for future-proof use of the node over several years or by several chains. Here, the freezer functionality of Geth comes into play to split the network data on different disks. I plan to expand my storage and add a 4 TB 2.5" HDD to fit the housing. Therefore, make sure to keep all the accessories and frames.

I set up my machine on a small home rack and connected my node to an 8-port switch connected to my router. Not being directly connected to the router not only allows more slots but also allows me to place and connect servers and PCs in separate rooms.

### Optional Parts

- **Switch**: TP-Link 8-Port Gigabit Network Switch (TL-SG108, RJ-45, IGMP-Snooping, unmanaged, fanless)
- **Additional Storage**: Seagate Barracuda 4 TB HDD (2.5", 128 MB Cache, SATA 6 Gb/s)
- **Network Setup**: Several RJ-45 Network cables

## 1.3 BIOS Setup

Connect your machine to power and attach a keyboard and monitor.

1. Connect your Bootbable USB device to the node
2. Press `F2` during boot to enter the BIOS setup

### 1.3.1 Power Settings

> Ensure that NUC auto starts after power failure.

1. Go to `Power` -> `Secondary Power Settings`
2. Set `After Power Failure` to `Power One`
3. Set `Wake on LAN from S4/S5` to `Power On - Normal Boot`

### 1.3.2 CPU Settings

> Adjust Cooling for fanless housing

1. Go to `Cooling`
2. Set `Fan Control Mode` to `Fanless`
3. Go to `Performance` -> `Processor`
4. Set `Hyper-Threading` to `Enabled`
5. Enable `Intel Turbo Boost Technlogy`
6. Set `Active Processor Cores` to `All`
7. Enable `Real-Time Performance Tuning`

> Adjust performance for the server's energy efficiency

1. Go to `Power`
2. Enable `Max Performance Enabled`
3. Set `Intel Dynamic Power Technology` to `Energy Efficient Performance`
4. Set `Package Power Limit 1 (Sustained)` to `25`
5. Set `Package Power Limit 2 (Burst Mode)` to `25`
6. Set `Package Power Time Window (Tau)` to `0`

### 1.3.3 LED Settings

> Turn off status LED signatures for server use

1. Go to `Power` -> `Secondary Power Settings`
2. Set `S0 Indicator Brightness (%)` to `0`
3. Set `Modern Standby Indicator Brightness (%)` to `0`
4. Set `RGB LED` -> `Brightness (%)` to `0`
5. Set `HDD LED` -> `Brightness (%)` to `0`

### 1.3.4 Boot Order

1. Go to `Boot` -> `Boot Priority`
2. Set `Boot Option #1` to your USB device
3. Set `Boot Option #2` to your internal SSD

## 1.4 Operating System Setup

1. Press `F10` to save changes and exit BIOS
2. Wait for the stick to boot up
3. Choose `Try or Install Ubuntu Server`
4. Let the installation setup run through

## 1.5 Ubuntu Configuration

> You can have a look at [Ubuntu's Install Guide](https://ubuntu.com/tutorials/install-ubuntu-server#1-overview) for further information. However, most of it seems outdated for the most recent Ubuntu versions.

### 1.5.1 System Language

First, you have to choose your operating system's language. It's recommended to set it to `English`. In case errors appear on the screen, most guides and guides for fixes are stated in English if you search for them online. So it will help to resolve incidents quickly.

### 1.5.2 Keyboard Config

Right after, define your keyboard type or click `Identify keyboard` and follow the guide.

### 1.5.3 Installation Type

Choose your type of installation for the node. Its recommended to set it to `Ubuntu Server (minimized)` as it has significant advantages for security and performance. Only remote access is needed, and no other applications and web services could potentially harm the software. Both desktop and non-minimized versions also use more system resources.

Do not have `Search for third-party drivers` enabled during installation.

### 1.5.4 Network and Access Settings

Now configure your network settings to talk to the node from the outside world. Connect your node to your router or switch, then choose the network type `eth` and edit `IPv4` and `IPv6` to both set as `Automatic (DHCP)`. We will configure the static IP later but allow various connections to reach the node later.

If you do not already have a proxy setup, leave the proxy address blank. We will update the HTTP proxy to access the node later on.

### 1.5.5 Download and Installer

Leave the official Ubuntu mirror address and continue with the setup.

If there is any new installer during the next step, download the latest version, and you will get back to this step after it is done. It's always recommended to use the newest software releases.

### 1.5.6 Storage Setup

For storage, set the entire disk.

#### Logical Volume Manager

It's recommended to enable the LVM group option. A flexible management system allows you to easily set and resize your storage volumes. If you plan to run a blockchain node and might add another disk, later on, LVM can be beneficial. If you need to add more storage space later, you can easily add a new disk to the existing LVM group and expand the logical volumes as needed. Maintenance can be done without any downtime or data loss. It also allows for resizing storage volumes, so you can easily resize them on the fly, allowing you to adapt to changing storage requirements of your blockchain node. Some trade-offs when using LVM are the complexity of disk management and a tiny performance dint in performance.

Considering the benefits, LVM is generally recommended and enabled on new [Dappnode](https://dappnode.com/) machines and has been set as default on Ubuntu since version 20.04.

#### Encryption

Encryption is not necessary, as you could encrypt a small portion of the disk later on if needed. Encrypting the whole disk could become cumbersome for remote access, requiring manual intervention each time the server is restarted. There are ways to automate the unlocking process, such as using a remote key server or network-bound disk encryption. However, these methods can increase complexity and may have security implications.

Your validator keys are safe anyway, as they are encrypted by default. The validator also has its encrypted wallet needed to restart the client with a modified address for the fee recipient. The only risk here is physical access or modification- except for the keys or wallet. These could include log data, configuration files, or other personal data stored on the node. The added complexity won't be necessary if these points are not deemed high-risk.

### 1.5.7 User Configuration

In the next step, pick your user and server names and choose a strong password.

Continue without [Ubuntu Pro](https://ubuntu.com/pricing/pro). It's a premium version of Ubuntu designed for enterprise use and comes with additional features, security updates, and support compared to the standard Ubuntu release. The primary target is businesses and organizations seeking a more comprehensive and secure Ubuntu experience.

### 1.5.8 SSH Setup

In the next step, you can add the OpenSSH server installation for secure remote access. The server-only variant will only allow the connection to the node, not the functionality for the node also to set up a client- which is lean and ideal for a node setup that only wants external devices to connect for maintenance.

If you do not already have an SSH configuration, leave the SSH identity blank. We will configure access later on.

### 1.5.9 Additional Software

It's recommended to skip through the additional server snaps without enabling packages. The best practice would be choosing the packages later when installing or configuring specific software.

Let the Ubuntu Installation process run through until fully complete. Remove the USB device and press enter to reboot the machine.

## System Setup

> **_NOTE:_** Following steps are performed directly on a node machine.

In order to remotelly access a machine running a node, it needs to be configured.

### Update

```shell=
sudo apt update
sudo apt upgrade -y
sudo apt install -y nano wget make git
```

### Remote Access

SSH is used to enable remote access from other machine using localy network through WiFi or broadband connections. This is a common practice and can be quite useful if a node machine does not have input (keyboard/mouse) nor a display. Once setup, a node machine can be placed elsewhere and only personal computer could be used to control and maintain it.

#### Install SSH

```shell=
sudo apt install --assume-yes openssh-server
```

#### Confiugre SSH

Choose a port number larger than `50000`. This will be used later.

```shell=
sudo nano /etc/ssh/sshd_config
```

Change and enable a port by uncommenting (removing `#`) and changing `22` to new chosen port number:

```shell=
Port 50000
```

Close editor by pressing `ctrl` + `X`, then save.

#### Configure Firewall

Enable ssh in firewall by replacing _replace-port_ with new port:

```shell=
sudo ufw allow replace-port
```

#### Enable SSH

```shell=
sudo systemctl start ssh
sudo systemctl enable ssh
```

#### Resolve Hostname

In order to locate a node machine in local network, it requires IP. Execute following command to resolve a node machine's IP:

```shell=
ifconfig
```

Locate IP address (`inet`) in `eno1` section, e.g. `192.168.86.29`.

```
eno1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
      inet 192.168.86.29  netmask 255.255.255.0  broadcast 192.168.86.255
```

Close ssh session by executing `exit`.

> **_NOTE:_** Following steps are performed a personal computer.

Verify basic access to a node machine by using ssh. SSH requires user name of a node machine, its hostname and previously chosen ssh port.

```shell=
nano ~/.ssh/config
```

Type in the following and replace _replace-user_, _replace-ip_, and _replace-port_:

```shell=
Host lukso
  User replace-user
  HostName replace-ip
  Port replace-port
```

Attempt to connect to verify the configuration:

```shell=
ssh lukso
```

Once connected, enter a password of user on a node machine. If a connection was okay, a shell should be presented in a terminal. At this point, it could closed.

#### Disable Password Authentication

On a personal computer, create new key pair for ssh authentication if needed.

```shell=
ssh-keygen -t rsa -b 4096
```

Copy a generated public key **keyname.pub** to a node machine. Replace **keyname.pub** with a key in home directory.

```shell=
ssh-copy-id -i ~/.ssh/keyname.pub lukso
```

#### Disable Non-Key Remote Access

On a personal computer, try to ssh again. This time it should not prompt for a password.

```shell=
ssh lukso
```

Configure SSH by opening a configuration file and modifying several options:

```shell=
sudo nano /etc/ssh/sshd_config
```

Options:

```shell=
ChallengeResponseAuthentication no
PasswordAuthentication no
PermitRootLogin prohibit-password
PermitEmptyPasswords no
```

Close editor by pressing `ctrl` + `X`, then save. Validate SSH configuration and restart ssh service.

```shell=
sudo sshd -t
sudo systemctl restart sshd
```

Close ssh session by executing `exit`.

#### Verify Remote Access

```shell=
ssh lukso
```

Stay connected to a remote node machine to perform next steps.

### Keep System Up to Date

Update a system manually:

```shell=
sudo apt-get update -y
sudo apt dist-upgrade -y
sudo apt-get autoremove
sudo apt-get autoclean
```

Keep a system up to date automatically:

```shell=
sudo apt-get install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### Disable Root Access

A root access should not be used. Instead, a user should be using `sudo` to perform privilged operations on a system.

```shell=
sudo passwd -l root
```

### Block Unathorised Access

Install `fail2ban` to block IP addresses that exceed failed ssh login attempts.

```shell=
sudo apt-get install fail2ban -y
```

Edit a config to monitor ssh logins

```shell=
sudo nano /etc/fail2ban/jail.local
```

Replace _replace-port_ to match the ssh port number.

```shell=
[sshd]
enabled=true
port=replace-port
filter=sshd
logpath=/var/log/auth.log
maxretry=3
ignoreip=
```

Close editor by pressing `ctrl` + `X`, then save. Restart `fail2ban` service:

```shell=
sudo systemctl restart fail2ban
```

### Configure Firewall

By default deny all traffic:

```shell=
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Allow P2P ports for Lukso clients:

```shell=
sudo ufw allow 30303/tcp
sudo ufw allow 13000/tcp
sudo ufw allow 12000/udp
sudo ufw allow 30303/udp
```

> **_NOTE:_** make sure to open same ports on your home router

Enable Firewall:

```shell=
sudo ufw enable
```

Verify firewall configuration:

```shell=
sudo ufw status
```

It should look something like this (may be missing some ports):

```shell=
Status: active

To                         Action      From
--                         ------      ----
13000/tcp                  ALLOW       Anywhere
12000/udp                  ALLOW       Anywhere
30303/tcp                  ALLOW       Anywhere
ssh-port/tcp               ALLOW       Anywhere
30303/udp                  ALLOW       Anywhere
13000/tcp (v6)             ALLOW       Anywhere (v6)
12000/udp (v6)             ALLOW       Anywhere (v6)
30303/tcp (v6)             ALLOW       Anywhere (v6)
ssh-port/tcp (v6)          ALLOW       Anywhere (v6)
30303/udp (v6)             ALLOW       Anywhere (v6)
```

### Improve SSH Connection

While setting up a system, ssh terminal may seem to be slow due wifi power management settings on a node machine. To disable it, modify a config.

```shell=
sudo nano /etc/NetworkManager/conf.d/default-wifi-powersave-on.conf
```

Config:

```shell=
[connection]
wifi.powersave = 2
```

Close editor by pressing `ctrl` + `X`, then save. Restart `NetworkManager` service:

```shell=
sudo systemctl restart NetworkManager
```

## Node Setup

> **_NOTE:_** Following steps are performed on personal machine.

Access a remote node machine

```shell=
ssh lukso
```

**TBD AS LUKSO IS PREPEARING FOR L16 TESTNET**.
In the meantime follow developments and instructions of [L16 beta](https://docs.lukso.tech/networks/l16-testnet).

## Monitoring

Sets up a dashboard to monitor state of a node machine, node, and validators.

> **_NOTE:_** Following steps are performed on personal machine.

Access a remote node machine

```shell=
ssh lukso
```

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
sudo nano /etc/prometheus/prometheus.yml
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
sudo nano /etc/systemd/system/prometheus.service
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
sudo nano /lib/systemd/system/grafana-server.service
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
sudo nano /etc/systemd/system/node_exporter.service
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
sudo nano /etc/json_exporter/json_exporter.yml
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
sudo nano /etc/systemd/system/json_exporter.service
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
sudo nano /etc/blackbox_exporter/blackbox.yml
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
sudo nano /etc/systemd/system/blackbox_exporter.service
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

## Credits

- https://github.com/metanull-operator/eth2-ubuntu

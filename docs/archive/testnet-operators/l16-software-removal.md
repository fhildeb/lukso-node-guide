---
sidebar_label: "L16 Software Removal"
sidebar_position: 3
description: "Learn how to fully remove the legacy LUKSO CLI, Docker containers, blockchain data, and monitoring tools after completing L16 testnet runs."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# L16 Software Removal

This guide teaches you how to remove the Legacy LUKSO CLI and all installed data after completing L16 testnet runs.

:::danger Historical Guide

This guide is kept for historical reference. The old LUKSO CLI commands may be unavailable by now.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Remove LUKSO CLI

**1.1 Stop the Node**: _Make sure all running LUKSO services are stopped._

```sh
lukso network stop validator
lukso network stop
```

**1.2 Delete CLI Binary**: _Remove the LUKSO CLI from the binary path._

```sh
cd /usr/local/bin
ls -al
sudo rm -rf lukso
```

## 2. Remove Docker Data

Depending on the further use of the server, there are two different ways to reset docker data used for node operation.

| **Method**                           | **Description**                                                                                                                                                                    | **Removed Software**                                                                                                                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Node Data Removal** </nobr> | This lightway version only removes the data related to the blockchain node operation. If you continue to use the server and _Docker_ for other purposes, this is the right choice. | - Stopped Containers <br /> - LUKSO L16 Images <br />                                                                                             |
| <nobr> **System Prune** </nobr>      | This is a complete removal of the container setup and the entire data that has ever been worked with. Its the ideal choice if you are not using _Docker_ for other software.       | <nobr> - Stopped Containers and Images </nobr><br /> - All Volumes and Networks<br /> - Docker Compose Tool <br /> - Docker Tool and Config Files |

<Tabs>
<TabItem value="soft" label="Node Data Removal" default>

**2.1 Remove Docker Containers**: _Find and remove containers related to your node._

```sh
docker ps -a
sudo docker rm <container-id>
```

**2.2 Remove Docker Images**: _Find and remove images associated with LUKSO services._

```sh
docker images -a
sudo docker rmi <image-id>
```

:::tip

Containers and images are typically named `docker-geth/geth`, `docker-prysm/beacon`, `docker-prysm/validator`.

:::

:::info

Replace `<container-id>` and `<image-id>` with the actual identification numbers like `7e9f0a29f3b3`, or `c3c1a1d3b6a1`.

:::

</TabItem>
<TabItem value="hard" label="System Prune">

**2.1 Prune Docker System**: _This will delete all Docker data and cache._

```sh
sudo docker system prune -a
```

**2.2 Remove Docker Compose**:

```sh
sudo rm -rf /usr/local/bin/docker-compose
```

**2.3 Remove Docker Directories**:

```sh
sudo rm -rf /var/lib/docker
sudo rm -rf /etc/docker
```

</TabItem>
</Tabs>

## 3. Remove Blockchain Data

**3.1 Backup Your Validator Keys**: _Copy the keystore and wallet folders into a new directory._

```sh
cd ~
mkdir l16-key-backup
cd <my-node-folder>
mv keystore ~/l16-key-backup/keystore
mv transaction_wallet ~/l16-key-backup/transaction_wallet
cd ..
```

**3.2 Delete the Node Folder**: _Remove the old working directory with all blockchain data, logs, wallets, and configs._

```sh
sudo rm -rf <my-node-folder>
```

:::info

Replace `<my-node-folder>` with your actual node directory like `l16-node-testnet`.

:::

## 4. Remove Monitoring Software

**4.1 Stop Monitoring Services**: _Stop the software daemons of the dashboard and data collector._

```sh
systemctl stop grafana-server
systemctl stop prometheus
```

**4.2 Remove Monitoring Packages**: _Delete all tools used to install exporters or dashboards._

```sh
sudo apt remove apt-transport-https software-properties-common wget grafana-enterprise
```

**4.3 Delete Exporter Binaries**: _Delete the exporter services of Prometheus._

```sh
cd /usr/local/bin
sudo rm -rf node_exporter prometheus promtool blackbox_exporter
```

**4.4 Remove Database Files**: _Delete the data collected by Grafana and Prometheus._

```sh
cd /var/lib
sudo rm -rf prometheus grafana
```

**4.5 Remove Systemd Services**: _Delete service configurations of Grafana._

```sh
cd /lib/systemd/system
sudo rm -rf grafana-server.service grafana-server.service.old
```

**4.6 Remove Configurations**: _Delete data collection configurations for exporters, Grafana, and Prometheus._

```sh
cd /etc
sudo rm -rf prometheus grafana blackbox_exporter

cd /etc/systemd/system
sudo rm -rf prometheus.service grafana.service blackbox_exporter.service
```

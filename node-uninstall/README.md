# ## LUKSO CLI Uninstall

> This guide is suited for L16 nodes running a docker installation up to the `LUKSO CLI Version 4.9.0`. If you are using an newer version, paths and tools might not fully align. Use the uninstall commands at own risk.

The LUKSO CLI is installed within `/usr/local/bin/lukso`, and links to Docker. You will have to remove:

- CLI Tool
- Docker Containers & Images
- Node folder

> Commands may need admin permission

## 1. Stop the Node

```bash
$ lukso network stop validator
$ lukso network stop
```

## 2. Remove LUKSO CLI

```bash
$ cd /usr/local/bin
$ ls -al
$ rm -rf lukso
```

### Remove Monitoring

If you want to fully remove all node data and monitoring software, you can also stop and remove Prometheus, Grafana and all tools that were needed for them.

```bash
# Stop monitoring software
$ systemctl stop grafana-server
$ systemctl stop prometheus

# Remove packages installed with apt-get
$ apt remove apt-transport-https software-properties-common wget grafana-enterprise

# Remove binaries
$ cd /usr/local/bin
$ rm -rf node_exporter prometheus promtool blackbox_exporter

# Remove libraries
$ cd /var/lib
$ rm -rf prometheus grafana
$ cd /lib/systemd/system
$ rm-rf grafana-server.service grafana-server.service.old

# Remove config and databases
$ cd /etc
$ rm -rf prometheus grafana blackbox_exporter
$ cd /etc/systemd/system
$ rm -rf prometheus.service grafana.service blackbox_exporter.service

```

## 3. Remove Docker Data

There are two different ways of removing docker data: soft-reset or hard-reset. If you are not running anything else on the node, just prune your docker system to remove all data. You can also uninstall docker-compose and docker after. If you have other software using docker, just remove the node-specific data.

### Option A: Only Remove Node Data

Get all the `CONTAINER_IDs` of the containers named like:

- `docker-geth/geth:`
- `docker-prysm/beacon:`
- `docker-prysm/validator:`

They have to be remove one by one.

```bash
$ docker ps -a
$ docker rm CONTAINER_ID
```

Get all the `IMAGE_IDs` of the images named like:

- `docker-geth/geth`
- `docker-prysm/beacon`
- `docker-prysm/validator`

They have to be remove one by one.

```bash
$ docker images -a
$ docker rmi IMAGE_ID
```

### Option B: Prune Docker

If you installed docker via [get.docker.com](https://get.docker.com/) and used curl scripts to install the docker-compose add-on as described by the LUKSO documentation, the following commands will match the installation folders and can be removed.

```bash
# Prune Docker Data
$ docker system prune -a

# Remove Docker Compose
$ rm -rf /usr/local/bin/docker-compose

# Remove Docker
$ rm -rf /var/lib/docker
$ rm -rf /etc/docker
```

## 4. Backup and Folder Removal

Now you can backup your private keys and remove the node folder with all its contents. Exchange `NODE_FOLDER` with your node folder name. If you do not want to create a backup just delete the node folder without further redo.

```bash
$ cd ~
$ mkdir l16-key-backup
$ cd NODE_FOLDER
$ mv keystore ~/l16-key-backup/keystore
$ mv transaction_wallet ~/l16-key-backup/transaction_wallet
$ cd ..
$ rm -rf NODE_FOLDER
```

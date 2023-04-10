# LUKSO L16 CLI UNINSTALL

The LUKSO CLI is installed within `/usr/local/bin/lukso`, and links to Docker. You will have to remove:

- CLI Tool
- Docker Containers & Images
- Node folder

> Commands may need admin permission, so type `sudo` in front of them

## 1. Stop the Node

```bash
$ lukso network stop validator
$ lukso network stop
```

## 2. Remove LUKSO CLI

```bash
$ cd usr/local/bin
$ ls -al
$ rm -rf lukso
```

### Remove Monitoring

If you want to fully remove all node data and monitoring software, you can also stop and remove Prometheus, Grafana and all tools that were needed for them.

```bash
$ systemctl stop grafana-server
$ systemctl stop prometheus
$ apt remove apt-transport-https software-properties-common wget grafana-enterprise
$ cd usr/local/bin
$ rm -rf node_exporter prometheus promtool blackbox_exporter
$ cd /var/lib
$ rmdir -rf prometheus grafana
$ cd /etc
$ rmdir -rf prometheus grafana blackbox_exporter
$ cd /etc/systemd/system
$ rm -rf prometheus.service grafana.service blackbox_exporter.service
$ cd /lib/systemd/system
$ rm-rf grafana-server.service grafana-server.service.old
```

## 3. Remove Docker Data

Depending on if you want to soft-reset or hard-reset your node setup, there are two different guides. If you are not running anything else on the node, just prune your docker system to remove all data. You can also uninstall docker-compose and docker after.

### Option A: Only Remove Node Data

Get all the `CONTAINER_IDs` of the containers named like: `docker-geth/geth:` , `docker-prysm/beacon:` , `docker-prysm/validator:` and remove them one by one.

```bash
$ docker ps -a
$ docker rm CONTAINER_ID
```

Get all the `IMAGE_IDs` of the images named like: `docker-geth/geth` , `docker-prysm/beacon` , `docker-prysm/validator` and remove them one by one.

```bash
$ docker images -a
$ docker rmi IMAGE_ID
```

###Option B: Prune Docker

If you installed it via [get.docker.com](https://get.docker.com/) and curl scripts as described by the old LUKSO documentation, the following commands will work.

```bash
# Prune Docker Data
$ docker prune -a

# Remove Docker Compose
$ rm -rf /usr/local/bin/docker-compose

# Remove Docker
$ rmdir -rf /var/lib/docker
$ rmdir -rf /etc/docker
```

## 4. Backup and Folder Removal

Backup your private keys and remove the node folder with all its contents. Exchange `NODE_FOLDER` with your node folder name.

```bash
$ cd ~
$ mkdir l16-key-backup
$ cd NODE_FOLDER
$ mv keystore ~/l16-key-backup/keystore
$ mv transaction_wallet ~/l16-key-backup/transaction_wallet
$ cd ..
$ rmdir -rf NODE_FOLDER
```

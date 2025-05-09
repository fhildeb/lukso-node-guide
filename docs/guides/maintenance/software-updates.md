---
sidebar_label: "11.1 Software Updates"
sidebar_position: 1
---

# 11.1 Software Updates

# General Tooltips

The following file features small help snippets in case there are any issues with the LUKSO CLI

## Node Update

How to update your server, clients, and configs.

### 1. Update Software Packages

```sh
# Update Package List
sudo apt update

# List Upgradable Packages
sudo apt list --upgradable

# Put Grafana Updates on Hold
sudo apt-mark hold grafana

# Stop Node with Automation
sudo systemctl stop lukso-validator

# Stop Node without Automation
# cd <lukso-working directory>
# lukso stop

# Apply all software updates
sudo apt upgrade
# Choose to keep local SSH <OK>
# Update outdated libraries <OK>

# Kernel packages not updated automatically <OK>
# Running packages not updated automatically <OK>

# Reboot the System to update remaining packages
sudo reboot

# Clean unused packages
sudo apt autoremove

# Remove package cache
sudo apt autoclean
```

> You will be logged out of the machine and have to log back in using SSH

### 2. Update the LUKSO CLI and Clients

```sh
# Get latest LUKSO CLI
sudo curl https://install.lukso.network | sh

# Move into the node directory
cd <lukso-working-directory>

# Ensure all client processes are stopped
sudo pkill geth
sudo pkill prysm
sudo pkill validator
# sudo pkill teku
# sudo pkill lighthouse
# sudo pkill erigon

# Check your current client versions
geth --version
prysm --version
# lighthouse --version
# teku --version
# erigon --version

# Update your clients
sudo lukso update

# Update the network configurations
sudo lukso update configs

# Check your new client versions
geth --version
prysm --version
# lighthouse --version
# teku --version
# erigon --version
```

### Optional: Update Client Configs

If you update your network configs using `lukso init` or `lukso update configs`, **none of your own configurations are overwritten**:

```sh
sudo lukso init
sudo lukso update configs
```

- If you do `lukso update configs`, only the files within the `/configs/<network>/shared` folders will be updated.
- If you do `lukso init`, only missing `/configs/` files will be added

However, LUKSO recently introduced some optional changes to the client configurations. If you want, you can update them accordingly. However, this is not mandatory.

<!--TODO: link to configuration updates page-->

### Optional: Remove Genesis Flags

In case you were a genesis validator using an automation script on your node, make sure to **remove the following lines** from your startup script:

```sh
cd <lukso-working-directory>/static/
sudo vim ./lukso_startup.sh
```

```text
        --genesis-json ./configs/mainnet/shared/genesis_42.json \
        --genesis-ssz ./configs/mainnet/shared/genesis_42.ssz \
```

### 3. Restart the Node

After all updates have been applied to configuration files and clients, you can restart your node.

```sh
## If you have automation, re-apply all rights to the service
sudo chown -R lukso-validator-worker:lukso-validator-worker /home/<user-name>/<lukso-working-directory>
sudo chown lukso-validator-worker:lukso-validator-worker /usr/local/bin/lukso
sudo chmod -R 750 /home/<user-name>/<your-node-folder>
sudo chmod 755 /home/<user-name>/<your-node-folder>
sudo chmod 400 /home/<user-name>/<lukso-working-directory>/static/<your-generic-password-file>
sudo chmod 500 /home/<user-name>/<lukso-working-directory>/static/lukso_startup.sh

# Restart the Node Service with Automation
sudo systemctl start lukso-validator

# Restart Node Service without Automation
# cd <lukso-working-directory>
# lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync

# Check if all clients are working
sudo lukso status
```

## Scan for Warnings and Errors

The logging commands of the LUKSO CLI can also be used to search the logging files for warnings or errors.

> Administrative rights are only needed if you are using secure service automation

```sh
# Fetch all execution warnings
sudo lukso logs execution | grep "warning"
# Fetch all validator warnings
sudo lukso logs validator | grep "warning"
# Fetch all consensus warnings
sudo lukso logs consensus | grep "warning"

# Fetch all execution errors
sudo lukso logs execution | grep "error"
# Fetch all validator errors
sudo lukso logs validator | grep "error"
# Fetch all consensus errors
sudo lukso logs consensus | grep "error"
```

> After executing the command, the terminal is waiting for an input to show the log file. You will have to press the ENTER key in order to see the related logs you searched for.

## Downgrade or Change Client Versions

The client version can be changed manually, in case there are some issues with the data folder.

Custom client versions can be installed using the `lukso install` command by providing specific flags. The command will still function as usual, giving you the option to choose your execution and consensus client; however, it continues to download the version that was defined by the flags. You can also add multiple flags to download a consensus and execution version simultaneously.

> For Geth, you also have to provide the correct commit hash.

```bash
# Manually overwrite Geth Version
# https://github.com/ethereum/go-ethereum/releases
lukso install --geth-tag 1.12.2 --geth-commit-hash bed84606

# Manually overwrite Prysm Version
# https://github.com/prysmaticlabs/prysm/releases
lukso install --prysm-tag v4.0.8

# Manually overwrite Lighthouse Version
# https://github.com/sigp/lighthouse/releases
lukso install --lighthouse-tag v4.1.0

# Manually overwrite Erigon Version
# https://github.com/ledgerwatch/erigon/releases
lukso install ---erigon-tag 2.52.1

# Manually overwrite Teku Version
# https://github.com/ConsenSys/teku/releases
lukso install ---teku-tag v23.10.0
```

## Reset Blockchain State

When updating execution client versions, you might run into errors with the existing state. To resolve issues, remove the data folder containing the blockchain database.

```sh
# Move into the node directory
cd <lukso-working-directory>

# Remove blockchain data
rm -rf <network>-data

# Remove old logs
rm -rf <network>-logs

# Re-init the folder
sudo lukso init
```

## Restart Monitoring

Monitoring system services are restarting during boot time, however, it might happen that you have to manually restart or trigger them.

```sh
# System & Hardware Metrics
sudo systemctl restart node_exporter

# LYX Price Metrics
sudo systemctl restart json_exporter

# Ping Metrics
sudo systemctl restart blackbox_exporter

# Node Client Metrics
sudo systemctl restart prometheus

# Grafana Dashboard
sudo systemctl restart grafana-server
```

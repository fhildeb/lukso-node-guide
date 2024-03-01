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

- If you do `lukso update configs`, only the files within the `/configs/<network>/shared` folders will be updated.
- If you do `lukso init`, only missing `/configs/` files will be added

However, LUKSO recently introduced some optional changes to the client configurations. If you want, you can update them accordingly. However, this is not mandatory.

> Changes introduced since network launch in May 2023. Last checked on 1st March 2024

#### Prysm Changes

```sh
cd <lukso-working-directory>/configs/<network>
vim prysm/prysm.yaml
```

```text
p2p-host-ip: '0.0.0.0'                      --> removed on https://github.com/lukso-network/network-configs/pull/112/files
min-sync-peers: 1                           --> updated on https://github.com/lukso-network/network-configs/pull/131/files
minimum-peers-per-subnet: 1                 --> updated on https://github.com/lukso-network/network-configs/pull/131/files
block-batch-limit: 512                      --> removed on https://github.com/lukso-network/network-configs/pull/131/files
block-batch-limit-burst-factor: 10          --> removed on https://github.com/lukso-network/network-configs/pull/131/files
contract-deployment-block: 0                --> added on https://github.com/lukso-network/network-configs/pull/117/files
```

#### Erigon Changes

```sh
cd <lukso-working-directory>/configs/<network>
vim erigon/erigon.toml
```

```text
"externalcl" = true                         --> removed on https://github.com/lukso-network/network-configs/pull/115/files

"snapshots" = false                         --> added on https://github.com/lukso-network/network-configs/pull/115/files
"prune" = "htc"                             --> added on https://github.com/lukso-network/network-configs/pull/115/files
"private.api.addr" = "127.0.0.1:9098"       --> added on https://github.com/lukso-network/network-configs/pull/118/files

"db.size.limit" = "8TB"                     --> added on https://github.com/lukso-network/network-configs/pull/129/files

```

#### Teku Changes

```sh
cd <lukso-working-directory>/configs/<network>
vim teku/config.yaml
```

```text
MIN_EPOCHS_FOR_BLOCK_REQUESTS: 33024        --> added on https://github.com/lukso-network/network-configs/pull/128/files
```

#### Lighthouse Changes

```sh
cd <lukso-working-directory>/configs/<network>
vim lighthouse/lighthouse.toml
```

```text
http-address = "0.0.0.0"                    --> removed on https://github.com/lukso-network/network-configs/pull/116/files

metrics-address = "0.0.0.0"                 --> removed on https://github.com/lukso-network/network-configs/pull/116/files
metrics-allow-origin = "*"                  --> removed on https://github.com/lukso-network/network-configs/pull/116/files

metrics = true                              --> added on https://github.com/lukso-network/network-configs/pull/116/files
metrics-port=5057                           --> added onhttps://github.com/lukso-network/network-configs/pull/116/files
```

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
sudo chmod -R 755 /home/<user-name>/<lukso-working-directory>
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

```sh
# Fetch all execution warnings
lukso logs execution | grep "warning"
# Fetch all validator warnings
lukso logs validator | grep "warning"
# Fetch all consensus warnings
lukso logs consensus | grep "warning"

# Fetch all execution errors
lukso logs execution | grep "error"
# Fetch all validator errors
lukso logs validator | grep "error"
# Fetch all consensus errors
lukso logs consensus | grep "error"
```

## Downgrade or Change Client Versions

The client version can be changed manually, in case there are some issues with the data folder.

Custom client versions can be installed using the `lukso install` command by providing specific flags. The command will still function as usual, giving you the option to choose your execution and consensus client; however, it continues to download the version that was defined by the flags. You can also add multiple flags to download a consensus and execution version simultaneously.

> For Geth, you also have to provide the correct commit hash.

```bash
# Manually overwrite Geth Version
lukso install --geth-tag v1.12
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
lukso install ---erigon-tag v2.52.1

# Manually overwrite Teku Version
# https://github.com/ConsenSys/teku/releases
lukso install ---teku-tag v23.10.0
```

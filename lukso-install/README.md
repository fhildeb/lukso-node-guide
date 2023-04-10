# LUKSO CLI Installation

Guide from [LUKSOVERSE](https://luksoverse.io/2022/04/l16-re-spin-extra-tools-and-explanation/) written by [Rob](https://github.com/KEEZ-RobG) and [Jordy](https://github.com/JordyDutch)

## 1. Retrieve LUKSO CLI

Run the following command to retrieve the new LUKSO CLI script

```bash
curl https://raw.githubusercontent.com/lukso-network/lukso-cli/main/cli_downloader.sh | bash
```

### 2. Put CLI into Binary PATH

```bash
sudo mv ~/lukso /usr/local/bin
```

At this moment LUKSO CLI isn’t installing Docker and docker compose you can install them.

## 3. Install Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## 4. Install Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

## 5. Setup Node and Network

```bash
# Setup Folder
mkdir l16-node-testnet
cd l16-node-testnet

# Download the dependencies.
lukso network init
```

### 6 Change Node Name

> Make sure not to remove quotation marks in the .env file

```bash
nano .env
```

Change your node name. In case you are running a genesis validator, replace XX with the validator number on your ZIP file. `beta-genesis-validator_XX`

> Use control + X to close the file and save it

```bash
nano node_config.yaml
```

Change your node name. In case you are running a genesis validator, replace XX with the validator number on your ZIP file. `beta-genesis-validator_XX`

> Use control + X to close the file and save it

## 7. Create Validator Keys

### 7.1 L16 Genesis Setup

```bash
cd
mkdir l16-node-testnet/keystore
```

Unzip the validator keys from the `beta*[your number].zip` and copy the contents into the directory

```bash
mv beta l16-node-testnet/keystore
```

> Make sure all separate files are in the keystore folder, not the ZIP file itself

### 7.2 Regular Validator Setup

The Mnemonics will appear in your node_config.yaml file.

```bash
lukso network validator setup
```

Open your node_config.yaml, copy your mnemonics and store them somewhere safe and offline.

```bash
nano node_config.yaml
```

> Use control + X to close the file and save it

Check if your validator already has enough funds

```bash
lukso network validator describe
```

#### Fund the Wallet

Visit the [L16 Faucet](https://faucet.l16.lukso.network/) and paste your wallet address into the field. Each validator will need 32 LYXt.

> Transfer enough LYXt to also be able to pay for deposit fees

#### Deposit Test

This will give you the possibility to peek in what is going to happen without executing a transaction.

```bash
lukso network validator deposit --dry
```

#### Deposit Validators

```bash
lukso network validator deposit
```

#### Backup Validator Data

```bash
lukso network validator backup
```

Store the generated node_recovery.json somewhere safe and offline.

## 8. Check Node Folder Structure

> Your directory structure should look similar to this. The data folder will not apear until sudo lukso network start is ran for the first time

```bash
cd l16-node-testnet
ls -al
```

```bash
configs
data
keystore
keys
lodestar-secrets
nimbus-keys
password.txt
prysm
pubkeys.json
secrets
teku-keys
teku-secrets
docker-compose.yml
.env
node_config.yaml
```

## 9. Update The Network Config

Will update all network config itself and use the latest
bootnodes for consensus and validator.

```bash
lukso network update
lukso network refresh
```

## 10. Start the Node

```bash
cd
cd l16-node-testnet
lukso network start
```

## 11. Start the Validator

```bash
lukso network start validator
```

> Your node should sync and then start validating. It can take up to eight hours before your validator becomes active

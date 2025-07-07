---
sidebar_label: "L16 Client Setup"
sidebar_position: 1
description: "Step-by-step guide to setting up a LUKSO L16 testnet node using the legacy CLI and Docker, including validator integration and startup procedures."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# L16 Client Setup

This guide walks through the setup of a LUKSO L16 testnet node using the Legacy CLI and Docker.

:::danger Historical Guide

This guide is kept for historical reference. The old LUKSO CLI and L16 Faucet are unavailable by now.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Software Installation

**1.1 LUKSO CLI Download**: _Move to your home directory, then fetch and execute the installation script._

```sh
cd ~
curl https://raw.githubusercontent.com/lukso-network/lukso-cli/main/cli_downloader.sh | bash
```

**1.2 Add the CLI to Binary Path**: _Move the binary into the system path so it can be called globally._

```sh
sudo mv ~/lukso /usr/local/bin
```

**1.3 Install Docker**: _Install the Docker runtime environment used to run client containers._

```sh
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**1.4 Install Docker Compose**: _Install Docker Compose to manage multi-container deployments._

```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

**1.5 Setup the Node Environment**: _Create the node directory and initialize the network configuration._

```sh
mkdir l16-node-testnet
cd l16-node-testnet
lukso network init
```

## 2. Network Configuration

**2.1 Set the Environment Name**: _Edit the environment file to name your node using your preferred text editor._

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
vim .env
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
nano .env
```

</TabItem>
</Tabs>

**2.2 Set the Node Name**: _Edit the node config file to name your node using your preferred text editor._

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
vim node_config.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
nano node_config.yaml
```

</TabItem>
</Tabs>

:::info

The name is used to reference your node in the node explorer. Genesis validators use `beta-genesis-validator_XX` and replace the `XX` with the validator number of their ZIP files that they received, housing the funded validator keys.

:::

**2.3 Update the Network Configuration**: _Retrieve and overwrite the network configuration with the latest bootnodes and specs._

```sh
lukso network update
lukso network refresh
```

## 3. Deposit Key Integration

<Tabs groupId="validator">
  <TabItem value="regular" label="Regular Validators" default>

**3.1 Generate Validator Keys**: _Generate new validator deposit keys directly from the validator wallet of the consensus client._

```sh
lukso network validator setup
```

**3.2 Save Mnemonics**: _Add the mnemonic seed of your wallet into the node configuration using your preferred text editor._

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
vim node_config.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
nano node_config.yaml
```

</TabItem>
</Tabs>

**3.3 Check Validator Status**: _Verify the amount of validator keys to determine the LYXt amount needed for deposits._

```sh
lukso network validator describe
```

**3.4 Fund Wallet**: _Visit the [L16 Faucet](https://faucet.l16.lukso.network/) and fund your address with at least 32 LYX for one validator._

![L16 Faucet](/img/archive/l16_faucet.png)

**3.5 Dry Run Deposit**: _Simulate the validator deposit process to ensure your mnemonic seed was added correctly._

```sh
lukso network validator deposit --dry
```

**3.6 Execute Deposit**: _If there were no isuess, execute the deposit on the L16 testnet using your wallet funds._

```sh
lukso network validator deposit
```

**3.7 Backup the Validator Keys**: _Save the validator keys in a recovery file._

```sh
lukso network validator backup
```

:::warning

The LUKSO CLI will generate a `node_recovery.json` file in its working directory. Store it securely on an offline device.

:::

</TabItem> <TabItem value="genesis" label="Genesis Validators">

**Import Validator Keys**: _Unzip and copy your validator files into the keystore directory._

```sh
cd
mkdir l16-node-testnet/keystore
mv beta l16-node-testnet/keystore
```

:::tip

Genesis Validators received whitelisted and funded validator keys from the LUKSO Network Team via Email and had to pre-register via the official validator questionary to receive a spot in the public node list.

:::

:::info

Ensure all validator files are inside the `keystore` folder and not within nested directories.

:::

</TabItem> 
</Tabs>

## 4. Folder Structure Check

**Check the Folder Structure**: _During the setup and key integration, your working directory created new files._

```sh
cd l16-node-testnet
ls -al
```

```sh
l16-node-testnet
├── configs
│   ├── config.yaml
│   ├── genesis.json
│   └── genesis.ssz
├── data
│   ├── consensus_data
│   │   ├── beaconchaindata
│   │   ├── metaData
│   ├── execution_data
│   └── validator_data
├── deposit_data.json
├── docker-compose.yml
├── keystore
│   ├── keys
│   ├── lodestar-secrets
│   ├── nimbus-keys
│   ├── password.txt
│   ├── prysm
│   ├── pubkeys.json
│   ├── secrets
│   ├── teku-keys
│   └── teku-secrets
├── node_config.yaml
└── transaction_wallet
```

:::info

The data folder will apear during the first node start using the `sudo lukso network start` command.

:::

## 5. Node Startup

<Tabs>
<TabItem value="validator" label="Validator Node" default>

**Start the Validator**: _Execute the consensus and execution clients with the deposit keys of the node wallet._

```sh
cd ~/l16-node-testnet
lukso network start
lukso network start validator
```

:::info

Your node should start staking once synced. It can take up to eight hours before the deposit becomes active.

:::

</TabItem><TabItem value="regular" label="Regular Fullnode">

**Start the Node**: _Execute the consensus and execution clients based on the CLI client configurations and network stats._

```sh
cd ~/l16-node-testnet
lukso network start
```

</TabItem> 
</Tabs>

:::tip

Details about analyzing the staking and node processes can be found on the [**Monitoring**](/docs/guides/monitoring/software-preparation.md) page of the 📖 [**Guide**](/docs/guides/validator-setup/precautions.md) section.

:::

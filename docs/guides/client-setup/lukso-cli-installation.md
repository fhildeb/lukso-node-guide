---
sidebar_label: "6.3 LUKSO CLI Installation"
sidebar_position: 3
description: "Install, configure, and initialize the LUKSO CLI for managing execution and consensus clients, validator services, and blockchain data from a unified command-line interface."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 6.3 LUKSO CLI Installation

The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) is a unified command-line tool for installing, configuring, and running all officially supported execution and consensus clients on the LUKSO network with additional utility. It simplifies multi-client management by generating a single working directory with separate configs per network. This section explains, how to install and configure the LUKSO CLI to manage your blockchain clients and validators.

:::tip

Please ensure you have a basic understanding of blockchain networks before operating a node. If you're not yet familiar with [**Proof of Stake**](/docs/theory/blockchain-knowledge/proof-of-stake.md), [**Tokenomics**](/docs/theory/blockchain-knowledge/tokenomics.md), [**Panelties**](/docs/theory/blockchain-knowledge/slashing-and-panelties.md), [**Client Types**](/docs/theory/blockchain-knowledge/client-types.md) or [**Client Providers**](/docs/theory/blockchain-knowledge/client-providers.md), please refer to the 🧠 [**Theory**](/docs/theory/blockchain-knowledge/proof-of-stake.md) section.

:::

:::note Platform Support

The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) is officially supported on Mac, Ubuntu, and Debian with the following architectures:

- `x86` and `x86_64`: Intel and AMD Processors
- `ARM` and `aarch64`: Silicon or Single-Board Processors

:::

:::note Flags and Runtime

The clients started from the CLI run in the `/usr/local/bin` directory of the operating system:

- All client flags and additional configurations can be passed down to the services.
- The CLI is bound to the operating system, meaning only a single node can be operated on one device.

:::

:::tip

If you want to use 🐳 [**Docker**](https://github.com/lukso-network/network-docker-containers) or manual configuration, have a look at the [**Client Setups**](/docs/theory/node-operation/client-setups.md) page in the 🧠 [**Theory**](/docs/theory/blockchain-knowledge/proof-of-stake.md) section.

:::

## 1. Install the LUKSO CLI

Download and run the official installation script.

:::info

The following steps are performed on your 📟 **node server**.

:::

```sh
sudo curl https://install.lukso.network | sh
```

:::note

The executable files of the `lukso` service will be downloaded to the `/usr/local/bin/lukso` directory.

:::

## 2. Create a Working Directory

Choose a directory to house all node data and configs.

**2.1 Access the Home Directory**: _It's recommended to place all blockchain data in the home environment._

```sh
cd
```

**2.2 Create a Node Folder**: _Choose a directory to house all blockchain, configuration, and node data._

:::info

Replace `<lukso-working-directory>` with a specific name for your node folder.

:::

```sh
mkdir <lukso-working-directory>
```

**2.3 Navigate into the Folder**: _Move into the working directory to initialize your node clients._

```sh
cd ./<lukso-working-directory>
```

## 3. Initialize the Working Directory

Using the LUKSO CLI, you can download all dependencies and configuration files for all network types with one initialization.

:::info

The `init` command generates a `cli-config.yaml` file and a `config` folder within the node directory, containing the genesis files, network properties, and client-specific configurations for the bootnodes of the related LUKSO networks.

:::

:::tip

To learn about bootnodes and the architecture, have a look at the [**Peer Networks**](/docs/theory/blockchain-knowledge/peer-networks.md) page in the 🧠 [**Theory**](/docs/theory/blockchain-knowledge/proof-of-stake.md) section.

:::

```sh
lukso init
```

:::note

When asked to add your _public IP address_ to the configuration file to improve connectivity, you can decline for now. Your public IP address may change frequently, depending on your internet provider, even if you've previously [assigned a static IP](/docs/guides/router-setup/static-ip-assignment.md) on the router level. While adding your IP is a temporary improvement, this setting is overwritten once [setting up a dynamic DNS](/docs/guides/modifications/dynamic-dns.md) for stable and long-term connectivity without ongoing maintenance.

:::

:::info

During setup, a file named `jwt.hex` is created at at `./configs/shared/secrets/`. The [**JSON Web Token**](https://en.wikipedia.org/wiki/JSON_Web_Token) key will be used to sign and verify the communication between the execution and consensus client of your node.

:::

:::note Folder Structure

The configuration folder will have separate folders for the mainnet and testnet networks.

```text
lukso-node
│
├───configs
│   └───[network]
│   |   ├───besu                              // Config Files for Besu Client
│   |   ├───erigon                            // Config Files for Erigon Client
│   |   ├───geth                              // Config Files for Geth Client
│   |   ├───lighthouse                        // Config Files for Lighthouse Client
│   |   ├───nethermind                        // Config Files for Nethermind Client
│   |   ├───nimbus2                           // Config Files for Nimbus-Eth2 Client
│   |   ├───prysm                             // Config Files for Prysm Client
│   |   ├───teku                              // Config Files for Teku Client
│   |   └───shared
|   |       ├───config.yaml                   // Global Client Config
|   |       ├───deploy_block.txt              // Block Deployment Number
|   |       ├───deploy_contract_block.txt     // Contract Deployment Number
|   |       ├───genesis.json                  // Genesis JSON Data
|   |       └───genesis.ssz                   // Genesis Validator File
│   │
│   └───shared
│       └───secrets
│           └───jwt.hex                       // Global Communication Secret
|
└───cli-config.yaml                           // Global CLI Configuration
```

:::

## 4. Install Blockchain Clients

After the initialization of the node's working directory, you will be able to select which clients clients to run in the setup.

:::info

Clients will be installed globally at `/usr/local/bin/` and set as default within your working directory.

:::

:::tip

Please inform yourself about [**Client Providers**](/docs/theory/blockchain-knowledge/client-providers.md) and [**Client Diversity**](/docs/theory/blockchain-knowledge/client-diversity.md) to ensure your node's and the network stability.

:::

:::warning Staking Notice

If you want to run a validator and stake funds, choose between the `Prysm`, `Lighthouse`, or `Teku` consensus client.

:::

```sh
lukso install
```

Check if the clients were installed correctly using their version commands:

<Tabs>
<TabItem value="geth" label="Geth">

```sh
geth --version
```

</TabItem> 
<TabItem value="erigon" label="Erigon">

```sh
erigon --version
```

</TabItem> 
<TabItem value="nethermind" label="Nethermind">

```sh
nethermind --version
```

</TabItem> 
<TabItem value="besu" label="Besu">

```sh
besu --version
```

</TabItem> 
<TabItem value="nimbus2" label="Nimbus-Eth2">

```sh
nimbus_beacon_node --version
```

</TabItem> 
<TabItem value="lighthouse" label="Lighthouse">

```sh
# Consensus Client
lighthouse --version

# Validator Client
lighthouse vc --version
```

</TabItem> 
<TabItem value="teku" label="Teku">

```sh
# Consensus Client
teku --version

# Validator Client
teku validator-client --version
```

</TabItem> 
<TabItem value="prysm" label="Prysm">

```sh
# Consensus Client
prysm --version

# Validator Client
prysm validator --version
```

</TabItem> 
</Tabs>

:::info

If you encounter errors during the download or checkups, re-do the installation process.

:::

## 5. Node Startup

Controlling the LUKSO CLI to start and stop your node can be done with easy commands and flags.

:::tip

As the LUKSO networks are running [since 2023](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba), synchronizing the full blockchain state of the network can take multiple days. Validators can utilize checkpoints to start staking with the minimum required state proofs, while the full data set is downloaded in the background. Using such checkpoints significantly reduces downtime and penalties when doing maintenance.

:::

| Synchronization Mode    | Initial Sync Time | Description                                                                                                                                                                                                                                                                             |
| ----------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Regular Synchronization | 4 to 20 Hours     | - Dowloads the full data from genesis block using other peers <br /> - Must wait for complete download before validator is usable <br /> - Ideal for regular or archive nodes without staking                                                                                           |
| Automated Checkpoints   | 15 to 60 Minutes  | - Fetches the recently finalized checkpoint from an service endpoint <br /> - Back‑fills historical blocks and data until genesis in the background <br /> - Quick start for fresh installs, migrations, or recovery for stakers <br /> - Relies on access to the public checkpoint API |
| Manual Checkpoints      | 15 to 60 Minutes  | - Operator inputs flags and entry values manually via client flags <br /> - Back‑fills historical blocks and data until genesis in the background <br /> - Quick start for fresh installs, migrations, or recovery for stakers <br /> - Risk of stale or mistyped checkpoint values     |

:::warning

_Automated Checkpoints_ are only available in the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) from version `0.8` and above.

:::

<Tabs>
<TabItem value="regular-sync" label="Regular Synchronization">

```sh
# Starting the Mainnet Node without Staking
lukso start

# Starting the Testnet Node without Staking
lukso start --testnet
```

</TabItem> 
<TabItem value="automated-checkpoints" label="Automated Checkpoints">

```sh
# Starting the Mainnet Node without Staking
lukso start --checkpoint-sync

# Starting the Testnet Node without Staking
lukso start --testnet --checkpoint-sync
```

</TabItem> 
<TabItem value="manual-checkpoints" label="Manual Checkpoints">

- Visit the [Mainnet Checkpoint Explorer](https://checkpoints.mainnet.lukso.network/) or [Testnet Checkpoint Explorer](https://checkpoints.testnet.lukso.network/)
- Pass the latest **Block Root** and **Epoch** values to the consensus client flags

<Tabs>
<TabItem value="lighthouse" label="Lighthouse">

```sh
# Starting the Mainnet Node without Staking
lukso start \
  --lighthouse-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network \
  --lighthouse-genesis-state-url=https://checkpoints.mainnet.lukso.network \
  --lighthouse-wss-checkpoint=$<BLOCK_ROOT>:$<EPOCH>

# Starting the Testnet Node without Staking
lukso start --testnet \
  --lighthouse-checkpoint-sync-url=https://checkpoints.testnet.lukso.network \
  --lighthouse-genesis-state-url=https://checkpoints.testnet.lukso.network \
  --lighthouse-wss-checkpoint=$<BLOCK_ROOT>:$<EPOCH>
```

</TabItem> <TabItem value="teku" label="Teku">

```sh
# Starting the Mainnet Node without Staking
lukso start \
  --teku-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network \
  --teku-ws-checkpoint=$<BLOCK_ROOT>:$<EPOCH>

# Starting the Testnet Node without Staking
lukso start --testnet \
  --teku-checkpoint-sync-url=https://checkpoints.testnet.lukso.network \
  --teku-ws-checkpoint=$<BLOCK_ROOT>:$<EPOCH>
```

</TabItem> <TabItem value="prysm" label="Prysm">

```sh
# Starting the Mainnet Node without Staking
lukso start \
  --prysm-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network \
  --prysm-genesis-beacon-api-url=https://checkpoints.mainnet.lukso.network \
  --prysm-weak-subjectivity-checkpoint=$<BLOCK_ROOT>:$<EPOCH>

# Starting the Testnet Node without Staking
lukso start --testnet \
  --prysm-checkpoint-sync-url=https://checkpoints.testnet.lukso.network \
  --prysm-genesis-beacon-api-url=https://checkpoints.testnet.lukso.network \
  --prysm-weak-subjectivity-checkpoint=$<BLOCK_ROOT>:$<EPOCH>
```

</TabItem> <TabItem value="nimbus2" label="Nimbus-Eth2">

```sh
# Starting the Mainnet Node without Staking
lukso start \
  --nimbus2-external-beacon-api-url=https://checkpoints.mainnet.lukso.network \
  --nimbus2-trusted-block-root=$<BLOCK_ROOT> \
  --nimbus2-weak-subjectivity-checkpoint=$<BLOCK_ROOT>:$<EPOCH>

# Starting the Testnet Node without Staking
lukso start --testnet \
  --nimbus2-external-beacon-api-url=https://checkpoints.testnet.lukso.network
  --nimbus2-trusted-block-root=$<BLOCK_ROOT> \
  --nimbus2-weak-subjectivity-checkpoint=$<BLOCK_ROOT>:$<EPOCH>
```

</TabItem> 
</Tabs>

:::info

Replace the `<BLOCK_ROOT>` and `<EPOCH>` placeholders with the current hash and number while keeping the `$` sign.

:::

</TabItem> 
</Tabs>

:::tip

Details about logging client outputs can be found on the [**Problem Scanning**](/docs/guides/maintenance/problem-scanning.md) page of the [**Maintenance**](/docs/guides/maintenance/software-updates.md) section.

:::

:::note Folder Structure

After starting the node once, new folders were added, storing the fetched blockchain data and logs of the related network.

```text
lukso-node
│
├───configs                                   // Configuration Files
├───[network]-logs                            // Network's Logged Status Messages
├───[network]-data                            // Network's Blockchain Data
│   ├───consensus                             // Storage for used Consensus Client
│   ├───execution                             // Storage for used Execution Client
│   └───validator                             // Storage for Validator Client
|
└───cli-config.yaml                           // Global CLI Configuration
```

:::

## 6. Node Shutdown

Similar to initializing and starting the node from a working directory, you can stop all running clients at once.

```sh
# Stopping the Node
lukso stop
```

:::info

Ensure to stop the node before configuring the validator keys or apply further modifications within the next steps.

:::

---
sidebar_label: "6.3 LUKSO CLI Installation"
sidebar_position: 3
---

# 6.3 LUKSO CLI Installation

## 6.8 LUKSO CLI Node Setup

Now that we have prepared all ports, the firewall, and the router, we can install the blockchain clients used to participate in the network using the LUKSO CLI.

> If you want to use LUKSO's official Docker Configurations, have a look at the [Docker Setup](#) instead.

<!--TODO: ./13-docker-setup.md-->

Official Links:

- [LUKSO Mainnet Parameters](https://docs.lukso.tech/networks/mainnet/parameters)
- [LUKSO Testnet Parameters](https://docs.lukso.tech/networks/testnet/parameters)

### 6.8.1 What is the LUKSO CLI

The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) is a command line tool to install, manage and set up validators of different clients for the LUKSO blockchain. It automatically supports all clients officially tested by the LUKSO team and provides simple and unified commands to interact with them.

You can control configurations to events, the testnet, and the mainnet in one working directory- depending on which one you want to synchronize and use. The CLI is not limiting your capabilities of running the client manually- as all flags and configurations can be passed down to the services.

##### Supported Platforms

The LUKSO CLI is officially supported on Mac, Ubuntu, and Debian with the following architectures:

- `x86`/`x86_64`: Intel and AMD Processors
- `ARM`/`aarch64`: Single-Board Computers as M1 or Raspberry

> The experience might differ with other setups or versions of these operating systems.

In the background, the blockchain clients run directly on the operating system, i.e., in the user directory `/usr/local/` of the Ubuntu Server installation.

> Please see the [Docker Setup](#) guide if you want to run multiple networks simultaneously or need to have your application separated from the rest of the service running on your node machine.

<!--TODO: ./13-docker-setup.md-->

### 6.8.2 Installing the LUKSO CLI

Download and execute the LUKSO CLI installation script from the official URL. The CLI will be installed within the `/usr/local/bin/lukso` directory.

```sh
sudo curl https://install.lukso.network | sh
```

### 6.8.3 Creating the Working Directory

Its recommended to create the node's working directory in the home environment's path:

```sh
cd
```

Create a working directory for your node's data. The folder is where everything regarding your blockchain node will be stored. Make sure to choose a proper name for your node folder.

```sh
mkdir <your-node-folder>
```

Move into the working directory to initialize your node clients:

```sh
cd ./<your-node-folder>
```

### 6.8.4 Initialize the Node's Working Directory

If you're ready, we can continue initializing the working directory using the LUKSO CLI. It will download all dependencies and configuration files for all network types. It will create a `cli-config.yaml` and a `config` folder holding the genesis files, network properties, and client-specific configurations for the bootnodes.

#### What is a Bootnode?

When a new node connects to the Ethereum network, it needs to know the IP addresses of other nodes on the blockchain to start communicating with them. However, it may not have any prior information about the network, making it difficult to establish these connections.

Here is where the bootnode comes in. A bootnode is a publicly accessible node with a fixed IP address and is always available to accept incoming connections from new nodes. When a new node connects to the bootnode, it sends a message requesting a list of IP addresses of other nodes on the network. The bootnode responds with a list of IP addresses of other nodes it knows about, which the new node can then use to establish connections. When the network is starting, LUKSO will initialize the first bootnode connections.

```sh
lukso init
```

#### Initial Folder Structure

The folder structure after the initialization will look like this. For each network type, there are separate configurations files:

```text
lukso-node
│
├───configs                                 // Configuration
│   └───[network_type]                      // Network's Config Data
│       ├───shared
|       |   ├───genesis.json                // Genesis JSON Data
|       |   ├───genesis.ssz                 // Genesis Validator File
|       |   └───config.yaml                 // Global Client Config
│       ├───geth                            // Config for Geth Client
│       ├───prysm                           // Config for Prysm Client
│       ├───erigon                          // Config for Erigon Client
│       └───lighthouse                      // Config for Lighthouse Client
|
└───cli-config.yaml                         // Global CLI Configuration
```

### 6.8.5 Installing the Blockchain Clients

Afterward, you can install the clients that you wish to run. They will install globally but are set as default clients within your working directories config.

> If you want to run your node with validators, choose the Prysm consensus client, as we do not currently support other validator clients.

```sh
lukso install
```

> It seems there sometimes is an HTTP error during installation. If you encounter that the download did not complete, re-run the installation again, and you should be good.

> With CLI 0.6.0, Erigon seems not to work correctly on Intel Chips while using Ubuntu. Installing Geth is recommended as long as the compatibility errors are fixed.

All clients will be installed within the `/usr/local/bin/` folder.

You can check if they were installed correctly with the following commands. They will all print out their currently installed version numbers.

```sh
# Check Geth
geth --version

# Check Erigon
erigon --version

# Check Prysm
prysm --version

# Check Prysm Validator
validator --version
```

If you encounter errors during checkups, redo the installation process.

### 6.8.6 Starting and Stopping the Node

The following command will spin up your execution and consensus client and connect to the mainnet by default, but you can input the testnet or devnet flag so it relates to one of the other networks as well.

#### Regular Synchronization

Without specifying any flags, the node starts its normal synchronization process.

```sh
# Starting mainnet
lukso start

# Starting testnet
lukso start --testnet

# Stopping the running network
lukso stop
```

#### Checkpoint Synchronization

If you want more convenience and your validator to operate quickly, you can also use checkpoints. Checkpoint synchronization is a feature that significantly speeds up the initial sync time of the consensus client. If enabled, your node will begin syncing from a recently finalized consensus checkpoint instead of genesis. It will then download the rest of the blockchain data while your consensus is already running.

> After the synchronization is finalized, You will end up with the equal blockchain data. You can use the flag on every startup. However, it shows the most significant effect when synchronizing from scratch or after an extended downtime. The shortcut is ideal for fresh installations, validator migration, or recovery.

If you are using the LUKSO CLI Version 0.8 or above, checkpoint synchronization is built in:

```sh
# Starting Mainnet with Checkpoint
lukso start --checkpoint-sync

# Starting Testnet with Checkpoint
lukso start --testnet --checkpoint-sync
```

If your clients are not starting up or if you are using an older versions of the CLI, you can manually pass down the checkpoint flag to the consensus clients:

Visit the [Mainnet Checkpoint Explorer](https://checkpoints.mainnet.lukso.network/) and get the latest block root and epoch. Then input both values into the commands.

```sh
# Starting Mainnet with Checkpoint for Prysm Consensus Client
lukso start --prysm-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network \
--prysm-genesis-beacon-api-url=https://checkpoints.mainnet.lukso.network/ \
--prysm-weak-subjectivity-checkpoint=$<BLOCK_ROOT>:$<EPOCH>

# Starting Mainnet with Checkpoint for Lighthouse Consensus Client
lukso start --lighthouse-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network \
--lighthouse-genesis-beacon-api-url=https://checkpoints.mainnet.lukso.network/ \
--lighthouse-weak-subjectivity-checkpoint=$<BLOCK_ROOT>:$<EPOCH>

# Starting Testnet with Checkpoint for Prysm Consensus Client
lukso start --testnet --prysm-checkpoint-sync-url=https://checkpoints.testnet.lukso.network

# Starting Testnet with Checkpoint for Lighthouse Consensus Client
lukso start --testnet --lighthouse-checkpoint-sync-url=https://checkpoints.testnet.lukso.network
```

#### Startup Folder Structure

After first starting the LUKSO CLI, there will be new folders added to the node's working directory that store all your blockchain data for the corresponding network type:

```text
lukso-node
│
...
|
├───[network_type]-data                     // Network's Blockchain Data
│   ├───consensus                           // Storage of used Consensus Client
│   ├───execution                           // Storage of used Execution Client
│   └───validator                           // Storage of Validator Client
|
├───[network_type]-logs                     // Network's Logged Data
|
...
```

### 6.8.7 Checking the Node's Status

There are multiple ways of checking the node's status. The LUKSO CLI already comes with a bunch of them to check which clients are running and to look at the logs. These logs are then not only printed onto the screen but can also be saved as log files:

```sh
# Check the status of all clients
lukso status

# Check the logs of the running mainnet execution client
lukso logs execution

# Check the logs of the running mainnet consensus client
lukso logs consensus

# Check the logs of the running testnet execution client
lukso logs execution -- testnet

# Check the logs of the running testnet consensus client
lukso logs consensus -- testnet
```

#### Log File Search

The logging commands of the LUKSO CLI can also be used to search the logging files for warnings or errors. Checkups should be done regularly to be up to date with any upcoming connection, storage, or runtime issues. We can check if the user exists within the log files using `grep`, a powerful command-line tool for global expression search within files or text.

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

> After executing the command, the terminal is waiting for an input to show the log file. You will have to press the ENTER key in order to see the related logs you searched for.

In addition, Geth and Erigon clients provide their own default JSON-RPC interface that is enabled internally. Here, clients are listening for incoming JSON-RPC requests.

#### JSON-RPC

JSON-RPC is a remote procedure call protocol encoded in JSON. It is a lightweight, language-independent data-interchange format that is easy for humans to read and write and for machines to parse and generate. JSON-RPC allows for notifications and multiple calls to be sent to the server, which may be answered out of order.

In the context of blockchain and Ethereum, JSON-RPC is used as a way for applications to interact with the blockchain network. It provides a way to invoke methods on an Ethereum node, allowing applications to do things like querying blockchain data, sending transactions, and interacting with smart contracts.

If you're running an Ethereum node on your computer, it will typically expose a JSON-RPC interface on port 8545. This interface can be used by other applications on your computer or even on the internet, if appropriately configured, to interact with the Ethereum network.

#### Attach Clients

The `attach` command can interact with a running execution instance. Attaching the console to a particular port will open up a JavaScript console where you can execute JavaScript commands and interact with the Ethereum blockchain via your own node.

> **Note**: If you are using another client as Geth, please look at their documentation on configuring the JSON RPC endpoint! For Erigon, it's similar to Geth. However, there might be an error about the address already being used by the client, so you have to configure it first.

```sh
# Geth interface
geth attach http://localhost:8545

# Erigon interface
erigon attach http://localhost:8545
```

If you are listening to the port, you can check the clients:

```sh
# Check current blocknumber
> eth.blocknumber

# Check if the client is still syncing
> eth.syncing

# Output full function set
> eth

# Quick listening to port
> exit
```

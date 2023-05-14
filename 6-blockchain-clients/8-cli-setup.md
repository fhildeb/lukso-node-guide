## 6.8 LUKSO CLI Setup

Now that we have prepared all ports, the firewall and the router, we can actually install the blockchain clients used to participate in the network intself using the LUKSO CLI.

> If you want to use LUKSO's official Docker Configurations, have a look at the [Docker Setup](./9-docker-setup.md) instead.

Official Links:

- [LUKSO Mainnet Parameters](https://docs.lukso.tech/networks/mainnet/parameters)
- [LUKSO Testnet Parameters](https://docs.lukso.tech/networks/testnet/parameters)

### 6.8.1 What is the LUKSO CLI

The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) is a command line tool to install, manage and set up validators of different clients for the LUKSO blockchain. It automatically supports all clients that are officially tested from the LUKSO team and provides simple and unified commands to interact with them.

You can control configurations to devnets, the testnet, and the mainnet in one working directory- depending on which one you want to synchronize and use. That said, the CLI is in no way limiting your capabilities of running the client manually- as all flags and configurations can be passed down to the services.

In the background, the blockchain clients run directly on the operating system, i.e., in the user directory `/usr/local/` of the Ubuntu Server installation. The services are executed directly from the build and can be accessed via the terminal.

> Please see the [Docker Setup](./9-docker-setup.md) guide if you want to run multiple networks simultaneously or need to have your application separated from the rest of service running on your node machine.

### 6.8.2 Installing the LUKSO CLI

Download and execute the LUKSO CLI installation script from the official URL. The CLI will be installed within the `/usr/local/bin/lukso` directory

```sh
sudo curl https://install.lukso.network | sh
```

### 6.8.3 Creating the Working Directory

Create and move into a working directory for your node's data. This is where everything regarding your blockchain node will be stored. Make sure to choose a proper name for your node folder.

```sh
mkdir <your-node-folder>
```

```sh
cd ./<your-node-folder>
```

### 6.8.4 Initialize the Node's Working Directory

> **CAUTION**: Genesis files are not released yet. Any created node working directory before the geneis data release has to be re-initialized. If you dont want to run a testnet node before becoming a validator on mainnet, stop here and come back later when it's officially announced on [LUKSO's Twitter Account](https://twitter.com/lukso_io?s=20).

If you're ready, we can continue initializing the working directory using the LUKSO CLI. It will download all dependencies and configuration files for all network types. It will create a `cli-config.yaml` and an `config` folder holding the genesis files, network properties as well as client-specific configurations for the bootnodes.

#### What is a Bootnode?

When a new node connects to the Ethereum network, it needs to know the IP addresses of other nodes on the network so that it can start communicating with them. However, it may not have any prior information about the network, making it difficult to establish these connections.

This is where the bootnode comes in. A bootnode is a publicly accessible node that has a fixed IP address and is always available to accept incoming connections from new nodes. When a new node connects to the bootnode, it sends a message requesting a list of IP addresses of other nodes on the network. The bootnode responds with a list of IP addresses of other nodes it knows about, which the new node can then use to establish connections.

If the network is just starting and everyone is a genesis validator, your node wouldn't initially use bootnodes. But once the network is up and running, bootnodes could be designated to help new nodes join the network. This is the case for the LUKSO testnetworks.

```sh
lukso init
```

#### Initial Folder Structure

The folder structure after the initialization will look like this. For each network type there are separate configurations files:

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

Afterwards you can install the clients that you wish to run. They will install globally but are set as default clients within your working directories config.

> If you want to run your node with validators, make sure to choose the Prysm consensus client as we do not support other validator clients right now.

```sh
lukso install
```

All clients will be installed within the `/usr/local/bin/` folder.

### 6.8.6 Starting and Stopping the Node

The following command will spin up your execution and consensus client and connect to the mainnet by default, but you can input the testnet or devnet flag so it connects to one of the other networks as well.

```sh
# Starting mainnet
lukso start

# Starting testnet
lukso start --testnet

# Stopping the running network
lukso stop
```

#### Startup Folder Structure

After first starting the LUKSO CLI there will be new folders added to the node's working directory that stora all your blockchain dat for the corresponding network type:

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

There are multiple ways of checking the node's status. The LUKSO CLI already comes with a bunch of them to check which clients are running, and to look at the logs. These logs are then not only printed onto the screen, but can also be saved as log files:

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

In addition to this, Geth and Erigon clients both provide their own default JSON-RPC interface that is enabled internally. Here, clients are listeneing for incoming JSON-RPC requests.

#### JSON-RPC

JSON-RPC is a remote procedure call protocol encoded in JSON. It is a lightweight, language-independent data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate. JSON-RPC allows for notifications and for multiple calls to be sent to the server which may be answered out of order.

In the context of blockchain and Ethereum, JSON-RPC is used as a way for applications to interact with the blockchain network. It provides a way to invoke methods on an Ethereum node, allowing applications to do things like querying blockchain data, sending transactions, and interacting with smart contracts.

If you're running an Ethereum node on your computer, it will typically expose a JSON-RPC interface on port 8545. This interface can be used by other applications on your computer, or even on the internet (if appropriately configured), to interact with the Ethereum network.

#### Attach Clients

We can use the `attach` command to interact with a running execution instance. This will open up a JavaScript console where you can execute JavaScript commands and interact with the Ethereum blockchain via your own node.

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

# Check if client is still syncing
> eth.syncing

# Output full function set
> eth

# Quick listening to port
> exit
```

### 6.8.8 Importing the Validator Keys

If the the network started correctly and was syncing, you could continue setting up your validator if you would like to participate in the consensus of the blockchain too. There are different processes of becoming a validator for mainnet and testnet:

### a) Import and Key Setup for Mainnet

Only validators that deposited LYXe to the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) before it was frozen on May 9th 2023 can run the back structure of the network until the LYXe Migration is live on the LUKSO blockchain. The migration is [expected](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6) around one month after the initial network start.

Visit the official [Deposit Launchpad](https://deposit.mainnet.lukso.network/) and cautiously go through the process of generating keys and depositing stake to them, in case you have not already.

1. Guide: [Generate Deposit Keys](/validator-key-generation/).
2. Guide: [Deposit Stake in LYXe](/validator-key-stake/).

Copy your folder(s) of your deposit keys from your personal computer into the working directory of your node.

#### Secure Copy Protocol

SCP is a network protocol that enables secure file transfers between hosts on a network. It uses SSH for data transfer and utilizes the same mechanisms for authentication, thereby ensuring the authenticity and confidentiality of the data in transit.

For secure data transfer over the internet or within unsecured networks, SCP is a reliable and secure choice due to its underlying SSH protocol which encrypts the data in transit.

```sh
scp -i ~/.ssh/<ssh-key> -r <local-path-to-key-folder> <user-name>@<node-ip-address>:<node-path-to-node-folder>/<keyfolder-name>
```

Afterwards, import your keys within the LUKSO CLI. You will be asked for your folder with your validator keys and a new password for your validator node, needed to secure the wallet and restart the validator later on.

> If you have multiple key folders, make sure to run the `lukso validator import` command multiple times.

```sh
# Import validator keys for mainnet
lukso validator import
```

#### Validator Folder Structure

The import command will generate two new folders within the working directory: The keystore and the validator wallet.

```text
lukso-node
...
|
├───mainnet-keystore                        // Mainnet Validator Data
│   ├───keys                                // Encrypted Private Keys
│   ├───...                                 // Files for Signature Creation
|   ├───pubkeys.json                        // Validator Public Keys
|   ├───deposit_data.json                   // Deposit JSON for Validators
|   └───node_config.yaml                    // Node Configuration File
|
├───mainnet-wallet                          // Mainnet Transaction Data
|
...
```

#### List Imported Accounts

After importing one or multiple folders, you can check your imported keys:

```sh
# LUKSO CLI v. 0.6.0+
lukso validator list --mainnet

# Lukso CLI <0.6.0
validator accounts list --wallet-dir "mainnet-keystore"
```

### b) Import and Key Setup for Testnet

Testnet validators need to be whitelisted as they are seen as core members and organizations wanting to run and maintain their LUKSO Testnet node in a stable environment over a long period to ensure healthy uptimes, stability, and quick response times from clients as demand from developers rises.

If you want to become a whitelisted validator on our testnet, prepare your validator keys, set up your node environment, and contact `testnet-validators@lukso.network`. You will have to send your Ethereum address and some more details about your setup and involvement in the developer/network community. If you get whitelisted, you will also get a certain amount of LYXt to deposit your keys.

Visit the official [Testnet Deposit Launchpad](https://deposit.testnet.lukso.network/) and cautiously go through the process of generating keys and depositing stake to them, in case you have not already.

1. Guide: [Generate Deposit Keys](/validator-key-generation/).
2. Guide: [Deposit Stake in LYXt](/validator-key-stake/).

Copy your folder(s) of your deposit keys from your personal computer into the working directory of your node.

#### Secure Copy Protocol

SCP is a network protocol that enables secure file transfers between hosts on a network. It uses SSH for data transfer and utilizes the same mechanisms for authentication, thereby ensuring the authenticity and confidentiality of the data in transit.

For secure data transfer over the internet or within unsecured networks, SCP is a reliable and secure choice due to its underlying SSH protocol which encrypts the data in transit.

```sh
scp -i ~/.ssh/<ssh-key> -r <local-path-to-key-folder> <user-name>@<node-ip-address>:<node-path-to-node-folder>/<keyfolder-name>
```

Afterwards, import your keys within the LUKSO CLI. You will be asked for your folder with your validator keys and a new password for your validator node, needed to secure the wallet and restart the validator later on.

> If you have multiple key folders, make sure to run the `lukso validator import` command multiple times.

```sh
# Import validator keys for mainnet
lukso validator import --testnet
```

#### Validator Folder Structure

The import command will generate two new folders within the working directory: The keystore and the validator wallet.

```text
lukso-node
...
|
├───testnet-keystore                        // Testnet Validator Data
│   ├───keys                                // Encrypted Private Keys
│   ├───...                                 // Files for Signature Creation
|   ├───pubkeys.json                        // Validator Public Keys
|   ├───deposit_data.json                   // Deposit JSON for Validators
|   └───node_config.yaml                    // Node Configuration File
|
├───testnet-wallet                          // Testnet Transaction Data
|
...
```

#### List Imported Accounts

After importing one or multiple folders, you can check your imported keys:

```sh
# LUKSO CLI v. 0.6.0+
lukso validator list --testnet

# Lukso CLI <0.6.0
validator accounts list --wallet-dir "testnet-keystore"
```

### 6.8.9 Removing the Key Folder

If your imported keys match the ones in the original folder you used to import, you can delete the folder used for it. You wont need the original files anymore.

You can use the `rm` command, used to remove files and directories while using the `-r` recursive method. It will assure to remove directories and their contents within the pointed folder. You can also skip the confirmation questions or file errors using `-rf` instead. Make sure to adjust the path to your key-folder.

```sh
rm -rf ./<validator-key-folder>
```

### 6.8.10 Starting the Validator

After importing your keys you can start the node with the validator functionality. If the node is already synced and running, the `lukso start` command will do a restart automatically.

In order to start the validator, you have to pass a minimum fo two flags:

- `--validator`: Not only (re-)starts the installed and configured clients including the validator
- `transaction-fee-recipient`: Your transaction fee recipient address, which will receive all block rewards and tips from transactions. This could be any Ethereum address you have control over: MetaMask, Ledger, or any other wallet that has the functionality to connect with LUKSO or custom networks. Ledger accounts, for instance, are secure and can be imported into MetaMask to send transactions on custom networks.

##### Starting up mainnet validator

```sh
lukso validator start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>"
```

##### Starting up testnet validator

```sh
lukso validator start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>" --testnet
```

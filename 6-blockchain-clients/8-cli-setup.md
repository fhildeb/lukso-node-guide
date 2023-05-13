## 6.8 LUKSO CLI Setup

Now that we have prepared all ports, the firewall and the router, we can actually install the blockchain clients used to participate in the network intself.

Official Links:

- [LUKSO Mainnet Parameters](https://docs.lukso.tech/networks/mainnet/parameters)
- [LUKSO Testnet Parameters](https://docs.lukso.tech/networks/testnet/parameters)

### 6.8.1 What is the LUKSO CLI

The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) is a command line tool to install, manage and set up validators of different clients for the LUKSO blockchain. It automatically supports all clients that are officially tested from the LUKSO team and provides simple and unified commands to interact with them.

You can control configurations to devnets, the testnet, and the mainnet in one working directory- depending on which one you want to synchronize and use. That said, the CLI is in no way limiting your capabilities of running the client manually- as all flags and configurations can be passed down to the services.

In the background, the blockchain clients run directly on the operating system, i.e., in the user directory `/usr/local/` of the Ubuntu Server installation. The services are executed directly from the build and can be accessed via the terminal.

> Please see the Docker installation guide if you want to run multiple networks simultaneously or need to have your application separated from the rest of service running on your node machine.

### 6.8.2 Installing the CLI

Download and execute the LUKSO CLI installation script from the official URL. The CLI will be installed within the `/usr/local/bin/lukso` directory

```sh
sudo curl https://install.lukso.network | sh
```

### 6.8.3 Create the Working Directory

Create and move into a working directory for your node's data. This is where everything regarding your blockchain node will be stored. Make sure to choose a proper name for your node folder.

```sh
mkdir <your-node-folder>
```

```sh
cd ./<your-node-folder>
```

#### 6.8.5 Initialize the Node's Working Directory

> **CAUTION**: Genesis files are not released yet. Any created node working directory before the geneis data release has to be re-initialized. If you dont want to run a testnet node before becoming a validator on mainnet, stop here and come back later when it's officially announced on [LUKSO's Twitter Account](https://twitter.com/lukso_io?s=20).

If you're ready, we can continue initializing the working directory using the LUKSO CLI. It will download all dependencies and configuration files for all network types. It will create a `cli-config.yaml` and an `config` folder holding the genesis files, network properties as well as client-specific configurations.

```sh
lukso init
```

### 6.8.4 Installing the blockchain clients

Afterwards you can install the clients that you wish to run. They will install globally but are set as default clients within your working directories config.

> If you want to run your node with validators, make sure to choose the Prysm consensus client as we do not support other validator clients right now.

```sh
lukso install
```

### 6.8.5 Starting and Stopping the Node

The following command will spin up your execution and consensus client and connect to the mainnet by default, but you can input the testnet or devnet flag so it connects to one of the other networks as well.

```sh
# Starting mainnet
lukso start

# Starting testnet
lukso start --testnet

# Stopping the running network
lukso stop
```

### 6.8.6 Checking the Node's Status

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

### 6.8.7 Importing the Validator Keys

#### Mainnet

Only validators that deposited LYXe to the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) before it was frozen on May 9th 2023 can run the back structure of the network until the LYXe Migration is live on the LUKSO blockchain. The migration is [expected](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6) around one month after the initial network start.

Visit the official [Deposit Launchpad](https://deposit.mainnet.lukso.network/) and cautiously go through the process of generating keys and depositing stake to them, in case you have not already.

1. Guide: [Generating deposit keys](/validator-key-generation/).
2. Guide: [Depositing your LYXe](/validator-key-stake/).

> Copy your folder(s) of your deposit keys into your working directory.

Afterwards, import your keys within the LUKSO CLI. You will be asked for your folder with your validator keys and a new password for your validator node, needed to secure the wallet and restart the validator later on.

> If you have multiple key folders, make sure to run the `lukso validator import` command multiple times.

```sh
# Import validator keys for mainnet
lukso validator import
```

After importing your keys you can start the node with the validator functionality. If the node is already synced and running, the `lukso start` command will do a restart automatically.

In order to start the validator, you have to pass a minimum fo two flags:

- `--validator`: Not only (re-)starts the installed and configured clients including the validator
- `transaction-fee-recipient`: Your transaction fee recipient address, which will receive all block rewards and tips from transactions. This could be any Ethereum address you have control over: MetaMask, Ledger, or any other wallet that has the functionality to connect with LUKSO or custom networks. Ledger accounts, for instance, are secure and can be imported into MetaMask to send transactions on custom networks.

```sh
lukso validator start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>"
```

##### Testnet

TODO:

For Testnet, only whitelisted... WIP

```sh
# Import validator keys for testnet
lukso validator import --testnet
```

### 6.8.8 Starting the Validator

TODO:

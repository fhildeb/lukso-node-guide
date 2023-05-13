## 6.8 LUKSO CLI Setup

Now that we have prepared all ports, the firewall and the router, we can actually install the blockchain clients used to participate in the network intself.

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

### 6.8.3 Initialise the Working Directory

Create and move into a working directory for your node's data. This is where everything regarding your blockchain node will be stored. Make sure to choose a proper name for your node folder.

```sh
mkdir <your-node-folder>
```

```sh
cd ./<your-node-folder>
```

Now we can continue initializing the working directory using the LUKSO CLI. It will download all dependencies and configuration files for all network types. It will create a `cli-config.yaml` and an `config` folder holding the genesis files, network properties as well as client-specific configurations.

```sh
lukso init
```

### 6.8.4 Installing the blockchain client

Afterwards you can install the clients that you wish to run. They will install globally but are set as default clients within your working directories config.

> If you want to run your node with validators, make sure to choose the Prysm consensus client as we do not support other validator clients right now.

```sh
lukso install
```

### 6.8.6 Starting the Node

TODO:

### 6.8.5 Importing your Validator Keys

> Only Genesis Validators can run the back structure of the network until the LYXe Migration is live roughly expected one month after the network's launch. The corresponding Genesis Deposit Contract was frozen on the 9th of May.
>
> If you deposited your LYXe using the Genesis Deposit Contract or are whitelisted as validator for the testnet, you can continue becoming a genesis validator

### 6.8.6 Starting the Validator

TODO:

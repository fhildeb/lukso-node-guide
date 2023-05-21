## 6.9 LUKSO CLI Validator Setup

If the network started correctly and was syncing, we can continue setting up your validator if you would like to participate in the blockchain consensus.

### 6.9.1 Validator Credentials

When becoming a validator, you must manage passwords, addresses, and keys. Let's clear them up once again before we start the CLI process:

- **Validator Mnemonic Seed**: This is a phrase that is used to generate your _Validator Deposit Keys_ and your _Deposit Data_. The mnemonic seed is a series of words that act as a seed to generate your keys and addresses. It's the most critical piece of information that you need to store securely and privately. If someone else gets access to your mnemonic seed, they could potentially regenerate your validator and gain access to your staked LYX/LYXt. On the other hand, if you lose your mnemonic seed and don't have your keys backed up, you could lose access to your staked LYX/LYXt. The mnemonic seed should be written down and stored in a secure location. Storing multiple copies in different secured locations is often recommended to protect against loss or damage.
- **Validator Key Password**: This password is used to encrypt each individual _Validator Deposit Key_. Every time you import a validator key into your validator client, you'll need to provide this password. It's important to note that each validator key can have its unique password. Separate passwords would mean that if you're importing multiple keys, you may need to provide multiple passwords. Your key passwords should be strong, unique, and securely stored like your wallet password. If you create multiple batches of validator keys, all keys within one folder will have the same password.
- **Validator Deposit Key**: A keystore file encrypts your private key using the _Validator Key Password_. It is generated for each potential deposit you want to make. It can be used to import your validator key into a validator client. It's important to store your keystore files securely, as anyone with access to your keystore file and its password would have access to your validator key. If you lose your keystore file, you can regenerate it using your _Validator Mnemonic Seed_, assuming you have also stored it securely. With it, the client can verify if you deposited the required 32 LYX/LYXe to become an active validator.
- **Deposit Data**: This is a JSON file generated when you set up your validator using your _Validator Mnemonic Seed_. The JSON file includes various essential pieces of information, such as your public key and a signature. This file is used as part of the process to register your validator on the blockchain using transactions.
- **Validator Wallet Password**: This password is used to secure the wallet holding your _Validator Deposit Keys_. The wallet password should be strong, unique, and known only to you. This password will be needed every time you start your validator client.
- **Validator Withdrawal Address**: This is the Ethereum address where your funds will be sent when you stop validating and withdrawing your staked LYX. For more information, you can check the [Withdrawals and Earnings](02-network-theory.md) section of the guide.
- **Validator Recipient Fee Address**: This is the Ethereum address where the transaction fees you earn as a validator will be sent. Depending on your setup, this might be the same as your withdrawal address. For more information, you can check the [Withdrawals and Earnings](02-network-theory.md) section of the guide.

### 6.9.2 Import Mainnet Keys

> If you want to import testnet validator keys, have a look at the [Importing Testnet Keys](#692-import-testnet-keys) guide.

Only validators that deposited LYXe to the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) before it was frozen on May 9th, 2023 can run the back structure of the network until the LYXe Migration is live on the LUKSO blockchain. The migration is [expected](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6) around one month after the initial network start.

Visit the official [Deposit Launchpad](https://deposit.mainnet.lukso.network/) and cautiously go through the process of generating keys and depositing stakes to them, in case you have not already.

1. Guide: [Generate Deposit Keys](/validator-key-generation/).
2. Guide: [Deposit Stake in LYXe](/validator-key-stake/).

Copy your folder(s) of your deposit keys from your personal computer into the working directory of your node.

#### Secure Copy Protocol

SCP is a network protocol that enables secure file transfers between hosts on a network. It uses SSH for data transfer and utilizes the exact mechanisms for authentication, in our case, authentication using a key, thereby ensuring the authenticity and confidentiality of the data in transit.

SCP is a reliable and secure choice for data transfer over the internet or within unsecured networks due to its underlying SSH protocol, which encrypts the data in transit.

> The command uses quite a few properties and flags. Opening up a text editor and copying the contents is recommended. If you're using a Unix-based system like Linux or Mac, you can follow these steps to get the data quickly:

- `<ssh-key>`: Check your SSH keys within the SSH folder using `ls ~/.ssh/` from the terminal of your personal computer. Search for your generated key file and write down the name.
- `<local-path-to-key-folder>`: Open your file explorer and localize the keystore folder with all your validator keys on your personal computer. Right-click and `Copy Path`. Then copy it to your editor.
- `<your-ssh-port>`, `<user-name>` and `<node-ip-address>`: Open your SSH configuration file on your personal computer using `vim ~/.ssh/config`. Write down the Port, IP, and User of your node.
- `<node-path-to-node-folder>`: Open your node's working directory on your node and run the `pwd` command. Then copy the full path.
- `<keyfolder-name>`: Define a new name for the validator folder. It can be the same as on your personal computer and is used for importing the keys. We will remove it after.

> Build the entire command and copy it to your personal computer's terminal. You will be prompted to log in again.

```sh
scp -P <your-ssh-port> -i ~/.ssh/<ssh-key> -r <local-path-to-key-folder> <user-name>@<node-ip-address>:<node-path-to-node-folder>/<keyfolder-name>
```

Afterward, import your keys within the LUKSO CLI. You will be asked for your folder with your validator keys and a new password for your validator node, which is needed to secure the wallet and restart the validator later on.

> If you have multiple sets of keys in different folders, run the `lukso validator import` command numerous times.

```sh
# Import validator keys for mainnet
lukso validator import --validator-keys "./<key-folder-name>"
```

#### Validator Folder Structure

The import command will generate two new folders within the working directory: The keystore and the validator wallet.

```text
lukso-node
...
|
├───mainnet-keystore                        // Testnet Validator Wallet
│   ├───keys                                // Encrypted Private Keys
│   ├───...                                 // Files for Signature Creation
|   ├───pubkeys.json                        // Validator Public Keys
|   ├───deposit_data.json                   // Deposit JSON for Validators
|   └───node_config.yaml                    // Node Configuration File
|
...
```

#### List Imported Mainnet Accounts

After importing one or multiple folders, you can check your imported keys. Adjust the flag to the network's validator key folder.

```sh
# LUKSO CLI v. 0.6.0+
lukso validator list --mainnet

# Lukso CLI v. <0.6.0
validator accounts list --wallet-dir "mainnet-keystore"
```

### 6.9.3 Import Testnet Keys

> If you want to import testnet validator keys, have a look at the [Importing Mainnet Keys](#691-import-mainnet-keys) guide.

Testnet validators need to be whitelisted as they are seen as core members and organizations wanting to run and maintain their LUKSO Testnet node in a stable environment over a long period to ensure healthy uptimes, stability, and quick response times from clients as demand from developers rises.

If you want to become a whitelisted validator on our testnet, prepare your validator keys, set up your node environment, and contact `testnet-validators@lukso.network`. You must send your Ethereum address and more details about your setup and involvement in the developer/network community. If you get whitelisted, you will also get a certain amount of LYXt to deposit your keys.

Visit the official [Testnet Deposit Launchpad](https://deposit.testnet.lukso.network/) and cautiously go through the process of generating keys and depositing stakes to them, in case you have not already.

1. Guide: [Generate Deposit Keys](/validator-key-generation/).
2. Guide: [Deposit Stake in LYXt](/validator-key-stake/).

Copy your folder(s) of your deposit keys from your personal computer into the working directory of your node.

#### Secure Copy Protocol

SCP is a network protocol that enables secure file transfers between hosts on a network. It uses SSH for data transfer and utilizes the exact mechanisms for authentication, in our case, authentication using a key, thereby ensuring the authenticity and confidentiality of the data in transit.

SCP is a reliable and secure choice for data transfer over the internet or within unsecured networks due to its underlying SSH protocol, which encrypts the data in transit.

> The command uses quite a few properties and flags. Opening up a text editor and copying the contents is recommended. If you're using a Unix-based system like Linux or Mac, you can follow these steps to get the data quickly:

- `<ssh-key>`: Check your SSH keys within the SSH folder using `ls ~/.ssh/` from the terminal of your personal computer. Search for your generated key file and write down the name.
- `<local-path-to-key-folder>`: Open your file explorer and localize the keystore folder with all your validator keys on your personal computer. Right-click and `Copy Path`. Then copy it to your editor.
- `<your-ssh-port>`, `<user-name>` and `<node-ip-address>`: Open your SSH configuration file on your personal computer using `vim ~/.ssh/config`. Write down the Port, IP, and User of your node.
- `<node-path-to-node-folder>`: Open your node's working directory on your node and run the `pwd` command. Then copy the full path.
- `<keyfolder-name>`: Define a new name for the validator folder. It can be the same as on your personal computer and is used for importing the keys. We will remove it after.

> Build the entire command and copy it to your personal computer's terminal. You will be prompted to log in again.

```sh
# Import validator keys for testnet
lukso validator import --testnet --validator-keys "./<key-folder-name>"
```

#### Validator Folder Structure

The import command will generate two new folders within the working directory: The keystore and the validator wallet.

```text
lukso-node
...
|
├───testnet-keystore                        // Testnet Validator Wallet
│   ├───keys                                // Encrypted Private Keys
│   ├───...                                 // Files for Signature Creation
|   ├───pubkeys.json                        // Validator Public Keys
|   ├───deposit_data.json                   // Deposit JSON for Validators
|   └───node_config.yaml                    // Node Configuration File
|
...
```

### 6.9.4 List Imported Testnet Accounts

After importing one or multiple folders, you can check your imported keys:

```sh
# LUKSO CLI v. 0.6.0+
lukso validator list --testnet

# Lukso CLI v. <0.6.0
validator accounts list --wallet-dir "testnet-keystore"
```

### 6.9.5 Removing the Key Folder

If your imported keys match the ones in the original folder you used to import, you can delete the folder used. You won't need the original files anymore.

You can use the `rm` command to remove files and directories while using the `-r` recursive method. It will ensure to remove directories and their contents within the pointed folder. You can skip the confirmation questions or file errors using `-rf` instead. Make sure to adjust the path to your key-folder.

```sh
rm -rf ./<validator-key-folder>
```

### 6.9.6 Starting the Validator

After importing your keys, you can start the node with the validator functionality. If the node is already synced and running, the `lukso start` command will do a restart automatically.

To start the validator, you have to pass a minimum of two flags:

- `--validator`: Not only (re-)starts the installed and configured clients, including the validator
- `transaction-fee-recipient`: Your transaction fee recipient address, which will receive all block rewards and tips from transactions. The recipient could be any Ethereum address you have control over, like MetaMask, Ledger, or any other wallet that has the functionality to connect with LUKSO or custom networks. Ledger accounts, for instance, are secure and can be imported into MetaMask to send transactions on custom networks.

> If you want to set custom flags to the start command, like the graffiti from the previous section or a custom stat page connection, make sure to add them to the following commands:

##### Starting up mainnet validator

```sh
lukso start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>"
```

##### Starting up testnet validator

```sh
lukso start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>" --testnet
```

### 6.9.7 Slasher Config

Implementing and running the slasher service is included in the consensus client by default. It actively watches for slashable offenses on the network and can be resource-intensive. It's generally beneficial for network security if most nodes independently check for slashing conditions. However, if you have a low-performance node, it could lead to the following problems:

- The slasher service could lag behind the head of the chain, making it ineffective at timely detecting slashable offenses.
- The node could become unstable and crash due to running out of resources, disrupting its participation in the consensus process and potentially leading to penalties if it's also running a validator client.
- The service could slow down other processes running on the same node, such as if it's also running a beacon node or validator client.

Typical requirements for the slasher service are a modern multi-core CPU, 16GB of RAM, and an SSD with a decent size. Look at the [Storage Comparison](./03-client-theory.md) section for more details on disk usage.

If you can not keep up or have an old machine unable to run the slasher functionality, you can disable it using a CLI flag. Make sure you use your transaction fee recipient address.

##### Starting up mainnet validator without a slasher

```sh
lukso start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>" --no-slasher
```

##### Starting up testnet validator without a slasher

```sh
lukso start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>" --testnet --no-slasher
```

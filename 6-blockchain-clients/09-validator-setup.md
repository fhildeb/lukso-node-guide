## 6.9 LUKSO CLI Validator Setup

If the the network started correctly and was syncing, we are able to continue setting up your validator if you would like to participate in the consensus of the blockchain.

### 6.9.1 Validator Credentials

When becoming a validator, you will have to manage some passwords, addresses and keys. Let's clear them up once again before we start the CLI process:

- **Validator Mnemonic Seed**: This is a phrase that is used to generate your _Validator Deposit Keys_ and your _Deposit Data_. The mnemonic seed is a series of words that act as a seed to generate your keys and addresses. It's the most critical piece of information that you need to store securely and privately. If someone else gets access to your mnemonic seed, they could potentially regenerate your validator and gain access to your staked LYX/LYXt. On the other hand, if you lose your mnemonic seed and don't have your keys backed up, you could lose access to your staked LYX/LYXt. The mnemonic seed should be written down and stored in a secure location. It's often recommended to store multiple copies in different secured locations to protect against loss or damage.
- **Validator Key Password**: This password is used to encrypt each individual _Validator Deposit Key_. Every time you import a validator key into your validator client, you'll need to provide this password. It's important to note that each validator key can have its own unique password. This means that if you're importing multiple keys, you may need to provide multiple passwords. Like your wallet password, your key passwords should be strong, unique, and securely stored. In case you created multiple batches of validator keys, all keys within one folder will have the same password.
- **Validator Deposit Key**: It is a keystore file which encrypts your private key using the _Validator Key Password_. It is generated for each potential deposit you want to make. It can be used to import your validator key into a validator client. It's important to store your keystore files securely, as anyone with access to your keystore file and its password would have access to your validator key. If you lose your keystore file, you can regenerate it using your _Validator Mnemonic Seed_, assuming you have also kept that securely stored. With it, the client can verify if you deposited the required 32 LYX/LYXe to become an active validator.
- **Deposit Data**: This is a JSON file that is generated when you set up your validator using your _Validator Mnemonic Seed_. The JSON file includes various important pieces of information, such as your public key and a signature. This file is used as part of the process to register your validator on the blockchain using transactions.
- **Validator Wallet Password**: This password is used to secure the wallet that will hold your _Validator Deposit Keys_. The wallet password should be strong and unique, and known only to you. This password will be needed every time you are starting your validator client.
- **Validator Withdrawal Address**: This is the Ethereum address where your funds will be sent when you decide to stop validating and withdraw your staked LYX. You can check the [Withdrawals and Earnings](02-network-theory.md) section of the guide for more information.
- **Validator Recipient Fee Address**: This is the Ethereum address where the transaction fees you earn as a validator will be sent. Depending on your setup, this might be the same as your withdrawal address. You can check the [Withdrawals and Earnings](02-network-theory.md) section of the guide for more information.

### 6.9.2 Import Mainnet Keys

> If you want to import testnet validator keys, have a look at the [Importing Testnet Keys](#692-import-testnet-keys) guide.

Only validators that deposited LYXe to the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) before it was frozen on May 9th 2023 can run the back structure of the network until the LYXe Migration is live on the LUKSO blockchain. The migration is [expected](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6) around one month after the initial network start.

Visit the official [Deposit Launchpad](https://deposit.mainnet.lukso.network/) and cautiously go through the process of generating keys and depositing stake to them, in case you have not already.

1. Guide: [Generate Deposit Keys](/validator-key-generation/).
2. Guide: [Deposit Stake in LYXe](/validator-key-stake/).

Copy your folder(s) of your deposit keys from your personal computer into the working directory of your node.

#### Secure Copy Protocol

SCP is a network protocol that enables secure file transfers between hosts on a network. It uses SSH for data transfer and utilizes the same mechanisms for authentication, thereby ensuring the authenticity and confidentiality of the data in transit.

For secure data transfer over the internet or within unsecured networks, SCP is a reliable and secure choice due to its underlying SSH protocol which encrypts the data in transit.

> For this command huge command, its recommended to open up a text editor and copy the contents in. If you're using Unix (Linux or Mac) you can follow these steps to get the data quickly:

- `<ssh-key>`: On your personal machine check your SSH keys within the SSH folder by using `ls ~/.ssh/` from the terminal. Search for your generated keyfile and write down the name.
- `<local-path-to-key-folder>`: On your personal machine, open your file explorer and localize the keystore folder with all your validator keys in it. Right click and `Copy Path`. Then copy it to your editor.
- `<your-ssh-port>`, `<user-name>` and `<node-ip-address>`: Open your SSH configuration file on your personal computer using `vim ~/.ssh/config`. Write down the Port, IP, and the User of your node.
- `<node-path-to-node-folder>`: Open your node folder on your node machine any type `pwd`. Then copy the full path.
- `<keyfolder-name>`: Define a new name for the validator folder folder. It can be the same as on your personal machine.

> Build the full command and copy it to your personal computer's terminal. You will be promted to log in again.

```sh
scp -P <your-ssh-port> -i ~/.ssh/<ssh-key> -r <local-path-to-key-folder> <user-name>@<node-ip-address>:<node-path-to-node-folder>/<keyfolder-name>
```

Afterwards, import your keys within the LUKSO CLI. You will be asked for your folder with your validator keys and a new password for your validator node, needed to secure the wallet and restart the validator later on.

> If you have multiple key folders, make sure to run the `lukso validator import` command multiple times.

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

#### List Imported Mainnet Accounts

After importing one or multiple folders, you can check your imported keys. Adjust the flag to the network network's validator key folder.

```sh
# LUKSO CLI v. 0.6.0+
lukso validator list --mainnet

# Lukso CLI <0.6.0
validator accounts list --wallet-dir "mainnet-keystore"
```

### 6.9.3 Import Testnet Keys

> If you want to import testnet validator keys, have a look at the [Importing Mainnet Keys](#691-import-mainnet-keys) guide.

Testnet validators need to be whitelisted as they are seen as core members and organizations wanting to run and maintain their LUKSO Testnet node in a stable environment over a long period to ensure healthy uptimes, stability, and quick response times from clients as demand from developers rises.

If you want to become a whitelisted validator on our testnet, prepare your validator keys, set up your node environment, and contact `testnet-validators@lukso.network`. You will have to send your Ethereum address and some more details about your setup and involvement in the developer/network community. If you get whitelisted, you will also get a certain amount of LYXt to deposit your keys.

Visit the official [Testnet Deposit Launchpad](https://deposit.testnet.lukso.network/) and cautiously go through the process of generating keys and depositing stake to them, in case you have not already.

1. Guide: [Generate Deposit Keys](/validator-key-generation/).
2. Guide: [Deposit Stake in LYXt](/validator-key-stake/).

Copy your folder(s) of your deposit keys from your personal computer into the working directory of your node.

#### Secure Copy Protocol

SCP is a network protocol that enables secure file transfers between hosts on a network. It uses SSH for data transfer and utilizes the same mechanisms for authentication, thereby ensuring the authenticity and confidentiality of the data in transit.

For secure data transfer over the internet or within unsecured networks, SCP is a reliable and secure choice due to its underlying SSH protocol which encrypts the data in transit.

> For this command huge command, its recommended to open up a text editor and copy the contents in. If you're using Unix (Linux or Mac) you can follow these steps to get the data quickly:

- `<ssh-key>`: On your personal machine check your SSH keys within the SSH folder by using `ls ~/.ssh/` from the terminal. Search for your generated keyfile and write down the name.
- `<local-path-to-key-folder>`: On your personal machine, open your file explorer and localize the keystore folder with all your validator keys in it. Right click and `Copy Path`. Then copy it to your editor.
- `<your-ssh-port>`, `<user-name>` and `<node-ip-address>`: Open your SSH configuration file on your personal computer using `vim ~/.ssh/config`. Write down the Port, IP, and the User of your node.
- `<node-path-to-node-folder>`: Open your node folder on your node machine any type `pwd`. Then copy the full path.
- `<keyfolder-name>`: Define a new name for the validator folder folder. It can be the same as on your personal machine.

> Build the full command and copy it to your personal computer's terminal. You will be promted to log in again.

```sh
scp -P -i ~/.ssh/<ssh-key> -r <local-path-to-key-folder> <user-name>@<node-ip-address>:~/<node-folder>/<keyfolder-name>
```

Afterwards, import your keys within the LUKSO CLI. You will be asked for your folder with your validator keys and a new password for your validator node, needed to secure the wallet and restart the validator later on.

> If you have multiple key folders, make sure to run the `lukso validator import` command multiple times.

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

### 6.9.4 List Imported Testnet Accounts

After importing one or multiple folders, you can check your imported keys:

```sh
# LUKSO CLI v. 0.6.0+
lukso validator list --testnet

# Lukso CLI <0.6.0
validator accounts list --wallet-dir "testnet-keystore"
```

### 6.9.5 Removing the Key Folder

If your imported keys match the ones in the original folder you used to import, you can delete the folder used for it. You wont need the original files anymore.

You can use the `rm` command, used to remove files and directories while using the `-r` recursive method. It will assure to remove directories and their contents within the pointed folder. You can also skip the confirmation questions or file errors using `-rf` instead. Make sure to adjust the path to your key-folder.

```sh
rm -rf ./<validator-key-folder>
```

### 6.9.6 Starting the Validator

After importing your keys you can start the node with the validator functionality. If the node is already synced and running, the `lukso start` command will do a restart automatically.

In order to start the validator, you have to pass a minimum fo two flags:

- `--validator`: Not only (re-)starts the installed and configured clients including the validator
- `transaction-fee-recipient`: Your transaction fee recipient address, which will receive all block rewards and tips from transactions. This could be any Ethereum address you have control over: MetaMask, Ledger, or any other wallet that has the functionality to connect with LUKSO or custom networks. Ledger accounts, for instance, are secure and can be imported into MetaMask to send transactions on custom networks.

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

Implementing and running the slasher service is included in the consensus client by default. It actively watches for slashable offenses on the network and can be quite resource-intensive. It's generally beneficial for network security if the majority of nodes are independently checking for slashing conditions, however, if you have a low performance node it could lead to the following problems:

- The slasher service could lag behind the head of the chain, making it ineffective at detecting slashable offences in a timely manner.
- The node could become unstable and crash due to running out of resources, which could disrupt its participation in the consensus process and potentially lead to penalties if it's also running a validator client.
- The service could slow down other processes running on the same node, such as if it's also running a beacon node or validator client.

Typical requirements for the slasher service are a modern multi-core CPU, 16GB or RAM and an SSD with decent size. Have a look at the [Storage Comparison](./03-client-theory.md) section for more details on the disk usage.

In case you can not keep up or have an old machine not able to run the slasher functionalty, you can disable it using a CLI flag. Make sure you use your own transaction fee recipient address.

##### Starting up mainnet validator without slasher

```sh
lukso start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>" --no-slasher
```

##### Starting up testnet validator without slasher

```sh
lukso start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>" --testnet --no-slasher
```

---
sidebar_label: "6.4 Validator Configuration"
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 6.4 Validator Configuration

After your [node is configured](/docs/guides/client-setup/lukso-cli-installation.md) and client startup was tested, you can activate its staking functionality by importing your validator keys. Running a validator node means you're actively participating in the blockchain's consensus on top of providing a synchronized data peer of the network. The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) provides unified commands to manage staking for mainnet and testnet and various clients.

:::tip

Please ensure you have a basic understanding of blockchain networks and staking before running a validator node. If you're not yet familiar with [proof of stake](/docs/theory/blockchain-knowledge/proof-of-stake.md), [tokenomics](/docs/theory/blockchain-knowledge/tokenomics.md), [panelties](/docs/theory/blockchain-knowledge/slashing-and-panelties.md), and the different [validator credentials](/docs/theory/node-operation/validator-credentials.md) and [client providers](/docs/theory/blockchain-knowledge/client-providers.md), you can refer to the [**🧠 Theory**](/docs/theory/blockchain-knowledge/proof-of-stake.md) section.

:::

:::warning

Depending on if you are participating in the mainnet or testnet, running a validator requires 32 LYX or 32 LYXt per validator key. Ensure you have completed the [key generation](/docs/guides/validator-setup/wagyu-key-generation.md) and [deposit process](/docs/guides/validator-setup/launchpad-walkthrough.md) of the [validator setup](/docs/guides/validator-setup/precautions.md) before importing keys.
:::

## 1. Transfer Validator Keys

Once you've completed the [validator setup](/docs/guides/validator-setup/precautions.md), you will be left with one or multiple folders containing the encrypted validator key files, depending on if you split the deposits or withdrawals to multiple wallets. These deposit files will first have to be sent from your personal computer to your node, before they can be imported into the consensus client.

:::tip SCP

The [Secure Copy Protocol](https://en.wikipedia.org/wiki/Secure_copy_protocol) is used for secure file transfers between hosts on a network. It operates over SSH, leveraging its authentication and encryption mechanisms to ensure both the authenticity and confidentiality of the data during transfer. SCP is a reliable choice for data transfers, offering secure transmission even over unsecured networks.

:::

Build the entire command and execute it in the personal. You will be prompted to log in again before the process is started.

:::info

The following steps are performed on your 💻 **personal computer**.

:::

```sh
scp -P <ssh-port> -i ~/.ssh/<ssh-key> -r <key-folder> <user-name>@<node-ip>:<node-folder>/<keyfolder>
```

:::warning

The command uses quite a few properties and flags. Replace all properties with specific values of your SSH and node configuration. Opening up a text editor before copying the contents into the terminal is recommended.

:::

| **Property**                  | **Description**                                        | **Retrieval**                                                                                                                                             |
| ----------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr>`<ssh-key>`</nobr>      | SSH key file used for authentication.                  | Run `ls ~/.ssh/` in your personal computer's terminal to list the files in the SSH folder and find the correct key file name for your node login.         |
| <nobr>`<key-folder>`</nobr>   | Local path to the keystore folder with validator keys. | Use your file explorer to locate the folder of your validator keys on your personal computer and right-click the folder and copy it's path.               |
| <nobr>`<ssh-port>` </nobr>    | The SSH port of your node.                             | Open the `~/.ssh/config` file using your preferred text editor on your personal computer and find the port that is used for the node's SSH communication. |
| <nobr>`<user-name>`</nobr>    | The SSH user for your node.                            | Open the `~/.ssh/config` file using your preferred text editor on your personal computer and find the admin user name for your node.                      |
| <nobr>`<node-ip>` </nobr>     | The IP address of your node.                           | Open the `~/.ssh/config` file using your preferred text editor on your personal computer and find the host IP address of your node.                       |
| <nobr>`<node-folder>` </nobr> | The full path to your node's working directory.        | Use SSH to connect to your node, enter your node's working directory, and run the `pwd` command to get it's full path.                                    |
| <nobr>`<keyfolder>` </nobr>   | Name for the validator folder.                         | Define a name for the copied file's folder on your node, either the same as your personal computer or a new one.                                          |

:::tip

If you have multiple deposit folders, copy one folder at the time and perform this step several times.

:::

## 2. Import Validator Keys

Once all validator key files got transferred over, import your keys within the LUKSO CLI. You will be asked for the path of the previously defined name of the key folder.

:::warning

During the first import process, a new password for starting your validator node must be defined to secure the consensus client's wallet. Make sure to use a strong passphrase. It will be used to startup the staking process of your node.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

<Tabs groupId="network-type">
  <TabItem value="mainnet" label="Mainnet" default>

```sh
lukso validator import --validator-keys "<node-folder>/<keyfolder>"
```

</TabItem> <TabItem value="testnet" label="Testnet">

```sh
lukso validator import --testnet --validator-keys "<node-folder>/<keyfolder>"
```

</TabItem>
</Tabs>

:::info

If you have multiple deposit folders, import one folder at the time and re-type the wallet password on each additional import.

:::

:::note Folder Structure

The import command will generate a new keystore folder within the working directory housing all imported validator accounts.

```text
lukso-node
│
├───configs                                   // Configuration Files
├───[network]-logs                            // Network's Logged Status Messages
├───[network]-data                            // Network's Blockchain Data
├───[network]-keystore                        // Network's Validator Keystore List
|
└───cli-config.yaml                           // Global CLI Configuration
```

:::

## 3. Verify Imported Accounts

After importing one or multiple folders, you can check your imported keys.

<Tabs groupId="network-type">
  <TabItem value="mainnet" label="Mainnet" default>

```sh
# LUKSO CLI v. 0.6.0+
lukso validator list --mainnet

# Lukso CLI v. <0.6.0
validator accounts list --wallet-dir "mainnet-keystore"
```

</TabItem> <TabItem value="testnet" label="Testnet">

```sh
# LUKSO CLI v. 0.6.0+
lukso validator list --testnet

# Lukso CLI v. <0.6.0
validator accounts list --wallet-dir "testnet-keystore"
```

</TabItem>
</Tabs>

## 4. Remove the Key Folder

If the imported keys match the ones in the original deposits, you can delete the folder with the deposit keys.

:::info

You can use the `rm` command to remove files and directories while using the `-r` recursive method. The flag will ensure to remove directories and their contents. You can further skip the confirmation questions or file errors using `-rf` instead.
:::

```sh
rm -rf <node-folder>/<keyfolder>
```

:::info

Make sure to adjust the path to your key-folder and repeat the process for every folder that was transferred.

:::

## 5. Start the Validator

After importing your keys, you can rstart the node with the validator functionality to begin staking.

:::info

To start the validator, you have to pass a minimum of two flags:

- `--validator`: Starts the configured clients and their validator client.
- `--transaction-fee-recipient`: Defines the address to which block rewards and transaction tips will be paid out.

:::

:::tip

The recipient can be any Ethereum address of a wallet you have control over and is able to connect with custom networks. Ledger accounts, for instance, are secure hardware-wallets and can be imported into MetaMask to send transactions on custom networks. If you withdraw or transfer the money regularly, you can also store the funds in a browser wallet. The address can be updated every time the node is restarted.

:::

<Tabs groupId="network-type">
  <TabItem value="mainnet" label="Mainnet" default>

```sh
lukso start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>"
```

</TabItem> <TabItem value="testnet" label="Testnet">

```sh
lukso start --validator --testnet --transaction-fee-recipient "<transaction-fee-recipient-address>"
```

</TabItem>
</Tabs>

:::info

Replace `<transaction-fee-recipient-address>` with your actual withdrawal address.

:::

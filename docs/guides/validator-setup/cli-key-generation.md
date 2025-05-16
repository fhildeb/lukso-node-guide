---
sidebar_label: "1.4 CLI Key Generation"
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 1.4 CLI Key Generation

This section explains how to generate your validator keys using the [LUKSO Key Gen CLI](https://github.com/lukso-network/tools-key-gen-cli) tool. Using a command-line interface provides flexibility, greater control, and is well-suited for servers, automation, and advanced users. Follow the steps below to download, set up, and run the CLI tool, ensuring that your keys are generated securely on your offline machine.

## 1. Software Comparison

The table below compares the two available tools for generating validator keys:

| Tool                               | Interface                   | Description                                                                                                             |
| ---------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| <nobr> LUKSO Wagyu Key Gen </nobr> | <nobr> Graphical </nobr>    | Simplifies the staking process with an intuitive, step-by-step interface, ideal for users who prefer visual guidance.   |
| <nobr> LUKSO Key Gen CLI </nobr>   | <nobr> Command-Line </nobr> | Provides a terminal-based approach for generating keys, offering flexibility and ease of automation for advanced users. |

:::info
If you prefer a graphical interface, switch to the [LUKSO Wagyu Key Gen](./wagyu-key-generation.md) page.
:::

## 2. Download the Software

This step prepares the key generation tool. You need to chose the correct archive file for the **operating system** on your **offline machine** where you are **going to generate the keys on**, not the operating system of your personal computer.

- Linux, Ubuntu: _linux.tar.gz_
- Apple, MacOS: _macos.tar.gz_
- Microsoft, Windows: _windows.tar.gz_

:::info

The following steps are performed on your 💻 **personal computer**.

:::

<Tabs>
<TabItem value="linux" label="Ubuntu" default>

1. Visit the [official release page](https://github.com/lukso-network/tools-key-gen-cli/releases).
2. Download the _linux.tar.gz_ file from the [latest release](https://github.com/lukso-network/tools-key-gen-cli/releases).
3. Connect a USB device.
4. Flash the USB device using your preferred disk utility tool.
5. Copy the tape archive (`.tar.gz` file) onto the USB disk.
6. Eject the USB device safely.

</TabItem>
<TabItem value="apple" label="MacOS">

1. Visit the [official release page](https://github.com/lukso-network/tools-key-gen-cli/releases).
2. Download the _macos.tar.gz_ file from the [latest release](https://github.com/lukso-network/tools-key-gen-cli/releases).
3. Connect a USB device.
4. Flash the USB device using your preferred disk utility tool.
5. Copy the tape archive (`.tar.gz` file) onto the USB disk.
6. Eject the USB device safely.

</TabItem>
<TabItem value="microsoft" label="Windows">

1. Visit the [official release page](https://github.com/lukso-network/tools-key-gen-cli/releases).
2. Download the _windows.tar.gz_ file from the [latest release](https://github.com/lukso-network/tools-key-gen-cli/releases).
3. Connect a USB device.
4. Flash the USB device using your preferred disk utility tool.
5. Copy the tape archive (`.tar.gz` file) onto the USB disk.
6. Eject the USB device safely.

</TabItem>
</Tabs>

## 3. Connect to Keygen Computer

:::info

The following steps are performed on your 🖥️ **offline computer**.

:::

1. Connect the prepared USB device to your computer.
2. Copy the archive file to your home directory.
3. Open the terminal and navigate to your home directory:

```sh
cd
```

## 4. Setup the Executable

:::info

The following steps are performed using Ubuntu. Commands may differ depending on the operating system.

:::

After downloading, we need to unpack the file. After downloading it, we can extract the tape archive using Ubuntu's archiving tool. We're going to extract (`x`) and compress (`z`) the tape archive into its previous packaged files (`f`) using verbose mode (`v`) to list all files being processed during the extraction and compression. Please note that the filenames might change due to the versioning.

**1. Unpack the downloaded file**

```sh
tar xzfv lukso-key-gen-cli-v2.5.8-linux.tar.gz
```

**2. Move into the created folder**

```sh
cd lukso-key-gen-cli-v2.5.8-linux
```

## 5. Generate Initial Keys

**1. Start the Key Generation Process**: Start the application using the _new-mnemonic_ option.

```sh
./lukso-key-gen new-mnemonic --eth1_withdrawal_address 0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC
```

:::tip

Setting a withdrawal address is necessary as you can withdraw your deposits later on. You can use the same withdrawal address multiple times, meaning all validator revenues go to the same account. If you are uncertain about the withdrawal address, please refer to the [Tokenomics](/docs/theory/blockchain-knowledge/tokenomics.md) page within the [**🧠 Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::info

A **seed phrase** and a **mnemonic phrase** refer to the same thing: a human-readable set of words that encodes a cryptographic seed used to generate private keys. These terms are often used interchangeably depending on a more technical or more general context.

:::

:::note

The initial startup will take some time, do not close the terminal window.

:::

**2. Select the Language**: Choose your language by typing the corresponding number into the input prompt.

```text
> 3.
```

:::info

If you press _Enter_ it will select English as default.

:::

**3. Specify the Number of Validators**: Select how many validator keys you want to generate.

```text
> 10
```

:::note

You can generate more keys than you immediately fund. These keys will remain inactive until they are sufficiently funded.

:::

:::tip Split Deposits to multiple Wallets

If you only require deposits from a single wallet, simply complete the process once. However, if you have multiple wallets with varying amounts of LYXt, LYXe, or LYX to make the deposits with, you have two primary options:

**1. Generate Batches with the Same Seed**

- Generate keys for the first wallet using a new seed phrase.
- For subsequent wallets, import the existing mnemonic seed phrase and generate additional keys.
- This process produces separate `deposit_data.json` files for each wallet.

🙇🏻‍♂️ _Example: 30 validators across 3 wallets, generated 10 keys per run in different files._

**2. Modify the Deposit File**

- Generate all keys in a single run, creating one comprehensive `deposit_data.json` file.
- Duplicate and modify the file and use a JSON Editor to remove `pubkey` entries, dividing keys appropriately.

🙇🏻‍♂️ _Example: 30 validators across 3 wallets, generated 3 file copies and removed pubkey entries manually:_

- _Kept the first 10 `pubkey` entries for wallet one. (validators 1-10)_
- _Removed the first and last 10 `pubkey` entries for wallet two. (validators 11–20)_
- _Removed the first 20 `pubkey` elements for wallet three. (keeping validators 21–30)_

In both cases, you will have to go through the [Launchpad Process](./launchpad-walkthrough.md) 3 times, as the launchpad will check if your wallets have enough balance before you can continue to the deposit screen.

:::

**4. Select Network**: Choose between your network type and select _lukso-testnet_ or _lukso_ mainnet keys.

```text
> lukso
```

**5. Enter your Password**: Input the password that will be used to encrypt your validator keys and confirm it.

**6. Mnemonic Seed Generation**: Your mnemonic seed phrase will be generated and printed in the terminal.

:::warning

Write down your mnemonic on paper and store it securely. Do not save it digitally as plain text. **Anyone with access** to this seed phrase **can control your deposits** or slash your validator, as it can be used to regenerate your validator's private keys and sign messages on your behalf. **Treat it like your most valuable secret.** Never share it or store it insecurely.

:::

Press any key to continue.

**7. Confirm the Mnemonic**: You will be asked to re-enter your mnemonic seed phrase for verification purposes.

:::info

You have to input the words of your mnemonic seed phrase with spaces in between.

:::

When you press _Enter_, the CLI will check the seed. If correct, you will see the following output on the terminal window:

```text
                  #####     #####
                ##     #####     ##
    ###         ##   #######     #########################
    ##  ##      #####               ##                   ##
    ##     #####                 ##                       ##
    ##     ##                     ##                      ###
   ########                        ##                     ####
   ##        ##   ###         #####                       #####
   #                          ##                         # #####
   #                            #                        #  #####
   ##                             ##                    ##
   ##                              ##                   ##
   ##             ###              ##                   ##
   ###############                 ##                   ##
   ###               ##                                 ##
      #############################                    ##
                     ##                             ###
                     #######     #################     ###
                     ##   ## ##        ##   ##    ###
                     ##############          #############

Creating your keys.
Creating your keys:     [####################################]  10/10
...
Creating your keystores:    [####################################]  10/10
...
Creating your depositdata:    [####################################]  10/10
...
Verifying your keystores:   [####################################]  10/10
...
Verifying your deposits:    [####################################]  10/10

Success!
```

**8. Reviewing Output Files**: The deposit files will be saved in a `validator_keys` folder within the current destination.

:::tip Verifying Generated Files

Please ensure that your destination folder contains the following files:

- `deposit_data.json`: This file is used to make deposit transactions during the [Deposit Launchpad](./launchpad-walkthrough.md) process.
- `keystore.json`: Each validator key has a corresponding keystore file, later used in the [Validator Setup](/docs/guides/client-setup/validator-configuration.md) process.

:::

Press any key to exit the CLI tool.

## 6. Generate Additional Keys

If you need to add more keys to your validator setup, follow these steps:

**1. Navigate to the CLI Folder**: Ensure you are in the same folder as the LUKSO Key Gen CLI.

```sh
cd && cd lukso-key-gen-cli-v2.5.8-linux
```

**2. Rename Existing Folder**: To differentiate batches, rename the folder containing the first batch of keys.

```sh
mv validator_keys <new-folder-name>
```

**3. Run the Existing Mnemonic Process**: Start the tool with an existing mnemonic using _existing-mnemonic_.

:::info

You can use the same withdrawal address multiple times, meaning all validator revenues go to the same account. For backup purposes, always use the same withdrawal address as the one used during the initial key generation process. If you are uncertain about the withdrawal address, please refer to the [Tokenomics](/docs/theory/blockchain-knowledge/tokenomics.md) page within the [**🧠 Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

```sh
./lukso-key-gen existing-mnemonic --eth1_withdrawal_address 0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC
```

**4. Select the Language**: Choose your language by typing the corresponding number into the input prompt.

```text
> 3.
```

:::info

If you press _Enter_ it will select English as default.

:::

**5. Enter the Existing Mnemonic**: Input your previously generated mnemonic seed phrase when prompted.

**6. Specify Starting Index and Number of Keys**: Specify the total amount of previous keys and new ones to generate.

:::note

The starting index of the keys is the total amount of already generated keys. If you already generated _10_ keys before and want to start by generating the 11th deposit key.

:::

:::tip

To regenerate keys for **a backup** or **updating** the **withdrawal address** or **password**, you can set the **starting index** to **0** and specify the total number of all your previously generated keys. The new files can then be re-used to setup a new node once the original one stopped operating.

:::

```text
> 10
```

Then confirm by entering the number again when prompted.

**7. Select Network**: Choose between your network type and select _lukso-testnet_ or _lukso_ mainnet keys.

```text
> lukso
```

**8. Enter your Password**: Input the password that will be used to encrypt your validator keys and confirm it.

When you press _Enter_, the CLI will generate the validator keys, showing the following output on the terminal window:

```text
                  #####     #####
                ##     #####     ##
    ###         ##   #######     #########################
    ##  ##      #####               ##                   ##
    ##     #####                 ##                       ##
    ##     ##                     ##                      ###
   ########                        ##                     ####
   ##        ##   ###         #####                       #####
   #                          ##                         # #####
   #                            #                        #  #####
   ##                             ##                    ##
   ##                              ##                   ##
   ##             ###              ##                   ##
   ###############                 ##                   ##
   ###               ##                                 ##
      #############################                    ##
                     ##                             ###
                     #######     #################     ###
                     ##   ## ##        ##   ##    ###
                     ##############          #############

Creating your keys.
Creating your keys:     [####################################]  10/10
...
Creating your keystores:    [####################################]  10/10
...
Creating your depositdata:    [####################################]  10/10
...
Verifying your keystores:   [####################################]  10/10
...
Verifying your deposits:    [####################################]  10/10

Success!
```

:::warning Verifying Generated Files

Always ensure that your destination folder contains a `validator_keys` folder with the following files:

- `deposit_data.json`: This file is used to make deposit transactions during the [Deposit Launchpad](./launchpad-walkthrough.md) process.
- `keystore.json`: Each validator key has a corresponding keystore file, later used in the [Validator Setup](/docs/guides/client-setup/validator-configuration.md).

:::

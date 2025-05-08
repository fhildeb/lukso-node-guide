---
sidebar_label: "1.3 Wagyu Key Generation"
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 1.3 Wagyu Key Generation

This section explains how to generate your validator keys using the [LUKSO Wagyu Key Gen](https://github.com/lukso-network/tools-wagyu-key-gen) tool. By leveraging a graphical interface, the process becomes more intuitive and accessible for both beginners and experienced users.

You will generate your validator keys using a graphical user interface. The following steps walk you through downloading the software, preparing a USB device, and running the key generation process on your designated keygen computer.

## 1. Software Comparison

The table below compares the two available tools for generating validator keys:

| Tool                               | Interface                   | Description                                                                                                           |
| ---------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| <nobr> LUKSO Wagyu Key Gen </nobr> | <nobr> Graphical </nobr>    | Simplifies the staking process with an intuitive, step-by-step interface, ideal for users who prefer visual guidance. |
| <nobr> LUKSO Key Gen CLI </nobr>   | <nobr> Command-Line </nobr> | Provides a terminal-based approach for generating keys, suitable for servers, automation and advanced users           |

:::info

If you prefer a command-line approach, switch to the [LUKSO Key Gen CLI](./cli-key-generation.md) page.

:::

## 2. Download the Software

This step prepares the key generation tool. You need to chose the correct download file for the **operating system** on your **offline machine** where you are **going to generate the keys on**, not the operating system of your personal computer.

- Linux, Ubuntu: _AppImage-File_
- Apple, MacOS: _DMG-File_
- Microsoft, Windows: _EXE-File_

:::info

The following steps are performed on your 💻 **personal computer**.

:::

<Tabs>
<TabItem value="linux" label="Ubuntu" default>

1. Visit the [Official Release Page](https://github.com/lukso-network/tools-wagyu-key-gen/) on the [LUKSO Network](https://github.com/lukso-network/) GitHub page.
2. Download the **_AppImage_** file from the [Latest Release](https://github.com/lukso-network/tools-wagyu-key-gen/releases).
3. Connect a USB device.
4. Flash it using your preferred disk utility tool.
5. Copy the downloaded **_AppImage_** onto the USB device.
6. Eject the USB disk safely.

</TabItem>
<TabItem value="apple" label="MacOS">

1. Visit the [Official Release Page](https://github.com/lukso-network/tools-wagyu-key-gen/) on the [LUKSO Network](https://github.com/lukso-network/) GitHub page.
2. Download the **_DMG_** file from the [Latest Release](https://github.com/lukso-network/tools-wagyu-key-gen/releases).
3. Connect a USB device.
4. Flash it using your preferred disk utility tool.
5. Copy the downloaded **_DMG_** onto the USB device.
6. Eject the USB disk safely.

</TabItem>
<TabItem value="microsoft" label="Windows">

1. Visit the [Official Release Page](https://github.com/lukso-network/tools-wagyu-key-gen/) on the [LUKSO Network](https://github.com/lukso-network/) GitHub page.
2. Download the **_EXE_** file from the [Latest Release](https://github.com/lukso-network/tools-wagyu-key-gen/releases).
3. Connect a USB device.
4. Flash it using your preferred disk utility tool.
5. Copy the downloaded **_EXE_** onto the USB device.
6. Eject the USB disk safely.

</TabItem>
</Tabs>

## 3. Connect to Keygen Computer

:::info

The following steps are performed on your 🖥️ **offline computer**.

:::

1. Connect the prepared USB device to the computer designated for key generation.
2. Copy the AppImage file from the USB device to your home directory.

## 4. Generate Initial Keys

Follow these numbered steps to generate your validator keys using the Wagyu application:

**1. Launch the Application**: Open your file explorer, navigate to your home directory, and _execute_ the application.

![Wagyu Starting Screen](/img/guides/validator-setup/gui_keygen_1.png)

**2. Select the Network**: In the upper right corner, click the _LUKSO_ button to choose between testnet and mainnet.

![Wagyu Network Select](/img/guides/validator-setup/gui_keygen_2.png)

**3. Initiate Mnemonic Creation**: Click on _CREATE NEW SECRET RECOVERY PHRASE_ to begin generating your mnemonic.

![Wagyu Security Notice](/img/guides/validator-setup/gui_keygen_3.png)

**4. Generate the Mnemonic**: After reviewing the displayed information, click _CREATE_ to generate a new mnemonic.

![Wagyu Secret Creation](/img/guides/validator-setup/gui_keygen_4.png)

:::info

A **seed phrase** and a **mnemonic phrase** refer to the same thing: a human-readable set of words that encodes a cryptographic seed used to generate private keys. These terms are often used interchangeably depending on a more technical or more general context.

:::

:::warning

Write down your mnemonic on paper and store it securely. Do not save it digitally as plain text. **Anyone with access** to this seed phrase **can control your deposits** or slash your validator, as it can be used to regenerate your validator's private keys and sign messages on your behalf. **Treat it like your most valuable secret.** Never share it or store it insecurely.

:::

**5. Confirm the Mnemonic**: Click _NEXT_ and retype your saved mnemonic seed phrase to verify it.

![Wagyu Secret Confirmation](/img/guides/validator-setup/gui_keygen_5.png)

**6. Verification Process**: Proceed by clicking _CHECK_ until the process confirms your mnemonic successfully.

![Wagyu Key Screen](/img/guides/validator-setup/gui_keygen_6.png)

**7. Enter Key Generation Details**: Provide the amount, password and withdrawal address.

:::note

You can generate more keys than you immediately fund. These keys will remain inactive until they are sufficiently funded.

:::

:::info

You can use the same withdrawal address multiple times, meaning all validator revenues go to the same account. If you are uncertain about the withdrawal address, please refer to the [Tokenomics](/docs/theory/blockchain-knowledge/tokenomics.md) page within the [**🧠 Theory**](/docs/theory/preparations/node-specification.md) section.

:::

To to complete the process, you need to enter the following information:

- The number of new keys to generate.
- A password for encrypting the deposit keys.
- Your withdrawal address.

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

- _Keept the first 10 `pubkey` entries for wallet one. (validators 1-10)_
- _Removed the first and last 10 `pubkey` entries for wallet two. (validators 11–20)_
- _Removed the first 20 for wallet three. (keeping validators 21–30)_

In both cases, you will have to go through the [Launchpad Process](./launchpad-walkthrough.md) 3 times, as the launchpad will check if your wallets have enough balance before you can continue to the deposit screen.

:::

:::info

Further information about **using multiple deposit files** can be found within the [Launchpad Walkthrough](./launchpad-walkthrough.md) page.

:::

Click _NEXT_ to proceed with the generation of the deposit file.

**8. Generate the deposit files**: Select the file destination and wait for file generation.

- Click _BROWSE_ to select the folder where the deposit and keystore files will be stored.
- Click _CREATE_ to generate your keys and wait for the key generation process to finish.

![Wagyu Creation Screen](/img/guides/validator-setup/gui_keygen_9.png)

**9. Review the Generated Files**: Once completed, the final screen will appear:

![Wagyu Final Screen](/img/guides/validator-setup/gui_keygen_10.png)

:::tip Verifying Generated Files

Please ensure that your destination folder contains the following files:

- `deposit_data.json`: This file is used to make deposit transactions during the [Deposit Launchpad](./launchpad-walkthrough.md) process.
- `keystore.json`: Each validator key has a corresponding keystore file, later used in the [Validator Setup](/docs/guides/client-setup/validator-configuration.md).

:::

## 5. Generate Additional Keys

If you need to add more keys to your validator setup, follow these steps:

**1. Initiate the Import Process**: Click _USE EXISTING SECRET RECOVERY PHRASE_ and select the appropriate network.

![Wagyu Starting Screen](/img/guides/validator-setup/gui_keygen_1.png)

**2. Import Your Mnemonic**: Enter your validator seed phrase and press _IMPORT_ to begin the key import process.

![Wagyu Seed Import](/img/guides/validator-setup/gui_keygen_11.png)

**3. Set Up Additional Key Details**

- Specify the number of new keys you wish to generate
- Indicate how many keys have already been generated in a previous run.
- Provide your withdrawal address.

:::note

You can use the same withdrawal address multiple times, meaning all validator revenues go to the same account.

:::

:::tip

To regenerate keys for **a backup** or **updating** the **withdrawal address** or **password**, you can set the **starting index** to **0** and specify the total number of all your previously generated keys. The new files can then be re-used to setup a new node once the original one stopped operating.

:::

:::info

You can use the same withdrawal address multiple times, meaning all validator revenues go to the same account. If you are uncertain about the withdrawal address, please refer to the [Tokenomics](/docs/theory/blockchain-knowledge/tokenomics.md) page within the [**🧠 Theory**](/docs/theory/preparations/node-specification.md) section.

:::

**4. Finalize the Additional Key Generation**: Enter your previous password and select the destination folder.

![Wagyu Key Screen](/img/guides/validator-setup/gui_keygen_12.png)

:::warning Verifying Generated Files

Always ensure that your destination folder contains the following files:

- `deposit_data.json`: This file is used to make deposit transactions during the [Deposit Launchpad](./launchpad-walkthrough.md) process.
- `keystore.json`: Each validator key has a corresponding keystore file, later used in the [Validator Setup](/docs/guides/client-setup/validator-configuration.md).

:::

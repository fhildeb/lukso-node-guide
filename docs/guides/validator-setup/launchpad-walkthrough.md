---
sidebar_label: "1.5 Launchpad Walkthrough"
sidebar_position: 5
description: "Learn how to deposit LYX or LYXt using the LUKSO Launchpad to activate your validator keys and start staking on Mainnet or Testnet."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 1.5 Launchpad Walkthrough

This section guides you through the deposit process using the LUKSO Validator Deposit Launchpads. Depositing funds is a critical step that activates your validator keys and enables your node to participate in staking, which in turn generates income.

:::tip

If you're not quite sure about [**Hardware Preparations**](/docs/theory/preparations/node-specifications.md), [**Blockchain Fundamentals**](/docs/theory/blockchain-knowledge/proof-of-stake.md), or the basics of [**Node Operations**](/docs/theory/node-operation/client-setups.md), please refer to the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section to build a solid foundation of knowledge before continuing with the validator or node setup.

:::

:::warning

Further details about validator operation and deposit instructions can be found on the [**Staking Deposits**](/docs/theory/node-operation/staking-deposits.md) page.

:::

After you have generated your deposit keys, you can visit the _LUKSO Validator Deposit Launchpads_ to stake funds:

- [Mainnet Deposit Launchpad](https://deposit.mainnet.lukso.network/en/)
- [Testnet Deposit Launchpad](https://deposit.testnet.lukso.network/en/)

![Deposit Launchpad](/img/guides/validator-setup/launchpad_1.png)

:::danger Domain Verification

Always double-check the `lukso.network` domain before continuing the deposit process.

:::

Take a moment to review the launchpad’s functionality and statistics. For each network, you will see details such as the total staked amount of LYX or LYXt, the total number of validators, and the current Annual Percentage Rate during staking, which is particularly useful for monitoring the network dynamics.

## 1. Preparing Deposit Files

Before making any deposits, you must prepare and verify your deposit files on the launchpad. If you only have one wallet with enough LYX or LYXt to fund your validator keys, you can use one single deposit file during the process. However, if you have multiple wallets or currently only have enough funds to activate a smaller amount of validators, you must prepare or split your deposit file.

:::info Split Deposits to multiple Wallets

**1. You Generated Batches with the Same Seed**

- If you created separate batches for each wallet, you likely have multiple deposit folders.
- Each deposit folder should contain one or multiple deposit key files
- Each deposit folder should conatain one _deposit_data.json_ file

🙇🏻‍♂️_Example: With 30 validators across 3 wallets containing 320 LYX or LYXt, you should have 3 deposit files.

**2. You Modify the Deposit File**

- If you generated all keys in one run, you will have a single folder with one comprehensive _deposit_data.json_ file.
- You will have to duplicate the file for each wallet and use a JSON Editor to remove specific `pubkey` entries
- Each file then only contains the deposit keys for one wallet.

🙇🏻‍♂️ _Example: 30 validators across 3 wallets, generated 3 file copies and removed pubkey entries manually:_

- _Only kept the first 10 `pubkey` entries for wallet one and removed the rest. (validators 1-10)_
- _Removed the first and last 10 `pubkey` entries for wallet two. (validators 11–20)_
- _Removed the first 20 `pubkey` elements for wallet three. (keeping validators 21–30)_

:::

:::tip

If your wallets hold different amounts of LYX or LYXt, adjust the subkeys and validator counts of the deposit file accordingly to match holdings. If you only want to fund some of your validator keys later, you can create a copy of the deposit file and remove the last pubkey elements.

:::

In case you chose to modify the deposit file copies, an editor with JSON formatting support is highly recommended. It will help you verify that the JSON structure remains valid and that commas and brackets are correctly placed.

:::note

Great and free examples of editors with JSON formatting are 🦎 [**Notepad++**](https://notepad-plus-plus.org/) or 🔹 [**Visual Studio Code**](https://code.visualstudio.com/).

![Deposit Data Modification](/img/guides/validator-setup/deposit_modify.png)

:::

## 2. Checking Deposits

If you're a Genesis or Testnet Validator, the prepared deposit files can be checked again before starting the staking launchpad process. Icons are then used to indicate whether the file is valid and whether it contains validation keys that have already been used.

:::info

Further details about validator differentiations can be found on the [**Staking Deposits**](/docs/theory/node-operation/staking-deposits.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

<Tabs>
<TabItem value="genesis" label="Genesis Validators" default>

Geneses Validators were able to upload their deposit file to the front page of the Staking Launchpad. You could observe the status icons for each validator key element. Unused deposit keys display grey symbols, indicating that no funds have been deposited yet. If they showed green arrows, you knew that those could be removed from the file, because you cannot find a key twice.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_2.png)

It was advisable to keep a second browser window open displaying the complete deposit file to monitor the deposits in real-time.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_3.png)

Additionally, the genesis validators could view the current votes for the network's initial coin supply.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_4.png)

</TabItem>
<TabItem value="testnet" label="Testnet Validators">

If you're a Testnet Validator, you're allowed to check the deposit status by verifying your address. Each wallet will display the number of validators you are eligible to deposit. Each wallet must previously whitelisted by the LUKSO team.

:::tip Whitelists and Deposits

Whitelisting only affects the ability to make deposits, not becoming a validator. If you are removed from the whitelist before all validators are deposited, you will not be able to proceed. You can find further information on becoming a Testnet Validator on the related [**LUKSO Tech Documentation**](https://docs.lukso.tech/networks/testnet/become-a-validator) or the [**Staking Deposits**](/docs/theory/node-operation/staking-deposits.md) page.

:::

![Whitelist Checkup](/img/guides/validator-setup/whitelist-check.png)

</TabItem>
<TabItem value="mainnet" label="Mainnet Validators">

:::note

The Mainnet Staking Launchpad only supports deposit checks in the final transaction window after submitting the deposit file and connecting your wallet. The wallet must contain enough LYX or LYXt to proceed to the final screen.

:::

</TabItem>
</Tabs>

## 3. Placing Deposits

You can initiate the deposits by the clicking _Become a validator_ button on the Staking Launchpad.

:::warning

Deposits can only be made once and cannot be refunded in the event of an error.

- **Review Information:** Carefully read all the theoretical pages and informational content provided.
- **Verify Wallet Balance:** Check that the wallet’s LYX or LYXt balance meets the minimum requirements.
- **Confirm Deposit File Details:** Review the summary of your deposit keys, which will be transformed into transaction data.

:::

**1. Read through the Information**: Review the first 10 pages of necessary blockchain knowledge.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_5.png)

**2. Upload the Deposit File**: Proceed by uploading one single deposit file per walkthrough.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_6.png)

**3. Connect the Wallet**: Connect your wallet containing enough LYX or LYXt to fund all keys within the file.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_7.png)

:::tip

While the Staking Launchpad only supports MetaMask as browser wallet, you can still [**link your hardware wallet**](https://support.lukso.network/general/supported-wallets/hardware-wallets) or send LYX to a different Ethereum address. It will show up once you've [**added and switched**](https://docs.lukso.tech/networks/mainnet/parameters#add-lukso-to-wallets) to the LUKSO network.

:::

:::info

If you create deposits on the LUKSO Testnet, clean your MetaMask activity and nonce to avoid potential network conflicts.

![MetaMask Clear Activity](/img/guides/validator-setup/metamask-clear.png)

:::

**4. Review Wallet Balance**: The launchpad will fetch your balance and will allow you to continue with sufficient funds.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_8.png)

:::tip

If you have insufficient funds or want to activate some of the generated validator keys later on, you can create a copy of the deposit file with a subsection of keys to fullfil the deposit requirements.

:::

**5. Confirm Summary Page**: Review the summary of your deposit keys and agree to the terms to proceed with the transactions.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_9.png)

After the confirmation and setup, you will be able to send deposit transactions by either clicking _Confirm deposit_ or _Send X deposits_. If you select the latter option, the transactions will be sent in series, and you will be prompted to confirm each one individually.

:::warning Status Updates

Please remain on the deposit page and monitor the transaction status. The deposit keys will **initially show as ready** and will update to **pending**, **deposited**, or **failed** based on the blockchain’s response. If a transaction error occurs and the option to resend from the final screen should not be available, restart the process from the home screen.

:::

## 4. Checking Deposits

After the transactions have been sent, you can verify the status of your deposits using the provided transaction buttons.

<Tabs>
<TabItem value="genesis" label="Genesis Validators" default>

For [Genesis Validators](/docs/archive/genesis-validators/blockchain-launch.md), the Ethereum Blockchain Explorer displayed all the deposit transactions to the [Genesis Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC).

![Genesis Execution Chain Deposit](/img/guides/validator-setup/genesis-deposit-screen.png)

[Genesis Validators](/docs/archive/genesis-validators/blockchain-launch.md) were also able to review the deposit files on the Staking Launchpad. If all validator keys show as green, every deposit transaction was successful. In case some validator keys remained in grey, the deposit had to be repeated.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_12.png)

</TabItem>
<TabItem value="testnet" label="Testnet Validators">

For Testnet Validators, the [LUKSO Testnet Consensus Explorer](https://explorer.consensus.testnet.lukso.network/) will display the deposit transactions.

![Testnet Beacon Chain Deposit](/img/guides/validator-setup/testnet-deposit-screen.png)

</TabItem>
<TabItem value="mainnet" label="Mainnet Validators">

For Mainnet Validators, the [LUKSO Mainnet Consensus Explorer](https://explorer.consensus.mainnet.lukso.network/) will display the deposit transactions.

![Testnet Beacon Chain Deposit](/img/guides/validator-setup/testnet-deposit-screen.png)

</TabItem>
</Tabs>

:::tip

Validator activation can take up multiple days depending on the network occupation. You can already start to run your node using one of the [**Client Setups**](/docs/theory/node-operation/client-setups.md) and import the validator keys. The validator clients will then run in idle mode until the blockchain is synced and validators got activated.

:::

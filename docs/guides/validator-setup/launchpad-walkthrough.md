---
sidebar_label: "1.5 Launchpad Walkthrough"
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 1.5 Launchpad Walkthrough

This section guides you through the deposit process using the LUKSO Validator Deposit Launchpads. Depositing funds is a critical step that activates your validator keys and enables your node to participate in staking, which in turn generates income. Before you begin, please ensure that you have read and understood the staking fundamentals in the [Node Operation](/docs/theory/node-operation/staking.md) and [Blockchain Knowledge](/docs/theory/blockchain-knowledge/proof-of-stake.md) chapters in the [**🧠 Theory**](/docs/theory/preparations/node-specification.md) section.

:::warning
This step is about transferring funds from your wallet to your validator deposit keys, enabling your node to run and earn staking rewards. If you are unsure about Deposits and Proof of Stake, please read the [Staking](/docs/theory/node-operation/staking.md) chapter.
:::

After you have generated your deposit keys, you can visit the _LUKSO Validator Deposit Launchpads_ to stake funds:

- [Mainnet Deposit Launchpad](https://deposit.mainnet.lukso.network/en/)
- [Testnet Deposit Launchpad](https://deposit.testnet.lukso.network/en/)

![Deposit Launchpad](/img/guides/validator-setup/launchpad_1.png)

:::danger Domain Verification
Always double-check the `lukso.network` domain before continuing the deposit process.
:::

Take a moment to review the launchpad’s functionality and statistics. For each network, you will see details such as the total staked amount of LYXe or LYXt, the **total number of validators**, and the current **Annual Percentage Rate** of gains, which is particularly useful for monitoring the network dynamics.

:::info
Further insights about the mainnet’s genesis validators can be gathered from the [Dune Analytics Dashboard](https://dune.com/hmc/lukso-genesis-validators) by [Hugo Masclet](https://x.com/HugoApps).
:::

## 1. Preparing Deposit Files

Before making any deposits, you must prepare and verify your deposit files on the launchpad. If you only have one wallet with enough LYX or LYXt to fund your validator keys, you can use one single deposit file during the process. However, if you have multiple wallets or currently only have enough funds to activate a smaller amount of validators, you must prepare or split your deposit file.

:::tip Split Deposits to multiple Wallets

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

:::info

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

If you want to know more about validator differentiations, have a look into the [Staking](/docs/theory/node-operation/staking.md) chapter of the [**🧠 Theory**](/docs/theory/preparations/node-specification.md) section.

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

Whitelisting only affects the ability to make deposits, not becoming a validator. If you are removed from the whitelist before all validators are deposited, you will not be able to proceed. You can find further information on becoming a Testnet Validator on the related [LUKSO Tech Documentation](https://docs.lukso.tech/networks/testnet/become-a-validator).

:::

![Whitelist Checkup](/img/guides/validator-setup/whitelist-check.png)

  </TabItem>
    <TabItem value="mainnet" label="Mainnet Validators">

:::warning

The **Mainnet** Staking Launchpad only **supports deposit checks** in the **final transaction window** after submitting the deposit file and connecting your wallet. The wallet must contain enough LYX, LYXe, or LYXt to proceed to the final screen.

:::

  </TabItem>
</Tabs>

## 3. Placing Deposits

You can initiate the deposits by the clicking _Become a validator_ button on the launchpad.

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

While the Staking Launchpad only supports MetaMask as browser wallet, you can still [link your hardware wallet](https://support.lukso.network/general/supported-wallets/hardware-wallets) or send LYX to this Ethereum address. It will show up once you've [added and switched to the LUKSO network](https://docs.lukso.tech/networks/mainnet/parameters#add-lukso-to-wallets).

:::

:::info

If you create deposits on the LUKSO Testnet, clean your MetaMask activity and nonce to avoid potential network conflicts.

![MetaMask Clear Activity](/img/guides/validator-setup/metamask-clear.png)

:::

**4. Review Wallet Balance**: The launchpad will fetch your balance. If sufficient funds are available, you're allowed to continue.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_8.png)

**5. Confirm Summary Page**: Review the summary of your deposit keys and agree to the terms to proceed with the transactions.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_9.png)

After the confirmation and setup, you will be able to **send deposit transactions** by either clicking _Confirm deposit_ or _Send X deposits_. If you select the latter option, the transactions will be sent in series, and you will be prompted to confirm each one individually.

:::warning Status Updates

Please remain on the deposit page and **monitor the transaction status**. The deposit keys will initially show as **ready** and will update to **pending**, **deposited**, or **failed** based on the blockchain’s response.

:::

:::info Error

If a transaction error occurs and the option to resend from the final screen is not available, return to the home screen and recheck your deposit file. In case your funds are only sufficient for the exact amount of deposits, you have to create a new copy of the deposit file with only the keys that have not been successfully processed and are still marked in grey. Then repeat the process.

:::

:::note Lore

Previous Genesis Validators were aboe to vote on the preferred initial coin supply of the LUKSO network. This choice had to be placed with every transaction, and people may had to adjust votes during standalone transactions if needed. The final outcome was a election result of around 85% that [voted for a supply of 42,000,000 LYX](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba).

Original Genesis Validators locked LYXe in order to be included in the genesis file of the LUKSO blockchain. Due to the high demand of the Ethereum network during the time, gas prices soared and LUKSO decided to [pay back the gas costs](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc) of the first 10,000 genesis validators in ETH.

:::

## 4. Checking Deposits

After the transactions have been sent, you can verify the status of your deposits using the provided transaction buttons.

<Tabs>
  <TabItem value="genesis" label="Genesis Validators" default>

For genesis depositors, the Ethereum Blockchain Explorer displayed all the deposit transactions to the [Genesis Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC).

![Genesis Execution Chain Deposit](/img/guides/validator-setup/genesis-deposit-screen.png)

They were also able to review the deposit files on the Staking Launchpad. If all validator keys show as green, every deposit transaction was successful. In case some validator keys remained in grey color, genesis validators had to repeat the process over.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_12.png)

:::info

In case the funds were only sufficient for the exact amount of deposits, they had to create a new copy of the deposit file with only the keys that have not been successfully processed and repeat the process with the new deposit file.

:::

  </TabItem>
  <TabItem value="testnet" label="Testnet Validators">

For Testnet Validators, the [LUKSO Testnet Consensus Explorer](https://explorer.consensus.testnet.lukso.network/) will display the deposit transactions.

![Testnet Beacon Chain Deposit](/img/guides/validator-setup/testnet-deposit-screen.png)

:::info

Validator activation can take up 14 to 24 hours. You can start importing your keys and setting up your node using the [Node Installation](/docs/guides/client-setup/lukso-cli-installation.md) and [Validator Configuration](/docs/guides/client-setup/validator-configuration.md) sections while awaiting activation.

:::

  </TabItem>
    <TabItem value="mainnet" label="Mainnet Validators">

For Mainnet Validators, the [LUKSO Mainnet Consensus Explorer](https://explorer.consensus.mainnet.lukso.network/) will display the deposit transactions.

![Testnet Beacon Chain Deposit](/img/guides/validator-setup/testnet-deposit-screen.png)

:::info

Validator activation can take up 14 to 24 hours. You can start importing your keys and setting up your node using the [Node Installation](/docs/guides/client-setup/lukso-cli-installation.md) and [Validator Configuration](/docs/guides/client-setup/validator-configuration.md) sections while awaiting activation.

:::

  </TabItem>
</Tabs>

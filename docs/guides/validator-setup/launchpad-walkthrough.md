---
sidebar_label: "1.4 Launchpad Walkthrough"
sidebar_position: 4
---

# Validator Deposit Launchpad

After you generated the deposit keys, you can visit the _LUKSO Validator Deposit Launchpads_ for the LUKSO Blockchain to put a stake in them:

- [Mainnet Deposit Launchpad](https://deposit.mainnet.lukso.network/en/)
- [Testnet Deposit Launchpad](https://deposit.testnet.lukso.network/en/)

> Check the `lukso.network` domain before continuing the deposit process.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_1.png)

Start to have a look at the launchpad's functionality and stats. For each network, you will get decent information about the LYXe or LYXt staked and the number of validators. The test network even features the current Annual Percentage Rate of gains, as the network is already running.

> If you want to have some more insights into the main net's genesis validators, here is a great [Dune Analytics Dashboard](https://dune.com/hmc/lukso-genesis-validators) from Hugo.

### Preparing Deposit Files

First, you will prepare and verify the deposit files on the launchpad.

In case you want to do deposits (for the same or different) validators from multiple wallets, there are two main variants to handle these:

- **You've generated batches** with the same seed: If you chose deposit batches for each wallet with respective validator numbers, you ended up with numerous deposit folders. For instance, if you have 30 validators and 3 different wallets with 320 LYXe/LYX each, you may have created 3 validator key folders, each having 10 deposit keys. Each of them already has a deposit.json file that you can now use to deposit.
- **You've modified the deposit file**: If you generated the total number of keys in one go, you only have one folder with all of them. Go ahead and create duplicates of the `deposit_data.json` file for each wallet. Open them individually using an editor and remove as many `pubkey` elements as needed. For instance: if you have 30 validators and 3 different wallets with 320 LYXe/LYX each, you have to generate 3 copies. In the 1st file, delete everything after your 10th `pubkey`, leaving you with validators 1-10. In the 2nd copy, delete the first and last ten `pubkey` elements, leaving you with validator 11-20. In the 3rd copy, delete the first 20 `pubkey` elements, leaving you with validators 21-30. As we split them into different files, there should not be any duplicates anymore. The original still has all of the keys.

> If your wallets have different amounts of LYXt, LYXe, or LYX, adjust the subkeys and validator amounts so it matches the coins your hold.

An editor with JSON formatting is recommended if you choose to adjust your JSON files. This way, you can easily detect the different `pubkey` elements. As shown in the picture, remove a certain amount of components. Always ensure that the JSON format is still valid and that there is a comma between the `pubkey` elements. Also, be cautious with deleting too many brackets.

![Deposit Data Modification](/img/guides/validator-setup/deposit_modify.png)

In both cases, you will have to go through the launchpad process 3 times, as the launchpad will check if your wallets have enough balance before you can continue to the deposit screen.

> If you only have one wallet, just run through the process once.

### Checking Deposits for Genesis Validators

To verify if your deposit file is valid and can be used, upload it to the front page of the launchpad.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_2.png)

On an unused deposit file, everything will show with grey symbols, indicating that nothing has been deposited yet.

> If you have multiple files, check if all keys are in the right place and nothing is duplicated. The launchpad will detect duplicates. However, you might miss a key.

During further depositing, it's always recommended to have a second browser window where you can check the deposit file with all total validator keys in. So you can follow your deposit states.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_3.png)

In the case of the genesis validator page, you can also look at the current votes for the initial coin supply of the network.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_4.png)

### Checking Deposits for Testnet Validators

For Testnet depositors, you can instead check your address, and it will show the number of validators you still have left. Each wallet will have ana number of validators they are allowed to deposit.

![Whitelist Checkup](/img/guides/validator-setup/whitelist-check.png)

> Note that the whitelisting only affects making deposits, not becoming a validator. If you get removed from the whitelist before you deposit all your validators, you can no longer proceed.

### Starting the Deposit Process

You will deposit funds by clicking `Become a validator` on the home screen. Many pages cover what you need to know, how to use the ethereum clients, and so on. Read them carefully and take notes in case something is unclear. Before locking valuable assets, ensure you fully understand all the theoretical concepts and risks.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_5.png)

After going through all the theoretical pages and information, you can upload your (first) deposit data file that will be actively used to perform the deposits in the next steps.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_6.png)

After uploading your deposit file, connect the wallet you want to use on the launchpad.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_7.png)

After selecting the wallet for the import, you will get to the checkup screen that will fetch your current balance of LYXt, LYXe, or LYX. The launchpad will let you continue with the next step if you have enough funds.

> As you carefully prepare your deposit folders or files, this step should not be a problem.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_8.png)

When you continue, you will see the summary of your deposit keys that will be transformed into transaction data. Read this page carefully and agree to all terms.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_9.png)

During the Genesis deposit time, the final page will show a selection of initial coin supplies you can choose from. Your choice will be used for every transaction, so you could also change votes when doing all transactions in a standalone way.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_10.png)

Choose your wished coin supply during the network launch and continue sending the transaction using the `Confirm deposit` or `Send X deposits` button. The second choice will switch transactions in series. However, you will still be prompted to confirm every single one.

**If you are making deposits on Testnet, clean your MetaMask activity and nonce before you make deposits. Otherwise, they might get stuck if you have multiple networks set with the same ID or URL.**

![MetaMask Clear Activity](/img/guides/validator-setup/metamask-clear.png)

Initially, the deposit keys will show `Ready`. The status will change to `Transaction pending,` `Deposited,` or `Error` depending on the state of the transaction on the mainnet. If there should be an error, you have the chance to resend the transaction.

> If there is an error and you cannot resend the transaction from the final screen, please move to the home screen and recheck your deposit file. Create another copy, remove all the pay data entries that have already been successful, and reenter the launchpad process again using only the deposit keys marked in grey.

![Deposit Launchpad](/img/guides/validator-setup/launchpad_11.png)

After everything has gone through, return to the home screen and check your progress in the deposit file.

### Checking Deposits

After the transaction is sent, you can click on the `Transaction` or `Beaconchain Transaction` button based on if you are using the Launchpad for Testnet, Genesis Mainnet, or Regular Mainnet.

#### Genesis Validators

For Genesis Depositors, the Blockchain Explorer for Ethereum will show up, as the locking is done using the Ethereum-based representation of LYX:

![Genesis Execution Chain Deposit](/img/guides/validator-setup/genesis-deposit-screen.png)

You can also check the deposit files on the main page of the launchpad again:

![Deposit Launchpad](/img/guides/validator-setup/launchpad_12.png)

If they are all green, you are good to go. If not, repeat the process with only those remaining gray keys. Do not forget to make a copy beforehand.

If you have a deposit file with the total amount of validator keys, you will see a subset of keys going green after the deposits were successful.

#### Testnet and Mainnet Validators

For the Testnet and regular validators, it will open up the beacon chain explorers as everything was done natively on the blockchain:

![Testnet Beacon Chain Deposit](/img/guides/validator-setup/testnet-deposit-screen.png)

It will take up to 14-24 hours for the validator to get activated by the network consensus. You can already start importing your key and starting your node, so the validator will start attesting and validating blocks as soon as it has been activated. Have a look into the [Node Installation](#) and [Validator Setup](#) sections of the guide if you need further assistance.

<!-- TODO: /6-blockchain-clients/08-cli-setup.md-->
<!-- TODO: /6-blockchain-clients/09-validator-setup.md-->

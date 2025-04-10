---
sidebar_label: "1.3 CLI Key Generation"
sidebar_position: 3
---

# 1.3 CLI Key Generation

## CLI Validator Key Generation

This section will cover the setup of the Validator keys using the [LUKSO Key Gen CLI](https://github.com/lukso-network/tools-key-gen-cli) tool.

### What is the LUKSO Key Gen?

The LUKSO Key Gen is a command-line interface tool that helps generate the necessary keys for becoming a validator on Ethereum-based blockchains.

On the other hand, you could also choose to generate deposit keys using the [LUKSO Deposit CLI](#) tool.

<!-- TODO: ./03-lukso-deposit-cli.md-->

### Download the Software

> The following steps will be performed on your machine, and prepare the files for Linux 22.04.2 Desktop. If you use another operating system to generate keys, use the DMG (Mac) or EXE (Windows) files instead.

1. Visit the official release page
2. Download the linux.tar.gz file of the [latest release](https://github.com/lukso-network/tools-key-gen-cli/releases)

> On creation of this guide, the current version is `2.5.3`

### Prepare USB Device

1. Connect a USB device
2. Flash it using the disk utility tool
3. Copy the tape archive onto the disk
4. Eject USB disk

### Connect on Keygen Computer

1. Connect the USB device
2. Copy the tape archive to your home directory

Open the terminal and move into the home directory.

```sh
cd
```

### Setup the Executable

After downloading, we need to unpack the file. A description of the tape archive tool can be found within the [Node Exporter](#) section for monitoring. Please note that the filenames might change due to the versioning.

<!-- TODO: /7-monitoring/02-node-exporter.md -->

```sh
tar xzfv lukso-key-gen-cli-v2.5.3-linux.tar.gz
```

Move into the newly created folder:

```sh
cd lukso-key-gen-cli-v2.5.3-linux
```

### Generate the Initial Keys

Now we can start the application to generate our initial keys using the `new-mnemonic` option. Setting a withdrawal address is necessary as you can withdraw your deposits later on, as described in the [Earnings & Withdrawals](#) section of the guide.

<!-- TODO: /6-blockchain-clients/02-network-theory.md-->

```sh
./lukso-key-gen new-mnemonic --eth1_withdrawal_address 0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC
```

The initial startup will take some time, do not close the terminal window.

Choose your language by typing the corresponding number into the input prompt. If you press `Enter` it will select English as default.

```text
> 3.
```

Next, select how many validators you want to run:

> You can generate more keys than you want to fund now. These will spin up in idle mode and won't be activated until they have enough funds.

#### Split Deposits to multiple Wallets

In case you have multiple wallets to make deposits from, you could either:

- **Generate batches** with the same seed. Therefore create the keys for the first wallet now and redo the process by importing an existing mnemonic seed phrase afterward. This way, you will have multiple `deposit_data.json` files for each wallet. For instance, if you have 30 validators and 3 different wallets with 320 LYXe/LYX each, create 10 validators each using the same seed or withdrawal address. In the first run, specify you want to generate 10 keys from a new seed phrase. In the second run, tell the generation tool that you already have 10 keys. In the 3rd run, set you already have 20 keys, and generate the last 10. You will end up with 3 different folders that may also have different passwords and withdrawal addresses.
- **Modify the deposit file** after you generate your total keys in one folder. Here, create duplicates of the `deposit_data.json` file. Open it using a JSON Editor and remove as many `pubkey` elements as possible. For instance: if you have 30 validators and 3 different wallets with 320 LYXe/LYX each, generate 30 validators in one go. Afterward, make 3 copies of the deposit file. In the 1st copy, delete everything after your 10th `pubkey` (validators 1-10). In the 2nd copy, delete the first and last 10 `pubkey` elements (validators 11-20). In the 3rd copy, delete the first 20 `pubkey` elements (validators 21-30.) You will end up with one folder but 3 deposit files, each having a different subsection of the generated keys that were generated in total. There is an in-detail description in the [Validator Staking](/validator-key-stake/) section.

> If your wallets have different amounts of LYXt, LYXe, or LYX, adjust the `pubkey` elements, and validator amounts accordingly to match the coins you hold.

In both cases, you will have to go through the launchpad process 3 times, as the launchpad will check if your wallets have enough balance before you can continue to the deposit screen.

> If you only want to create deposits from one wallet, just run through the process once.

```text
> 10
```

Afterward, you will have to choose between your network type. Select `lukso-testnet` to generate testnet keys or `lukso` to generate mainnet keys.

```text
> lukso
```

After selecting your network, you must input the password to encrypt your validator keys. You will have to repeat it within the next step.

Your seed will be generated and printed out in the terminal.

Please write it down on paper and ensure it is backed up safely. Do not save this as a plain text file anywhere digitally. You will be responsible for keeping the seed phrase secure. Please do not share it with anyone. Anyone that gains access to the mnemonic can control your deposits or slash you.

> The mnemonic seed phrase is the backup for your validator deposit keys. If you want to create additional validator keys and re-create your initial ones, you will need the mnemonic.

Press any key to continue with the setup. You have to input your mnemonic seed phrase again with spaces in between.

When you press `Enter`, the CLI will check the seed. If typed in correctly, you will see the following output on the terminal window:

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

The deposit files will be saved within the same folder at `./validator_keys`. Press any key to exit the CLI tool.

Check out the files in your folder. You should have two types of files:

- `deposit_data.json`: The file you will use to make deposit transactions to activate the keys. You must use this file during the [Deposit Launchpad](/validator-key-stake/) process.
- `keystore.json`: One keystore file for every validator key you generated. Those files must be imported into your node as described in the [Validator Setup](#) section.

<!-- TODO: /6-blockchain-clients/09-validator-setup.md-->

### Generate Additional Keys

Make sure you are in the same folder as the LUKSO Key Gen:

```sh
cd && cd lukso-key-gen-cli-v2.5.3-linux
```

If you want to add keys to your validator, rename your folder of the first created batch, so you can adequately differentiate them afterward. Make sure to use your folder name.

```sh
mv validator_keys <new-folder-name>
```

Start up the tool with an existing mnemonic. Again, setting a withdrawal address is necessary as you can withdraw your deposits later on, as described in the [Earnings & Withdrawals](#) section of the guide.

<!-- TODO: /6-blockchain-clients/02-network-theory.md-->

> If you use it as a backup, use the same withdrawal address as you did on the initial generation process of the keys.

```sh
./lukso-key-gen existing-mnemonic --eth1_withdrawal_address 0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC
```

Wait for the application to start up, and don't close the terminal. Then select your language again or continue in English by pressing `Enter`:

```text
> 3.
```

Then enter the existing mnemonic seed phrase that you've already generated once before. You will be prompted to enter the starting index of the keys. If you already generated `10` keys before and want to start by generating the 11th deposit key. Enter the number of keys you already generated.

If you want to create a folder with all the keys again, you can select `0` for the number of existing keys (starting index) and the total amount of all your deposit keys as the number of keys to create. Starting from `0` will recreate all your keys for the validator. It's handy if you need to update the withdrawal address before depositing or if you have to reset the validator passwords.

```text
> 10
```

You will have to verify your number and repeat the input once again:

```text
> 10
```

Afterward, you can specify how many validators you want to generate. In this case, it will create validators `11-20`.

```text
> 10
```

Afterward, you must select the network you want to create these for. As before, this can be `lukso-testnet` for testnet or `lukso` for mainnet.

```text
> lukso
```

Retype your password, and you are good to go. The final screen should show up as on the initial setup:

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

The deposit files will be saved within the same folder at `./validator_keys`. Press any key to exit the CLI tool.

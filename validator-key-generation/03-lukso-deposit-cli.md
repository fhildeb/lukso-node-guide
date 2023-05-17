## CLI Validator Key Generation

This section will cover the setup of the Validator keys using the [LUKSO Key Gen CLI](https://github.com/lukso-network/tools-key-gen-cli) tool.

### What is Key Gen

Key Gen is a command-line interface tool that helps generate the necessary keys for becoming a validator on Ethereum-based blockchains.

On the other hand, you could also choose to generate deposit keys using the [LUKSO Deposit CLI](./03-lukso-deposit-cli.md) tool.

### Download the Software

> The following steps will be performed on your personal machine and prepare the files for Linux 22.04.2 Desktop. If you use another operating system to generate keys on, use the DMG (Mac) or EXE (Windows) files instead.

1. Visit the official release page
2. Download the linux.tar.gz file of the [latest release](https://github.com/lukso-network/tools-key-gen-cli/releases)

> On creation of this guide, the current version is `2.5.3`

### Prepare USB Device

1. Connect a USB device
2. Flash it using a formatting / disk utility tool
3. Copy the tape archive onto the disk
4. Eject USB disk

### Connect on Keygen Computer

1. Connect the USB device
2. Copy the tape archive to your home directory

Open the terminal and move into the home directory

```sh
cd
```

### Setup the Executable

After downloading, we need to unpack the file. A description of the tape archive tool can be found within the [Node Exporter](/7-monitoring/02-node-exporter.md) section for monitoring. Please note that the filenames might change due to the versioning.

```sh
tar xzfv lukso-key-gen-cli-v2.5.3-linux.tar.gz
```

Move into the newly created folder:

```sh
cd lukso-key-gen-cli-v2.5.3-linux
```

### Generate Initial the Keys

Now we can start up the application to generate our initial keys using the `new-mnemonic` option. Setting an withdrawal address is highly recommended as you will get the change to withdraw your deposits later on, as described in the [Earnings & Withdrawals](/6-blockchain-clients/02-network-theory.md) section of the guide.

```sh
./lukso-key-gen new-mnemonic --eth1_withdrawal_address 0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC
```

The initial startup will take some time, do not close the terminal window.

Chose your language by typing the related number into the input prompt. If you press `Enter` it will select English as default.

```text
> 3.
```

Next, select how many validators you want to run:

> You can generate more keys than you actually want to fund right now. These will spin up in idle mode and wont be activated until they have enough funds on them.

#### Split Deposits to multiple Wallets

In case you have multiple wallets to make deposits from, you could either:

- **Generate batches** with the same seed. Therefore just create the keys for the first wallet now and redo the process by importing an existing seed afterwards. This way, you will have multiple `deposit_data.json` files for each wallet. For instance: if you have 30 validators and 3 different wallets with 320 LYXe/LYX each, create 10 validators each during the process using the same seed, or even the same withdrawal address. In the first run, specify you want to generate 10 keys from a fresh seed. In the second run, specify you already have 10 keys. In the 3rd run, specify you already have 20 keys, and generate the last 10. You will end up with 3 different folders.
- **Modify the deposit file** after you generated your total amount of keys in one folder. Here, create duplicates of the `deposit_data.json` file. Open it up using a JSON Editor and remove as many `pubkey` elements as you want. For instance: if you have 30 validators and 3 different wallets with 320 LYXe/LYX each, generate 30 validators in one go. Afterwards make three copies of the deposit file. In the 1st copy, delete everything after your 10th `pubkey` (validators 1-10). In the 2nd copy, delete the first and last ten `pubkey` elements (validators 11-20). In the 3rd copy, delete the first 20 `pubkey` elements (validators 21-30.) You will end up with one folder but 3 deposit files. There is an in-detail description in the [Validator Staking](/validator-key-stake/) section.

> If your wallets have different amounts of LYXt, LYXe, or LYX, adjust the pubkeys and validator amounts accordingly so it matches the coins your hold.

If you want to generate batches, it is recommended to always rename your key folder as the CLI tool will always deposit the keys within the `validator_keys` folder in the same directory. Here you will end up with one huge folder and you can not really tell which of them are what without checking them individually.

In both cases, you will have to go through the launchpad process 3 times, as the launchpad will check if your wallets have enough balance, before you can continue to the deposit screen.

> If you only want to create deposits from one wallet, just run through the process once.

```text
> 10
```

Afterwards, you will have to choose between your network type. Select `lukso-testnet` to generate testnet keys or choose `lukso` to generate mainnet keys.

```text
> lukso
```

After selecting your network, you will have to input the password to encrypt your validator keys. You will have to repeat again within the next step.

Your seed will be generated and printed out in the terminal.

Write it down on paper and make sure it is backed up in a save way. Do not save this as plain text file anywhere digitally. You will be responsible to keep the seedphrase secure. Do not share it with anyone. Anyone that gains access to the mnemonic can control your deposits or slash you.

> The mnemonic seephrase acts as the backup for your validator deposit keys. If you want to create new additional validator keys on re-create your initial ones, you will need the mnemonic.

Press any key to continue with the setup. You will have to imput your mnemonic seedphrase again with spaces inbetween.

After you pressed `Enter`, the CLI will check the seed. If typed in correctly, you will see the following output on the terminal window:

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
Creating your keys:		  [####################################]  10/10
...
Creating your keystores:	  [####################################]  10/10
...
Creating your depositdata:	  [####################################]  10/10
...
Verifying your keystores:	  [####################################]  10/10
...
Verifying your deposits:	  [####################################]  10/10

Success!
```

The deposit files will be saved within the same folder at `./validator_keys`. Press any key to exit the CLI tool.

Check out the files in your folder. You should have two types of files:

- `deposit_data.json` The file you will use to make deposit transactions in order to activate the keys. You will have to use this file during the [Deposit Launchpad](/validator-key-stake/) process.
- `keystore.json`: One keystore file for every validator key you generated. Those files will have to be impoorted into your node as described in the [Validator Setup](/6-blockchain-clients/09-validator-setup.md) section.

### Generate Additional Keys

Make sure you are in the same folder as the Key Gen CLI:

```sh
cd && cd lukso-key-gen-cli-v2.5.3-linux
```

If you want to add additional keys to your validator, first make sure you renamed your folder of the first created batch, so you can properly differenciate them afterwards. Make sure to use your own folder name.

```sh
mv validator_keys <new-folder-name>
```

Start up the tool with an existing mnemonic. Again, setting an withdrawal address is highly recommended as you will get the change to withdraw your deposits later on, as described in the [Earnings & Withdrawals](/6-blockchain-clients/02-network-theory.md) section of the guide.

> If you use it as a backup, make sure you use the same withdrawal address as before.

```sh
./lukso-key-gen existing-mnemonic --eth1_withdrawal_address 0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC
```

Wait for the application to start up and dont close the terminal. Then select your language again or continue in English by pressing `Enter`:

```text
> 3.
```

Then enter your existing mnemonic seephrase that you've already generated once before. You will be prompted to enter the starting index of the keys. In case you already generated `10` keys before, and you want to start generating the 11th deposit key counting forward, enter `10`.

If you want to create a folder with all the keys again, in case you want to update the withdrawal address before deposit or recreate the validator key passwords, you can select `0` for the amount of existing keys (starting index) and the total amount of all your deposit keys as the number of keys to create. This will recreate all your keys for the validator.

```text
> 10
```

You will have to repreat the input once again:

```text
> 10
```

Afterwards, you are able to specify how many validators you want to generate. In this case it will create validators `11-20`.

```text
> 10
```

Afterwards you will have to select your network that you want to create these for. As before, this can either be `lukso-testnet` for testnet or `lukso` for mainnet.

```text
> lukso
```

Retype your password and you are good to go. The final screen should show up as on the initial setup:

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
Creating your keys:		  [####################################]  10/10
...
Creating your keystores:	  [####################################]  10/10
...
Creating your depositdata:	  [####################################]  10/10
...
Verifying your keystores:	  [####################################]  10/10
...
Verifying your deposits:	  [####################################]  10/10

Success!
```

The deposit files will be saved within the same folder at `./validator_keys`. Press any key to exit the CLI tool.

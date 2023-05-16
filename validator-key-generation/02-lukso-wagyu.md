# GUI Validator Key Generation

This section will cover the setup of the Validator keys using the [LUKSO Wagyu Key Gen](https://github.com/lukso-network/tools-wagyu-key-gen) tool.

### Download the Software

> The following steps will be performed on your personal machine and prepare the files for Linux 22.04.2 Desktop. If you use another operating system to generate keys on, use the DMG (Mac) or EXE (Windows) files instead.

1. Visit the official release page
2. Download the Appimage file of the [latest release](https://github.com/lukso-network/tools-wagyu-key-gen/releases)

> On creation of this guide, the current version is `1.8.2`

### Prepare USB Device

1. Connect a USB device
2. Flash it using a formatting / disk utility tool
3. Copy the Appimage onto the disk
4. Eject USB disk

### Connect on Keygen Computer

1. Connect the USB device
2. Copy the Appimage to your home directory

### Generate Initial the Keys

Now we can start up the application to generate our keys with a graphical interface. Open the explorer in your home directory and execute the LUKSO Wagyu Keygen Application.

![Wagyu Starting Screen](/img/gui_keygen_1.png)

In the upper right, choose between testnet and mainnet by clicking on the `LUKSO` button.

![Wagyu Network Select](/img/gui_keygen_2.png)

Select `CREATE NEW SECRET RECIVERY PHRASE`

![Wagyu Security Notice](/img/gui_keygen_3.png)

Carefully read the text and check out the links. Then click `CREATE` to generate a fresh mnemonic like this one:

![Wagyu Secret Creation](/img/gui_keygen_4.png)

Write it down on paper and make sure it is backed up in a save way. Do not save this as plain text file anywhere digitally. You will be responsible to keep the seedphrase secure. Do not share it with anyone. Anyone that gains access to the mnemonic can control your deposits or slash you.

> The mnemonic seephrase acts as the backup for your validator deposit keys. If you want to create new additional validator keys on re-create your initial ones, you will need the mnemonic.

Click `NEXT` to retype your saved mnemonic seed

![Wagyu Secret Confirmation](/img/gui_keygen_5.png)

Continue clicking on `CHECK`.

![Wagyu Key Screen](/img/gui_keygen_6.png)

You will have to provide the number of new keys to generate, your password that will be used for encrypting the deposit keys you generate and your withdrawal address for all the keys. You can read more about the withdrawal address within the [Earnings & Withdrawals](/6-blockchain-clients/02-network-theory.md) section of the guide.
Then click `NEXT` to continue.

> You can generate more keys than you actually want to fund right now. These will spin up in idle mode and wont be activated until they have enough funds on them.

#### Split Deposits to multiple Wallets

In case you have multiple wallets to make deposits from, you could either:

- **Generate batches** with the same seed. Therefore just create the keys for the first wallet now and redo the process by importing an existing seed afterwards. This way, you will have multiple `deposit_data.json` files for each wallet. For instance: if you have 30 validators and 3 different wallets with 320 LYXe/LYX each, create 10 validators each during the process using the same seed, or even the same withdrawal address. In the first run, specify you want to generate 10 keys from a fresh seed. In the second run, specify you already have 10 keys. In the 3rd run, specify you already have 20 keys, and generate the last 10. You will end up with 3 different folders.
- **Modify the deposit file** after you generated your total amount of keys in one folder. Here, create duplicates of the `deposit_data.json` file. Open it up using a JSON Editor and remove as many `pubkey` elements as you want. For instance: if you have 30 validators and 3 different wallets with 320 LYXe/LYX each, generate 30 validators in one go. Afterwards make three copies of the deposit file. In the 1st copy, delete everything after your 10th `pubkey` (validators 1-10). In the 2nd copy, delete the first and last ten `pubkey` elements (validators 11-20). In the 3rd copy, delete the first 20 `pubkey` elements (validators 21-30.) You will end up with one folder but 3 deposit files. There is an in-detail description in the [Validator Staking](/validator-key-stake/) section.

> If your wallets have different amounts of LYXt, LYXe, or LYX, adjust the pubkeys and validator amounts accordingly so it matches the coins your hold.

In both cases, you will have to go through the launchpad process 3 times, as the launchpad will check if your wallets have enough balance, before you can continue to the deposit screen.

> If you only have one deposit file, just run through the process once.

![Wagyu Password Reenter](/img/gui_keygen_7.png)

Click on `BROWSE` to specify the folder that will be used to generate the files. Afterwards click `CREATE` to generate your keys.

![Wagyu Folder Select](/img/gui_keygen_8.png)

Wait for all the keys to be generated.

![Wagyu Creation Screen](/img/gui_keygen_9.png)

The final screen will be shown afterwards

![Wagyu Final Screen](/img/gui_keygen_10.png)

Check out the files in your folder. You should have two types of files:

- `deposit_data.json` The file you will use to make deposit transactions in order to activate the keys. You will have to use this file during the [Deposit Launchpad](/validator-key-stake/) process.
- `keystore.json`: One keystore file for every validator key you generated. Those files will have to be impoorted into your node as described in the [Validator Setup](/6-blockchain-clients/09-validator-setup.md) section.

### Generate Additional Keys

If you want to add additional keys to your validator, click on `USE EXISTING SECRET RECOVERY PHRASE` on the starting screen. You will be prompted to select the right network afterwards.

![Wagyu Starting Screen](/img/gui_keygen_1.png)

Enter your validator seed again and press `IMPORT` to start the importing process.

![Wagyu Seed Import](/img/gui_keygen_11.png)

Now choose the amount of keys that you want to additionally create for this validator, and how many keys you already got in another folder. Also define your withdrawal address for all the additional keys. You can read more about the withdrawal address within the [Earnings & Withdrawals](/6-blockchain-clients/02-network-theory.md) section of the guide.

If you want to create a folder with all the keys again, in case you want to update the withdrawal address before deposit or recreate the validator key passwords, you can select `0` for the amount of existing keys (starting index) and the total amount of all your deposit keys as the number of keys to create. This will recreate all your keys for the validator.

> If you use it as a backup, make sure you use the same validator address than before.

![Wagyu Key Screen](/img/gui_keygen_12.png)

Afterwards, continue with the regular setup as before. Input your password, select your folder in which the new `deposit:data.json` and `keygen.json` files will be stored.

![Wagyu Final Screen](/img/gui_keygen_10.png)

---
sidebar_label: "7.1 Slasher Configuration"
sidebar_position: 1
---

# 7.1 Slasher Configuration

<!--INFO BOX link to slasher hardware requirements and slasher service theory-->

#### Activate or Disable the Slasher

If you are running a **validator** using the LUKSO CLI, the slasher is activated by default. This is done for security reasons to increase watchers for malicious events during network downtimes of bigger services. If you are runnning on lower hardware, you can disable it using the commands below.

Make sure to add your transaction fee recipient address within the command.

```sh
# Disable Slasher for Prysm Consensus Client on Mainnet
lukso start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>" --no-slasher

# Disable Slasher for Prysm Consensus Client on Testnet
lukso start --testnet --validator --transaction-fee-recipient "<transaction-fee-recipient-address>" --no-slasher
```

In case you are running a **regular node** or **custom setups** with the CLI, slashers are disabled by default, you can pass the `--prysm-slasher` or `--lighthouse-slasher` flag to enable it manually. The command will manually pass down the `--slasher` flag to the clients.

#### Removing the Slasher Database

In case you are running short on storage, you can delete the the slasher database, which takes up a lot of storage space. Simply remove the following database file within your node directory:

```sh
# Remove Slasher Database for Mainnet Node
rm -rf /mainnet-data/consensus/beaconchaindata/slasher.db

# Remove Slasher Database for Testnet Node
rm -rf /testnet-data/consensus/beaconchaindata/slasher.db
```

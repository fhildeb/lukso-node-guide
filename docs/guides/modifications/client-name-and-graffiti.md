---
sidebar_label: "7.1 Client Name and Graffiti"
sidebar_position: 1
---

# 7.1 Client Name and Graffiti

## 6.10 Client Modifications

A whole suite of flags can be added to the clients while starting the service. By using the flags `--geth-[COMMAND]`, `--prysm-[COMMAND]`, `--validator-[COMMAND]`, `--erigon-[COMMAND]`, or `--lighthouse-[COMMAND]` you can pass through any available flag of the underlying client.

Have a look at their specifications if you like:

- [Geth Parameters](https://geth.ethereum.org/docs/fundamentals/command-line-options)
- [Prysm Parameters](https://docs.prylabs.network/docs/prysm-usage/parameters)
- [Lighthouse Parameters](https://lighthouse-book.sigmaprime.io/advanced-datadir.html)
- [Erigon Parameters](https://github.com/ledgerwatch/erigon)

### 6.10.1 Changing your Node's Name

You can change your node name to change the appearance of other nodes in the network or on the stats pages. It doesn't affect the node's operations or performance.

You can change your node name by either:

- passing down the `identity` flag
- configuring your `toml` files

If you want to set a temporary name, just pass down the identity flag when starting your execution client. For Geth, it will look like this:

```sh
lukso start --geth-identity "<your-node-name>"
```

For Erigon, it will look like this:

```sh
lukso start --erigon-identity "<your-node-name>"
```

If you want a permanent naming, even when restarting your node without passing the flag, go ahead and edit your `geth.toml` or `erigon.toml` files within `/config/<network>/geth/` or `/config/<network>/erigon/` of the working directory.

Make sure to be in the node folder:

```sh
cd
```

Navigate into the node's config folder of your network you want to set the name for. Adjust the `your-node-folder` and `<network>` `your-execution-client` properties with the actual folder names.

```
cd <your-node-folder>/configs/<network>/<your-execution-client>
```

Then open up the configuration file:

```
vim <your-execution-client>.toml
```

When using Geth, search for the `[Node]` section and add the UserIdent property under it.

```text
[Node]
UserIdent = "<your-node-name>"
```

If you are running on Erigon, enter the following line at the end of the config:

```text
"identity" = "<your-node-name>"
```

Make sure to adjust `<your-node-name>` to your actual name. Also, be careful when editing your config files. Ensure you are not deleting anything and that there are spaces in front and behind the `=` symbol.

### 6.10.2 Setting the Graffiti

Graffiti is a term that refers to a customizable field that validators can use when they propose a new block. This field allows validators to inscribe a short message of up to 32 bytes into the block's metadata. These messages are permanently stored on the blockchain and can be publicly viewed. Each ASCII character uses 1 byte, but special characters or emojis can take more. Definitely check if your message is within the limit before you start your validator.

Adding graffiti to a block gives validators a unique way to mark their contributions to the network. The content of the graffiti can vary greatly. Some validators might use this space to include their validator name or identifier, while others might use it for fun.

> However, It's important to note that the graffiti field should be used responsibly. Although it allows for freedom of expression, it's part of the Ethereum blockchain's permanent record, so the community generally encourages respectful and appropriate usage.

There are two types of how to set a graffiti property for our validator client:

- passing down the `graffiti` flag
- configuring your `yaml` file

```sh
# Starting mainnet with graffiti
lukso start --validator-graffiti "<your-graffiti>"

# Starting testnet with graffiti
lukso start --testnet --validator-graffiti "<your-graffiti>"
```

To make it a permanent graffiti, you can edit the configuration file of the Validator. Make sure to be in the node folder:

```sh
cd
```

Navigate into your node's config folder of the network you want to set the name for. Adjust the `your-node-folder` and `<network>` `your-consensus-client` properties with the actual folder names.

```
cd <your-node-folder>/configs/<network>/<your-consensus-client>
```

Then open up the configuration file:

```
vim validator.yaml
```

Add the following line at the end of the file:

```text
graffiti: '<your-graffiti>'
```

Make sure to adjust `<your-graffiti>` to your actual graffiti. Also, be careful when editing your config files. Make sure you are not deleting anything.

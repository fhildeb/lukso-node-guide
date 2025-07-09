---
sidebar_label: "7.3 Validator Graffiti"
sidebar_position: 3
description: "Customize your validator’s graffiti to appear on LUKSO blocks. This guide shows how to add graffiti via startup flags, automation scripts, or client config files."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 7.3 Validator Graffiti

To personalize your validator's appearance, you can assign a custom graffiti thats publically displayed on the [consensus slot page](https://explorer.consensus.mainnet.lukso.network/slots). Adding graffiti to a block gives validators a unique way to mark their contributions to the network. The content of the graffiti can vary greatly. Some validators might use this space to include their validator name or identifier, while others might use it for fun.

Within an EVM-blockchain, the graffiti refers to a customizable field where validators can inscribe a short message of up to 32 bytes into the block's metadata. These messages are permanently stored on the blockchain. Each ASCII character uses 1 byte, but special characters or emojis can up take more.

:::note

Although the graffiti allows for freedom of expression, it should be used responsibly. It's part of the blockchain's permanent record and repeated with every block proposal. The community generally encourages respectful and appropriate usage.

:::

:::tip

Check if your message is [within the byte limit](https://mothereff.in/byte-counter) before attaching it to the client. Emojis take up several bytes.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Stop Node Operation

Depending on your setup method, there are different ways to stop your node before setting a graffiti.

<Tabs groupId="setup">
  <TabItem value="cli" label="LUKSO CLI" default>

```sh
cd <lukso-working-directory>
lukso stop
```

:::info

Exchange `<lukso-working-directory>` with the path of the node folder.

:::

</TabItem> <TabItem value="automation" label="Service Automation">

```sh
sudo systemctl stop lukso-validator
```

</TabItem>
</Tabs>

<details>
<summary>Force Client Shutdown</summary>

<Tabs>
<TabItem value="geth" label="Geth">

```sh
sudo pkill geth
```

</TabItem> <TabItem value="erigon" label="Erigon">

```sh
sudo pkill erigon
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```sh
sudo pkill nethermind
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
sudo pkill besu
```

</TabItem> <TabItem value="teku" label="Teku">

```sh
sudo pkill teku
```

</TabItem> <TabItem value="nimbus2" label="Nimbus-Eth2">

```sh
sudo pkill nimbus_beacon_node
sudo pkill nimbus_validator_client
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

```sh
sudo pkill lighthouse
```

:::tip

The Lighthouse client uses a single binary for both the consensus and validator processes.

:::

</TabItem> <TabItem value="prysm" label="Prysm">

```sh
sudo pkill prysm
sudo pkill validator
```

</TabItem>
</Tabs>

</details>

## 2. Add Validator Graffiti

You can either set the graffiti via startup flags or persistently within the configuration files of your execution client. If you want to set a temporary graffiti, using the flag is recommended, as it will only persist until the next restart of the node.

<Tabs groupId="configuration">
  <TabItem value="flag" label="Setting a Startup Flag" default>

Depending on your setup method, there are different ways to pass down the graffiti using the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli).

<Tabs groupId="setup">
<TabItem value="clinode" label="LUKSO CLI Node" default>

Every consensus client has a individual flag to set the graffiti during startup.

<Tabs>
<TabItem value="prysm" label="Prysm">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with Custom Graffiti
lukso start --checkpoint-sync --prysm-graffiti "<your-graffiti>"

# Start the Testnet Node with Custom Graffiti
lukso start --testnet --checkpoint-sync --prysm-graffiti "<your-graffiti>"
```

</TabItem> <TabItem value="teku" label="Teku">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with Custom Graffiti
lukso start --checkpoint-sync --teku-validators-graffiti="<your-graffiti>"

# Start the Testnet Node with Custom Graffiti
lukso start --testnet --checkpoint-sync ---teku-validators-graffiti="<your-graffiti>"
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with Custom Graffiti
lukso start --checkpoint-sync --lighthouse-graffiti "<your-graffiti>"

# Start the Testnet Node with Custom Graffiti
lukso start --testnet --checkpoint-sync --lighthouse-graffiti "<your-graffiti>"
```

</TabItem> <TabItem value="Nimbus-Eth2" label="Nimbus-Eth2">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with Custom Graffiti
lukso start --checkpoint-sync --nimbus2-graffiti="<your-graffiti>"

# Start the Testnet Node with Custom Graffiti
lukso start --testnet --checkpoint-sync --nimbus2-graffiti="<your-graffiti>"
```

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path of the node folder
- `<your-graffiti>` with the custom graffiti of your node.

:::

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

</TabItem> <TabItem value="clivalidator" label="LUKSO CLI Validator" default>

Every consensus client has a individual flag to set the graffiti during startup.

<Tabs>
<TabItem value="prysm" label="Prysm">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Graffiti
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --prysm-graffiti "<your-graffiti>"

# Start the Testnet Validator Node with Custom Graffiti
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --prysm-graffiti "<your-graffiti>"
```

</TabItem> <TabItem value="teku" label="Teku">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Graffiti
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --teku-validators-graffiti="<your-graffiti>"

# Start the Testnet Validator Node with Custom Graffiti
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --teku-validators-graffiti="<your-graffiti>"
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Graffiti
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --lighthouse-graffiti "<your-graffiti>"

# Start the Testnet Validator Node with Custom Graffiti
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --lighthouse-graffiti "<your-graffiti>"
```

</TabItem> <TabItem value="nimbus2" label="Nimbus-Eth2">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Graffiti
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --nimbus2-graffiti="<your-graffiti>"

# Start the Testnet Validator Node with Custom Graffiti
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --nimbus2-graffiti="<your-graffiti>"
```

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path of the node folder
- `<your-fee-recipient-address>` with the wallet address receiving staking profits
- `<your-graffiti>` with the custom graffiti of your node.

:::

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

</TabItem> <TabItem value="automation" label="Service Automation">

Open the startup script within your node directory with your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
sudo vim <lukso-working-directory>/static/lukso_startup.sh
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
sudo nano <lukso-working-directory>/static/lukso_startup.sh
```

</TabItem>
</Tabs>

:::info

Exchange `<lukso-working-directory>` with the path to the node folder.

:::

Add the graffiti flag as a new line to the start command, then save and exit the file.

<Tabs>
<TabItem value="prysm" label="Prysm">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --geth-graffiti "<your-graffiti>"
```

</TabItem> <TabItem value="teku" label="Teku">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --teku-validators-graffiti="<your-graffiti>"
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --lighthouse-graffiti "<your-graffiti>"
```

</TabItem> <TabItem value="nimbus-2" label="Nimbus-Eth2">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --nimbus2-graffiti="<your-graffiti>"
```

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<your-generic-password-file>` with the name of your validator password file
- `<your-fee-recipient-address>` with the wallet address receiving staking profits
- `<your-graffiti>` with the actual graffiti description of your node

:::

After the startup script was updated, you can restart the node by executing the related service.

```sh
sudo systemctl start lukso-validator
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="file" label="Modifying the Client Configuration">

Depending on your consensus client, the graffiti can be set with different properties.

<Tabs groupId="client">
<TabItem value="prysm" label="Prysm">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/prysm/
vim validator.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/prysm/
nano validator.yaml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="teku" label="Teku">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/teku/
vim validator.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/teku/
nano validator.yaml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/lighthouse/
vim validator.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/lighthouse/
nano validator.toml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="nimbus2" label="Nimbus-Eth2">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/nimbus2/
vim validator.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/nimbus2/
nano validator.toml
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path to the node folder.
- `<network>` with the name of your node's network.

:::

Add the graffiti as a new line within the settings, then save and exit the file.

<Tabs groupId="client">
<TabItem value="prysm" label="Prysm">

Add the _graffiti_ as a new line at the end of the file.

```text
graffiti: '<your-graffiti>'
```

</TabItem> <TabItem value="teku" label="Teku">

Add the _validators-graffiti_ as a new line at the end of the file.

```text
validators-graffiti: 'your-graffiti'
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

Add the _graffiti_ as a new line at the end of the file.

```text
graffiti: "<your-graffiti>"
```

</TabItem> <TabItem value="nimbus2" label="Nimbus">

Add the _graffiti_ as a new line at the end of the file.

```text
graffiti = "<your-graffiti>"
```

</TabItem>
</Tabs>

:::info

Exchange `<your-graffiti>` with the custom graffiti of your node.

:::

:::warning

Ensure there are no missing spaces, characters or unintended linebreaks before saving the configuration file.

:::

Depending on your setup method, there are different ways to start your node after setting the graffiti.

<Tabs groupId="setup">
  <TabItem value="clinode" label="LUKSO CLI Node" default>

```sh
cd <lukso-working-directory>
lukso start --checkpoint-sync
```

:::info

Exchange `<lukso-working-directory>` with the path of the node folder.

:::

</TabItem> <TabItem value="clivalidator" label="LUKSO CLI Validator" default>

```sh
cd <lukso-working-directory>
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync
```

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path of the node folder
- `<your-fee-recipient-address>` with the wallet address receiving staking profits

:::

</TabItem> <TabItem value="automation" label="Service Automation">

```sh
sudo systemctl start lukso-validator
```

</TabItem>
</Tabs>

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

</TabItem>
</Tabs>

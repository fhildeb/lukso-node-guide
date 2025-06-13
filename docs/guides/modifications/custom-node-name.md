---
sidebar_label: "7.2 Custom Node Name"
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 7.2 Custom Node Name

To personalize your node's appearance, you can assign a custom name thats publically displayed on the [execution status panel](https://stats.execution.mainnet.lukso.network/).

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Stop Node Operation

Depending on your setup method, there are different ways to stop your node before setting a custom name.

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

## 2. Add Node Name

You can either set the node name via startup flags or persistently within the configuration files of your execution client. If you want to set a temporary name, using the flag is recommended, as it will only persist until the next restart of the node.

<Tabs groupId="configuration">
  <TabItem value="flag" label="Setting a Startup Flag" default>

Depending on your setup method, there are different ways to pass down the name flag using the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli).

<Tabs groupId="setup">
<TabItem value="clinode" label="LUKSO CLI Node" default>

Every execution client has a individual flag to set the node name during startup.

<Tabs>
<TabItem value="geth" label="Geth">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with Custom Name
lukso start --checkpoint-sync --geth-identity "<your-node-name>"

# Start the Testnet Node with Custom Name
lukso start --testnet --checkpoint-sync --geth-identity "<your-node-name>"
```

</TabItem> <TabItem value="erigon" label="Erigon">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with Custom Name
lukso start --checkpoint-sync --erigon-identity "<your-node-name>"

# Start the Testnet Node with Custom Name
lukso start --testnet --checkpoint-sync --erigon-identity "<your-node-name>"
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with Custom Name
lukso start --checkpoint-sync --nethermind-ethstats-name "<your-node-name>"

# Start the Testnet Node with Custom Name
lukso start --testnet --checkpoint-sync --nethermind-ethstats-name "<your-node-name>"
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with Custom Name
lukso start --checkpoint-sync --besu-ethstats="<your-node-name>:<ethstats-secret>@<ethstats-server-url>"

# Start the Testnet Node with Custom Name
lukso start --testnet --checkpoint-sync --besu-ethstats="<your-node-name>:<ethstats-secret>@<ethstats-server-url>"
```

:::warning

The Besu client embeds the node name directly within the Eth-Stats connection string, meaning you must also exchange and provide the `<ethstats-secret>` and `<ethstats-server-url>` as a flag. Other execution clients have those set separately within their config files.

:::

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path of the node folder
- `<your-node-name>` with the custom description or name of the node

:::

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

</TabItem> <TabItem value="clivalidator" label="LUKSO CLI Validator" default>

Every execution client has a individual flag to set the node name during startup.

<Tabs>
<TabItem value="geth" label="Geth">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Name
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --geth-identity "<your-node-name>"

# Start the Testnet Validator Node with Custom Name
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync  --geth-identity "<your-node-name>"
```

</TabItem> <TabItem value="erigon" label="Erigon">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Name
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --erigon-identity "<your-node-name>"

# Start the Testnet Validator Node with Custom Name
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --erigon-identity "<your-node-name>"
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Name
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --nethermind-ethstats-name "<your-node-name>"

# Start the Testnet Validator Node with Custom Name
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --nethermind-ethstats-name "<your-node-name>"
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Name
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --besu-ethstats="<your-node-name>:<ethstats-secret>@<ethstats-server-url>"

# Start the Testnet Validator Node with Custom Name
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --besu-ethstats="<your-node-name>:<ethstats-secret>@<ethstats-server-url>"
```

:::warning

The Besu client embeds the node name directly within the Eth-Stats connection string, meaning you must also exchange and provide the `<ethstats-secret>` and `<ethstats-server-url>` as a flag. Other execution clients have those set separately within their config files.

:::

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path of the node folder
- `<your-fee-recipient-address>` with the wallet address receiving staking profits
- `<your-node-name>` with the custom description or name of the node

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

Add the name flag new line to the start command, then save and exit the file.

<Tabs>
<TabItem value="geth" label="Geth">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --geth-identity "<your-node-name>"
```

</TabItem> <TabItem value="erigon" label="Erigon">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --erigon-identity "<your-node-name>"
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --nethermind-ethstats-name "<your-node-name>"
```

</TabItem> <TabItem value="besu" label="Besu">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --besu-ethstats="<your-node-name>:<ethstats-secret>@<ethstats-server-url>"
```

:::warning

The Besu client embeds the node name directly within the Eth-Stats connection string, meaning you must also exchange and provide the `<ethstats-secret>` and `<ethstats-server-url>` as a flag. Other execution clients have those set separately within their config files.

:::

</TabItem>
</Tabs>

After the startup script was updated, you can restart the node by executing the related service.

```sh
sudo systemctl start lukso-validator
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="file" label="Modifying the Client Configuration">

Depending on your execution client, the name can be set with different properties.

<Tabs groupId="client">
<TabItem value="geth" label="Geth">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/geth/
vim geth.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/geth/
nano geth.toml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="erigon" label="Erigon">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/erigon/
vim erigon.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/erigon/
nano erigon.toml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="nethermind" label="Nethermind">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/nethermind/
vim nethermind.cfg
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/nethermind/
nano nethermind.cfg
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="besu" label="Besu">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/besu/
vim besu.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/besu/
nano besu.toml
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

Add the node name as a new line within the settings, then save and exit the file.

<Tabs groupId="client">
<TabItem value="geth" label="Geth">

Search for the _Node_ section and add the _UserIdent_ property under it.

```text
[Node]
UserIdent = "<your-node-name>"
```

</TabItem> <TabItem value="erigon" label="Erigon">

Set the _identity_ property at the end of the file.

```text
"identity" = "<your-node-name>"
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

Set the _EthStats_ object and _Name_ property at the ending bracket of the _Network_ object.

```text
"EthStats": {
  "Name": "<your-node-name>"
}
```

</TabItem> <TabItem value="besu" label="Besu">

Set the _ethstats_ property at the end of the file.

```text
'ethstats'='<your-node-name>:<secret>@<server-url>'
```

:::warning

The Besu client embeds the node name directly within the Eth-Stats connection string, meaning you must also exchange and provide the `<ethstats-secret>` and `<ethstats-server-url>` as a flag. Other execution clients have those set separately within their config files.

:::

</TabItem>
</Tabs>

:::info

Exchange `<your-node-name>` with the custom description or name of the node

:::

:::warning

Ensure there are no missing spaces, characters or unintended linebreaks before saving the configuration file.

:::

Depending on your setup method, there are different ways to start your node after setting the node name.

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

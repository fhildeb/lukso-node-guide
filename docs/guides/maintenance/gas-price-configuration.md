---
sidebar_label: "11.6 Gas Price Configuration"
sidebar_position: 6
description: "Learn how to configure minimum gas prices for Geth and other execution clients for LUKSO. Includes step-by-step guides for CLI, Dappnode, Docker, and custom setups."
---

# 11.6 Gas Price Configuration

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Within the network configuration files, validators can adjust the minimum gas price for transactions they accept to propose blocks to the network. The minimum gas price is an **individual client setting**. Validators can choose the value they desire for block approval depending on the current network occupation.

:::warning Balancing Gas Fees

If most of the network accepts transactions with a small gas price, overall fees will remain lower. However, if the gas price is too high, the validator will propose empty blocks without transaction fees. As the network throughput rises, these values should be adjusted.

:::

:::tip Default Gas Price

The gas price mainly causes issues for Geth, as the execution client is using a strict default value that must be overwritten. The [**LUKSO Network Configuration**](https://github.com/lukso-network/network-configs) was recently updated to a base gas price of **0.001 Gwei** for **Geth Execution Clients**. Further details can be found on the [**Configuration Updates**](/docs/archive/network/configuration-updates.md) of the 🏛️ [**Archive**](/docs/archive/network/blockchain-timeline.md) section.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## Adjusting the Gas Price

If you are running the Geth execution client and experience block reward issues, reduce the minimum accepted gas fee.

:::info

Erigon and Besu clients adjust their minimum gas fee based on the network's gas price dynamically without further redo.

:::

<Tabs>
<TabItem value="cli" label="👾 LUKSO CLI" default>

**1. Stop Node Operation**: _Depending on your setup method, there are different ways to stop your node to adjust configurations._

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
nethermind --version
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
besu --version
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

**2. Adjust Gas Price**: _Modify the default network configuration of Geth using your preferred editor._

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>
vim geth/geth.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>
nano geth/geth.toml
```

</TabItem>
</Tabs>

:::info

Exchange `<lukso-working-directory>` and `<network>` with the path of the node folder and the network type.

:::

Change the regular gas price setting to your preferred or the [currently recommended](https://github.com/lukso-network/network-configs/blob/main/mainnet/geth/geth.toml) one.

```text
# Regular Value
GasPrice = 1000000000 # 1 Gwei

# Updated Value
GasPrice = 1000000 # 0.001 Gwei
```

Save the file and exit the editor.

**3. Restart the Node**: _Depending on your setup, there are different ways to start your node with the updated configuration._

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
<TabItem value="dappnode" label="🎨 Dappnode">

**1. Stop Node Operation**: Stop the execution and consensus client within the _Node Operation View_.

**2. Navigate to Staker Menu**: Open the _LUKSO Stakers_ menu and move into the _Lukso Geth Package_.

**3. Adjust Gas Price**: Navigate to the _Configs_ window and add the gas price flag in the _EXTRA_OPTS_ field.

```text
  --miner.gasprice 1000000
```

:::info

The above value represents the [currently recommended](https://github.com/lukso-network/network-configs/blob/main/mainnet/geth/geth.toml) gas price of 0.001 Gwei.

:::

**4. Restart the Node**: Restart the execution and consensus client within the _Node Operation View_.

</TabItem>
<TabItem value="docker" label="🐳 Docker Image">

**1. Stop Node Operation**: Stop the docker containers for both execution and consensus clients.

**2. Adjust Gas Price**: Open the _docker-compose.yml_ file of Geth, adjust the gas price value, and safe the file.

```text
  --miner.gasprice 1000000
```

:::info

The above value represents the [currently recommended](https://github.com/lukso-network/network-configs/blob/main/mainnet/geth/geth.toml) gas price of 0.001 Gwei.

:::

**3. Restart the Node**: Restart the docker containers for execution and consensus clients.

</TabItem>
<TabItem value="custom" label="🗂️ Custom Setup">

**1. Stop Node Operation**: _Stop the execution and consensus services._

<Tabs groupId="customization">
  <TabItem value="file" label="File Configuration" default>

**2. Adjust Gas Price**: Adjusting the _geth.toml_ file within your setup using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
vim geth/geth.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
nano geth/geth.toml
```

</TabItem>
</Tabs>

Change the regular gas price setting to your preferred or the [currently recommended](https://github.com/lukso-network/network-configs/blob/main/mainnet/geth/geth.toml) one.

```text
# Regular Value
GasPrice = 1000000000 # 1 Gwei

# Updated Value
GasPrice = 1000000 # 0.001 Gwei
```

Save the file and exit the editor.

**3. Restart the Node**: _Restart the execution and consensus services._

</TabItem> <TabItem value="flag" label="Flag Customization">

**2. Custom Restart**: Restart the Geth service and attach a customization flag for your gasprice setting.

```sh
  --miner.gasprice 1000000
```

</TabItem>
</Tabs>

:::info

The above value represents the [currently recommended](https://github.com/lukso-network/network-configs/blob/main/mainnet/geth/geth.toml) gas price of 0.001 Gwei.

:::

</TabItem>
</Tabs>

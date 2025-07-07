---
sidebar_label: "7.1 Slasher Configuration"
sidebar_position: 1
description: "Enable or disable the LUKSO slasher service to detect validator misbehavior. Configure slasher flags for CLI and automated setups, and remove slasher data to save disk space."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 7.1 Slasher Configuration

Running a slasher service helps monitor and report malicious validator behavior, contributing to the overall health and security of the network. This guide explains how to enable or disable the slasher for regular nodes and validators.

:::tip

Further details can be found on the [**Slashing and Panelties**](/docs/theory/blockchain-knowledge/slashing-and-panelties.md) and [Slasher Service](/docs/theory/node-operation/slasher-service.md) pages in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Stop Node Operation

Depending on your setup method, there are different ways to stop your node before applying updates.

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

## 2. Configure Slasher Service

If you are running a validator node using the [LUKSO CLI](/docs/theory/node-operation/client-setups.md) setup, the slasher is activated by default to increase watchers for malicious events during network downtimes of bigger services. For regular nodes or custom setups, the slasher service is disabled.

If you are runnning on lower end hardware or prefer to safe disk space, you can disable it. Regular nodes can use the similar process to activate the additional service without participating in the consensus.

:::tip

The **Teku** and **Nimbus-Eth2** clients do not have separate [slasher services](/docs/theory/node-operation/slasher-service.md) that create a database and keep track of the historical misbehaviours. Instead, they only come with validator precautions such as [`slashing-protection`](https://docs.teku.consensys.io/how-to/prevent-slashing/use-a-slashing-protection-file) or [`doppelganger-detection`](https://nimbus.guide/doppelganger-detection.html) that check against their own keys before committing validator duties.

:::

<Tabs groupId="slasher">
  <TabItem value="disable" label="Disable Slasher for Validators" default>

Depending on your setup method, there are different ways to start your staking node without the slasher service.

<Tabs groupId="setup">
<TabItem value="cli" label="LUKSO CLI" default>

```sh
cd <lukso-working-directory>

# Start Mainnet Validator without Slasher
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync -no-slasher

# Start Testnet Validator without Slasher
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync -no-slasher
```

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path of the node folder
- `<your-fee-recipient-address>` with the wallet address receiving staking profits

:::

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

Add the flag to disable the slasher service as a new line to the start command, then save and exit the file.

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --no-slasher
```

After the startup script was updated, you can restart the node by executing the related service.

```sh
sudo systemctl start lukso-validator
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="activate" label="Activate Slasher for Regular Nodes">

Depending on your setup method, there are different ways to start your regular node with the slasher service flags. The custom flags provided during startup will be passed down from the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) to the consensus clients.

<Tabs groupId="setup">
<TabItem value="cli" label="LUKSO CLI" default>

```sh
cd <lukso-working-directory>
```

:::info

Exchange `<lukso-working-directory>` with the path to the node folder.

:::

<Tabs groupId="client">
<TabItem value="lighthouse" label="Lighthouse">

```sh
# Start Mainnet Slasher Node
lukso start --checkpoint-sync --lighthouse-slasher

# Start Testnet Slasher Node
lukso start --testnet --checkpoint-sync --lighthouse-slasher
```

</TabItem> <TabItem value="prysm" label="Prysm">

```sh
# Start Mainnet Slasher Node
lukso start --checkpoint-sync --prysm-slasher

# Start Testnet Slasher Node
lukso start --testnet --checkpoint-sync --prysm-slasher
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="automation" label="Service Automation">

Open the startup script within your node directory with your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/static
vim lukso_startup.sh
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/static
nano lukso_startup.sh
```

</TabItem>
</Tabs>

:::info

Exchange `<lukso-working-directory>` with the path to the node folder.

:::

Add the flag to activate the slasher service as a new line to the start command, then save and exit the file.

<Tabs groupId="client">
<TabItem value="lighthouse" label="Lighthouse">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --lighthouse-slasher
```

</TabItem> <TabItem value="prysm" label="Prysm">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --prysm-slasher
```

</TabItem>
</Tabs>

After the startup script was updated, you can restart the node by executing the related service.

```sh
sudo systemctl start lukso-validator
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

## 4. Remove Slasher Data

If you previously ran a slasher service, you can delete the unused database from your node directory and free storage space.

```sh
cd <lukso-working-directory>

# Remove Slasher Database for Mainnet Node
rm -rf /mainnet-data/consensus/beaconchaindata/slasher.db

# Remove Slasher Database for Testnet Node
rm -rf /testnet-data/consensus/beaconchaindata/slasher.db
```

:::info

Exchange `<lukso-working-directory>` with the path to the node folder.

:::

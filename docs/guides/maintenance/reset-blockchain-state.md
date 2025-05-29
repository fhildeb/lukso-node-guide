---
sidebar_label: "11.7 Reset Blockchain State"
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 11.7 Reset Blockchain State

When updating or switching execution clients, incompatibilities may arise with the existing blockchain state. These errors often occur due to changes in the client’s internal database structure, chain data corruption, or leftover logs. Resetting the blockchain state can resolve sync issues, failed starts, and client crashes by reinitializing a clean local environment.

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

## 2. Remove Blockchain Data

```sh
# Move into Node Directory
cd <lukso-working-directory>

# Remove Blockchain Data
rm -rf <network>-data

# Remove Logs
rm -rf <network>-logs

# Initialize the Folder
sudo lukso init
```

:::tip

The `lukso init` command only adds missing files within the `/configs/` folder without overwriting existing ones.

:::

:::info

Exchange `<lukso-working-directory>` and `<network>` with the path of the node folder and the configured network.

:::

## 3. Restart the Node

Depending on your setup method, there are different ways to start your node after the blockchain state was cleared.

<Tabs groupId="setup">
  <TabItem value="clinode" label="LUKSO CLI Node" default>

```sh
cd <lukso-working-directory>
lukso start --checkpoint-sync
```

:::info

Exchange `<lukso-working-directory>` with the path of the node folder

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

:::warning

If you are still running into issues, [scan for problems](/docs/guides/maintenance/problem-scanning.md), [update your clients and configuration](/docs/guides/maintenance/client-updates.md), or [revert the client version](/docs/guides/maintenance/revert-client-versions.md).

:::

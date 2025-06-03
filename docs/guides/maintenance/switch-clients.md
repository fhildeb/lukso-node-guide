---
sidebar_label: "11.5 Switch Clients"
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 11.5 Switch Clients

Client diversity refers to the use of multiple independent software implementations across a network, written by different teams and with different coding languages. Through the diverse setup, the network security is improved, and the risk of single points of failure get reduced as errors in a single client do not affect the overall network's security.

:::tip

Further details can be found on the [**Client Diversity**](/docs/theory/blockchain-knowledge/client-diversity.md) page of the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section

:::

:::danger Client Imbalances

The majority of nodes on the LUKSO network [**is running Geth and Prysm**](https://clientdiversity.lukso.network/#distribution) setups. Node operators are responsible to ensure they **split their client usage evenly** across [**officially supported clients**](/docs/theory/blockchain-knowledge/client-providers.md) to improve resilence of the blockchain. If you are in a position to do so, you should adapt your client setup to ensure greater diversity.

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

## 2. Switch Client Software

Depending on whether you're switching only the execution client or both execution and consensus clients, the process and complexity will vary. While execution clients can be swapped directly within the existing node folder, changing the consensus client requires a full validator reconfiguration and monitoring updates.

| **Type**                               | **Description**                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------ |
| <nobr> Execution Client Only </nobr>   | Replaces client binary and reinitalizes the node folder while keeping the validator setup. |
| <nobr> Execution and Consensus </nobr> | Requires new folder setup, new validator wallet, and firewall reconfiguration.             |

:::info

If you switch the consensus client, you must re-import your _keystore-xxx.json_ key files generated within the [**Validator Setup**](/docs/guides/validator-setup/precautions.md).
Additionally, you also have to update the [**Prometheus Ports**](/docs/guides/monitoring/port-configuration.md), [**Prometheus Service**](/docs/guides/monitoring/prometheus.md), and [**Grafana Dashboard**](/docs/guides/monitoring/dashboard-configuration.md), as the monitoring software will not be able to read from the old consensus ports.

:::

<Tabs groupId="client-type">
  <TabItem value="execution" label="Execution Client Only" default>

**2.1 Navigate into the Node Folder**: _Move into the node's working directory to initialize your node clients._

```sh
cd ./<lukso-working-directory>
```

**2.2 Remove Old State**: _Delete client-specific blockchain state and logs, and re-initialize the folder._

```sh
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

**2.3 Install Client**: _Select and install a minority execution client alongside your old consensus client._

```sh
lukso install
```

Check if both clients were installed correctly using their version commands:

<Tabs>
<TabItem value="geth" label="Geth">

```sh
geth --version
```

</TabItem> 
<TabItem value="erigon" label="Erigon">

```sh
erigon --version
```

</TabItem> 
<TabItem value="nethermind" label="Nethermind">

```sh
nethermind --version
```

</TabItem> 
<TabItem value="besu" label="Besu">

```sh
besu --version
```

</TabItem> 
<TabItem value="nimbus2" label="Nimbus-Eth2">

```sh
nimbus_beacon_node --version
```

</TabItem> 
<TabItem value="lighthouse" label="Lighthouse">

```sh
# Consensus Client
lighthouse --version

# Validator Client
lighthouse vc --version
```

</TabItem> 
<TabItem value="teku" label="Teku">

```sh
# Consensus Client
teku --version

# Validator Client
teku validator-client --version
```

</TabItem> 
<TabItem value="prysm" label="Prysm">

```sh
# Consensus Client
prysm --version

# Validator Client
prysm validator --version
```

</TabItem> 
</Tabs>

:::info

If you encounter errors during the download or checkups, re-do the installation process.

:::

</TabItem> <TabItem value="consensus-execution" label="Consensus and Execution Clients">

**2.1 Apply New Firewall Rules**: _Apply the new consensus client's [firewall rules](/docs/guides/client-setup/firewall-settings.md) to your system._

**2.2 Arrange New Router Ports**: _Apply the new consensus client's [port rules](/docs/guides/client-setup/firewall-settings.md) to your router._

**2.3 Fresh Node Setup**: _Redo the [LUKSO CLI Installation](/docs/guides/client-setup/lukso-cli-installation.md) within a new node folder._

**2.4 Add Validator Configuration**: _Redo the [Validator Configuration](/docs/guides/client-setup/validator-configuration.md) to setup the new validator wallet._

**2.5 Arrange New Prometheus Ports**: _Reconfigure the [Prometheus Ports](/docs/guides/monitoring/port-configuration.md) to allow reading consensus data._

**2.6 Update the Prometheus Service**: _Update the [Prometheus Service File](/docs/guides/monitoring/prometheus.md) to dock onto the new consensus port_

**2.7 Update the Grafana Dashboard**: _Import the correct [Grafana Dashboard](/docs/guides/monitoring/dashboard-configuration.md) for your new consensus client._

</TabItem>
</Tabs>

## 3. Apply Client Modifications

In case you did any modifications to your previous client configuration files, please re-apply them to your new client configuration files within the _config_ folder of your node directory before starting up your updated validator node. Modifications may include:

- [Attaching the Node Explorer](https://stats.execution.mainnet.lukso.network/)
- [Configuring a Dynamic DNS](/docs/guides/modifications/dynamic-dns.md)
- [Adding a Node Name or Graffiti](/docs/guides/modifications/node-name.md)
- [Adjusting Peer Connectivity](/docs/guides/modifications/peer-connectivity.md)
- [Enabling RPC Modules](/docs/guides/maintenance/problem-scanning.md#attach-execution-clients)
- ...

## 4. Restart the Validator

After installing and configuring the new client setup, you can start up the node again.

<Tabs>
<TabItem value="regular-sync" label="Regular Synchronization">

```sh
# Starting the Mainnet Node as Validator
lukso start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>"

# Starting the Testnet Node as Validator
lukso start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>" --testnet
```

:::info

Replace `<transaction-fee-recipient-address>` with your actual withdrawal address.

:::

</TabItem> 
<TabItem value="automated-checkpoints" label="Automated Checkpoints">

```sh
# Starting the Mainnet Node as Validator
lukso start --validator --transaction-fee-recipient "<transaction-fee-recipient-address>" --checkpoint-sync

# Starting the Testnet Node as Validator
lukso start --validator --testnet --transaction-fee-recipient "<transaction-fee-recipient-address>" --checkpoint-sync
```

:::info

Replace `<transaction-fee-recipient-address>` with your actual withdrawal address.

:::

</TabItem> 
<TabItem value="manual-checkpoints" label="Manual Checkpoints">

- Visit the [Mainnet Checkpoint Explorer](https://checkpoints.mainnet.lukso.network/) or [Testnet Checkpoint Explorer](https://checkpoints.testnet.lukso.network/)
- Pass the latest **Block Root** and **Epoch** values to the consensus client flags

<Tabs>
<TabItem value="lighthouse" label="Lighthouse">

```sh
# Starting the Mainnet Node as Validator
lukso start --validator \
  --transaction-fee-recipient "<transaction-fee-recipient-address>" \
  --lighthouse-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network \
  --lighthouse-genesis-state-url=https://checkpoints.mainnet.lukso.network \
  --lighthouse-wss-checkpoint=$<BLOCK_ROOT>:$<EPOCH>

# Starting the Testnet Node as Validator
lukso start --validator --testnet \
  --transaction-fee-recipient "<transaction-fee-recipient-address>" \
  --lighthouse-checkpoint-sync-url=https://checkpoints.testnet.lukso.network \
  --lighthouse-genesis-state-url=https://checkpoints.testnet.lukso.network \
  --lighthouse-wss-checkpoint=$<BLOCK_ROOT>:$<EPOCH>
```

</TabItem> <TabItem value="teku" label="Teku">

```sh
# Starting the Mainnet Node as Validator
lukso start --validator \
  --transaction-fee-recipient "<transaction-fee-recipient-address>" \
  --teku-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network \
  --teku-ws-checkpoint=$<BLOCK_ROOT>:$<EPOCH>

# Starting the Testnet Node as Validator
lukso start --validator --testnet \
  --transaction-fee-recipient "<transaction-fee-recipient-address>" \
  --teku-checkpoint-sync-url=https://checkpoints.testnet.lukso.network \
  --teku-ws-checkpoint=$<BLOCK_ROOT>:$<EPOCH>
```

</TabItem> <TabItem value="prysm" label="Prysm">

```sh
# Starting the Mainnet Node as Validator
lukso start --validator \
  --transaction-fee-recipient "<transaction-fee-recipient-address>" \
  --prysm-checkpoint-sync-url=https://checkpoints.mainnet.lukso.network \
  --prysm-genesis-beacon-api-url=https://checkpoints.mainnet.lukso.network \
  --prysm-weak-subjectivity-checkpoint=$<BLOCK_ROOT>:$<EPOCH>

# Starting the Testnet Node as Validator
lukso start --validator --testnet \
  --transaction-fee-recipient "<transaction-fee-recipient-address>" \
  --prysm-checkpoint-sync-url=https://checkpoints.testnet.lukso.network \
  --prysm-genesis-beacon-api-url=https://checkpoints.testnet.lukso.network \
  --prysm-weak-subjectivity-checkpoint=$<BLOCK_ROOT>:$<EPOCH>
```

</TabItem> <TabItem value="nimbus2" label="Nimbus-Eth2">

```sh
# Starting the Mainnet Node as Validator
lukso start --validator \
  --transaction-fee-recipient "<transaction-fee-recipient-address>" \
  --nimbus2-external-beacon-api-url=https://checkpoints.mainnet.lukso.network \
  --nimbus2-trusted-block-root=$<BLOCK_ROOT> \
  --nimbus2-weak-subjectivity-checkpoint=$<BLOCK_ROOT>:$<EPOCH>

# Starting the Testnet Node as Validator
lukso start --validator --testnet \
  --transaction-fee-recipient "<transaction-fee-recipient-address>" \
  --nimbus2-external-beacon-api-url=https://checkpoints.testnet.lukso.network
  --nimbus2-trusted-block-root=$<BLOCK_ROOT> \
  --nimbus2-weak-subjectivity-checkpoint=$<BLOCK_ROOT>:$<EPOCH>
```

</TabItem> 
</Tabs>

:::info

Replace the following parameters of the commands:

- `<BLOCK_ROOT>` and `<EPOCH>` with the current hash and number while keeping the `$` sign.
- `<transaction-fee-recipient-address>` with your actual withdrawal address.

:::

</TabItem> 
</Tabs>

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

## 5. Data Cleanup

After switching clients, unused files and binaries can be removed from the old setup to avoid conflicts and free up storage.

<Tabs groupId="client-type">
  <TabItem value="execution" label="Execution Client Only" default>

**Delete Old Client**: _Remove the unused execution client service from the system._

<Tabs groupId="client">
<TabItem value="geth" label="Geth">

```sh
sudo rm -rf /usr/local/geth
```

</TabItem> <TabItem value="erigon" label="Erigon">

```sh
sudo rm -rf /usr/local/erigon
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```sh
sudo rm -rf /usr/local/nethermind
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
sudo rm -rf /usr/local/besu
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="consensus-execution" label="Consensus and Execution Clients">

**5.1 Remove Old Firewall Settings**: _Remove the old consensus client's [firewall rules](/docs/guides/client-setup/firewall-settings.md) from your system._

**5.2 Remove Old Router Ports**: _Remove the old consensus client's [port rules](/docs/guides/client-setup/firewall-settings.md) from your router._

**5.3 Delete Old Node Folder**: _Remove the working directory of the previous node setup._

```sh
cd ~
sudo rm -rf <old-lukso-working-directory>
```

:::info

Exchange `<old-lukso-working-directory>` with the path of the previous node folder.

:::

**5.4 Delete Old Clients**: _Remove unused client services from the system._

<Tabs groupId="client">
<TabItem value="geth" label="Geth">

```sh
sudo rm -rf /usr/local/geth
```

</TabItem> <TabItem value="erigon" label="Erigon">

```sh
sudo rm -rf /usr/local/erigon
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```sh
sudo rm -rf /usr/local/nethermind
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
sudo rm -rf /usr/local/besu
```

</TabItem> <TabItem value="teku" label="Teku">

```sh
sudo rm -rf /usr/local/teku
```

</TabItem> <TabItem value="nimbus2" label="Nimbus-Eth2">

```sh
sudo rm -rf /usr/local/nimbus_beacon_node
sudo rm -rf /usr/local/nimbus_validator_client
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

```sh
sudo rm -rf /usr/local/lighthouse
```

</TabItem> <TabItem value="prysm" label="Prysm">

```sh
sudo rm -rf /usr/local/prysm
```

</TabItem>
</Tabs>

  </TabItem>
</Tabs>

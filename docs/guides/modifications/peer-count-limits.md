---
sidebar_label: "7.5 Peer Count Limits"
sidebar_position: 5
description: "Learn how to monitor and configure peer count limits for LUKSO nodes across execution and consensus clients. Improve network stability and avoid peer connectivity issues."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 7.5 Peer Count Limits

Peers in blockchain networks are other nodes your client connects to for data synchronization and message propagation. Maintaining a healthy number of peer connections is essential for exchanging block and transaction data and attesting other node's messages. Depending on your hardware and the volatility of your connections, peer limits can be adjusted.

:::tip

Further details about connectivity can be found on the [**Peer Networks**](/docs/theory/blockchain-knowledge/peer-networks.md) and [**Peer Connectivity**](/docs/theory/node-operation/peer-discovery.md) pages of the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::warning

It's not recommended to set network peer limits higher than 100 for homestakers, as it can have negative impacts on the [network's topology](/docs/theory/node-operation/peer-discovery.md#adjustment-effects) while gaining [little to none propagation rate](/docs/theory/node-operation/peer-discovery.md#adjustment-effects) or stability.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Check Peer Connections

To get insights into the current connections, you can check the peer connections from your local node. Every node operates two independent peer-to-peer networks: the execution and the consensus layer. Each of these networks handles communication with other nodes differently and maintains separate sets of peers. Monitoring both layers is essential to ensure healthy connectivity and network participation.

<Tabs groupId="network-type">
<TabItem value="execution" label="Execution Peers" default>

The execution endpoint allows to fetch the peer counts and lots of [other client-specific intormation](/docs/guides/maintenance/problem-scanning.md#attach-execution-clients).

:::info JSON RPC

JSON-RPC is a lightweight communication protocol encoded in JSON, allowing calls to be sent to a service or server. Each execution client exposes a related interface at port `8545` to retreive calls to interact with the Ethereum network though the local node.

:::

:::tip

By default, the [LUKSO Network Configuration](https://github.com/lukso-network/network-configs) allows to retrieve network data for all execution clients.

:::

**1. Install Querying Tool**: _Install the JSON query service for data processing from the RPC endpoint._

```sh
sudo apt install jq
```

**2. Call Execution Endpoint**: _While the node is running, call the JSON RPC of the execution client._

```sh
# Retrieve Execution Peers
curl -s -X POST -H "content-type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result' | xargs printf '%d\n'
```

<details>
    <summary>Full Command Explanation</summary>

| **Command**                                                               | **Description**                                                                                                                                     |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> `curl -s -X POST -H <text> ` <br /> `--data <text> <port>` </nobr> | Executes `-X` a silent `-s` HTTP `POST` request to the given `<port>`, while attaching custom header `-H` and `--data` content as `<text>` payload. |
| <nobr> `jq -r '.result'` </nobr>                                          | Filters the raw `-r` JSON object and extracts the `.result` value of the data object.                                                               |
| <nobr> `xargs printf '%d\n'` </nobr>                                      | Converts the hexadecimal result to a human-readable decimal `%d` number.                                                                            |

</details>

The output should be something in the range from 5 to 50 peers.

```text
37
```

:::warning

If the command couldn't be executed, have a look at the [**Problem Scanning**](/docs/guides/maintenance/problem-scanning.md) page to learn how to [attach execution clients](/docs/guides/maintenance/problem-scanning.md#attach-execution-clients).

:::

</TabItem> <TabItem value="consensus" label="Consensus Peers">

The consensus endpoint allows to fetch the peer counts and lots of [other client-specific intormation](/docs/guides/maintenance/problem-scanning.md#fetch-consensus-api).

:::info REST API

A REST API is a web-based interface for querying structured data. Ethereum consensus clients expose their status and internal metrics on various ports like `3500`, `5051`, or `5052`, to allow users to access information such as synchronization progress, network stability, node metadata, or the current chain head.

:::

:::tip

By default, the [LUKSO Network Configuration](https://github.com/lukso-network/network-configs) opens the REST API ports for all consensus clients.

:::

**1. Install Querying Tool**: _Install the JSON query service for data processing from the REST API endpoint._

```sh
sudo apt install jq
```

**2. Call Endpoints**: _While the node is running, call the REST endpoint of the consensus client._

<Tabs>
  <TabItem value="teku" label="Teku">

```sh
# Check Number of Consensus Peers
curl -s http://localhost:5051/eth/v1/node/peer_count | jq
```

</TabItem> <TabItem value="prysm" label="Prysm">

```sh
# Check Number of Consensus Peers
curl -s http://localhost:3500/eth/v1/node/peer_count | jq
```

</TabItem> <TabItem value="lighthouse-nimbus2" label="Lighthouse and Nimbus-Eth2">

```sh
# Check Number of Consensus Peers
curl -s http://localhost:5052/eth/v1/node/peer_count | jq
```

</TabItem>
</Tabs>

The output should be something in the range from 5 to 70 peers.

```text
59
```

</TabItem>
</Tabs>

If you have low or volatile peer counts, continue to stop the node and raise the peer count limits.

## 2. Stop Node Operation

Depending on your setup method, there are different ways to stop your node before configuring the IP or raising the peer limits.

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

<Tabs groupId="client">
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

## 4. Raise Peer Limits

Most clients come with conservative default peer limits, which can be increased to maintain more simultaneous connections and improved stability and data propagation. However, peer counts above 100 can negatively affect the network topology and are not recommended.

:::tip

You should always have more than 15 stable peers after a setup time of 4 to 6 hours. If your peer count is not raising, it indicates a misconfiguration. Check that your firewall allows [all necessary client ports ](/docs/guides/client-setup/firewall-settings.md) to receive data.

:::

:::warning

Ensure your router is capable of handling higher loads and requests when raising the peer limit above the default.

:::

<Tabs groupId="network-type">
<TabItem value="execution" label="Execution Peers" default>

Depending on your execution client, the peer limit can be adjusted with different properties.

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

Change the peer limit within the settings, then save and exit the file.

<Tabs groupId="client">
<TabItem value="geth" label="Geth">

Update the _MaxPeers_ property.

```text
# Default Value
MaxPeers = 50

# Updated Value
MaxPeers = <custom-peer-limit>
```

</TabItem> <TabItem value="erigon" label="Erigon">

Update the _maxpeers_ property.

```text
# Default Value
"maxpeers" = 100

# Updated Value
"maxpeers" = <custom-peer-limit>
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

Update the _MaxActivePeers_ property within the _Network_ object.

```text
# Default Value
  "Network": {
    "MaxActivePeers": 50
  }

# Updated Value
  "Network": {
    "MaxActivePeers": <custom-peer-limit>
  }
```

</TabItem> <TabItem value="besu" label="Besu">

Update the _max-peers_ property.

```text
# Default Value
'max-peers' = 25

# Updated Value
'max-peers' = <custom-peer-limit>
```

</TabItem>
</Tabs>

:::info

Exchange `<custom-peer-limit>` with the maximum number of active peers maintained by your node.

:::

:::warning

Ensure there are no missing spaces, characters or unintended linebreaks before saving the configuration file.

:::

</TabItem> <TabItem value="consensus" label="Consensus Peers">

Depending on your consensus client, the peer limit can be adjusted with different properties.

<Tabs groupId="client">
<TabItem value="prysm" label="Prysm">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/prysm/
vim prysm.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/prysm/
nano prysm.yaml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="teku" label="Teku">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/teku/
vim teku.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/teku/
nano teku.yaml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/lighthouse/
vim lighthouse.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/lighthouse/
nano lighthouse.toml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="nimbus2" label="Nimbus-Eth2">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/nimbus2/
vim nimbus.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/nimbus2/
nano nimbus.toml
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

Change the peer count within the settings, then save and exit the file.

<Tabs groupId="client">
<TabItem value="prysm" label="Prysm">

Update the _p2p-max-peers_ property.

```text
# Default Value
p2p-max-peers: 70

# Updated Value
p2p-max-peers: <custom-peer-limit>
```

</TabItem> <TabItem value="teku" label="Teku">

Update the _p2p-peer-upper-bound_ property.

```text
# Default Value
p2p-peer-upper-bound: 100

# Updated Value
p2p-peer-upper-bound: <custom-peer-limit>
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

Update the _target-peers_ property.

```text
# Default Value
target-peers = 100

# Updated Value
target-peers = <custom-peer-limit>
```

</TabItem> <TabItem value="nimbus2" label="Nimbus">

Set the _max-peers_ property in a new line at the end of the file.

```text
max-peers = <custom-peer-limit>
```

</TabItem>
</Tabs>

:::info

Exchange `<custom-peer-limit>` with the maximum number of active peers maintained by your node.

:::

:::warning

Ensure there are no missing spaces, characters or unintended linebreaks before saving the configuration file.

:::

</TabItem>
</Tabs>

## 5. Restart the Node

Depending on your setup method, there are different ways to start your node after the IP address or peer limits have changed.

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

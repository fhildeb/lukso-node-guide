---
sidebar_label: "7.4 Public IP Setup"
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 7.4 Public IP Setup

To ensure your node is discoverable and can establish a healthy number of peer connections, you may need to manually set or update your node’s public IP address. This is particularly important for validators, where lower peer counts are an obsticle for accurate block proposals and attestations.

:::tip

Further details about connectivity can be found on the [**Peer Networks**](/docs/theory/blockchain-knowledge/peer-networks.md) and [**Peer Connectivity**](/docs/theory/node-operation/peer-discovery.md) pages of the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

## 1. Check Peer Connections

Every node operates two independent peer-to-peer networks: the execution and the consensus layer. Each of these networks handles communication with other nodes differently and maintains separate sets of peers. Monitoring both layers is essential to ensure healthy connectivity and network participation.

<Tabs groupId="network-type">
<TabItem value="execution" label="Execution Peers" default>

The execution endpoint allows to fetch the peer counts and lots of [other client-specific intormation](/docs/guides/maintenance/problem-scanning.md#attach-execution-clients).

:::info JSON RPC

JSON-RPC is a lightweight communication protocol encoded in JSON, allowing calls to be sent to a service or server. Each execution client exposes a related interface at port `8545` to retreive calls to interact with the Ethereum network though the local node.

:::

:::tip

By default, the [LUKSO Network Configuration](https://github.com/lukso-network/network-configs) allows to retrieve network data for all execution clients.

:::

**1.1 Install Querying Tool**: _Install the JSON query service for data processing from the RPC endpoint._

```sh
sudo apt install jq
```

**1.2 Call Execution Endpoint**: _While the node is running, call the JSON RPC of the execution client._

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

**1.1 Install Querying Tool**: _Install the JSON query service for data processing from the REST API endpoint._

```sh
sudo apt install jq
```

**1.2 Call Endpoints**: _While the node is running, call the REST endpoint of the consensus client._

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

## 3. Node IP Setup

Once you retrieve your current public IP, you can configure your clients to advertise this IP address.

:::info IP Addresses

Internet Protocol addresses are logical, software‑assigned identifiers. IP addresses let routers move data packages between different networks, whether your local home network or across the Internet. The public IP address is how device and nodes communicate with each other to exchange data.

:::

:::tip IP Changes

There are two types of public IP addresses: dynamic and static ones. An active IP address changes over time, while a static IP address remains constant. Most residential users are assigned a dynamic IP address, which can change whenever the internet service provider sees fit. Some ISPs may change the IP address every time the router is rebooted, while others change it at intervals, like once a week. If you want to further set a permanent connection, you can follow the [**Dynamic DNS**](/docs/guides/modifications/dynamic-dns.md) guide.

:::

:::note

The [LUKSO CLI](/docs/guides/client-setup/lukso-cli-installation.md) allows to set the current IP during installation, but need to be updated on a regular basis.

:::

We can use a simple IP echo service to retrieve the node's current IP address and write it to an editor or notepad.

```sh
curl -s https://ipecho.net/plain
```

Depending on your consensus client, this public IP can be set with different properties.

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

Add or update the following client properties, then save and exit the file.

<Tabs groupId="client">
<TabItem value="prysm" label="Prysm">

Update or add the _p2p-host-ip_ property at the end of the file.

```text
# Previous Value
p2p-host-ip: '0.0.0.0'
p2p-host-ip: '<your-previous-ip>'


# Updated Value
p2p-host-ip: '<your-current-ip-address>'
```

</TabItem> <TabItem value="teku" label="Teku">

Update or add the _p2p-advertised-ip_ property.

```text
# Previous Value Examples
p2p-advertised-ip: 0.0.0.0
p2p-advertised-ip: <your-previous-ip>

# Updated Value
p2p-advertised-ip: <your-current-ip-address>
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

Update the _enr-address_ property.

```text
# Previous Value Examples
enr-address = "0.0.0.0"
enr-address = "<your-previous-ip>"

# Updated Value
enr-address = "<your-current-ip-address>"
```

</TabItem> <TabItem value="nimbus2" label="Nimbus">

Update or add the _p2p-host-ip_ property at the end of the file.

```text
# Previous Value
nat = "extip:0.0.0.0"
nat = "extip:<your-previous-ip>"

# Updated Value
nat = "extip:<your-current-ip-address>"
```

</TabItem>
</Tabs>

:::info

Exchange `<your-current-ip-address>` with the public IP address of your node.

:::

:::warning

Ensure there are no missing spaces, characters or unintended linebreaks before saving the configuration file.

:::

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

:::tip

You should always have more than 15 peers after a setup time of 4 to 6 hours. If your peer count is not improving, it indicates a misconfiguration. Check that all mandatory client ports allow data throughput as described within the [Firewall Settings](/docs/guides/client-setup/firewall-settings.md).

:::

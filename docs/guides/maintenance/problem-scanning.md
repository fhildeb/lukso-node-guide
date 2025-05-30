---
sidebar_label: "11.3 Problem Scanning"
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 11.3 Problem Scanning

This guide shows how to identify synchronization or configuration problems, to help solve problems in advance.

:::info

The following steps are performed on your 📟 **node server**.

:::

## Check the Node Status

The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) comes with a built-in status command to check the health of execution, consensus, and validator clients.

```sh
lukso status
```

## Listen to Live Logs

<!--TODO: extend the introduction text-->

The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) comes with its own logging functionality, directly printed to the terminal and stored in the node directory.

<Tabs groupId="network">
  <TabItem value="mainnet" label="Mainnet" default>

```sh
# Check execution logs
lukso logs execution

# Check consensus logs
lukso logs consensus
```

</TabItem> <TabItem value="testnet" label="Testnet">

```sh
# Check execution logs
lukso logs execution --testnet

# Check consensus logs
lukso logs consensus --testnet
```

</TabItem>
</Tabs>

## Search Log Files

The file logging system of the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) also enables keyword-based filtering for log file contents.

:::info

You can search the extending log files using the `grep` tool for global expression search.

:::

<Tabs groupId="network">
  <TabItem value="mainnet" label="Mainnet" default>

```sh
# Fetch all execution warnings
lukso logs execution | grep "warning"

# Fetch all validator warnings
lukso logs validator | grep "warning"

# Fetch all consensus warnings
lukso logs consensus | grep "warning"

# Fetch all execution errors
lukso logs execution | grep "error"

# Fetch all validator errors
lukso logs validator | grep "error"

# Fetch all consensus errors
lukso logs consensus | grep "error"
```

</TabItem> <TabItem value="testnet" label="Testnet">

```sh
# Fetch all execution warnings
lukso logs execution --testnet | grep "warning"

# Fetch all validator warnings
lukso logs validator --testnet | grep "warning"

# Fetch all consensus warnings
lukso logs consensus --testnet | grep "warning"

# Fetch all execution errors
lukso logs execution --testnet | grep "error"

# Fetch all validator errors
lukso logs validator --testnet | grep "error"

# Fetch all consensus errors
lukso logs consensus --testnet | grep "error"
```

</TabItem>
</Tabs>

:::tip

After executing the command, the terminal is waiting for an input. You will have to press the _ENTER_ key to see the outputs.

:::

:::warning

If you run the LUKSO CLI through service automation, ensure to execute all `lukso` commands with `sudo` permissions.

:::

## Attach Execution Clients

Execution clients have JSON-RPC endpoints allowing users to request information and access the blockchain state of their local nodes directly. Erigon and Geth even have built-in JavaScript consoles linked with such endpoints for programming capabilities. Both tools are helpful for manual checking of syncing progress, peers, blocks, and balances.

:::info JSON RPC

JSON-RPC is a lightweight communication protocol encoded in JSON, allowing calls to be sent to the server. Each execution client exposes such an interface at port `8545` to retreive calls to interact with the Ethereum network though a users local node. The RPC allows to query network stats, node metadata, blockchain data, or even send transactions and interact with smart contracts.

:::

:::tip

By default, the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) opens the default internal JSON RPC ports for the Nethermind and Besu client, while restricting their use for Erigon and Geth clients due to their JavaScript console and broader functionality. If you're using Geth or Erigon, you will first have to adjust the client-configuration to allow all data packages from being read.

:::

<Tabs>
<TabItem value="geth-erigon" label="Geth and Erigon" default>

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

**2. Enable Full RPC Data**: _Modify the default network configuration of your execution client._

<Tabs groupId="client">
<TabItem value="geth" label="Geth">

Use your preferred editor to modify the client configuration file.

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

Change the included module list to include the default execution client commands.

```text
# Default Value
HTTPModules = ["net"] # ["net", "eth", "web3", "debug", "engine", "txpool"]

# Updated Value
HTTPModules = ["net", "engine", "eth", "web3"] # ["net", "eth", "web3", "debug", "engine", "txpool"]
```

</TabItem> <TabItem value="erigon" label="Erigon">

Use your preferred editor to modify the client configuration file.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>
vim erigon/erigon.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>
nano erigon/erigon.toml
```

</TabItem>
</Tabs>

:::info

Exchange `<lukso-working-directory>` and `<network>` with the path of the node folder and the network type.

:::

Change the included module list to include the default execution client commands.

```text
# Default Value
"http.api" = "erigon,engine" # "eth,erigon,engine,debug,trace"

# Updated Value
"http.api" = "erigon,engine,eth,net,web3" # "eth,erigon,engine,debug,trace"
```

</TabItem>
</Tabs>

:::warning

Ensure there are no missing characters or additional spaces within the configuration file.

:::

<details>
    <summary>Full Module Explanation</summary>

| Module     | Description                                   | Potential Risks                                       |
| ---------- | --------------------------------------------- | ----------------------------------------------------- |
| **ETH**    | Core blockchain operations.                   | None. Enabled by default without configuration.       |
| **NET**    | Retrieve network status and connections.      | None. Enabled by default without configuration.       |
| **WEB3**   | Blockchain helpers and client metadata.       | None. Enabled by default without configuration.       |
| **ENGINE** | Engine API used by consensus client.          | None. Enabled by default for validator nodes.         |
| **TXPOOL** | Inspect pending and queued transaction pool.  | Exposes pool and consumes computing power.            |
| **ADMIN**  | Low-level node management for peers and RPCs. | Lets attackers shut down RPCs, or export chain data.  |
| **DEBUG**  | Deep execution tracing and state inspection.  | Exposes call stacks, storage slots and pre-images.    |
| **TRACE**  | Block and transaction replay traces.          | Heavy EVM-execution calls can freeze or crash a node. |

</details>

Save the file and exit the editor.

**3. Restart the Node**: _Depending on your setup, there are different ways to start your node with the updated configuration._

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

**4. Connect to Interface**: _While the node is running, connect to the interface of the specific execution client._

<Tabs groupId="client">
<TabItem value="geth" label="Geth">

```sh
geth attach http://localhost:8545
```

</TabItem> <TabItem value="erigon" label="Erigon">

```sh
erigon attach http://localhost:8545
```

</TabItem>
</Tabs>

**5. Retrieve Data**: _If you are listening to the port, you can check your connections and interact with the execution client._

```sh
# Check Available Commands
> eth
> net
> web3

# Check Current Block Height
> parseInt(eth.blockNumber, 16)

# Check Syncing Status
# -- Syncing: Object
# -- Synced: False
> eth.syncing

# Retrieve Execution Peers
> parseInt(net.peerCount, 16)

# Get Current Gas Price
> parseInt(eth.gasPrice)

# Check External Connections
> net.listening

# Verify Network Chain ID
> parseInt(eth.chainId, 16)

# Verify Client Version
> web3.clientVersion

# Quit Port Connection
> exit
```

:::info

The `parseInt()` function will convert the hexadecimal output to a human-readable decimal number.

:::

</TabItem><TabItem value="Nethermind-besu" label="Nethermind and Besu">

**1. Install Querying Tool**: _Install the JSON query service for data processing from the RPC endpoint._

```sh
sudo apt install jq
```

**2. Call Endpoints**: _While the node is running, call the JSON RPCs of the execution client._

```sh
# Check Current Block Height
curl -s -X POST -H "content-type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result' | xargs printf '%d\n'

# Check Syncing Status
curl -s -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result'

# Retrieve Execution Peers
curl -s -X POST -H "content-type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result' | xargs printf '%d\n'

# Get Current Gas Price
curl -s -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result' | xargs printf '%d\n'

# Check External Connections
curl -s -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result'

# Verify Network Chain ID
curl -s -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result' | xargs printf '%d\n'

# Verify Client Version
curl -s -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result'
```

<details>
    <summary>Full Command Explanation</summary>

| **Command**                                                               | **Description**                                                                                                                                     |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> `curl -s -X POST -H <text> ` <br /> `--data <text> <port>` </nobr> | Executes `-X` a silent `-s` HTTP `POST` request to the given `<port>`, while attaching custom header `-H` and `--data` content as `<text>` payload. |
| <nobr> `jq -r '.result'` </nobr>                                          | Filters the raw `-r` JSON object and extracts the `.result` value of the data object.                                                               |
| <nobr> `xargs printf '%d\n'` </nobr>                                      | Converts the hexadecimal result to a human-readable decimal `%d` number.                                                                            |

</details>

</TabItem>
</Tabs>

## Fetch Consensus API

Access to the consensus endpoint allows for fetching validator status, health checks, peer counts, and metadata of the beacon chain. The feature can help verify client performance and check synchronization health directly from the beacon node's HTTP port.

:::info REST API

A REST API is a web-based interface for querying structured data. Ethereum consensus clients expose their status and internal metrics on various ports like `3500`, `5051`, or `5052`, to allow users to access information such as synchronization progress, network stability, node metadata, or the current chain head.

:::

:::tip

By default, the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) opens the default REST API ports for all consensus clients.
:::

**1. Install Querying Tool**: _Install the JSON query service for data processing from the RPC endpoint._

```sh
sudo apt install jq
```

**2. Call Endpoints**: _While the node is running, call the REST endpoints of the consensus client._

<Tabs>
  <TabItem value="teku" label="Teku">

```sh
# Check Syncronization Status
curl -s http://localhost:5051/eth/v1/node/syncing | jq

# Check Overall Health
curl -s http://localhost:5051/eth/v1/node/health | jq

# Check Node Identity
curl -s http://localhost:5051/eth/v1/node/identity | jq

# Check Number of Peers
curl -s http://localhost:5051/eth/v1/node/peer_count | jq

# Fetch Latest Block Header
curl -s http://localhost:5051/eth/v1/beacon/headers/head | jq
```

</TabItem> <TabItem value="prysm" label="Prysm">

```sh
# Check Syncronization Status
curl -s http://localhost:3500/eth/v1/node/syncing | jq

# Check Overall Health
curl -s http://localhost:3500/eth/v1/node/health | jq

# Check Node Identity
curl -s http://localhost:3500/eth/v1/node/identity | jq

# Check Number of Peers
curl -s http://localhost:3500/eth/v1/node/peer_count | jq

# Fetch Latest Block Header
curl -s http://localhost:3500/eth/v1/beacon/headers/head | jq
```

</TabItem> <TabItem value="lighthouse-nimbus2" label="Lighthouse and Nimbus-Eth2">

```sh
# Check Syncronization Status
curl -s http://localhost:5052/eth/v1/node/syncing | jq

# Check Overall Health
curl -s http://localhost:5052/eth/v1/node/health | jq

# Check Node Identity
curl -s http://localhost:5052/eth/v1/node/identity | jq

# Check Number of Peers
curl -s http://localhost:5052/eth/v1/node/peer_count | jq

# Fetch Latest Block Header
curl -s http://localhost:5052/eth/v1/beacon/headers/head | jq
```

</TabItem>
</Tabs>

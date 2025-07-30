---
sidebar_label: "Client Providers"
sidebar_position: 6
description: "Explore supported LUKSO client software, node types, performance metrics, and storage footprints to choose the best execution and consensus clients for your setup."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Client Providers

Client software is the essential underlying backbone that enables actions being executed on a blockchain network. Based on the user's specific role, whether stakers, developers, infrastructure providers, or observers, they all use different node setups and software clients that are adjusted according to their specific requirements and roles.

## Node Setups

There are three basic setups in which an execution client of the network can be operated.

| Node Type                                 | Description                                                            | Use Case                                                                        | <nobr> Typical Execution Clients </nobr> |
| ----------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------- |
| <nobr> **Light Node** </nobr>             | Downloads block headers and verifies only part of the chain.           | Wallets and Mobile dApps, <nobr> Low-Resource Devices </nobr>                   | [Helios], [Nimbus-Eth2], [Lodestar]      |
| <nobr> **Full Node** </nobr>              | Stores recent state and verifies all transactions and blocks.          | RPC Endpoints, Stakers, <nobr> Regular Node Operaters </nobr>                   | [Geth], [Erigon], [Nethermind], [Besu]   |
| <nobr> **Node + Slasher Service** </nobr> | Runs a proof‑of‑stake slasher service on top of regular node services. | Staking Institutions, Watchers, <nobr> Advanced Node Operaters </nobr>          | [Geth], [Erigon], [Nethermind], [Besu]   |
| <nobr> **Archive Node** </nobr>           | Stores all historical state since genesis.                             | Indexers, <nobr> Block Explorers, </nobr> <nobr> Data Analytic Services </nobr> | [Erigon], [Geth]                         |

:::tip

Further details about hardware requirements can be found on the [**Node Specifications**](/docs/theory/preparations/node-specifications.md) page.

:::

## Supported Clients

Any Ethereum client can be set up to join the open LUKSO Network effectively. This can be done by using the publicly available [network configuration](https://github.com/lukso-network/network-configs). It should be noted, however, that some clients have been officially tested, which not only guarantees their compatibility but also ensures correct behavior within the network itself. Moreover, this testing has been carried out to ensure that the process of entering into staking is easy and not complicated for users.

:::tip Verified Support

Within the [LUKSO CLI v 0.25.0](https://github.com/lukso-network/tools-lukso-cli) the following clients are officially tested and supported by the LUKSO Network Team.

:::

| Consensus Client                                                  | Version | Github                                         | Docs                                                     | Chat                                | System Support         | Language | [CLI Staking](https://github.com/lukso-network/tools-lukso-cli) |
| ----------------------------------------------------------------- | ------- | ---------------------------------------------- | -------------------------------------------------------- | ----------------------------------- | ---------------------- | -------- | --------------------------------------------------------------- |
| [**Lighthouse**](https://lighthouse.sigmaprime.io/)               | 7.0.1   | [🔗](https://github.com/sigp/lighthouse/)      | [📘](https://lighthouse-book.sigmaprime.io/)             | [💬](https://discord.gg/cyAszAh)    | Linux, Win, macOS, ARM | Rust     | ✅ Yes                                                          |
| [**Prysm**](https://prysmaticlabs.com/)                           | 6.0.4   | [🔗](https://github.com/prysmaticlabs/prysm)   | [📘](https://docs.prylabs.network/docs/getting-started/) | [💬](https://discord.gg/YMVYzv6)    | Linux, Win, macOS, ARM | Go       | ✅ Yes                                                          |
| [**Teku**](https://consensys.net/knowledge-base/ethereum-2/teku/) | 25.6.0  | [🔗](https://github.com/ConsenSys/teku)        | [📘](https://docs.teku.consensys.net/)                   | [💬](https://discord.gg/9mCVSY6)    | Linux, Win, macOS      | Java     | ✅ Yes                                                          |
| [**Nimbus-Eth2**](https://nimbus.team/)                           | 25.5.0  | [🔗](https://github.com/status-im/nimbus-eth2) | [📘](https://nimbus.team/docs/)                          | [💬](https://discord.gg/qnjVyhatUa) | Linux, Win, macOS, ARM | Nim      | ❌ No                                                           |

| Execution Client                                          | Version | Github                                            | Docs                                                               | Chat                                                   | System Support         | Language |
| --------------------------------------------------------- | ------- | ------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------ | ---------------------- | -------- |
| [**Besu**](https://hyperledger.org/use/besu)              | 25.7.0  | [🔗](https://github.com/hyperledger/besu/)        | [📘](https://besu.hyperledger.org/en/stable/)                      | [💬](https://discord.com/invite/hyperledger)           | Linux, Win, macOS      | Java     |
| [**Erigon**](https://github.com/erigontech/erigon#erigon) | 3.0.12  | [🔗](https://github.com/erigontech/erigon)        | [📘](https://docs.erigon.tech/)                                    | [💬](https://github.com/erigontech/erigon/discussions) | Linux, Win, macOS, ARM | Go       |
| [**Geth**](https://geth.ethereum.org/)                    | 1.16.1  | [🔗](https://github.com/ethereum/go-ethereum)     | [📘](https://geth.ethereum.org/docs/)                              | [💬](https://discord.com/invite/nthXNEv)               | Linux, Win, macOS, ARM | Go       |
| [**Nethermind**](http://nethermind.io/)                   | 1.32.2  | [🔗](https://github.com/NethermindEth/nethermind) | [📘](https://docs.nethermind.io/get-started/installing-nethermind) | [💬](https://discord.com/invite/PaCMRFdvWT)            | Linux, Win, macOS, ARM | .NET     |

:::warning Further Assistance

If you have client-specific issues, it's best to contact the software providers directly. While LUKSO orchestrates the network, client maintainers have more hands-on knowledge about the software tools and supported infrastructure.

:::

## Provider Differences

Each client has different runtime requirements, optimization, and unique features.

:::tip

There is **no preferred client**. What’s most important is maintaining [**Client Diversity**](/docs/theory/blockchain-knowledge/client-diversity.md) to ensure network resilience.

:::

| Client          | Description                                                                                                      | Benefits                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Geth**        | Most widely used Ethereum client, maintained by the Ethereum Foundation. Longstanding and stable.                | Default in many setups, strong community support, and broad tooling compatibility     |
| **Erigon**      | Modern execution client focused on performance and modularity. Optimized for archive and historical data access. | Ideal for data-heavy applications, efficient disk use, and fast synchronization times |
| **Nethermind**  | Performance-oriented client built with analytics and customizability in mind.                                    | Excellent logging, modular design, and strong support for advanced node operators     |
| **Besu**        | Enterprise-ready client maintained by the Hyperledger Foundation. Supports public and private network use cases. | Permissioned features, great for institutional and consortium chain deployments       |
| **Prysm**       | Popular consensus client with a clean terminal interface and great user experience, developed by Prysmatic Labs. | Intuitive tooling, widely adopted, with solid performance and documentation           |
| **Lighthouse**  | Security-first consensus client from Sigma Prime, known for audit quality and reliable performance.              | Efficient on low-end hardware, great default for solo stakers and hobbyists           |
| **Teku**        | Institutional-grade client maintained by ConsenSys, with focus on interface integrations and operability.        | Preferred by data centers and custodians with strong monitoring and API support       |
| **Nimbus-Eth2** | Minimalist, resource-light consensus client designed for embedded and ARM devices.                               | Excellent for mobile, Raspberry Pi, and custom lightweight deployments                |

## Storage Comparison

Disk utilization is not just determined by the clients and additional software, but mainly the node's operation type. The following comparison clarifies the storage requirement for both LUKSO networks and the supported execution clients.

<Tabs>
<TabItem value="ethereum" label="Ethereum Mainnet">

| Client         | Total <br /> Full Node Size | Monthly <br /> Full‑Node Growth | Yearly <br /> Full‑Node Growth | Total <br /> Archive Node Size | Yearly <br /> Archive Growth |
| -------------- | --------------------------- | ------------------------------- | ------------------------------ | ------------------------------ | ---------------------------- |
| **Geth**       | ≈ 1.3 TB                    | ≈ 18 GB                         | ≈ 217 GB                       | ≈ 12 TB                        | ≈ 950 GB                     |
| **Erigon**     | ≈ 1.0 TB                    | ≈ 16 GB                         | ≈ 193 GB                       | ≈ 3.5 TB                       | ≈ 320 GB                     |
| **Nethermind** | ≈ 1.1 TB                    | ≈ 17 GB                         | ≈ 204 GB                       | ≈ 7.5 TB                       | ≈ 690 GB                     |
| **Besu**       | ≈ 1.4 TB                    | ≈ 19 GB                         | ≈ 220 GB                       | ≈ 12 TB                        | ≈ 950 GB                     |

:::note Disclaimer

Estimated numbers sourced from [Geth Y-Chart](https://ycharts.com/indicators/ethereum_chain_full_sync_data_size), [Erigon Requirements](https://github.com/ledgerwatch/erigon#system-requirements), [Nethermind Documentation](https://docs.nethermind.io/get-started/system-requirements), and [Besu Resources](https://ethdocker.com/Usage/ResourceUsage). <br /> Blockchain created on [30th July 2015](https://etherscan.io/block/1), metrics gathered after _9 years and 10 months_ of uptime.

:::

</TabItem> <TabItem value="lukso-mainnet" label="LUKSO Mainnet">

| Client         | Total <br /> Full Node Size | Monthly <br /> Full‑Node Growth | Yearly <br /> Full‑Node Growth | Total <br /> Archive Node Size | Yearly <br /> Archive Growth |
| -------------- | --------------------------- | ------------------------------- | ------------------------------ | ------------------------------ | ---------------------------- |
| **Geth**       | ≈ 62 GB                     | ≈ 2.6 GB                        | ≈ 31 GB                        | ≈ 572 GB                       | ≈ 286 GB                     |
| **Erigon**     | ≈ 54 GB                     | ≈ 2.2 GB                        | ≈ 27 GB                        | ≈ 169 GB                       | ≈ 85 GB                      |
| **Nethermind** | ≈ 56 GB                     | ≈ 2.3 GB                        | ≈ 28 GB                        | ≈ 361 GB                       | ≈ 181 GB                     |
| **Besu**       | ≈ 67 GB                     | ≈ 2.7 GB                        | ≈ 32 GB                        | ≈ 574 GB                       | ≈ 287 GB                     |

:::note Disclaimer

Estimated numbers from the LUKSO Validator Community and Ethereum-based client projections. <br /> Blockchain created on [23rd May 2023](https://explorer.execution.mainnet.lukso.network/block/0x0f1192332bf25788a44610f912a3ac38342051707720afff667b4744785bfc79), metrics gathered after _2 years_ of uptime.

:::

</TabItem> <TabItem value="lukso-testnet" label="LUKSO Testnet">

| Client         | Total <br /> Full Node Size | Monthly <br /> Full‑Node Growth | Yearly <br /> Full‑Node Growth | Total <br /> Archive Node Size | Yearly <br /> Archive Growth |
| -------------- | --------------------------- | ------------------------------- | ------------------------------ | ------------------------------ | ---------------------------- |
| **Geth**       | ≈ 7.4 GB                    | ≈ 310 MB                        | ≈ 3.7 GB                       | ≈ 67 GB                        | ≈ 34 GB                      |
| **Erigon**     | ≈ 6.4 GB                    | ≈ 260 MB                        | ≈ 3.2 GB                       | ≈ 20 GB                        | ≈ 10 GB                      |
| **Nethermind** | ≈ 6.8 GB                    | ≈ 280 MB                        | ≈ 3.4 GB                       | ≈ 43 GB                        | ≈ 22 GB                      |
| **Besu**       | ≈ 8.0 GB                    | ≈ 320 MB                        | ≈ 3.8 GB                       | ≈ 69 GB                        | ≈ 34 GB                      |

:::note Disclaimer

Estimated numbers from LUKSO Testnet Operators and Ethereum-based client projections. <br /> Blockchain created on [3rd May 2023](https://explorer.execution.testnet.lukso.network/block/0xaf02ebeed3c2e900d7319535a08daa5fb21bc7d3e3603fc23e221e39925625bc), metrics gathered after _2 years_ of uptime.

:::

</TabItem> 
</Tabs>

:::info Archive Setups

Both, **Besu** and **Geth** support two archive architectures. Metrics were done using their default **LevelDB** + **Bonsai Tries**.

:::

:::tip

Details on the additional [**Slasher Service**](/docs/theory/node-operation/slasher-service.md)'s database growth, can be found on the [**Node Specifications**](/docs/theory/preparations/node-specifications.md#storage-demand) page.

:::

## Size Differences

All execution clients store the same, verifiable blockchain state, yet their disk sizes vary widely through different trade‑offs in database layouts, compression, pruning policies or snapshot schedules.

| Client         | Storage Schema                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Geth**       | <nobr> _LevelDB & Path Tries + Freezer_ </nobr> | Uses a [Merkle-Trie](https://ethereum.org/de/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) in [LevelDB](https://github.com/google/leveldb) and moves old blocks to a Freezer directory. There is no auto-pruning, meaning every state is kept unless manually expired, therefore has one of the larger footprints across clients. The new additional Path Trie helps shrink the massive database size of the default LevelDB archive to around 85%, from around 12TB to only 2TB.                                                                                                                                            |
| **Erigon**     | <nobr> _Flat & Caplin_ </nobr>                  | Uses flat key-value tables with staged syncing and [Caplin](https://erigon.tech/releasing-caplins-archival-format/) compression file format to strip out redundant historical trie node data. With aggressive pruning and a column-oriented layout, it has the lowest growth in size with around 20% less than Geth, most significantly as archive node with around 33% of Geth's or Besu's size.                                                                                                                                                                                                                                                  |
| **Nethermind** | <nobr> _RocksDB & Hybrid Prune_ </nobr>         | Stores it's state in [RocksDB](https://github.com/facebook/rocksdb) and sweeps stale old trie nodes via [hybrid pruning](https://docs.nethermind.io/fundamentals/pruning/). Growth around 15% smaller than Geth, but higher than Erigon as the schema stores more historical receipts and keeps a chunk of pre‑prune snapshots. It's archive size sits in the middle with around 25% less than Geth or Besu.                                                                                                                                                                                                                                       |
| **Besu**       | <nobr> _Bonsai Trie & Forest Tries_ </nobr>     | Ships with two different storage layouts for regular and full archive setups. While the [Forest Trie](https://besu.hyperledger.org/public-networks/concepts/data-storage-formats#forest-of-tries) is a classic archive, the default [Bonsai Trie](https://besu.hyperledger.org/public-networks/concepts/data-storage-formats#bonsai-tries) is a flat table layout for regular nodes, only writing leaf nodes and log deltas within a [Merkle-Trie](https://ethereum.org/de/developers/docs/data-structures-and-encoding/patricia-merkle-trie/). Additional prune commands can reduce occupied space further and make the client extremely modular. |

[Helios]: https://github.com/a16z/helios
[Nimbus-Eth2]: https://nimbus.guide/index.html
[Lodestar]: https://chainsafe.github.io/lodestar/
[Geth]: https://geth.ethereum.org/docs/getting-started/hardware-requirements
[Erigon]: https://docs.erigon.tech/getting-started/hw-requirements
[Nethermind]: https://docs.nethermind.io/get-started/system-requirements/
[Besu]: https://besu.hyperledger.org/24.3.0/public-networks/get-started/system-requirements

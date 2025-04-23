---
sidebar_label: "Client Providers"
sidebar_position: 5
---

# Client Providers

# 6.4 Client Setups

To become a validator on an EVM PoS network, you must run a full node as a. This is because validators need the entire blockchain data and a real-time view of the network state to validate new blocks and transactions effectively. A light node would not have sufficient data for these operations. On top of that, you could run your validator as an archive node. Let's clarify the differences:

#### Full Node

A full node downloads the entire blockchain and validates all blocks and transactions against the network's consensus rules. It stores the current state of the network, including account balances, contracts, storage, and other information. However, it does not keep all historical states. If you need to check the balance of an account at a specific block height in the past, a full node cannot provide this information directly.

#### Archive Node

An archive node is a type of full node. It downloads the entire blockchain and validates all blocks and transactions like a full node. However, in addition to the current state of the network, it also stores all historical states since the genesis block. Keeping the entire historical state makes an archive node much more storage extensive than a full node, but it allows you to query any historical state directly on the node.

### 6.4.1 Supported Clients

As of version `0.7.0` of the LUKSO CLI, the following clients are officially supported:

- **Execution Clients:** Geth, Erigon
- **Consensus Clients:** Prysm, Lighthouse
- **Validator Clients:** Prysm, Lighthouse

You can find a list of all EVM Clients, their current development and status, plus supported operating at the [Client Diversity Webpage](https://clientdiversity.org/#clients). The data is updated frequently and charts feature metrics that are fetched on a daily basis.

#### Geth

Geth is the most popular and widely used Ethereum execution client. It's written in the Go programming language. Geth can be used for various tasks, including creating smart contracts, transferring tokens, mining ether, and exploring block history. It's developed and maintained by the Ethereum Foundation.

#### Erigon

Erigon is an Ethereum execution client that aims to offer a more efficient and faster alternative to Geth. It's written in Go and includes several optimizations to reduce the amount of data stored and improve processing speed. However, these optimizations can make Erigon more complex to maintain and update.

#### Prysm

Prysm is an Ethereum consensus client written in Go and developed by Prysmatic Labs. Validators widely use it. Performance-wise, Prysm leverages optimized processes and data structures, offering a smooth experience for validators. The client had rigorous testing and auditing processes to ensure the client was secure against potential threats. It also comes with an excellent user-friendly terminal interface.

#### Lighthouse

Lighthouse is an Ethereum consensus client written in Rust and developed by Sigma Prime. From a security perspective, Lighthouse leverages Rust's safety features and undergoes regular security audits to protect against potential vulnerabilities. Regarding efficiency, Lighthouse is designed to perform well even on low-spec hardware, making it accessible to a wide range of users with different skill levels.

> Both consensus clients, Prysm and Lighthouse, are known to be highly secure and reliable.

### 6.4.2 Storage Comparison

As [analyzed by QuickNode](https://www.quicknode.com/guides/infrastructure/node-setup/ethereum-full-node-vs-archive-node/), [declared by Ledgerwatch](https://github.com/ledgerwatch/erigon), and [crawled by YCharts](https://ycharts.com/indicators/ethereum_chain_full_sync_data_size), the used storage of the clients for the Ethereum Blockchain as of March 2023 can be estimated around these numbers:

```text
FULL NODE MODE
--GETH...................................970 GB TOTAL
--ERIGON.................................460 GB TOTAL

ARCHIVE NODE MODE
--GETH..................................13.5 TB TOTAL
--ERIGON.................................2.4 TB TOTAL
```

#### Size Differences

Geth is the initial implementation of the EVM as a blockchain protocol. In comparison, Erigon is designed to be a more efficient execution client and achieves this efficiency through several optimizations:

- **Database Schema**: Erigon uses a more optimized database schema that reduces the amount of data that needs to be stored.
- **State Trie Pruning**: Erigon implements more aggressive state tree pruning, which removes more unnecessary data from the state trie.
- **Data Compression**: Erigon uses advanced data compression techniques to reduce the size of stored blockchain data.
- **Code Optimization**: Erigon includes various code-level optimizations that make it run more efficiently, requiring less storage and processing power.

#### Expected Growth

The needed storage can be broken down into the following yearly growth based on an EVM network that gained significant exposure for almost a decade:

```text
GROWTH OF STORAGE IN FULL NODE MODE
--GETH...................................10.5 GB/MONTH | 120 GB/YEAR
--ERIGON....................................5 GB/MONTH |  60 GB/YEAR

GROWTH OF STORAGE IN ARCHIVE NODE MODE
--GETH....................................145 GB/MONTH | 1.8 TB/YEAR
--ERIGON...................................26 GB/MONTH | 320 GB/YEAR
```

Adjust your need for storage accordingly by asking yourself how long you can get by without maintenance on the node.

> These are rough numbers for a different blockchain running the supported clients. These are only for estimation purposes and may slightly differ based on the used storage format.

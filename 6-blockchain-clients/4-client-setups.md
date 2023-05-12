## 6.4 Client Setups

As a validator on an EVM PoS network, you need to run a full node. This is because validators need the entire blockchain data and a real-time view of the network state to validate new blocks and transactions effectively. A light node would not have sufficient data for these operations. On top of that, you could run your validator as an archive node. Let's clarify the differences:

#### Full Node

A full node downloads the entire blockchain and validates all blocks and transactions against the network's consensus rules. It stores the current state of the network, including account balances, contracts, storage, and other information. However, it does not keep all historical states. If you need to check the balance of an account at a specific block height in the past, a full node cannot provide this information directly.

#### Archive Node

An archive node is a type of full node. It downloads the entire blockchain and validates all blocks and transactions like a full node. However, in addition to the current state of the network, it also stores all historical states since the genesis block. This makes an archive node much larger in size compared to a full node, but it allows you to query any historical state of the blockchain.

## 6.4 Supported Clients

As of version `0.6.0` of the LUKSO CLI, the following clients are officially supported:

- **Execution Clients:** Geth, Erigon
- **Consensus Clients:** Prysm, Lighthouse
- **Validator Clients:** Prysm

#### Geth

Geth is the most popular and widely used Ethereum client. It's written in the Go programming language. Geth can be used for a variety of tasks, including creating smart contracts, transferring tokens, mining ether, and exploring block history. It's developed and maintained by the Ethereum Foundation.

#### Erigon

Erigon is an Ethereum client that aims to offer a more efficient and faster alternative to Geth. It's written in Go and includes several optimizations to reduce the amount of data stored and improve processing speed. However, these optimizations can make Erigon more complex to maintain and update.

> **CAUTION:** The current version of Erigon states that it is a tech preview and that things can and will break. It comes with several optimizations but is only suggested for tech-savvy people who know exactly what they are doing and are able to act quickly when the service stalls or need to be manually rebooted.

#### Prysm

Prysm is written in Go and developed by Prysmatic Labs. It's widely used by validators. Performance-wise, Prysm leverages optimized processes and data structures, offering a smooth experience for validators. The client had rigorous testing and auditing processes to ensure the client is secure against potential threats. It also comes with a nice user-friendly terminal interface.

#### Lighthouse

Lighthouse is written in Rust and developed by Sigma Prime. From a security perspective, Lighthouse leverages Rust's safety features and also undergoes regular security audits to protect against potential vulnerabilities. In terms of efficiency, Lighthouse is designed to perform well even on low-spec hardware, making it accessible to a wide range of users

> Both consensus clients, Prysm and Lighthouse are known to be extremely secure and reliable. If you want to run your node as a validator on LUKSO however, make sure to choose the Prysm consensus client as it is the only supported validator client right now.

#### Storage Comparison

As [analysed by QuickNode](https://www.quicknode.com/guides/infrastructure/node-setup/ethereum-full-node-vs-archive-node/), [declared by Ledgerwatch](https://github.com/ledgerwatch/erigon), and [crawled by YCharts](https://ycharts.com/indicators/ethereum_chain_full_sync_data_size), the used storage of the clients for the Ethereum Blockchain as of of March 2023 can be estimated around these numbers:

```text
FULL NODE MODE
--GETH...................................970 GB TOTAL
--ERIGON.................................460 GB TOTAL

ARCHIVE NODE MODE
--GETH..................................13.5 TB TOTAL
--ERIGON.................................2.4 TB TOTAL
```

#### Size Differences

Geth is the initial implementation of the EVM as a blockchain protocol. In comparison, erigon is designed to be a more efficient execution client and achieves this efficiency through several optimizations:

- **Database Schema**: Erigon uses a more optimized database schema that reduces the amount of data that needs to be stored.
- **State Trie Pruning**: Erigon implements more aggressive state trie pruning, which means it removes more unnecessary data from the state trie.
- **Data Compression**: Erigon uses advanced data compression techniques to reduce the size of stored blockchain data.
- **Code Optimization**: Erigon includes various code-level optimizations that make it run more efficiently, requiring less storage and processing power.

#### Expected Growth

The needed storage can be broken down to the following yearly growth based on an EVM network that gained significant exposure for almost a decade:

```text
GROWTH OF STORAGE IN FULL NODE MODE
--GETH...................................10.5 GB/MONTH | 120 GB/YEAR
--ERIGON....................................5 GB/MONTH |  60 GB/YEAR

GROWTH OF STORAGE IN ARCHIVE NODE MODE
--GETH....................................145 GB/MONTH | 1.8 TB/YEAR
--ERIGON...................................26 GB/MONTH | 320 GB/YEAR
```

Adjust your need for storage accordingly by asking yourself how long you can get by without maintanance on the node.

> Be aware that these are rough numbers for a different blockchain running the supported clients. These are only for estimation purposes and may slightly differ based on the used storage format.

#### Client Diversity

Client diversity refers to the utilization of different software clients in a blockchain network developed by different teams and in different programming languages. Having a diversity of clients in a blockchain network is critically important:

- **Security and Resilience**: Client diversity increases the robustness of the network. If there's a bug in one client, it doesn't bring down the entire network because other clients can continue to operate. This decentralization and redundancy is a fundamental aspect of blockchain security and resilience.
- **Decentralization and Governance**: Client diversity promotes decentralization in the development and governance of the Ethereum network. It prevents any single team or entity from having too much influence over the network's development.

> We should make sure that we can split our client usage evenly to the extend of officially supported clients and validators.

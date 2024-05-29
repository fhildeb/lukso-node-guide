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

### 6.4.3 Client Diversity

Client diversity refers to utilizing different software clients in a blockchain network developed by various teams and in other programming languages. Having a variety of clients in a blockchain network is critically important:

- **Security and Resilience**: Client diversity increases the robustness of the network. If there's a bug in one client, it doesn't bring down the entire network because other clients can continue to operate. This decentralization and redundancy is a fundamental aspect of blockchain security and resilience.
- **Decentralization and Governance**: Client diversity promotes decentralization in the development and governance of the Ethereum network. It prevents any team or entity from having too much influence over the network's growth.

Operators of validators and nodes should ensure that we can split our client usage evenly to the extent of officially supported clients and validators. You can find metrics about the diversity on Ethereum at the [Client Diversity Webpage](https://clientdiversity.org/#distribution). The charts for consensus and execution clients are updated on a daily basis.

#### Ethereum's History

Ethereum client diversity has proven essential in maintaining the network's robustness during several incidents. Some of the most notable incidents:

- **Shanghai DoS Attacks, 2016**: During the Devcon2 conference, the Ethereum network was targeted by a [series of denial-of-service attacks](https://blog.ethereum.org/2016/09/22/ethereum-network-currently-undergoing-dos-attack). The attacker exploited several vulnerabilities in the Ethereum protocol, which resulted in a slowdown of block propagation times and disrupted the network. The main client at the time, Geth, was particularly affected. However, the Parity client had a different implementation and wasn't affected similarly. Client diversity allowed the network to continue to operate.
- **OpenEthereum Consensus Bug, 2020**: There have been several instances where a consensus client bug could have led to a network fork. In 2020, a bug in the OpenEthereum client led to some [nodes getting stuck](https://www.coindesk.com/tech/2020/08/27/buggy-code-release-knocks-13-of-ethereum-nodes-offline/) at a particular block, but because many nodes were running other clients, the network as a whole continued to function.
- **Prysm Client Incident, 2023**: Prysm nodes were burdened by a flood of attestations about older, outdated transactions. This phenomenon led to excessive usage of system resources in an attempt to update the transaction record, causing slowdowns and system failures. It turned out to be due to [an error in the transaction organization mechanism](https://offchain.medium.com/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2), causing the system to sort transactions using incorrect information. During this time, Lighthouse was the only client not affected. Due to the majority being vulnerable, the Ethereum network stalled for 25 minutes and continued with tremendous workloads for several days.

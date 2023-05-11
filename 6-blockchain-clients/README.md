# 6. Blockchain Client Setup

Regarding the Blockchain Client Setup, there will be multiple ways of running the blockchain clients for LUKSO:

- **Single Network Setup**: Run the LUKSO CLI on the Operating System
- **Multi Network Setup**: Running Clients in Docker Containers

> This guide will cover both types at some point. However, for now only the LUKSO CLI version is officially released and supported.

#### Pure Operating System Management

In a Single Network Setup, you run the LUKSO CLI directly on the host operating system. This means installing the software directly in a system's user directory `/usr/local/bin/lukso`. The CLI manages the blockchain clients and handles all inputs.

This method is generally simpler to set up and uses fewer system resources since it doesn't involve the overhead of a virtualization layer. However, running multiple networks would only be possible with complex software knowledge of virtual of running multiple operating systems in parallel, since each instance of the software will interfere with the others.

#### Docker Container Management

In a Multi Network Setup, you run the LUKSO clients inside Docker containers on one operating system. Docker is a platform that allows you to package an application with its runtime environment into a standardized unit for software development, called a container. Each container runs in isolation from the others, so you can have multiple instances of the LUKSO client running in separate containers, each with its own configuration and network connections.

> Docker containers would allow to run testnet and mainnet on one machine

The setup is more complex and uses more system resources, but it provides a great deal of flexibility. You can easily run multiple nodes with different configurations just by starting and stopping different containers. It also makes it easier to upgrade or downgrade the LUKSO software, since you can just replace the Docker image for a particular container without affecting the others.

> DappNode is a platform that utilizes Docker containers to run decentralized applications and blockchain nodes. It provides a user-friendly interface and automates many of the complexities of running nodes in Docker containers. DappNode not only has it's own software, but also comes with their own pre-configured node machines.

It's also planned to have LUKSO being officially support on the DappNode suite, however, this will come after the mainnet is released.

# 6.1 PoS Blockchain Network

Let's also clear up the blockchain network we're going to run with this setup and how the compensation works for providing the piece of backend infrastructure. Its important to know the basics of how we will participate.

#### Proof of Stake

PoS is a consensus mechanism used in many blockchain networks to validate and add new transactions to the blockchain. Unlike Proof of Work on Bitcoin, which requires miners to solve complex mathematical problems to add new blocks to the blockchain, PoS relies on the amount of cryptocurrency a person holds and is willing to stake as collateral.

In a PoS blockchain, validators are chosen to create a new block based on their stake in the network. The more cryptocurrency a person holds, the higher their chances of being chosen as a validator. Once chosen, validators validate transactions and add them to the blockchain. For their service, validators are rewarded with transaction fees and potentially new coins.

One of the main advantages of PoS over PoW is its energy efficiency. While PoW requires massive computational resources and energy consumption, PoS achieves consensus with minimal energy use. This makes PoS a more sustainable and environmentally friendly choice for blockchain networks.

Another advantage of PoS is the security it provides. Since validators have a significant investment in the network, they are incentivized to act honestly. If a validator tries to manipulate the system or validate fraudulent transactions, they risk losing their stake, making attacks on the network costly and therefore less likely.

#### Earnings

When it comes to withdrawels and returns, there are certain wallet addresses to maintain: the withdrawal and the recipient address. They could be the same address, but different actions are bind to them:

- **Staking Withdrawal Address**: Staking withdrawals refer to withdrawing earned rewards or the initial staked amount (32 LYX) by validators participating in Proof-of-Stake. These withdrawals become possible after the Shapella upgrade & EIP-4895 are up and running on the according network. These staking withdrawals are automatically pushed to the withdrawal address set during the key generation process and are registered on-chain during the deposit. This address cannot be changed once the stake is deposited.
- **Recipient Fee Address**: The recipient fee address, e.g., transaction or gas fee address, differs from the staking withdrawal. The recipient fee address is associated with the validator when they perform validation duties, such as proposing and attesting to blocks. The recipient fee address is set during the start of the validator client on the node and can be changed upon restart. To set or modify, you need your node's wallet password after importing the validator keys. The fees are paid by users who initiate transactions and smart contract executions on the EVM network. Validators collect the fees as an incentive for their work in maintaining the blockchain.

In conclusion, staking withdrawals refer to withdrawing rewards and staked amounts connected to the consensus mechanism. On the other end, the recipient fee address is where validators receive transaction fees for their validation work itself.

> Typically everything is included in the APY for staking rewards. But as expected, there are fluctuations for various factors such as network usage, the number of validators, and consensus changes.

# 6.2 Client Types

When engaging with blockchain technologies, it's crucial to understand the different types of software clients involved in the process. The interplay between these clients is what makes a blockchain network function as intended, and understanding their roles and functionalities can help users troubleshoot issues and optimize their experiences.

> You will have to run all 3 clients in order to become a validator, however you can also run the setup without the validator client if you just want to participate in and store the network itself, without gaining returns.

#### Execution Client

The Execution Client, also referred to as the blockchain client or network client, is the software that directly interacts with the blockchain. It connects to the blockchain network, downloads and verifies blocks, maintains a local copy of the blockchain data, and propagates transactions and blocks.

Underneath, the Execution Client does a lot of heavy lifting: it verifies cryptographic proofs, validates transactions, applies state changes, manages the local database, and provides an interface for querying and spreading the blockchain data from or to other nodes. Regarding the copy of the blockchain data, it maintains account balances, contract code, contract storage, and the transaction pool.

The transaction pool, often called the "mempool," is a set of transactions that have been broadcast to the network but have not yet been included in a block. The execution client is responsible for managing this pool, deciding which transactions to include in a proposed block based on criteria such as gas price, and executing these transactions when they are included in a block.

The execution client also communicates with the consensus client to receive updates on the state of the consensus protocol, including finalized blocks and the current state of the validator set.

#### Consensus Client

The Consensus Client, also referred to as the beacon client or beacon node is responsible for participating in the consensus protocol of the blockchain. In a Proof of Stake system, this involves proposing own blocks and/or attesting to the validity of proposed blocks

Under the hood, the Consensus Client communicates with other validators to reach agreement on the state of the blockchain. It signs messages with the validator's private key as part of the consensus process, and it reads from and writes to the blockchain through the execution client.

#### Validator Client

The Validator Client is often a part of the Consensus Client software. It manages the validator's keypairs and performs the duties assigned by the consensus protocol: proposing blocks and making attestations.

The validator client only manages the validator's activities, while the consensus client implements the consensus protocol and communicates with the rest of the network.

## 6.3 Node Types

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

```
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

```
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

## 6.5 Port Setups

In order to let the Blockchain CLients communicate correctly, the ports, e.g., data communication channels, have to be enabled on the node and the router. For each supported blockchain client, there are different ports to open.

## 6.6 Firewall Configuration

## 6.7 Router Configuration

## 6.8 LUKSO CLI Setup

## 6.9 LUKSO Docker Setup

### firewall

Allow P2P ports for Lukso clients:

```shell=
sudo ufw allow 30303/tcp
sudo ufw allow 13000/tcp
sudo ufw allow 12000/udp
sudo ufw allow 30303/udp
```

> **_NOTE:_** make sure to open same ports on your home router

Enable Firewall:

```shell=
sudo ufw enable
```

Verify firewall configuration:

```shell=
sudo ufw status
```

It should look something like this (may be missing some ports):

```shell=
Status: active

To                         Action      From
--                         ------      ----
13000/tcp                  ALLOW       Anywhere
12000/udp                  ALLOW       Anywhere
30303/tcp                  ALLOW       Anywhere
ssh-port/tcp               ALLOW       Anywhere
30303/udp                  ALLOW       Anywhere
13000/tcp (v6)             ALLOW       Anywhere (v6)
12000/udp (v6)             ALLOW       Anywhere (v6)
30303/tcp (v6)             ALLOW       Anywhere (v6)
ssh-port/tcp (v6)          ALLOW       Anywhere (v6)
30303/udp (v6)             ALLOW       Anywhere (v6)
```

## Node Setup

> **_NOTE:_** Following steps are performed on personal machine.

Access a remote node machine

```shell=
ssh lukso
```

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

#### Network Operations

The Ethereum Virtual Machine is a crucial part of the Ethereum ecosystem and each full node running the Ethereum software has its own instance of it. This is because every full node validates every transaction and smart contract execution independently. The EVM is isolated from the network, filesystem, and other processes of the node's computer system, which makes it a sandboxed environment for smart contract execution.

When a node receives a new block, it executes all transactions in that block in its own EVM to validate the correctness of the transaction results and the final state of the block. This is a fundamental part of the Ethereum network's decentralized nature: every node independently verifies the validity of every block and every transaction.

#### Computation Measures

Each operation in the EVM requires a certain amount of gas, which is paid for in the chains coin. The cost of gas is a crucial part of Ethereum's incentive structure, deterring spam on the network and incentivizing miners to confirm transactions.

Since the [London Update](https://eips.ethereum.org/EIPS/eip-1559) Ethereum has a predictable fee system with two parts: a base fee and a tip. The base fee is burned and adjusts up or down depending on network congestion. This means that when the network is busy, the base fee increases, and when the network is less busy, the base fee decreases. The tip, also called priority fee, is given to the miner as an incentive to include the transaction in the block.

Gas plays a crucial role in the execution of transactions. If a transaction or smart contract operation does not have enough gas, it runs out of gas and fails, but the gas used up to that point is not returned as the computation was finished up to this point.

#### Tokenomics

A large portion of the transaction fee is burned, i.e., permanently removed from circulation. This burning mechanism effectively reduces the supply of Ether over time, which can exert upward pressure on the price, assuming demand remains constant or increases, making EVM PoS blockchain coins a semi-deflationary asset.

Therefore, validators only receive the block rewards and tips as fees.

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

## 6.5 Open Port Setup

In order to let the Blockchain CLients communicate correctly, the ports, e.g., data communication channels, have to be enabled on the node and the router. For each supported blockchain client, there are different ports to open.

Each supported client has different ports for various purposes that have to be open for a clear connection:

> To discover peers of other nodes, all outbound traffic should be allowed across all UDP and TCP ports when using Prysm and Lighthouse.

| CLIENT     | DESCRIPTION                               | PORT  | TCP | UDP |
| ---------- | ----------------------------------------- | ----- | --- | --- |
| GETH       | Execution Chain Data Channel              | 30303 | X   |     |
| GETH       | Execution Chain Discovery                 | 30303 |     | X   |
| ERIGON     | Execution Chain Data Channel              | 30303 | X   |     |
| ERIGON     | Execution Chain Discovery                 | 30303 |     | X   |
| LIGHTHOUSE | Beacon Communication and Data             | 9000  | X   | X   |
| PRYSM      | Beacon Gossip, Requests, and Responses    | 13000 | X   |     |
| PRYSM      | Beacon Discovery, Requests, Data Exchange | 12000 |     | X   |

> Within the [monitoring section](/7-monitoring/) of this guide you can find further internal communication channels.

References:

- [Lighthouse Port Specification](https://lighthouse-book.sigmaprime.io/faq.html?highlight=9000#do-i-need-to-set-up-any-port-mappings)
- [Prysm Port Specification](https://docs.prylabs.network/docs/prysm-usage/p2p-host-ip#configure-your-firewall)
- [Geth Port Specification](https://github.com/ethereum/go-ethereum#configuration)
- [Erigon Port Specification](https://github.com/ledgerwatch/erigon#default-ports-and-firewalls)

## 6.6 Firewall Configuration

After you have spot out which ports you need to open, we can go back to editing the firewall settings. We can do this the same way as we did before in the [system setup](/3-system-setup/) section of this guide.

Log in to your node if you are not already connected:

```sh
ssh <ssh-device-alias>
```

### 6.6.1 Opening the ports on the firewall

I will go ahead and open all public ports used for the Geth and Prysm clients. Prysm is needed as it is the only fully supported validator for the LUKSO CLI for now. Since I choose stability over performance, I choose Geth, based on the warning notices from Erigon's repository.

```sh
# Geth's Execution Chain Data Channel
sudo ufw allow 30303/tcp

# Geth's Execution Chain Discovery
sudo ufw allow 30303/udp

# Prysm's Beacon Gossip, Requests, and Responses
sudo ufw allow 13000/tcp

# Prysm's Beacon Discovery, Requests, Data Exchange
sudo ufw allow 12000/udp
```

The output of each command should always show:

```sh
Rule added
Rule added (v6)
```

### 6.6.2 Checking the configured ports

Now we can verify our firewall configuration as we did previously. If something is missing or configured wrong, have a look into the system setup's [firewall section](/3-system-setup/) on how to remove them.

```sh
sudo ufw status
```

The output for Geth and Prysm should look similar to the one underneath. Please note that `<prefered-ssh-port>` will be exchanged with your actual SSH port.

```text
Status: active

To                               Action      From
--                               ------      ----
<prefered-ssh-port>/tcp          ALLOW       Anywhere
30303/tcp                        ALLOW       Anywhere
30303/udp                        ALLOW       Anywhere
13000/tcp                        ALLOW       Anywhere
12000/udp                        ALLOW       Anywhere
<prefered-ssh-port>/tcp (v6)     ALLOW       Anywhere (v6)
30303/tcp (v6)                   ALLOW       Anywhere (v6)
30303/udp (v6)                   ALLOW       Anywhere (v6)
13000/tcp (v6)                   ALLOW       Anywhere (v6)
12000/udp (v6)                   ALLOW       Anywhere (v6)
```

**If your client ports match, it means they are allowed from the node's point of view. In the next step, we need to enable inputs from the router's side.**

## 6.7 Router Configuration

To allow external incoming communication into your home network, so they can be forwarded to your node machine with open ports, we also have to open these ports on your router, acting as a second firewall in this case.

### 6.7.1 Resolve the Node's IP Address

Resolve the nodes IP address again as we already did and explained in detail on the [router config](/4-router-config/) section of the guide:

```sh
ip route show default
```

The output will look like this:

```sh
default via <GATEWAY_IP_ADDRESS> dev eno1 proto dhcp src <NODE_IP_ADDRESS> metric <ROUTING_WEIGHT>
```

Alternatively you can also send an request to the Google server and filter their response:

```sh
ip route get 8.8.8.8 | awk '{print $7}'
```

### 6.7.2 Resolve the Node's Hardware Address

Now we can retrieve the information about the MAC addresses

```sh
ip link show
```

The output will list all the network interfaces on the system. Look into the interface that is used to broadcast and send information to the outside world using an Ethernet connection. The entry you're looking for looks like this:

```sh
<NETWORK_INFERFACE_NAME>: <BROADCAST,MULTICAST,UP,LOWER_UP> ...
    link/ether <MAC_ADDRESS> brd <BROADCAST_ADDRESS>
```

**Write down or remember both names so you can check them later on and identify your device for router settings.**

### 6.7.3 Log into your Router's Web Interface

Open a web browser and enter the router's IP address or web address. You'll be prompted to enter your router's admin username and password. If you haven't changed them, check your router's documentation or label for the default credentials.

### 6.7.4 Navigate to Port Forwarding Settings

In your router's web interface, navigate to the section related to port forwarding settings. This section might be named something like `Port Forwarding`, `Applications`, or `Firewall`. In more consumer friendly machines like mine, it could be found in:

`Internet` > `Permit Access` > `Port Sharing`

### 4.7.5 Add a New Port Forwarding Rule

Usually, there will be a button or link labeled `Add`, `Create`, `New Rule`, or something similar. Click on it to start creating a new port forwarding rule for a specific device.

You'll be prompted to enter the device's MAC address and the static IP address you gave your device before. In modern firmwares, you can just select one of your devices that are currently connected. Choose your node device.

On my end, I found the settings within:

`Port Sharing` > `Add Device for Sharing`

After clicking on the node's device name or clicking new rules you should be able to set a new port access rule. There are the following properties:

- **Device Info/MAC Address/IP Address**: These are the fields for device information. In newer firmware, you can just select the device, on older firmware you have to manually input your devices MAC and static IP addresses you've read out before. The incoming traffic on the specified port will be forwarded to the device with this IP address. The MAC address is there for the IP to always be assigned statically.
- **Service Name/ID/Description**: This is just a label for you to identify the rule. You can enter something like a short description of the above table, so you will associate it later. I chose `<client-name>-<2-word-description>-<port-number>` as naming convention, to always know what the port is used for.
- **External Port**: This is the port number you want to open for incoming traffic. For Geth and Prysm, you might need to open ports such as `30303`, `13000`, `12000` for blockchain clients.
- **Internal Port/Port to Device**: This is the port number on your local machine that will handle the incoming traffic. Usually, this will be the same as the external port. If you did not manually configure port forwarding, input the same as in the external port. If there is a second field for `through port` for advanced redirects, input the same port number again. If they are equal, no additional ruleset will apply.
- **Protocol**: This is the network protocol used for the incoming traffic. It could be TCP, UDP, or both. Make sure to match the protocol with the requirements of your blockchain clients. Some router might not allow to set one rule for multiple protocols. If so, you have to set one rule for each protocol of the same port number.

On my router, I set the following rule packages for Geth and Prysm:

```text
---------------------------------------------------------------------------------
| DEVICE:               <node-device-name>                                      |
| IPV4 ADDRESS:         <node-ip-address>                                       |
| MAC ADDRESS:          <node-mac-address>                                      |
| IPV6 INTERFACE ID:    <ipv6-interface-id>     (assigned automatically)        |
---------------------------------------------------------------------------------
| □ Permit independent port sharing for this device                             |
---------------------------------------------------------------------------------
| IPV4                                                                          |
| □ Open this device completely for internet sharing via IPv4 (exposed host)    |
---------------------------------------------------------------------------------
| IPv6                                                                          |
| Enable PING6                                                                  |
| Open firewall for delegated IPv6 prefixes of this device                      |
| Open this device completely for internet sharing via IPv6 (exposed host)      |
---------------------------------------------------------------------------------

SHARING RULES
1 ---
        -------------------------------------------------------------------------
        | NAME:                         execution-data-30303                    |
        | PROTOCOL:                     TCP                                     |
        | PORT TO DEVICE:               30303   THROUGH PORT:       3030        |
        | PORT REQUESTED EXTERNALLY:    30303                                   |
        | (IPv4 only)                                                           |
        -------------------------------------------------------------------------
        | ⊠ Enable sharing                                                      |
        -------------------------------------------------------------------------
        | IPV4 ADDRESS IN THE INTERNET: <internet-ip-address>                   |
        | PORT ASSIGNED EXTERNALLY:     30303   THROUGH PORT:       3030        |
        -------------------------------------------------------------------------
2 ---
        -------------------------------------------------------------------------
        | NAME:                         beacon-sync-13000                       |
        | PROTOCOL:                     TCP                                     |
        | PORT TO DEVICE:               13000   THROUGH PORT:       13000       |
        | PORT REQUESTED EXTERNALLY:    13000                                   |
        | (IPv4 only)                                                           |
        -------------------------------------------------------------------------
        | ⊠ Enable sharing                                                      |
        -------------------------------------------------------------------------
        | IPV4 ADDRESS IN THE INTERNET: <internet-ip-address>                   |
        | PORT ASSIGNED EXTERNALLY:     13000   THROUGH PORT:       13000       |
        -------------------------------------------------------------------------
3 ---
        -------------------------------------------------------------------------
        | NAME:                         beacon-data-12000                       |
        | PROTOCOL:                     UDP                                     |
        | PORT TO DEVICE:               12000   THROUGH PORT:       12000       |
        | PORT REQUESTED EXTERNALLY:    12000                                   |
        | (IPv4 only)                                                           |
        -------------------------------------------------------------------------
        | ⊠ Enable sharing                                                      |
        -------------------------------------------------------------------------
        | IPV4 ADDRESS IN THE INTERNET: <internet-ip-address>                   |
        | PORT ASSIGNED EXTERNALLY:     12000   THROUGH PORT:       12000       |
        -------------------------------------------------------------------------
4 ---
        -------------------------------------------------------------------------
        | NAME:                         execution-discovery-30303               |
        | PROTOCOL:                     UDP                                     |
        | PORT TO DEVICE:               30303   THROUGH PORT:       3030        |
        | PORT REQUESTED EXTERNALLY:    30303                                   |
        | (IPv4 only)                                                           |
        -------------------------------------------------------------------------
        | ⊠ Enable sharing                                                      |
        -------------------------------------------------------------------------
        | IPV4 ADDRESS IN THE INTERNET: <internet-ip-address>                   |
        | PORT ASSIGNED EXTERNALLY:     30303   THROUGH PORT:       3030        |
        -------------------------------------------------------------------------
```

### 6.7.6 Apply and Save

Once you've filled out all fields, save the new rule. You will be asked to apply changes, which might take a few seconds until it takes effect.

> **Note**: Some routers may require a reboot to apply the changes.

After the rules were applied, check back to your port sharing screen of the router. You should find a list with the newly added rules to verify your previous step. On my end, the list looks like this:

```text
PORT SHARING DEVICE SCREEN

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| DEVICE / NAME      | IP ADDRESS          | SHARING                           | PORT ASSIGNED EXTERNALLY IPV4 | PORT ASSIGNED EXTERNALLY IPC6 | INDIPENDENT PORT SHARING |
|--------------------|---------------------|-----------------------------------|-------------------------------|-------------------------------|--------------------------|
| <node-device-name> | <node-ip-address>   | active: execution-data-30303      | 30303                         |                               | □                        |
|                    | <ipv6-interface-id> | active: beacon-sync-13000         | 13000                         |                               | 0 enabled                |
|                    |                     | active: beacon-data-12000         | 12000                         |                               |                          |
|                    |                     | active: execution-discovery-30303 | 30303                         |                               |                          |
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

PORT SHARING RULES SCREEN

---------------------------------------------------------------------------------------------------------
| STATUS | NAME                      | PROTOCOL | IP ADDRESS IN THE INTERNET | PORT ASSIGNED EXTERNALLY |
|--------|---------------------------|----------|----------------------------|--------------------------|
| active | execution-data-30303      | TCP      | <internet-ip-address>      | 30303                    |
| active | beacon-sync-13000         | TCP      | <internet-ip-address>      | 13000                    |
| active | beacon-data-12000         | UDP      | <internet-ip-address>      | 12000                    |
| active | execution-discovery-30303 | UDP      | <internet-ip-address>      | 30303                    |
---------------------------------------------------------------------------------------------------------
```

**After we opened all required ports, we're able to set up and sync the blockchain clients.**

## 6.8 LUKSO CLI Setup

## 6.9 LUKSO Docker Setup

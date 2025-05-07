---
sidebar_label: "Peer Discovery"
sidebar_position: 8
---

# Peer Discovery

### 6.11 Peer Discovery

In a blockchain network, peers are individual nodes participating and playing a crucial role in its functioning. These nodes can have different roles depending on the type of blockchain, but they all work collectively to maintain and validate the shared ledger.

One of the fundamental characteristics of a blockchain is decentralization, which is achieved through a network of peers distributed across different geographic locations. Each peer maintains a copy of the entire blockchain and validates new transactions and blocks according to the protocol rules. The separate operations ensure the integrity and security of the blockchain, as it makes it very difficult for any single entity to tamper with the data on the blockchain.

The process of peers communicating with each other is known as peer-to-peer networking. In a P2P network, there is no central server. Instead, each node or peer is equal and can act as a client and a server. The P2P communication process involves sharing data directly between systems on a network, enabling data to be transmitted directly from the source peer to the destination peer.

In a blockchain network like Ethereum, peers validate transactions and blocks, ensuring they comply with network rules before adding them to the blockchain. Peers propagate valid transactions and blocks to other peers in the network, ensuring all peers have the same data and maintain the network's consensus. They play an integral role in blockchain technology's decentralized and trustless nature.

#### Benefits and Drawbacks

While this page will prepare you to increase your peer count and discoverability to raise the node's connectivity and resilience, setting your peer count too high can also have adverse side effects. Here are the main reasons:

- **Resource Usage**: Each peer connection requires computational and network resources for managing the connection and processing transactions and blocks. If the maximum peer count is set too high, it may overwhelm your system resources like CPU, memory, and bandwidth, affecting the performance of your node and possibly your entire system. It affects bandwidth usage because your peer nodes are downloading the blockchain data from you if you are one of their peers. The connections would mean that your upload bandwidth is sending out a lot of data which will add to your outbound network usage.
- **Network Topology Impact**: LUKSO is a P2P network designed with a certain degree of decentralization and distribution. If individual nodes have too many connections, it could lead to a more centralized network topology, negatively affecting the network's resilience to specific attacks or failures. Too high counts can defeat the distributed nature of blockchain networks. Ideally, the network consists of smaller circles of discovered nodes with a decentralized topology, extensive network growth, and no large population centers. When some node is down in a minor process of connected nodes, most of the blockchain does not notice the outage and goes on as if nothing happened. However, if every node is connected to most of the network, having outages would mean dropping the peer count of everyone and bringing fluctuations onto the table.
- **Wasted Connections**: There's a point beyond which additional connections don't provide a meaningful increase in data propagation speed or network resilience, for instance, if you are already connected to 33% or more percent for smaller networks or more than 100 active peers for bigger ones. Peers beyond this point are just wasting connections, harming the topology, and consuming resources without providing additional benefits.

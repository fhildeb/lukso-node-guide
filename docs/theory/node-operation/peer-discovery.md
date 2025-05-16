---
sidebar_label: "Peer Discovery"
sidebar_position: 8
---

# Peer Discovery

Peer discovery is the mechanism by which a peer on a distributed network finds peers with which it may communicate. In peer-to-peer blockchain, this process is done automatically with algorithms that create channels of communication between the clients. All of the nodes are equal parties in this mesh, and dynamic peer discovery allows the network to heal, expand, and adapt.

:::tip

The fundamentals of peer networks, operation layers, and blockchain nodes can be found on the [Peer Networks](/docs/theory/blockchain-knowledge/peer-networks.md) page.

:::

:::info

EVM-based blockchains like LUKSO use [two overlapping peer networks](/docs/theory/blockchain-knowledge/peer-networks.md#operation-layers), for the consensus and execution layer.

:::

## Connection Process

The peer-to-peer discovery process is surprisingly elegant and efficient. Here’s a high-level overview of how your node finds others:

1. **Every node has a unique ID**, derived from its cryptographic keys. This is like its personal identity on the network.
2. **Nodes maintain a routing table**, organizing other peer IDs into buckets based on how close their IDs are.
3. **When searching for peers**, your node asks others “who is closer to this target ID?” and walks through the routing tree.
4. **Once a new peer is found**, the connection is upgraded to a secure, encrypted session using mutually agreed sub-protocols.
5. **After connection**, nodes begin exchanging blocks, transactions, and consensus messages through gossip networks.

:::tip

All of this happens behind the scenes. Node operators just need to make sure that the router allows incoming connections on the appropriate ports. Further details can be found on the [Router Setup](/docs/guides/router-setup/static-ip-assignment.md) and [Firewall Settings](/docs/guides/client-setup/firewall-settings.md) pages.

:::

:::note Further Details

The peer discovery within mesh networks like EVM-based blockchains utilizes the [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) algorithm.

:::

## Adjustment Effects

While you may increase your peer count and visibility to add to your node's network connectivity and health, overly high peer limits can be inefficient or interfere with optimal topology design. Theoretical recommendations for setting peer discovery parameters are presented in the next table.

| Effect                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Resource Usage** </nobr>          | Each additional peer is requiring system resources, including CPU, memory, and bandwidth. Having high peer counts increases your [uploaded data](/docs/theory/preparations/network-demand.md), since your node is sending out more packages to other peers. Node effectiveness and synchronization rate can be degraded if system resources are overwhelmed.                                                                                                                                                                                                                                                                                                                    |
| <nobr> **Network Topology Impact** </nobr> | The peer-to-peer network thrives with decentralization. The moment that one node is linked with too many peers, by default it creates a hub, centralized communication, going in direct opposition of the distributed nature of the network. Ideally, the network is made up of tiny overlapping subgroups. Overconnecting creates systemic risk. When a ordinary node is offline in a small sub-group, the overall network does not notice. However, if highly-connected peers generate downtime, a much bigger portion of the network fluctuates, as hundreds of communication channels will stall at once, re-try to establish connections, and might drop their peer count. |
| <nobr> **Wasted Connections** </nobr>      | Above a peer count of around 100 on large networks with thousands of nodes, further connections gain little propagation rate or stability. They just consume bandwidth and sockets with no improvement on any fault tolerance or synchronization time of the overall network. The added connections add redundancy with little real gain, especially on small or medium nodes.                                                                                                                                                                                                                                                                                                  |

:::tip

If you are unsure about [Peer Connectivity](/docs/guides/modifications/peer-connectivity.md) limits, it’s best to rely on your client’s defaults, designed to balance resource use, discovery efficiency, and network stability for homestakers within the community.

:::

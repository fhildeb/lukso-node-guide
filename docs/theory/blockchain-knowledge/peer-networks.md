---
sidebar_label: "Peer Networks"
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Peer Networks

When one tries to visit a website, the request often goes through a short series of centralized servers owned by corporations or data centers. These servers take on a vital role in making the service available and, therefore, become inaccessible when they go offline. Blockchains, however, don't rely on centralized servers; instead, they use a network of computers in a peer-to-peer manner, where thousands of nodes communicate directly with each other.

Every node has its own copy of the blockchain data and helps in propagating it to others. This setup forms a decentralized mesh network, where there is no control by a single machine. Instead of trusting a single server to manage the delivery of data packages, every participant interconnects with others and helps in propagating the information. This leads, to a system that is more resilient, harder to censor, and has improved transparency.

## Operation Layers

EVM-based blockchains like LUKSO use **two overlapping peer networks**, each with different focus points.

| Layer               | Purpose                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------- |
| **Execution Layer** | Broadcasting transactions, propagating blocks, and syncing blockchain data with other nodes. |
| **Consensus Layer** | Coordinating validators, attestations, signatures, and finality votes.                       |

:::info

When a node joins the network, it **automatically joins** both of these networks through the Ethereum client software, which manages connections and protocols in the background. More details can be found on the [Client Types](/docs/theory/blockchain-knowledge/client-types.md) page.

:::

## Bootstrap Nodes

Before your node can start participating in the network, it needs a way to find its first peers. Here, bootnodes come into play, describing special nodes with a well-known and static network address. These nodes act like signposts on the internet within the [network configuration](https://github.com/lukso-network/network-configs). Your node can contact them to get directions to other active nodes. When a node starts, it:

1. Connects to one or more bootnodes
2. Asks for a list of known peer addresses
3. Contacts it's first listed and active peers
4. Discovers more nodes through interconnections

:::tip

Bootnodes **don’t send blocks or transactions** themselves. They can be seen as phonebooks of the network, representing starting points for deeper connections. As such bootnodes come with extremely high peer count limits, always updating and discovering active node lists, they are operated by core institutions and professional setups. Stability and high uptime must be guaranteed, as their addresses are permanently written in the configurations.

:::

:::info Bootnode Hosting

- LUKSO provides **several bootnodes** across different regions, operated by the core team, ensuring **redundancy**.
- Having multiple bootnodes ensures reliability and **full geographic distribution** and **low latency**.

  :::

## Peer Discovery

The peer-to-peer discovery process is surprisingly elegant and efficient. Here’s a high-level overview of how your node finds others:

1. **Every node has a unique ID**, derived from its cryptographic keys. This is like its personal identity on the network.
2. **Nodes maintain a routing table**, organizing other peer IDs into buckets based on how close their IDs are.
3. **When searching for peers**, your node asks others “who is closer to this target ID?” and walks through the routing tree.
4. **Once a new peer is found**, the connection is upgraded to a secure, encrypted session using mutually agreed sub-protocols.
5. **After connection**, nodes begin exchanging blocks, transactions, and consensus messages through gossip networks.

:::tip

All of this happens behind the scenes. Node operators responsibility is to make sure that the router allows incoming connections on the appropriate ports. Further details can be found on the [Router Setup](/docs/guides/router-setup/static-ip-assignment.md) and [Firewall Settings](/docs/guides/client-setup/firewall-settings.md) pages.

:::

:::note Further Details

The peer discovery within mesh networks like EVM-based blockchains utilizes the [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) algorithm.

:::

## Architectural Benefits

Decentralized networks like blockchains offer several advantages over traditional centralized services. Here’s how they compare:

| Property                                 | Central Servers                                            | Peer-to-Peer Mesh                                                                              |
| ---------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| <nobr> **Fault Tolerance** </nobr>       | If the server fails, the service becomes unavailable.      | The data is replicated across thousands of nodes, meaning no single failure can bring it down. |
| <nobr> **Scalability** </nobr>           | The server must scale resources to match user growth.      | Each new node contributes bandwidth and storage, helping the network scale naturally.          |
| <nobr> **Censorship Resistance** </nobr> | A central authority can block, modify, or restrict access. | No single point of control means it's nearly impossible to censor or shut down.                |
| <nobr> **Trust Model** </nobr>           | Users must trust the operator.                             | Trust is replaced by cryptographically verified math.                                          |

:::tip

This decentralized, self-healing design is what makes public blockchains uniquely resilient and democratic.

:::

## Bootnode Addresses

Here are the bootnode connections for the LUKSO Mainnet based on the official [network configuration](https://github.com/lukso-network/network-configs).

<Tabs>
<TabItem value="nethermind" label="Nethermind, Geth, Erigon, Besu" default>

```text title="Mainnet Execution Bootnodes"
# Address 1
enode://c2bb19ce658cfdf1fecb45da599ee6c7bf36e5292efb3fb61303a0b2cd07f96c20ac9b376a464d687ac456675a2e4a44aec39a0509bcb4b6d8221eedec25aca2@34.147.73.193:30303

# Address 2
enode://276f14e4049840a0f5aa5e568b772ab6639251149a52ba244647277175b83f47b135f3b3d8d846cf81a8e681684e37e9fc10ec205a9841d3ae219aa08aa9717b@34.32.192.211:30303
```

</TabItem>
<TabItem value="prysm" label="Prysm, Nimbus, Lighthouse">

```text title="Mainnet Execution Bootnodes"
# Address 1
enr:-MK4QJ-Bt9HATy4GQawPbDDTArtnt_phuWiVVoWKhS7-DSNjVzmGKBI9xKzpyRtpeCWd3qA9737FTdkKGDgtHfF4N-6GAYlzJCVRh2F0dG5ldHOIAAAAAAAAAACEZXRoMpA2ulfbQgAABP__________gmlkgnY0gmlwhCKTScGJc2VjcDI1NmsxoQJNpNUERqKhA8eDDC4tovG3a59NXVOW16JDFAWXoFFTEYhzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A

# Address 2
enr:-MK4QHcS3JeTtVjOuJyVXvO1E6XJWqiwmhLfodel6vARPI8ve_2q9vVn8LpIL964qBId7zGpSVKw6oOPAaRm2H7ywYiGAYmHDeBbh2F0dG5ldHOIAAAAAAAAAACEZXRoMpA2ulfbQgAABP__________gmlkgnY0gmlwhCIgwNOJc2VjcDI1NmsxoQNGVC8JPcsqsZPoohLP1ujAYpBfS0dBwiz4LeoUQ-k5OohzeW5jbmV0cwCDdGNwgjLIg3VkcIIu4A
```

</TabItem>
</Tabs>

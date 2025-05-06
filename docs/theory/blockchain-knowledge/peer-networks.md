---
sidebar_label: "Peer Networks"
sidebar_position: 3
---

# Peer Networks

#### What is a Bootnode?

When a new node connects to the Ethereum network, it needs to know the IP addresses of other nodes on the blockchain to start communicating with them. However, it may not have any prior information about the network, making it difficult to establish these connections.

Here is where the bootnode comes in. A bootnode is a publicly accessible node with a fixed IP address and is always available to accept incoming connections from new nodes. When a new node connects to the bootnode, it sends a message requesting a list of IP addresses of other nodes on the network. The bootnode responds with a list of IP addresses of other nodes it knows about, which the new node can then use to establish connections. When the network is starting, LUKSO will initialize the first bootnode connections.

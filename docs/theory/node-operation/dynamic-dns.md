---
sidebar_label: "Dynamic DNS"
sidebar_position: 9
---

# Dynamic DNS

### 6.11.3 Configure Dynamic DNS

Ideally, you want to have a stable node over a long period. Right now, as I described within the IP address section, the public IP would need adjustment every time it changes. Here is where a Dynamic DNS setup comes into play.

#### What's a DNS Record?

A Domain Name System record is essential to the internet infrastructure, serving as it's phone book. It maintains a directory of domain names and translates them to Internet Protocol addresses. The record is necessary because although domain names are easy for people to remember, computers or machines access websites based on IP addresses. A DNS record is an entry in this directory that maps a domain name to an IP address.

#### What's a Dynamic DNS?

A Dynamic Domain Name System is a service that allows networked devices, such as a node in our case, to update their DNS record whenever their IP address changes. Devices with dynamically assigned IP addresses, like those given out by many ISPs, benefit from such services, as their device's IP address could change daily but needs to stay accessible.

Dynamic DNS can play a crucial role in peer discovery for blockchain networks. In a P2P network, every node must maintain a list of other nodes, e.g., peers it can connect to. If a node's IP address changes, other nodes in the network could have trouble finding it unless they are somehow informed of the new IP address.

That's where dynamic DNS comes in. With dynamic DNS, a node can register a domain name that always points to its current IP address, even if that address changes. When the node's IP address changes, it simply updates its dynamic DNS record, and other nodes in the network can still find it by looking up its domain name.

Dynamic DNS helps maintain the health and connectivity of the P2P network by ensuring that nodes can always find each other, even when their IP addresses are constantly changing.

> There are lots of solutions to handle or manage the topic. You could use your domain and deploy a script there to maintain the record for the device. Another option would be hosting your own Dynamic DNS Service and configuring it via the Cloudflare API on your router. You could also combine those two variants in different ways. However, all those solutions require good technical understanding and the router to support such functionality. I will use a simple and free Dynamic DNS provider.

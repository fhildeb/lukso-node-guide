---
sidebar_label: "7.3 Peer Verification"
sidebar_position: 3
---

# 7.3 Peer Verification

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

**The default value of 50 execution peers was chosen wisely by the network team, as you might run into router bandwidth issues above. Make sure your router is capable of handling higher loads and requests.**

It's not recommended to set your execution peer limit any higher than `100` in grown-out networks. For genesis validators, execution peer counts of `30` would already be enough. Just think about an evenly spread network and how you can favor decentralization while being energy and data efficient.

### 6.11.1 Resolve Low Execution Peer Count

You can check your peer connections of the execution client by running the following command:

```sh
# Geth interface
geth attach http://localhost:8545

# Erigon interface
erigon attach http://localhost:8545
```

Afterward, check the execution peer number by printing the network property:

```text
> net.peerCount
```

The output should look similar to this:

```text
35
```

Type `exit` to close the JSON interface.

If your execution peer count is not improving when running the node for around 4h, check that all the ports are open. You can find a guide within the [Firewall Settings](#).

<!--TODO: ./06-firewall-settings.md-->

> You should always have more than 25 stable peers after a setup time of 4h to 6h.

After opening the port, wait some minutes and recheck your peer count.

If your ports are already open, there seems to be a threshold on your peer count setting. You might want to raise this number. However, I can not explain what might cause this difference in maximum peer count and actual appearing peers.

Open your node's working directory:

```sh
cd <your-node-directory>
```

Stop your currently running clients:

```sh
lukso stop
```

The output should be the following:

```text
# INFO[0000] PID ----- - Execution (geth): Stopped 🔘
# INFO[0000] PID ----- - Consensus (prysm): Stopped 🔘
# INFO[0000] PID ----- - Validator (validator): Stopped 🔘
```

Open your execution client's configuration file:

```sh
### Geth Mainnet Configuration
vim /configs/mainnet/geth/geth.toml

### Geth Testnet Configuration
vim /configs/testnet/geth/geth.toml

### Erigon Mainnet Configuration
vim /configs/mainnet/erigon/erigon.toml

### Erigon Testnet Configuration
vim /configs/testnet/erigon/erigon.toml
```

For Geth, raise the value of the maximum peer connection count like this:

```text
MaxPeers = 100
```

For Erigon, you can do the same like this:

```text
"maxpeers" = 100
```

Restart the client again:

```sh
# Restart Mainnet Validator
lukso start --validator --transaction-fee-recipient "0x1234..."

# Restart Testnet Validator
lukso start --validator --transaction-fee-recipient "0x1234..." --testnet
```

Wait some minutes and check your execution peer count again. You should see it rise. After some hours, you should have a stable connection.

### 6.11.2 Resolve Low Consensus Peer Count

More often, low peer counts are faced by the consensus client. If you are running Prysm, the built-in HTTP API provides an easy way to check all the peers. You can use the following `curl` command to fetch it. However, the plain output will look horrendous. That's why I came up with a quick Python script to check the actual number:

```sh
# Prysm Client
curl -s "http://localhost:3500/eth/v1alpha1/node/peers" | python3 -c "import sys, json; print(len(json.load(sys.stdin)['peers']))"
```

The return should ideally look something like this:

```text
37
```

> You should always have more than 30 stable peers after a setup time of 4h to 6h.

If you can not find any peers and the script returns `0`, or only get a small number below `10`, you can modify the client to use your public static IP address for peer discovery. This public IP is then used to connect and sync with other peers.

Also check how many of those peers are inbound, if you have any:

```sh
# Mainnet
lukso logs consensus

# Testnet
lukso logs consensus --testnet
```

Press `Y` to let the logs show up in your terminal. Search for something like the following line: `activePeers=184 inbound=129 outbound=55`. If your inbound peers are `0`, there is an issue with telling the network how to find your node. Usually, the problem stems from not having your public IP address set within the config files.

#### What's my Public IP Address?

Your public IP address is a unique identifier assigned to your internet connection by your service provider. Every device connected to the public internet is set as an IP address. The public IP address is how a device contacts and communicates with other devices on the internet.

There are two types of public IP addresses: dynamic and static ones. An active IP address changes over time, while a static IP address remains constant. Most residential users are assigned a dynamic IP address, which is subject to change whenever the ISP sees fit. Active assignments are usually done to manage the limited pool of IP addresses available. On the other hand, static IP addresses are typically used for services that require a constant IP address, such as a web server.

Your ISP plays a significant role here because they own the IP addresses they assign to customers. They also maintain the infrastructure that allows your connected devices to communicate with the rest of the internet. Usually, ISPs do not allow regular users to set a static IP address.

For most residential customers, ISPs assign dynamic IP addresses. These IP addresses can change periodically, but the ISP determines the exact frequency. Some ISPs may change the IP address every time you disconnect and reconnect to the internet, for example, by rebooting your router, while others may change it at regular intervals, like every 24 hours or once a week. However, in many cases, the IP address remains the same for long periods unless there's a prolonged disconnection, a network or system update, or a manual reset of the modem or router.

#### Resolving your Public IP Address

We can use a simple IP echo service. Let us make a simple request to ipecho.net over the public internet, and the service will send us back our IP address that was used:

```sh
curl -s https://ipecho.net/plain
```

Save that address or copy it to a text editor. We gonna use it to improve our peer count.

#### Setting your Public IP Address

As a first step, we should tell our public IP address to the consensus client. It's better than nothing and will do the trick. However, in the long run, you won't be able to avoid a more elaborate setup. After all, you don't always want to lose your peers just because the public address has changed and this new address no longer matches the one in the configuration, right?

Navigate into the working directory of your node:

```sh
cd <your-node-directory>
```

Stop your currently running clients:

```sh
lukso stop
```

The output should be the following:

```text
# INFO[0000] PID ----- - Execution (geth): Stopped 🔘
# INFO[0000] PID ----- - Consensus (prysm): Stopped 🔘
# INFO[0000] PID ----- - Validator (validator): Stopped 🔘
```

##### Prysm Consensus File

Open your Prysm configuration file:

```sh
### Prysm Mainnet Configuration
vim /configs/mainnet/prysm/prysm.yaml

### Prsym Testnet Configuration
vim /configs/testnet/prysm/prysm.yaml
```

Now change the following line:

```text
p2p-host-ip: '0.0.0.0'
```

To your public IP address:

```text
p2p-host-ip: '<your-public-ip-address>'
```

##### Lighthouse Consensus File

Open your Lighthouse configuration file:

```sh
# Mainnet Configuration File
vim /configs/mainnet/lighthouse/lighthouse.toml
# Testnet Configuration File
vim /configs/testnet/lighthouse/lighthouse.toml
```

Now, exchange the following sample addresses:

```text
listen-address = "0.0.0.0"
enr-address = "0.0.0.0"
```

With your own public IP addresses:

```text
listen-address = "<your-public-ip-address>"
enr-address = "<your-public-ip-address>"
```

Restart the client again:

```sh
# Restart Mainnet Validator
lukso start --validator --transaction-fee-recipient "0x1234..."

# Restart Testnet Validator
lukso start --validator --transaction-fee-recipient "0x1234..." --testnet
```

After setting your public address, wait some minutes and recheck your consensus peer count. You should see it rise. After some hours, you should have a stable connection.

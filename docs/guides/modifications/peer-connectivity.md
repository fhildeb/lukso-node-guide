---
sidebar_label: "7.3 Peer Connectivity"
sidebar_position: 3
---

# 7.3 Peer Connectivity

<!--TODO: add tip box with link to peer discovery explanation and benefits and drawbacks of changing the value-->

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
cd <lukso-working-directory>
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
cd <lukso-working-directory>
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

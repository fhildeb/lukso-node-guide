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

If your execution peer count is not improving when running the node for around 4h, check that all the ports are open. You can find a guide within the [Firewall Settings](./06-firewall-settings.md).

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

Restart the client again:

```sh
# Restart Mainnet Validator
lukso start --validator --transaction-fee-recipient "0x1234..."

# Restart Testnet Validator
lukso start --validator --transaction-fee-recipient "0x1234..." --testnet
```

After setting your public address, wait some minutes and recheck your consensus peer count. You should see it rise. After some hours, you should have a stable connection.

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

#### Installing NOIP

There are lots of service providers you can choose from. Some of them provide paid services for advanced features. But since we only need a simple record, I went with [NO-IP](https://www.noip.com/). At the point of writing this guide, there are 2 models:

- `free`: You must confirm your Dynamic DNS hostname every month to keep it. You will receive emails with a link to extend the hostname before expiration. Your record will be reset if you do not confirm the link in the mail.
- `paid`: You get your hostname forever

I'm ok with clicking a button from an email once a month. It's a straightforward service.

First, you must register on their page with an email and password. You can also set a hostname already. Choose a name with a `ddns.net` and complete the registration by confirming your email.

To build the no-ip package on our node, we must install a developer library called `build-essential`. It contains references to all the software packages needed to compile and create binary packages, which includes development tools for the programming language C.

Update your package list first:

```sh
sudo apt update
```

Afterward, we can install the package:

```sh
sudo apt install build-essential
```

Get the newest build from NO-IP. Do not use beta tools that may be advertised as the current version and sick to stable software releases. As of May 2023, `Version 2.1.9-1` is the latest stable release.

Move into the source directory:

```sh
cd /usr/local/src/
```

```sh
sudo wget http://www.noip.com/client/linux/noip-duc-linux.tar.gz
```

The output should be similar to this:

```sh
[DATE] [TIME] (11.8 MB/s) - ‘noip-duc_3.0.0-beta.6.tar.gz’ saved [2529997/2529997]
```

After downloading it, we can extract the tape archive using the Ubuntu tool. We will extract (`x`) the tape archive into its previous packaged files (`f`).

```sh
sudo tar xf noip-duc-linux.tar.gz
```

Move into the folder of the extracted tape archive.

```sh
cd noip-2.1.9-1/
```

#### Configuring NOIP

Build the application using the `make` command. You will then be prompted to log in with your No-IP account username and password.

```sh
sudo make install
```

Choose your default Ethernet connection, usually `eno1`. Also, choose an update interval of `5`, which will update your DNS registry every 5 Minutes, so you never lose peer connections. 5 is the highest frequency you can edit. The final output will look like this:

```text
New configuration file '/tmp/no-ip2.conf' created.
```

To configure the client globally, we must run the built executable with the `-C` flag again. It is needed for our service to find the right config file after automatic startups.

```sh
sudo make install -C
```

The application will create a default config file within the user directory. The final output will look like this:

```text
New configuration file '/usr/local/etc/no-ip2.conf' created.
```

> Be careful. One of the questions might be, “Do you wish to update ALL hosts” if you are already using NO-IP with other devices. If answered incorrectly, this could effect hostnames in your account that are pointing at different locations.

Now that the client is installed and configured, you can launch it. Execute this command to launch the client in the background:

```sh
sudo /usr/local/bin/noip2
```

Stop the process again, as we want to enable it on startup. If it is running, we can not configure it as it is running as a forked daemon.

```sh
sudo pkill noip2
```

#### Allow NOIP on Startup

For the program to be started at boot, we will create a system service file for it:

```sh
sudo vim /etc/systemd/system/noip2.service
```

We will set the following properties:

- **Description**: Provides a concise but meaningful explanation of the service used in the configuration
- **Type**: This option configures the process startup type for this service unit. The noip2 software runs as a daemon that forks itself after starting up. The `forking` value tells the system to expect the primary process to return immediately but instead watch the process spawned by noip2.
- **ExecStart**: Specifies the command to run when the service starts. In this case, it's `/usr/local/bin/noip2` as the program folder of NO-IP.
- **Restart**: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached. The `always` value means the service will be restarted regardless of whether it exited cleanly or not.
- **WantedBy**: This option creates a small dependency and starts the service at boot time. If we input `multi-user.target`, we can specify that the software will start when the system is set up for multiple users.

That is the content of the service file:

```text
[Unit]
Description=No-ip.com Dynamic DNS
After=network.target
After=syslog.target
Wants=network-online.target
After=network-online.target

[Install]
WantedBy=multi-user.target
Alias=noip.service

[Service]
ExecStart=/usr/local/bin/noip2
Restart=always
Type=forking
```

#### Starting NOIP as a Service

First, we need to reload the system manager configuration. It is used when making changes to service configuration files or creating new service files, ensuring that the system daemon is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterward, we can start the noip2 service using the system control command:

```sh
sudo systemctl start noip2
```

To enable the noip2 service to start when the system boots, we can use the system control to create a symbolic link as we did before.

```sh
sudo systemctl enable noip2
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/noip.service → /etc/systemd/system/noip2.service.
Created symlink /etc/systemd/system/multi-user.target.wants/noip2.service → /etc/systemd/system/noip2.service.
```

We can fetch the current status from the system control to check if the noip2 service is running and configured correctly. It will display whether it is active, enabled, or disabled and show any recent log entries.

```sh
sudo systemctl status noip2
```

The output should look similar to this:

```text
● noip2.service - No-ip.com Dynamic DNS
     Loaded: loaded (/etc/systemd/system/noip2.service; enabled; vendor preset: enabled)
     Active: active (running) since [DATE] UTC; [TIME] ago
   Main PID: 4387 (noip2)
      Tasks: 1 (limit: 38043)
     Memory: 228.0K
        CPU: 6ms
     CGroup: /system.slice/noip2.service
             └─4387 /usr/local/bin/noip2

[DATE] [TIME] [USER] systemd[1]:  Starting No-ip.com Dynamic DNS
[DATE] [TIME] [USER] noip2[4387]: v2.1.9 daemon started with NAT enabled
[DATE] [TIME] [USER] systemd[1]:  Started No-ip.com Dynamic DNS.
[DATE] [TIME] [USER] noip2[4387]: [DYN_DNS_NAME] was already set to [PUBLIC_IP].
...
```

#### Complete NOIP Setup

Make sure to complete the setup by logging into your NOIP account again. Please set 2FA, a username, and a security question to protect against malicious actors. In the `My Services` section, copy your hostname, as we need it in the next step.

#### Set Dynamic DNS Hostname in Config

Now that everything is configured in the right way, we can set the hostname into the config file of the consensus client.

Navigate into your node's working directory:

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

Open your Prysm configuration file:

```sh
### Prysm Mainnet Configuration
vim /configs/mainnet/prysm/prysm.yaml

### Prsym Testnet Configuration
vim /configs/testnet/prysm/prysm.yaml
```

Now add the following line, including your hostname of the Dynamic DNS:

```text
p2p-host-dns: '<your-hostname-address>'
```

Comment the old ip property out by putting a hash in front of it:

```text
#p2p-host-ip: '<your-host-ip>'
```

Restart the client again:

```sh
# Restart Mainnet Validator
lukso start --validator --transaction-fee-recipient "0x1234..."

# Restart Testnet Validator
lukso start --validator --transaction-fee-recipient "0x1234..." --testnet
```

After setting your public address, wait some minutes to recheck your peer count. You should see it rise. After some hours, you should have a stable connection.

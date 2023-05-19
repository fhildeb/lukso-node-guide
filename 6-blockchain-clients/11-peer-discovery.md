### 6.11 Peer Discovery

In a blockchain network, peers are individual nodes that participate in the network and play a crucial role in its functioning. These nodes can have different roles depending on the type of blockchain, but they all work collectively to maintain and validate the shared ledger.

One of the fundamental characteristics of a blockchain is decentralization, which is achieved through a network of peers distributed across different geographic locations. Each peer maintains a copy of the entire blockchain and validates new transactions and blocks according to the protocol rules. This ensures the integrity and security of the blockchain, as it makes it very difficult for any single entity to tamper with the data on the blockchain.

The process of peers communicating with each other is known as peer-to-peer networking. In a P2P network, there is no central server. Instead, each node or peer is equal and can act both as a client and a server. The P2P communication process involves sharing data directly between systems on a network, enabling data to be shared directly from the source peer to the destination peer.

In the context of a blockchain network like Ethereum, peers validate transactions and blocks, ensuring they comply with network rules before they are added to the blockchain. Peers propagate valid transactions and blocks to other peers in the network, ensuring all peers have the same data and maintain the consensus of the network. They play an integral role in the decentralized and trustless nature of blockchain technology.

### 6.11.1 Resolve Low Consensus Peer Count

You can check your execution client's peer connections by running the following command:

```sh
# Geth interface
geth attach http://localhost:8545

# Erigon interface
erigon attach http://localhost:8545
```

Afterwards, check the execution peer number by printing the network property:

```text
> net.peerCount
```

The output should look similar to this:

```text
35
```

Type `exit` to close the JSON interface.

If your execution peer count is not improving when running the node for around 4h, check that all the necessary ports are open. You can find a guide within the [Firewall Settings](./06-firewall-settings.md).

> You should always have more than 30 stable peers after a setup time of 4h to 6h.

After opening the port, wait some minutes check your peer count again. You should see it rise. After some hours, you should have a stable connection.

### 6.11.2 Resolve Low Consensus Peer Count

More often, low peer counts are faced by the consensus client. If you're running Prysm, the built-in HTTP API does provide a easy way to check all the peers. You can use the following `curl` command to fetch it. However, the plain output will look horrendous. Thats why I came up with a quick Python script to check the actual number:

```sh
# Prysm Client
curl -s "http://localhost:3500/eth/v1alpha1/node/peers" | python3 -c "import sys, json; print(len(json.load(sys.stdin)['peers']))"
```

The return should idealy look something like this:

```text
37
```

> You should always have more than 30 stable peers after a setup time of 4h to 6h.

If you can not find any peers and the script returns `0` , or only get a small number below `10`, you can modify the client to use your public static IP address for peer discovery. This public IP is then used to connect and sync with other peers.

#### Whats my Public IP Address?

Your public IP address is a unique identifier assigned to your internet connection by your Internet Service Provider. Every device connected to the public Internet is assigned an IP address, and its public IP address is how a device contacts and communicates with the rest of the devices on the Internet.

There are two types of public IP addresses: dynamic and static ones. A dynamic IP address changes over time, while a static IP address remains constant. Most residential users are assigned a dynamic IP address, which is subject to change whenever the ISP sees fit. This is usually done to manage the limited pool of IP addresses available. On the other hand, static IP addresses are typically used for services that require a constant IP address, such as a web server.

Your ISP plays a significant role here because they own the range of IP addresses they assign to their customers. They also maintain the infrastructure that allows your Internet-connected devices to communicate with the rest of the Internet. Usually, ISPs do not allow regular users to set a static IP address.

For most residential customers, ISPs assign dynamic IP addresses. These IP addresses can change periodically, but the exact frequency is determined by the ISP. Some ISPs may change the IP address every time you disconnect and reconnect to the internet, for example, rebooting your router, while others may change it at regular intervals like every 24 hours or once a week. However, in many cases, the IP address remains the same for long periods unless there's a prolonged disconnection, a network or system update, or a manual reset of the modem or router.

#### Resolving your Public IP Address

We can use a simple IP echo service. Let us make a simple request to ipecho.net over the public internet and the service will send us back our IP address that was used:

```sh
curl -s https://ipecho.net/plain
```

Save that address or copy it to a text editor. We gonna use it to improve our peer count.

#### Setting your Public IP Address

As a first step, we should tell our public IP address to the consensus client. It's better than nothing and will do the trick. However, in the long run, you won't be able to avoid a more elaborate setup. After all, you don't always want to lose your peers just because the public address has changed and this new address no longer matches the one in the configuration, right?

Navigate into your working directory of your node:

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

After setting your public address, wait some minutes check your peer count again. You should see it rise. After some hours, you should have a stable connection.

### 6.11.3 Configure Dynamic DNS

Idealy, what you want is to have a stable node over a long period of time. Right now, as I described within the IP address section, the public IP would need adjustment every time it would change. Here is where a Dynamic DNS setup comes into play.

#### Whats a DNS Record?

A Domain Name System record is an essential part of the internet's infrastructure, serving as the internet's phone book. It maintains a directory of domain names and translates them to Internet Protocol addresses. This is necessary because although domain names are easy for people to remember, computers or machines access websites based on IP addresses. A DNS record is simply an entry in this directory that maps a domain name to an IP address.

#### Whats a Dynamic DNS?

A Dynamic Domain Name System is a service that allows networked devices, such as a nodes in our case, to update their DNS record whenever their IP address changes. This is particularly useful for devices that have dynamically assigned IP addresses, like those given out by many ISPs, where the device's IP address could change from day to day.

Dynamic DNS can play a crucial role in peer discovery for blockchain networks. In a P2P network, every node needs to maintain a list of other nodes, or peers, that it can connect to. If a node's IP address changes, other nodes in the network could have trouble finding it unless they are somehow informed of the new IP address.

That's where dynamic DNS comes in. With dynamic DNS, a node can register a domain name that always points to its current IP address, even if that address changes. When the node's IP address changes, it simply updates its dynamic DNS record, and other nodes in the network can still find it by looking up its domain name.

This helps to maintain the health and connectivity of the P2P network by making sure that nodes can always find each other, even when their IP addresses are constantly changing.

#### Installing NOIP

There are lots of service providers you can choose, some of them provide paid services for advanced features. But since we only need a simple record, I went with [`no-ip`](https://www.noip.com/). At the point of writing this guide, there are 2 models:

- `free`: You must confirm your Dynamic DNS hostname every month, in order to keep it. You will receive emails with an link to extend the hostname prior to the expiration date. If you do not confirm the link in the mail, your record will be reset.
- `paid`: You get your hostname forever

I'm ok with clicking a button from an email with once a month. It's a good and simple service.

First you will have to register on their page with an email and password. You can also set an hostname already. Choose a name with a `ddns.net` and complete the registration by confirming your email.

In order to build the no-ip package on our node, we will have to install a developer library called `build-essential`. It contains references to all the packages needed to compile and create binary packages, which includes development tools for the programming language C.

Update your package list first:

```sh
sudo apt update
```

Afterwards, we can install the package:

```sh
sudo apt install build-essential
```

Get the newest build from `no-ip`. Do not use any beta tools that may be advertised as current version and sick to stable software releases. As of May 2023, `Version 2.1.9-1` is the latest stable release.

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

After it has been downloaded, we can extract the tape archive using the related Ubuntu tool. We're going to extract (`x`) the archive into its previous packaged files (`f`).

```sh
sudo tar xf noip-duc-linux.tar.gz
```

Move into the folder

```sh
cd noip-2.1.9-1/
```

#### Configuring NOIP

Build the application using the `make` command. You will then be prompted to log in with your No-IP account username and password.

```sh
sudo make install
```

Choose your default Ethernet connection, usually `eno1`. Also choose an update interval of `5` which will update your DNS registry every 5 Minutes, so you never really loose peer connections. 5 is the highest frequency you can update. This will be the final output:

```text
New configuration file '/tmp/no-ip2.conf' created.
```

To configure the client globally, we will have to run the built executable with the `-C` flag once again. This will create a default config file within the user directory. The final output will look like this:

> Be careful, one of the questions might be “Do you wish to update ALL hosts” if you are already using NO-IP with other devices. If answered incorrectly, this could effect hostnames in your account that are pointing at other locations.

```text
New configuration file '/usr/local/etc/no-ip2.conf' created.
```

Now that the client is installed and configured, you just need to launch it. Simply issue this final command to launch the client in the background:

```sh
sudo /usr/local/bin/noip2
```

Make sure to stop the process again, as we want to make sure to enable it on startup. If it is running, we can not configure it as it is running as a forked deamon.

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
- **Type**: This option configures the process start-up type for this service unit. The noip2 software runs as a deamon that forks itself after starting up. The `forking` value tells the system to expect the main process to return immediately but instead watch the process spawned by noip2.
- **ExecStart**: Specifies the command to run when the service starts. In this case, it's `/usr/local/bin/noip2` as program folder of NO-IP.
- **Restart**: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached. The `always` value means the service will be restarted regardless of whether it exited cleanly or not.
- **WantedBy**: This option creates a small dependency and makes the service get started at boot time. If we input `multi-user.target` we can specify that the service will start when the system is set up for multiple users. In our case, every Exporter service will have its own user, kinda fitting the description.

This will be the content:

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
# Start main service
ExecStart=/usr/local/bin/noip2
Restart=always
Type=forking
```

#### Starting NOIP as Service

First we need to reload the system manager configuration. It is used when making changes to service configuration files or create new service files, ensuring that systemd is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterwards we can start the noip2 service using the system control command:

```sh
sudo systemctl start noip2
```

To enable the noip2 service to start automatically when the system boots we can use the system control to creates a symbolic link as we did before.

```sh
sudo systemctl enable noip2
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/noip.service → /etc/systemd/system/noip2.service.
Created symlink /etc/systemd/system/multi-user.target.wants/noip2.service → /etc/systemd/system/noip2.service.
```

To check if the noip2 service is running and configured properly, we can fetch the current status from the system control. It will display whether it is active, enabled, or disabled, and show any recent log entries.

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

[DATE] [DATE] [USER] systemd[1]:  Starting No-ip.com Dynamic DNS
[DATE] [DATE] [USER] noip2[4387]: v2.1.9 daemon started with NAT enabled
[DATE] [DATE] [USER] systemd[1]:  Started No-ip.com Dynamic DNS.
[DATE] [DATE] [USER] noip2[4387]: [DYN_DNS_NAME] was already set to [PUBLIC_IP].
...
```

#### Complete NOIP Setup

Make sure to complete the setup by logging into your NOIP account again. Set 2FA, a username and set a security message to be protected against malicious actors. Within the `My Services` section, copy your hostname as we will need it in the next step.

#### Set Dynamic DNS Hostname in Config

Now that everything is configured in the right way, we can set the hostname into the config file of the consensus client.

navigate into your node's working directory:

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

Now add the the following line including your hostname of the Dynamic DNS:

```text
p2p-host-dns: '<your-hostname-address>'
```

Comment the old ip property out, by putting a hash in front of it:

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

After setting your public address, wait some minutes check your peer count again. You should see it rise. After some hours, you should have a stable connection.

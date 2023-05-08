# 4. Router Configuration

With all the changes for remote access, we must of course also configure the router. The router is the intermediary for data exchange in the home network and all data is sent or allowed through it.

#### Internet Protocoll Addresses

When devices connect to a home network, they are usually assigned dynamic Internet Protocol addresses by the router through a Dynamic Host Configuration Protocol. It's a network protocol that automates the process of assigning IP addresses and other network configuration information to devices connected to a network. DHCP eliminates the need for manual configuration of IP addresses, making it easier to connect devices to a network and manage them efficiently.

When a device joins a network, it sends a request to the router, asking for an address and other network settings. The DHCP software on the router then assigns an available IP address from its pool to the device, along with the required network configuration. This IP address is leased to the device for a specific duration, after which the device needs to renew the lease or obtain a new IP address. However, this also means that devices can change their IP addresses over time, making it difficult to consistently access your node through SSH.

## 4.1 Node Address Checkups

Since many routers use different software, we first make sure that we are reading the node's connection data correctly before making any substantial changes to the router.

### 4.1.1 Resolve the Node's IP Address

The `ip` command is a versatile and powerful networking tool in Linux, used to manage and display information about network interfaces, IP addresses, and other network-related configurations. We can use the command to display the default route information in the routing table of a Linux system. The default route, also known as the gateway, is the network path used by the system to send packets to destinations that are not on the local network. In simpler terms, it is the route that the system takes when it needs to send data to an IP address outside its local network.

```sh
ip route show default
```

The output will look like this:

```sh
default via <GATEWAY_IP_ADDRESS> dev eno1 proto dhcp src <NODE_IP_ADDRESS> metric <ROUTING_WEIGHT>
```

Alternatively you can also send an request to a commonly used and stable server IP, for instance Google. You will get back an response with your source IP address that you can filter using the text-processing tool `awk`, used for pattern scanning and processing.

```sh
ip route get 8.8.8.8 | awk '{print $7}'
```

### 4.1.2 Resolve the Node's Hardware Address

#### Media Access Controll

A MAC address is a unique identifier assigned to network interfaces for communication on a physical network segment. It is also commonly referred to as a hardware or physical address. MAC addresses are used at the data link layer, enabling network devices such as switches and routers to uniquely identify and manage devices on a local network.

Each MAC address is a 48-bit number, usually represented in a human-readable hexadecimal format, including a specific manufacturer registration code and individual product lineup iterations by the manufacturer to ensure that each network interface produced by the company has a unique MAC address.

We can use the previous networking tool to retrieve information about the MAC addresses

```sh
ip link show
```

The output will list all the network interfaces on the system. Look into the interface that is used to broadcast and send information to the outside world using an Ethernet connection. The entry you're looking for looks like this:

```sh
<NETWORK_INFERFACE_NAME>: <BROADCAST,MULTICAST,UP,LOWER_UP> ...
    link/ether <MAC_ADDRESS> brd <BROADCAST_ADDRESS>
```

**Write down or remember both names so you can check them later on and identify your device for router settings.**

## 4.2 Address Reservation

To avoid connectivity issues, it's recommended to assign a static IP address or reserve an IP address for your node in your home network. A reserved IP address ensures that the node will always use the same IP address, making it easier to configure port forwarding, firewall rules, and other networking settings.

> **Let the node sit aside and change back to your regular computer.**

### 4.2.1 Log into your Router's Web Interface

Open a web browser and enter the router's IP address or web address. You'll be prompted to enter your router's admin username and password. If you haven't changed them, check your router's documentation or label for the default credentials.

### 4.2.2 Locate the Dynamic Host Settings

In your router's web interface, navigate to the section related to DHCP settings. This section is usually found under `LAN` or `local network` settings. In more consumer friendly machines like mine, it could be found in:

`Home Network` > `Network` > `Connections`

### 4.2.3 Enter the IP Assignment Options

Look for a feature that allows you to reserve or assign static IP addresses. This might be called `IP address reservation`, `Static IP assignment`, `Fixed IP assignment`, or something similar.

Click on the option to add a new IP address reservation or assignment. You'll be prompted to enter the device's MAC address and the desired static IP address. In modern firmwares, you can write down the IP address that is currently already picked. Just write down the addresses you've noted from the previous steps.

> If you want to assign a totally new IP address, make sure to choose an IP address within your router's IP address range and outside the range of IP addresses automatically assigned by the DHCP server to prevent conflicts.

On my end, I found the settings within:

`Connections` > `Device`

After clicking on my node's device name, I could set a new static IP assignment by ticking the box for the `Always assign this network device the same IPv4 address` option. A new section advanced connection window appeared, that let me customize the IP address. However, I left the IP that was already assigned.

### 4.2.4 Apply and Save

Make sure to double check that both, IP and MAC address are showing up correctly on the router's interface.

> If you manually entered the device's MAC address and the desired static IP address, your router may require a reboot for the changes to take effect.

Apply the changes and log out of your router.

### 4.2.5 Verify the IP Assignment

If you just applied the same IP address as static property, everything should have worked on the fly.

> In case of the manual input, wait for the router reboot and restart your node.

Verify that your static IP address is set up as wished using the same commands as before:

- **Local check, looking up the second address:**

```sh
ip route show default
```

- **Online check, fetching the requests source address:**

```sh
ip route get 8.8.8.8 | awk '{print $7}'
```

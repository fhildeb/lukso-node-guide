## 4.1 Node Address Checkups

Since many routers use different software, we first make sure that we are reading the node's connection data correctly before making any substantial changes to the router.

#### Internet Protocoll Addresses

When devices connect to a home network, they are usually assigned dynamic Internet Protocol addresses by the router through a Dynamic Host Configuration Protocol. It's a network protocol that automates the process of assigning IP addresses and other network configuration information to devices connected to a network. DHCP eliminates the need for manual configuration of IP addresses, making it easier to connect devices to a network and manage them efficiently.

When a device joins a network, it sends a request to the router, asking for an address and other network settings. The DHCP software on the router then assigns an available IP address from its pool to the device, along with the required network configuration. This IP address is leased to the device for a specific duration, after which the device needs to renew the lease or obtain a new IP address. However, this also means that devices can change their IP addresses over time, making it difficult to consistently access your node through SSH.

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

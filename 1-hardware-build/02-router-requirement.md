## 1.2 Router Requirements

When setting up a blockchain node, the choice of the router can play a crucial role in ensuring optimal performance and reliability.

> Before I wanted to set up a node system, I only used routers you can get from your network provider for free. The prior device did not work at all. The node could not connect despite proper router configuration, packets were rejected, and the bandwidth dropped so enormously that no other device could connect to the internet or the device hung up. Then I bought a professional router, and it worked immediately.

There are several factors to consider when selecting a router for running a blockchain node:

- **Network Stability and Performance**: A high-quality router will provide better network stability and performance during high load, reducing the chances of dropped connections, bottlenecking, or slow data transfer speeds. Load capacity is essential for a blockchain node, as consistent communication with other nodes is essential for maintaining the integrity of the blockchain. Choose a router with a good chipset that can cover the server load.
- **Quality of Service Support**: A router with QoS support allows you to prioritize traffic for your blockchain node over other devices on the network. Prioritized bandwidth ensures the node gets the necessary bandwidth and minimizes delays in processing transactions and communicating with other nodes.
- **Port Forwarding and Firewall**: Blockchain nodes often require specific ports to be opened for incoming and outgoing connections. Make sure the router allows for easy configuration of port forwarding and firewall rules to accommodate the requirements of your particular blockchain network.
- **Gigabit Ethernet Support**: Routers with Gigabit Ethernet support can provide faster-wired connection speeds and benefit a blockchain node that needs to process and quickly transmit large amounts of data.
- **IPv6 Support**: As the internet transitions from IPv4 to IPv6, it's essential to have a router that supports IPv6 to ensure future compatibility and optimal performance for your blockchain node.
- **VPN Support**: Some blockchain networks may require or recommend a VPN for added security and privacy. Ensure that the router supports VPN connections through built-in functionality or compatibility with third-party VPN services.
- **Firmware Updates and Security**: Choose a router from a reputable manufacturer that provides regular firmware updates and security patches. Being up-to-date ensures your router utilizes the latest features and security improvements.
- **DynDNS**: If you want to provide your own dynamic DNS record for peer connections, you could set it up within your router. Here, you would not have to fall back to external services.

In Germany, the manufacturer AVM is rated relatively high in quality, user interface, warranty length, and performance. I chose one of the higher-end routers in their product lineup with fiber optic and WiFi mesh support for higher WiFi ranges.

**Router**: Fritzbox 7590 AX (Gigabit LAN, Fiber Support, WiFi 6)

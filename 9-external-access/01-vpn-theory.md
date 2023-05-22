# 9.1 VPN Theory

For External Access to my node, I'm using Tailscale. Tailscale is a technology that creates a secure network of your devices with an internet connection. It works as if they were all connected on the same local network utilizing [WireGuard](https://www.wireguard.com/).

## Virtual Private Networks

A VPN is a technology that creates a secure and encrypted connection over a less secure network, such as the global internet. VPNs protect your internet traffic from snooping, interference, and censorship but can also help build secure connections between devices or institutions.

VPNs work by establishing a secure "tunnel" through which your data passes back and forth between your device and the VPN server. This server can be located anywhere in the world. All data passing through the tunnel is encrypted to ensure it remains confidential, even if intercepted.

## WireGuard

WireGuard is an open-source VPN protocol designed for simplicity and speed using state-of-the-art cryptography within the VPN protocol landscape. Some key advantages of the WireGuard protocol over others include the following:

- **Simplicity**: WireGuard aims to be as easy to configure and deploy as SSH. Its codebase is much smaller than most other VPN protocols, making it easier to audit for security vulnerabilities.
- **Speed**: WireGuard has been designed to offer high speeds. It uses modern, high-speed cryptographic primitives.
- **Security**: WireGuard uses modern and secure cryptographic algorithms. It also includes several features to enhance security, such as perfect forward secrecy, which ensures that past communication cannot be decrypted, even if a private key is compromised in the future.
- **Compatibility**: WireGuard can be used on various operating systems, including Windows, MacOS, Linux, iOS, and Android.

## Tailscale

Tailscale simplifies creating a Virtual Private Network (VPN) by removing the need to manage and configure the network settings on each device manually. The configuration is managed centrally, allowing the network to adapt as devices join or leave the network.

Here's how it works:

- **Identity-Based Networking**: Tailscale uses your existing identity provider to ensure only authorized users/devices can access your network. It also allows you to set access rules based on the user's identity.
- **WireGuard Protocol**: Tailscale is built on top of WireGuard, a modern VPN protocol known for its simplicity, performance, and security. It establishes a secure, encrypted channel between the devices.
- **Peer-to-Peer Connections**: Tailscale uses NAT traversal techniques to establish direct, peer-to-peer connections between devices whenever possible, even if they are behind firewalls or routers. Continuous device connections help to minimize latency and improve connection speed.
- **Zero Configuration**: Tailscale configures the IP addresses and manages the routing tables in the background. Such an onboarding means creating a secure, peer-to-peer network without manually configuring each device.
- **Central Control Panel**: You can monitor and manage your network from a centralized control panel, allowing you to see what devices are connected, manage access rights, and more.

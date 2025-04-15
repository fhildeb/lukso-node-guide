---
sidebar_label: "VPN Tunnel"
sidebar_position: 7
---

<!--TODO: Rewrite SSH chapter-->

### 1.3.8 SSH Setup

Add the openSSH server installation for secure remote access in the next step. The Open Secure Shell is a suite of safe networking utilities. It enables encrypted communication and fast data transfer between two networked devices, providing a secure alternative to traditional, non-encrypted protocols. openSSH server is widely used for remote administration, secure file transfers, and executing commands on remote systems.

The server-only variant will only allow the connection to the node, not the functionality for the node also to set up a client- which is lean and ideal for a node setup that only wants external devices to connect for maintenance.

In the context of a blockchain node setup, an OpenSSH server offers several key advantages that make it a valuable component:

- **Secure remote access**: It allows you to remotely access and manage your node using a secure, encrypted connection. Remote access is crucial for maintaining the confidentiality and integrity of your data and commands, mainly when operating the node in a data center, cloud environment, or across untrusted networks.
- **Command-line interface**: It provides a command-line interface for managing your node, which is the preferred method for administering server-based systems like Ubuntu Server. The command-line interface allows for efficient and scriptable management of your node.
- **Key-based authentication**: It supports public key authentication, which is more secure than password-based authentication. By using key pairs, you can enhance the security of your node by ensuring that only authorized users with the correct private key can access it.
- **Port forwarding and tunneling**: It enables port forwarding and tunneling, which can help secure other network services and create encrypted data-transfer tunnels. Such external software can ensure secure communication between your node and other components of the blockchain network or related services.
- **Extensive compatibility**: openSSH server is widely supported across various platforms and operating systems, making integrating into a diverse range of node and client setups easy.

# VPN Tunnel

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

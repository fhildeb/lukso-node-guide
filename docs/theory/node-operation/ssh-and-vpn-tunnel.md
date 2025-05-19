---
sidebar_label: "SSH and VPN Tunnel"
sidebar_position: 11
---

# SSH and VPN Tunnel

Having a remote blockchain node generally requires secure and persistent access during maintenance. This page covers the SSH service and VPN tunnels, essential tools for maintaining encrypted, remote connections to allow secure management, monitoring, and interaction with your node from anywhere in the world.

:::tip

A detailed guide about remote access can be found within the [SSH Setup](/docs/guides/ssh-setup/initialization.md) and [Tailscale](/docs/guides/external-access/tailscale.md) pages of the [**📖 Guide**](/docs/guides/validator-setup/precautions.md) section.

:::

## SSH Service

Open Secure Shell software allows secure communication and high-speed data transfer among two networked devices. It is a necessary tool for remote management, secure file transfer, and executing shell commands over an assured channel. In a blockchain context, running an OpenSSH server on one's node allows secure management from outside networks and is especially beneficial with cloud-based setups or when reaching the homenetwork while travelling.

| Feature                                        | Description                                                                                                                                                                            |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Secure Remote Access** </nobr>        | Enables encrypted, remote access, which is crucial when your node is permanently hosted at home or on a cloud-based server but requires maintenance from a different location.         |
| <nobr> **Command-Line Interface** </nobr>      | Provides terminal-level management, perfect for minimal servers like Ubuntu that are primarily controlled via shell and don't have any peripherals connected to their machines.        |
| <nobr> **Key-Based Authentication** </nobr>    | It uses public and private keys instead of passwords, making unauthorized access from anywhere in the world significantly more difficult, as only specific devices are allowed access. |
| <nobr> **Port Forwarding & Tunneling** </nobr> | It offers strong support for secure tunnels, which allow users to reach other services, like RPC ports or local dashboards, using encrypted connections for data security and privacy. |
| <nobr> **Extensive Compatibility** </nobr>     | It works across all operation systems or even ARM-based devices. High interoperability allows unified access, even if you are restricted to devices while travelling.                  |

## VPN Tunnel

A Virtual Private Network creates an encrypted tunnel between a remote device and your device even through untrusted networks like the internet or wireless hotspots. VPNs are beneficial when secure ongoing access to a server is needed without exposing it publicly and protect against:

- Spying on unencrypted traffic or packages
- IP-based censorship or filtering
- Geographic routing restrictions
- Unreliable or changing IP addresses

## WireGuard

WireGuard is a next-generation VPN protocol that is a sophisticated virtual private networking technology. It is highly valued for its ease of use, strong security features, and high-speed performance.

:::info

Unlike older VPN stacks like [🍊 OpenVPN](https://github.com/OpenVPN/openvpn) or [🌐 IPSec](https://github.com/hwdsl2/setup-ipsec-vpn), [🐉 WireGuard](https://github.com/WireGuard/wireguard-linux) has modern cryptography and minimal requirements.

:::

| Feature                          | Description                                                                                                                                               |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Simplicity** </nobr>    | Minimal configuration. Easier to set up and audit due to a smaller codebase compared to other VPN protocols.                                              |
| <nobr> **Speed** </nobr>         | High-performance protocol using modern [ChaCha20](https://en.wikipedia.org/wiki/ChaCha20-Poly1305) cryptography with lower latency and better throughput. |
| <nobr> **Security** </nobr>      | Strong encryption with [Perfect Forward Secrecy](https://en.wikipedia.org/wiki/Forward_secrecy) while only built upon widely peer-reviewed protocols.     |
| <nobr> **Compatibility** </nobr> | Cross-platform support for Linux, Windows, macOS, iOS, Android, and routers.                                                                              |

## Tailscale

Tailscale is a free identity-based VPN service, simplifying the creation of secure peer-to-peer connections between devices without having to deal with additional keys, IP addresses, or firewall rules. Its well-suited at linking personal or team devices in one private network, without the need to open ports or manually operate a VPN protocol.

| Feature                                      | Description                                                                                                                                                                      |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Identity-Based Networking** </nobr> | Authenticates users via [Google](https://www.google.com/), [GitHub](https://www.github.com/), or [Microsoft](https://www.microsoft.com/) to configure access rules aside of IPs. |
| <nobr> **WireGuard Protocol** </nobr>        | All connections are encrypted using the [WireGuard](https://github.com/WireGuard/wireguard-linux) protocol for performance and security.                                         |
| <nobr> **Peer-to-Peer Connections** </nobr>  | Uses [NAT Traversal](https://en.wikipedia.org/wiki/NAT_traversal) for direct streams to reduce latency behind behind intermediate firewalls.                                     |
| <nobr> **Zero Configuration** </nobr>        | Devices are automatically assigned internal IPs and routing without manual setup.                                                                                                |
| <nobr> **Central Control Panel** </nobr>     | Web-based dashboard for monitoring, revoking access, and managing devices.                                                                                                       |
| <nobr> **Cross-Platform Support** </nobr>    | Connect across Windows, macOS, Linux, Android or iOS using related clients or apps.                                                                                              |

:::info

Alternative VPN software would be [🈸 ZeroTier](https://www.zerotier.com) and [🛡️ OpenVPN](https://openvpn.net/community/), both with compromises in ease of use and platform support.

:::

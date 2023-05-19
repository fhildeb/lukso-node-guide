# 9 External Access

For External Access for my node, I'm using Tailscale. Tailscale is a technology that creates a secure network of your devices with an internet connection. It works, as if they were all connected on the same local network utilizing [WireGuard](https://www.wireguard.com/).

## Into Tailscale

Tailscale simplifies the process of creating a Virtual Private Network (VPN) by removing the need to manually manage and configure the network settings on each device. The configuration is managed centrally, allowing the network to adapt as devices join or leave the network.

Here's how it works:

- **Identity-Based Networking**: Tailscale uses your existing identity provider to ensure only authorized users/devices can access your network. It also allows you to set access rules based on the user identity.
- **WireGuard Protocol**: Tailscale is built on top of WireGuard, a modern VPN protocol known for its simplicity, performance, and security. It establishes a secure, encrypted channel between the devices.
- **Peer-to-Peer Connections**: Tailscale uses NAT traversal techniques to establish direct, peer-to-peer connections between devices whenever possible, even if they are behind firewalls or routers. This helps to minimize latency and improve connection speed.
- **Zero Configuration**: Tailscale takes care of configuring the IP addresses and managing the routing tables. This means you can create a secure, peer-to-peer network without needing to manually configure each device.
- **Central Control Panel**: You can monitor and manage your network from a centralized control panel, allowing you to see what devices are connected, manage access rights, and more.

### Virtual Private Networks

A VPN, is a technology that creates a secure and encrypted connection over a less secure network, such as the internet. VPNs are used to protect your internet traffic from snooping, interference, and censorship but can also help building secure connections between devices or institutions.

VPNs work by establishing a secure "tunnel" through which your data passes back and forth between your device and the VPN server. This server can be located anywhere in the world. All data passing through the tunnel is encrypted to ensure it remains confidential, even if intercepted.

### WireGuard

WireGuard is an open-source VPN protocol designed for simplicity and speed using state-of-the-art cryptography. Some key advantages of the WireGuard protocol over others include:

- **Simplicity**: WireGuard aims to be as easy to configure and deploy as SSH. Its codebase is much smaller than that of most other VPN protocols, making it easier to audit for security vulnerabilities.
- **Speed**: WireGuard has been designed to offer high speeds. It uses modern, high-speed cryptographic primitives.
- **Security**: WireGuard uses modern and secure cryptographic algorithms. It also includes a number of features to enhance security, such as perfect forward secrecy, which ensures that past communication cannot be decrypted, even if a private key is compromised in the future.
- **Compatibility**: WireGuard can be used on various operating systems, including Windows, MacOS, Linux, iOS, and Android.

## Setup

Visit [Tailscale](https://tailscale.com/) and register for the service. It is an free service for a limited amount of users and devices. After logging in with your favorite identity provider, you will be promted to connect your first two devices. Click on `Linux` to connect your node. On your node, install the Tailscale package using `curl`. The `-fsSL` options instruct curl to silently follow HTTP redirects, not output any content for error HTTP codes, but still display error messages if the operation fails. This is needed for the pipe, as the script gets executed right after it is fetched.

```sh
curl -fsSL https://tailscale.com/install.sh | sh
```

You will receive a printed out link that you will have to copy and paste into the address bar of your personal machine. Do so and connect with your previously created account. Your first device has been added.

Now continue with the second device. The Guide on the Tailscale screen will give you a selection of possible installations. Install the software on your main device and go through the minimal setup to log in. Now, everything should already be set up in place. In the guide section, you can try it out by pinging each device over the VPN.

## Configure Auto Startup

Tailscale comes with its own CLI tool called `tailscaled`. By default, it will automatically list itself as an system service. We can check the status of Tailscale with the following command:

```sh
systemctl status tailscaled
```

The output should be something similar to the following:

```text
● tailscaled.service - Tailscale node agent
     Loaded: loaded (/lib/systemd/system/tailscaled.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2023-05-19 20:01:42 UTC; 3h 19min ago
       Docs: https://tailscale.com/kb/
   Main PID: 1005 (tailscaled)
     Status: "Connected; voulex.4128@gmail.com; 100.87.208.19 fd7a:115c:a1e0:ab12:4843:cd96:6257:d013"
      Tasks: 17 (limit: 38043)
     Memory: 40.6M
        CPU: 1min 29.134s
     CGroup: /system.slice/tailscaled.service
             └─1005 /usr/sbin/tailscaled --state=/var/lib/tailscale/tailscaled.state --socket=/run/tailsc>

[DATE] [TIME] [USER] tailscaled[4974]: control: NetInfo: NetInfo{varies=false hairpin=false ipv6=true ipv>...
```

It should already be configured to start up on boot or failure but we can check once again:

```sh
sudo systemctl enable tailscale
```

In case it was not properly set up, it should've created a `symlink` and printed out the filenames.

You should be set and can turn off the VPN service until you need to connect with your node from outside your home environment.

---
sidebar_label: "3.6 Firewall Configuration"
sidebar_position: 6
---

# 3.6 Firewall Configuration

## 3.6 Configure Firewall

Now we need to enable ssh in the firewall by allowing incoming connections to the previously configured port.

#### Uncomplicated Firewall

UFW is a user-friendly command-line interface for managing firewall configurations on Linux systems. It simplifies configuring and maintaining a firewall by providing intuitive commands and options. UFW streamlines the process of setting up and managing firewall rules.

### 3.6.1 General Port Locking

All outgoing traffic should be enabled by default, as the node should send data packages into the network. However, all incoming traffic should be disabled as we do not know who wants to connect with the node.

```sh
sudo ufw default allow outgoing
sudo ufw default deny incoming
```

### 3.6.2 Enable SSH Connection

If you allow for just the port number, both TCP and UDP protocols will be possible. However, the User Datagram Protocol is connectionless. It offers faster data transmission but does not guarantee reliable, ordered, or error-checked delivery.

#### TCP Forcing

For SSH connections, it is recommended only to allow TCP. SSH uses the TCP protocol for its connections because it relies on reliable and error-checked data transmission. Therefore, TCP is more secure and appropriate for SSH connections instead of leaving the port open to all protocols.

We use UFW to allow SSH connections and change `<desired-port-number>` to your port.

```sh
sudo ufw allow <desired-port-number>/tcp
```

#### Internet Protocol Versioning

The Internet Protocol is responsible for identifying and locating network devices and routing traffic across the internet.

If you enabled both IPv6 and IPv4 during the installation of your node, the command would print out that a rule was added for `v6` connections.

The `v6` suffix in the UFW rules indicates that the rule is applied to IPv6 network traffic. Internet Protocol version 6 is the most recent version of the Internet Protocol. Basic port rules, without any suffix, apply to IPv4 network traffic, the previous version 4.

Both are widely used. The primary differences between IPv4 and IPv6 are their address space, addressing mechanisms, and additional features. The expanded address space in IPv6 helps accommodate the growing number of devices connected to the internet. IPv6 also introduces several enhancements over IPv4, such as built-in support for Internet Protocol Security, providing secure, encrypted communication between devices.

### 3.6.3 Firewall Checkup

After executing those firewall commands, you do not need to restart the firewall. The changes take effect immediately, and UFW will begin applying the changes according to the new default policy. However, check if the firewall is enabled:

```sh
sudo systemctl is-enabled ufw
```

If the firewall is running, you can check if the firewall is within an `active` or `inactive` status:

```sh
sudo ufw status
```

### 3.6.4 Enable firewall

If it should not be inactive, we need to configure it using a symbolic link as before:

```sh
sudo ufw enable
```

### 3.6.5 Edit Port Rules

If you have made some port rules you do not want, print out a list with all existing rules like before.

```sh
sudo ufw status
```

Every row within the list has a number, starting with 1. If you want to delete the rule in the second row, type:

```sh
sudo ufw delete 2
```

If your ports are alright, we can continue setting up the brute force protection to utilize the firewall.

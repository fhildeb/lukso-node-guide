---
sidebar_label: "3.6 Firewall Configuration"
sidebar_position: 6
---

# 3.6 Firewall Configuration

A properly configured firewall is essential for protecting your node from unwanted network access while allowing legitimate traffic, such as remote SSH connections. In this section, we will configure an firewall to secure your node by restricting incoming connections, enabling SSH over a specified TCP port, and managing firewall rules.

:::info Uncomplicated Firewall

The UFW is the name of a user-friendly command-line interface for managing firewall configurations on Linux systems. It simplifies configuring and maintaining a firewall by providing intuitive commands and options. UFW streamlines the process of setting up and managing firewall rules such as enforcing strict controls on incoming and outgoing network traffic.

:::

## 1. General Port Locking

The first step is to set up default rules. All outgoing traffic should be allowed because the node needs to send data out to the network. Conversely, all incoming traffic should be denied by default to block unwanted connection attempts.

```sh
sudo ufw default allow outgoing
sudo ufw default deny incoming
```

## 2. SSH Port Configuration

For secure remote access, you need to allow SSH connections through the firewall by opening the port. However, if you allow just the port number, both TCP and UDP protocol connections would be possible. By default, SSH only uses the TCP protocol, which is preferred due to its reliability and error-checking capabilities.

:::tip

Allow SSH connections on your desired port and replace `<desired-port-number>` with your actual port number.

:::

```sh
sudo ufw allow <desired-port-number>/tcp
```

:::info Internet Protocol Versioning

The Internet Protocol is responsible for identifying and locating network devices and routing traffic across the internet. If your node supports both `IPv4` and `IPv6`, `UFW` automatically manages rules for both protocols.

`IPv6` provides an expanded address space that helps accommodate the growing number of devices connected to the internet. On top, it has built-in security enhancements like encrypted communication. When you add a firewall rule, you might see confirmations for both `IPv4` and `IPv6`, ensuring comprehensive network protection.

:::

## 3. Firewall Checkup

After applying your firewall rules, you can verify their status. The changes take effect immediately, so there is no need to restart UFW manually.

**1. Verify whether the firewall is enabled**:

```sh
sudo systemctl is-enabled ufw
```

**2. Verify if the firewall is active and the rules are in place**:

```sh
sudo ufw status
```

**3. If the UFW is not enabled, activate the process**:

```sh
sudo ufw enable
```

Afterward, restart your node.

## 3. Port Rule Removal

If you need to modify the firewall rules, such as removing an unwanted port rule, you can list them all.

```sh
sudo ufw status
```

:::info

To `delete` a specific port rule using `UFW`, type the `<rule-number>` that is no longer required.

:::

```sh
sudo ufw delete <rule-number>
```

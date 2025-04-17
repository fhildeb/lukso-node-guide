---
sidebar_label: "4.1 Address Checkup"
sidebar_position: 1
---

# 4.1 Address Checkup

Since many routers use different software, it’s important to know the device's network identifiers before setting up static access.

:::info

Home networks typically assign **dynamic IP addresses** via DHCP, a protocol designed for automated device registering. Once a device boots, it requests and leases an IP address from the router’s DHCP address pool.

While DHCP eliminates the need for manual configuration and manages devices efficiently, it can cause the IP address to **change over time** once an assignment expired. For uninterrupted SSH access, its necessary to identify your node’s hardware address and set up reliable DHCP reservation or static assignment in your router.

:::

## 1. Resolve IP Address

:::tip

Internet Protocol addresses are **logical, software‑assigned** labels. **IP** addresses let routers move data packages between different networks, whether your local home network or across the Internet.

🙇🏻‍♂️ _Example: `192.168.1.10` or `2001:db8::1`_

:::

**1.1 Local Route Method**:

:::info

You can use the versatile and powerful `ip` tool to display the system’s default route and source IP. The default gateway's IP address is the intermediate route the system takes when sending data to an IP address outside its local network. The process also highlights the origin of the package: the device's IP address that was used to send the package.

:::

```sh
ip route show default
```

The output will look like this:

```sh
default via <GATEWAY_IP_ADDRESS> dev eno1 proto dhcp src <NODE_IP_ADDRESS> metric <ROUTING_WEIGHT>
```

**1.2 Public Server Query**:

:::info

Alternatively, you can use the `ip` tool to query a stable external address like the Google DNS address `8.8.8.8` to reveal your source IP by filtering it's parameter from the response using the text-processing tool `awk`.

:::

```sh
ip route get 8.8.8.8 | awk '{print $7}'
```

## 2 Resolve Hardware Address

:::tip

The Media Access Control addresses are **permanent, globally-unique** identifiers built into each device's network interface. **MAC** addresses let switches and bridges forward data frames only within the same local network segment.

🙇🏻‍♂️ _Example: `00:1A:2B:3C:4D:5E`_

:::

:::info

You can list all network interfaces and their MAC addresses using the previously known `ip` command-line tool. Look for an interface name like `eno1` or `eth0`, typically used to broadcast information to the Internet using an Ethernet connection.

:::

```sh
ip link show
```

The entry should look like this:

```sh
<NETWORK_INFERFACE_NAME>: <BROADCAST,MULTICAST,UP,LOWER_UP> ...
    link/ether <MAC_ADDRESS> brd <BROADCAST_ADDRESS>
```

:::warning

Write down both **IP** and **MAC** addresses so you can identify your node while configuring your router.

:::

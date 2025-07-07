---
sidebar_label: "4.2 Static IP Assignment"
sidebar_position: 2
description: "Reserve a static IP for your LUKSO node to ensure stable remote access, reliable firewall rules, and seamless network connectivity."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 4.2 Static IP Assignment

Assigning a static IP or reserving your node’s existing DHCP lease prevents connectivity issues and simplifies router port forwarding, firewall rules, and remote access to your node. In this step, we will configure the router of the home network it is connected to.

:::note

Terminology and steps vary heavily depending on your router model. For help, refer to your router's documentation.

:::

:::info

The following steps are performed on your 💻 **personal computer** that's connected to the same home network as the node.

:::

## 1. Address Reservation

To ensure your node always uses the same IP address, we'll reserve it on the router.

:::tip

If you want to assign a totally new IP address instead of reserving one, choose a free address within your router's IP address range but outside the scope of IP addresses that are automatically allocated by the DHCP server to prevent conflicts.

:::

**1.1 Log into Router’s Web Interface**: _Open a browser to your router’s IP or hostname, then enter your admin credentials._

:::note Fritzbox Router

Navigate to `http://192.168.178.1` to open the local user interface.

:::

**1.2 Locate DHCP or LAN Settings**: _Navigate to the router section of DHCP, Network Connectivity or LAN settings._

:::note Fritzbox Router

Navigate to `Home Network` > `Network` > `Network Connections`.

:::

**1.3 Open Device Settings**: _Find the device setting windows for your specific IP addresses._

:::note Fritzbox Router

Browse the device list to find you node's `IP` and `MAC` address. Hit `Edit` to open the reservation window.

:::

**1.4 Add a Reservation Rule**: _Find the IP assignment or reservation option for your device._

:::note Fritzbox Router

Within the device menu, select `General` > `Home Network` and enable `Permanent IPv4 address`.

:::

**1.5 Apply and Save**: _Apply the static IP rule to the DHCP service of the router._

:::note Fritzbox Router

On the bottom right side of the device menu, click `Apply`.

:::

After applying the changes, restartyour node for the automated IP assignment to take effect.

## 2. Address Verification

Once the node is back online, we can confirm if the IP matches your reservation:

<Tabs>
<TabItem value="local-ip" label="Local IP Check" default>

:::info

You can use the `ip` tool to display the system’s default package route and source IP when connecting to the router. The default gateway's IP address is the intermediate route the system takes when sending data to an IP address outside its local network.

:::

```sh
ip route show default
```

The output will look like this:

```sh
default via <GATEWAY_IP_ADDRESS> dev eno1 proto dhcp src <NODE_IP_ADDRESS> metric <ROUTING_WEIGHT>
```

</TabItem>
<TabItem value="public-ip" label="Public IP Check">

:::info

You can use the `ip` tool to query a stable external address like the Google DNS address `8.8.8.8` to reveal your source IP. You can further filter the IP parameter from the server's response using the text-processing tool `awk`.

:::

```sh
ip route get 8.8.8.8 | awk '{print $7}'
```

</TabItem>
</Tabs>

:::warning

If the IP differs, recheck your router’s reservation settings.

:::

## 3. Switch to Remote Connection

With a fixed IP in place, you can relocate the node into a server rack or shelf.

```sh
sudo shutdown now
```

:::info

Once the node is offline, disconnect the monitor, keyboard, as well as power and network cables. Once power is restored, your node will **automatically boot** through the configured [**BIOS Settings**](/docs/guides/hardware-setup/bios-setup.md) and should be reachable at its reserved IP address within 15–60 seconds.

:::

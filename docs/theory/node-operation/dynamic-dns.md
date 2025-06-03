---
sidebar_label: "Dynamic DNS"
sidebar_position: 7
---

# Dynamic DNS

In order for the node to be accessible to other participants in a peer-to-peer blockchain, it must have an identifiable and stable IP address. Most internet service providers assign dynamically changing IP addresses to residential customers, and these can change on a weekly basis or router reboots.

The frequent IP address changes disrupt incoming peer connections and slow down the node's visibility and synchronization times. Dynamic DNS solves the problem through linking the dynamic IP address to a permanent domain name, allowing others to find you even when the IP changes.

:::info Default Setup

The 👾 [LUKSO CLI](/docs/guides/client-setup/lukso-cli-installation.md) will optionally set the current interchangeble IP address during the client installation.

:::

## DNS Records

A Domain Name System record can be thought of as the internet's directory and is used to associate a human-readable domain name with an IP address used by computers to communicate. DNS records are of particular importance for the following reasons:

- Allow devices to find each other over the internet without hardcoding IPs
- Enable services like HTTPS, email delivery, and node routing
- Abstract IPs behind stable webpage or service names

:::note DNS Schematic

`mynode.example.com` → `198.51.100.12`

:::

## Dynamic DNS

A Dynamic DNS service allows for automatic domain name registration and update in case of an IP address change. Once the IP address changes, the node or the router can trigger the respective DDNS provider to update the DNS record accordingly. Other nodes can thereby continue to be in touch using the domain name without interruption. This is especially useful for:

- Devices that must maintain consistent connectivity
- Services that want to stay discoverable during updates

:::note DDNS Schematic

`mynode.example.com` → `198.51.100.12` at _Time A_ / `198.51.100.13` at _Time B_

:::

## DDNS Setups

There are several ways to implement Dynamic DNS. Each varies in technical complexity, flexibility, and setup cost.

| Approach                                       | Difficulty                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <nobr> **Dynamic DNS Providers** </nobr>       | <nobr> 🟢 Simple </nobr>   | Users can register and choose free domains from DNS providers. The services often come with plug-and-play installation and scripts, which are ideal for regular node setups. For little money, the domain ownership can even be extended without further maintenance. <br /> <br /> **→** [Dynamic DNS](/docs/guides/modifications/dynamic-dns.md), [🚫 No-IP](https://www.noip.com/), [🐤 Duck-DNS](https://www.duckdns.org/) |
| <nobr> **Built-in Router DDNS** </nobr>        | <nobr> 🟢 Simple </nobr>   | Many consumer routers support built-in DDNS settings for providers or ISP services. Users can configure their DDNS via the router's user interface. It's free and easy to set up, but people are bound to the hardware and supported service partners. <br /> <br /> **→** [Router Requirements](/docs/theory/preparations/router-requirements.md), [🧭 AVM](https://fritz.com/) , [💠 ASUS](https://www.asus.com/)            |
| <nobr> **Cloudflare DNS + API Script** </nobr> | <nobr> 🔵 Advanced </nobr> | Technically experienced users can register a domain and update the DNS record through the [Cloudflare API](https://developers.cloudflare.com/api/). While offering great control, this requires experience with scripting and API calls.                                                                                                                                                                                       |
| <nobr> **Cronjob or Shell Script** </nobr>     | <nobr> 🔵 Advanced </nobr> | Developers can register their own domain and run a local IP checking script that sends a DNS update call to the domain provider. While offering great control, it requires experience with daemon software and API calls.                                                                                                                                                                                                      |
| <nobr> **Self-Hosted DDNS Server** </nobr>     | <nobr> 🔴 Expert </nobr>   | System administrators can create their own DDNS update server and use their domain registrar’s API. This offers self-sufficient control over the setup but requires extensive development and DNS knowledge.                                                                                                                                                                                                                   |

:::tip

A guide to integrate **DDNS** into the blockchain clients can be found on the [**Dynamic DNS**](/docs/guides/modifications/dynamic-dns.md) guide.

:::

:::warning

**Advanced** and **Expert** setups might come with monthly or yearly costs due to the **required domain registration**.

:::

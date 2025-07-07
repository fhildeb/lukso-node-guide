---
sidebar_label: "Router Requirements"
sidebar_position: 2
description: "Ensure your router can handle LUKSO node traffic with high throughput, stable connections, and proper port forwarding to avoid sync or validator issues."
---

# Router Requirements

The router is the first, and often weakest, part when it comes to data exchange of blockchain nodes. Inadequate routers will drop packets, choke under high peer counts, or stall your synchronization while putting validators at risk.

:::danger ISP Router Issues

All‑in‑one routers from internet service providers are tuned for casual home use, **not for high‑connection workload** of a blockchain node. Even with correct port‑forwarding, they will likely suffer heavy packet loss, drastic bandwidth drops, or complete lock‑ups of your home network's internet when peer traffic surges. Upgrading to a business or professional home router usually eliminates these issues.

:::

| Capability                                   | Why it matters                                                                                   | What to look for                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| <nobr>**Throughput & Stability** </nobr>     | Sustained, symmetric bandwidth keeps dozens of peer connections flowing without stalls.          | Routing throughput of 1 Gigabit per second with stability for 10k concurrent sessions. |
| <nobr>**Quality of Service** </nobr>         | Lets you prioritise node traffic over bulk downloads or streaming, avoiding missed attestations. | Priority rules for devices and ports plus DiffServ and CoS support.                    |
| <nobr>**Port Forwarding & Firewall** </nobr> | Nodes must expose TCP or UDP listener ports and validators need inbound traffic.                 | Simple access to map ports and create stateful rules.                                  |
| <nobr>**Gigabit Ethernet** </nobr>           | Wired LAN removes Wi‑Fi bottlenecks and fibre SFP slots will allow future‑proof upgrades.        | RJ‑45 ports with more than 1 Gigabit throughput and optional fibre SFP slots.          |
| <nobr>**IPv6** </nobr>                       | Many peers advertise only v6 addresses. Dual‑stack ensures full reachability.                    | Native dual‑stack with dynamic‑prefix delegation.                                      |
| <nobr>**VPN Server & Client** </nobr>        | Lets you secure RPC or monitoring ports, or tunnel through restrictive ISPs.                     | WireGuard or OpenVPN clients built‑in or ready to install via firmware.                |
| <nobr>**Dynamic DNS** </nobr>                | Publishes a stable hostname even when your IP changes, so peers & remote tools can reconnect.    | Built‑in DDNS client that supports multiple providers or custom webhooks.              |
| <nobr>**Regular Firmware Updates** </nobr>   | Patch vulnerabilities and add protocol support                                                   | Vendor that publishes quarterly updates and offers long‑term firmware availability.    |

:::tip Priority

`Reliable Throughput` > `Flexible Port and Network Controls` > `Ongoing Firmware Support`.

:::

:::note Example Hardware

For central europe, [**🧭 AVM**](https://fritz.com/) ranks high for build quality, intuitive UI, long warranty, and frequent updates. Their higher‑end models add fibre and Wi‑Fi mesh support for greater connectivity, and even offer an integrated [**Dynamic DNS**](/docs/theory/node-operation/dynamic-dns.md) service.

Within the [**Router Setup**](/docs/guides/router-setup/static-ip-assignment), all configurations were done on a [**Fritz!Box 7590 AX**](https://en.fritz.com/products/fritzbox/fritzbox-7590-ax/).

:::

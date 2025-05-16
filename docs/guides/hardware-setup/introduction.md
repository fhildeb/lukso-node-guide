---
sidebar_label: "2.1 Introduction"
sidebar_position: 1
---

# 2.1 Introduction

While LUKSO is an independent blockchain, it leverages the [Ethereum Virtual Machine](https://ethereum.org/de/developers/docs/evm/) (EVM) for executing smart contracts. This compatibility means that LUKSO benefits from many of the robust practices established for Ethereum validators. Whether you’re setting up a modest homestaking server or a professionally managed staking environment, you’ll notice that hardware and networking recommendations overlap with those for Ethereum nodes.

:::tip

Detailed information about minimal hardware specifications, storage recommendations, router requirements, or network demands can be gathered from the [Node Specification](/docs/theory/preparations/node-specifications.md) and [Network Demand](/docs/theory/preparations/network-demand.md) pages on the [🧠 **Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

## Hardware Setup

I opted for an expensive and professional setup because I plan to use the slasher functionality and run multiple networks from one node—partly by deploying Docker images on top of the LUKSO CLI. Please understand that this advanced configuration is not mandatory. You can get started with an entry-level computer for around 600€ and further trim down the hardware specifications by running the node without the slasher functionality.

:::info

More details about the slasher can be found in the [Validator Configuration](/docs/guides/client-setup/validator-configuration.md) or the [Slashing and Panelties](/docs/theory/blockchain-knowledge/slashing-and-panelties.md) chapters.

:::

- **Operating System**: Ubuntu 22.04.2 Server - _A stable choice known for long-term support and security updates._
- **Motherboard**: Barebone Intel NUC 10 - _Compact yet powerful, ideal for a home or small office environment._
- **Processor**: Intel Core i7-10710U - _Provides robust multitasking for node operations and concurrent network tasks._
- **Housing**: Akasa Turing FX for Intel NUC 10 - _A fanless solution to reduce noise and ensure efficient thermal management._
- **RAM**: Crucial 32GB DDR4 Kit - _Sufficient memory for high-performance workloads and multiple network instances._
- **Storage**: Samsung 970 EVO Plus M.2 NVMe SSD 2TB - _Offers fast data access and demands of EVM-based blockchains._

![Node Parts](/img/guides/hardware-setup/build_01.png)

I spent around 1100€ on this setup in 2021. Current prices might be even lower. I assembled the node myself to achieve a fanless, quiet operation with minimal moving parts, reducing both maintenance and thermal issues.

:::tip

If you dont want to built your own homestaking node, you can aquire pre-built servers specifically designed for the use as Ethereum node that even come with preinstalled operating systems. 🎨 [**DAppNode**](https://dappnode.com/) and 🌐 [**Avado**](https://ava.do/) are good examples.

:::

## Optional Components

Depending on your long-term plans, you may need to expand the storage capacity, for example, if you plan to support multiple blockchains or require a future-proof solution. The freezer functionality available in clients like Geth can partition network data across different disks.

:::info Storage

I personally plan to add a second 2 TB or 4 TB 2.5" HDD from to accommodate future growth. If you plan to run your node for more than a decade or run an archive or slasher service on top, be sure to keep accessories and mounting frames handy.

:::

:::info Accessories

- **Thermal Paste & Tools:** Remember to have thermal paste and the correct screwdrivers ready for the built.
- **WiFi Antennas:** If planning to use the machine as a home server or personal computer at some point down the line, consider installing WiFi antennas right from the start. These small additions cost around 10€ but can save you significant time later. The anchoring can be crewed in without attaching the antennas, so you dont lose any space.

:::

:::tip

Further storage details can be found on the [Client Providers](/docs/theory/blockchain-knowledge/client-providers.md) page within the [**🧠 Theory**](/docs/theory/preparations/node-specifications.md) section of the guide.

:::

## Secondary Devices

I installed my machine in a small home rack and connected the node to an 8-port switch, which in turn is linked to my router. This arrangement not only increases the number of available network ports but also allows for separation of servers and PCs across different rooms for improved network organization.

![Hardware Switch](/img/guides/hardware-setup/hardware-switch.png)

- **Switch:** TP-Link 8-Port Gigabit Network Switch - _Provides reliable connectivity and efficient data routing._
- **Network Setup:** Several RJ-45 Network cables - _Ensure high-quality, secure connections across your network._
- **Router**: Fritzbox 7590 AX - _Provides great bandwith, port configurations, and performance with fiber optic support_

:::tip

Further router and network information can be found in the [Router Requirements](/docs/theory/preparations/router-requirements.md) page in the [**🧠 Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

## Additional Considerations

This section provides additional strategies to ensure your node setup remains robust, efficient, and scalable. These considerations help you plan for future upgrades and safeguard your system against common challenges as your needs evolve.

- **Energy Efficiency & UPS:** For uninterrupted node operation, especially during power fluctuations or outages, consider investing in an Uninterruptible Power Supply (UPS). A UPS not only keeps your system running long enough to perform a safe shutdown but also protects against data corruption during sudden power loss. They generally range from 50€ to 150€ and should be chosen based on your node’s power consumption.
- **Cooling & Ventilation:** Even with a fanless design, ambient temperature control plays a crucial role in preserving hardware longevity. Ensure your node is positioned in a well-ventilated area to prevent heat build-up. In warmer climates or under heavy workload, additional passive cooling solutions or repositioning the device can significantly reduce the risk of overheating.
- **Future Upgrades:** Keep in mind that while this guide outlines a high-performance configuration, entry-level setups are also possible. It’s important to match your hardware investment with your operational goals and growth plans. After all, you want to reach the point of break even with staking quite quickly.

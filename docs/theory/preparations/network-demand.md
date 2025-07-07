---
sidebar_label: "Network Demand"
sidebar_position: 3
description: "Learn the bandwidth, latency, and connection requirements to run a stable LUKSO validator or full node without penalties or sync issues."
---

# Network Demand

Running a validator or full node is as much a network exercise as a compute one. Blocks, attestations, and peer gossip is shared around the clock. If data packages arrive late or not at all, your node lags behind, drops out of synchronization, or becomes penalised. This page breaks down the bandwidth, latency, and connection‑quality targets you should hit before spinning up a node.

## Ethernet Connection

Using a wired Ethernet connection is the gold standard for any node operation.

| Benefit                            | Description                                                                               | Node Impact                                                                            |
| ---------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| <nobr> **Stability** </nobr>       | The data connection is immune to interference from walls, microwaves, or neighbours.      | Fewer disconnects and a steady peer count to other nodes participating in the network. |
| <nobr> **Speed** </nobr>           | The troughput of 1 gigabit or higher outperforms typical Wi‑Fi connections.               | Faster initial synchronization and smoother catch‑up after outages.                    |
| <nobr> **Great Latency** </nobr>   | As there is no airtime contention, the wired connection offers low and constant latency.  | Attestations and block proposals always reach other peers of the network in time.      |
| <nobr> **Security** </nobr>        | As the connection requires physical access, mobile devices cannot intercept or interfere. | Reduced risk of over‑the‑air snooping or network attacks from third parties.           |
| <nobr> **Troubleshooting** </nobr> | As all packages are directed at one device, troubleshooting becomes predictable.          | Less effort and speculation when detecting package loss issues and latency drops.      |

:::tip Security Advice

Always connect via **Ethernet** and **turn off** air-based connections like **Wi‑Fi and Bluetooth** on the node’s network interface.

:::

## Bandwidth Requirements

If you are considering running a node, the following values are the minimum troughput and latency you should keep.

| Metric                            | Minimum      | Recommendation | Why it matters                                                         |
| --------------------------------- | ------------ | -------------- | ---------------------------------------------------------------------- |
| <nobr> **Download** </nobr>       | 10 – 15 Mbps | above 50 Mbps  | Faster initial synchronization and head‑of‑chain catch‑up.             |
| <nobr> **Upload** </nobr>         | 2 – 4 Mbps   | above 20 Mbps  | Sending attestations, block proposals, and peer requests in time.      |
| <nobr> **Latency / Ping** </nobr> | under 100 ms | under 30 ms    | Attestations close after 12 seconds and every ms counts for inclusion. |
| <nobr> **Package Loss** </nobr>   | under 1 %    | under 0.1 %    | Steady peer gossip & fewer retransmissions.                            |

:::info Connection Tests

If you are unsure if the internet connection is stable and strong enough to power a node, consider running a 24‑hour ping and bandwidth **monitoring service** or look-up your **router's network analytics**. If you’re consistently below the recommended bandwith and latency, consider upgrading to fibre connection, hosting your node in a data centre, or using an third party staking service.

:::

## Network Traffic Volumes

Bandwidth analysis within the [LUKSO Validator Community](https://discord.gg/lukso) have shown incoming and outgoing data package throughputs. These numbers correlate to the **default peer settings** within the [LUKSO Network Configuration](https://github.com/lukso-network/network-configs) and should be considered the minimum required capacity to keep the topography of the network and the peer count stable.

:::tip

The amount of **uploaded data** that is exchanged can be lowered or raised by adjusting the [**Peer Count Limits**](/docs/guides/modifications/peer-count-limits.md), useful when having connectivity issues, or running an **advanced node setup** as archive node, data center, or bootnode.

:::

| Interval    | Uploaded Data | Downloaded Data | **Total Throughput** |
| ----------- | ------------- | --------------- | -------------------- |
| **Daily**   | ~45 GB        | ~43 GB          | ~88 GB               |
| **Weekly**  | ~330 GB       | ~300 GB         | ~630 GB              |
| **Monthly** | ~1.4 TB       | ~1.33 TB        | ~2.73 TB             |

:::info

Archive nodes transfer similar volumes but **store** far more because they keep **every historical state**.
:::

:::danger ISP Policy Issues

Many residential internet service providers impose fair‑use **throughput limits** between **1 to 3 TB per month**. A single validator node can exceed this limit. Check your internet contract or upgrade to a _business_ or _unlimited_ plan to avoid throttling or retrospective payments.

:::

## Possible Network Issues

A stable, low‑latency connection is considered mandatory for any node operation. If you are unable to comply with network requirements, the following restrictions might apply.

:::warning Consequences of Network Issues

- **Delayed Block Sync**: Slow downloads delay the execution of new data payloads and blockchain synchonization.
- **Ignored Attestations**: Validators must reach their peers within the slot time to exclude low inactivity flags.
- **Missed Proposals**: Block rewards drop to zero if peer connections time‑out, meaning another validator has to sign.
- **Validator Penalties**: An extended desynchronization time will cause panelties and reduce your staked funds.

:::

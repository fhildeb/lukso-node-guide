---
sidebar_label: "Node Specifications"
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Node Specifications

Running a Ethereum node for a custom network like LUKSO is not a one‑size‑fits‑all affair. Hardware needs grow with the amount of historical data you keep and the additional services you plan to enable. The following table shows the typical node setups.

| Node Type                  | Description                                                               |
| -------------------------- | ------------------------------------------------------------------------- |
| **Regular Full Node**      | Keeps recent state only and prunes old data once hash tree is verifiable. |
| **Node + Slasher Service** | Runs a proof‑of‑stake slasher service to the regular node services.       |
| **Archive Node**           | Stores all historical state ideal for explorers, research & analytics.    |

:::tip

Further details about client variations can be found on the [Proof of Stake](/docs/theory/blockchain-knowledge/proof-of-stake.md) and [Client Types](/docs/theory/blockchain-knowledge/client-types.md) pages.

:::

## Hardware Requirements

Meeting or exceeding the hardware specs below keeps your specific node type synced, healthy and penalty‑free.

:::note Classification

- **Minimal**: Your node will synchronize but may lag under load or when synchronizing to the current chain head.
- **Recommended**: Smooth performance during synchronization with headroom for storage, metrics, and monitoring.

:::

<Tabs>
<TabItem value="minimal" label="Minimal">

| Node Type                  | CPU     | RAM   | Storage | Network   | Typical Execution Clients              |
| -------------------------- | ------- | ----- | ------- | --------- | -------------------------------------- |
| **Regular Full Node**      | 4 Cores | 8 GB  | 500 GB  | ≥ 25 Mbps | [Geth], [Erigon], [Nethermind], [Besu] |
| **Node + Slasher Service** | 6 Cores | 16 GB | 1 TB    | ≥ 50 Mbps | [Geth], [Erigon], [Nethermind], [Besu] |
| **Archive Node**           | 8 Cores | 16 GB | 2 TB    | ≥ 50 Mbps | [Erigon], [Besu]                       |

</TabItem>

<TabItem value="recommended" label="Recommended">

| Node Type                  | CPU           | RAM   | Storage   | Network   | Typical Execution Clients              |
| -------------------------- | ------------- | ----- | --------- | --------- | -------------------------------------- |
| **Regular Full Node**      | 6 – 8 Cores   | 16 GB | 1 - 2 TB  | ≥ 25 Mbps | [Geth], [Erigon], [Nethermind], [Besu] |
| **Node + Slasher Service** | 8 - 10 Cores  | 32 GB | 2 - 4 TB  | ≥ 50 Mbps | [Geth], [Erigon], [Nethermind], [Besu] |
| **Archive Node**           | 12 – 16 Cores | 32 GB | 4 - 6 TB  | ≥ 50 Mbps | [Erigon], [Besu]                       |

</TabItem>
</Tabs>

:::info SSD vs HDD Storage

A modern node performs millions of tiny random reads and writes every hour. Modern _NVMe_ or _SATA SSD_ drives are strongly recommended and deliver high access rates and low seek times that keep your execution client at the chain head. In comparison, traditional spinning‑disk _HDDs_ are houndred times slower for random access, and should only be used when

- you operate an **offline analytics node** that doesn’t need real‑time block execution
- you’re running a **minimal learning node** with higher synchronization times and frequent lags
- you're running an **archive node** with an SSD and want to extend the storage for historical data

:::

:::tip Network Connection

If you're staking with a validator, staying in consensus requires nur just a great network bandwidth, but also low latency, so the node get informed about new blocks and it's attestations before the deadline. High latency leads to missed attestations, orphaned blocks, and potential penalties. More details can be found on the [router requirements](/docs/theory/preparations/router-requirements.md) and [network demand](/docs/theory/preparations/network-demand.md) pages.

:::

:::warning Consequences of under‑powered Hardware

- **Falling Behind Chain Head**: Slow processors or storage can’t process blocks quickly enough, leading to lags.
- **Consensus Penalties**: Missed validator duties from lags or crashes cause validator inactivity or even slashing.
- **Downtime**: Operation systems kill resource‑starved software, meaning clients, tools, or metrics stop responding.
- **Corrupted Data**: Hitting a disk‑space wall forces an emergency resynchronization, taking the node offline.
- **Resource Conflicts**: All clients and services fight for the same RAM and disk reads, cascading slow‑downs.
- **Security Risks**: Overloaded nodes may skip signature verification or leave vulnerable endpoints exposed.
  :::

## Slasher Requirements

The slasher tracks validator attestations to detect misbehaviour on the network. Its computational needs, especially memory and disk usage are significantly higher. Slasher services are recommended for advanced rigs, staking pools, or data‑centers, likely meeting the official requirements within the [Prysm], [Lighthouse], or [Teku] consensus clients.

:::tip

Further details about the slasher functionality can be found on the [slasher service](/docs/theory/node-operation/slasher-service.md) page.

:::

| Resource | Baseline                                      |
| -------- | --------------------------------------------- |
| CPU      | _Intel Core i7‑4770_, *AMD FX‑8310*, or newer |
| RAM      | 16 - 32 GB                                    |
| Storage  | 1 - 4 TB SSD                                  |
| Network  | Reliable broadband with low latency           |

:::info Storage Growth

The slasher database can expand from **0 → 200 GB in its first year**. Plan for continuous growth or a separate SSD drive.

:::

:::warning Consequences of Under‑powered Slasher

- **Delayed Detection**: Lagging behind the chain head means slashable events are missed, making the slasher node useless.
- **Cascading Crashes**: The slasher can starve the beacon or validator client of resources, meaning the node stops working.
- **Higher Penalty Risk**: Instability may cause your own validators to be penalised from other slashers.

:::

## Storage Demand

Since the [LUKSO Mainnet Launch](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba), the blockchain data has increased on a rather static level.

:::tip Current DISK USAGE

As of **May 2025** fully synchronized **Mainnet Full Node** occupies **≈ 750 GB** of data, and **≈ 350 GB** of slasher database.

:::

| Network     | **Monthly** Growth | **Yearly** Growth | **Monthly** Slasher Growth | **Yearly** Slasher Growth | Genesis     |
| ----------- | ------------------ | ----------------- | -------------------------- | ------------------------- | ----------- |
| **Mainnet** | ~ 29 GB            | ~ 346 GB          | ~ 12.5 GB                  | ~ 150 GB                  | May 23 2023 |
| **Testnet** | ~ 3 GB             | ~ 36 GB           | ~ 1.3 GB                   | ~ 15 GB                   | May 03 2023 |

:::note Disclaimer

The above data was gathered from [Geth](/docs/theory/blockchain-knowledge/client-providers.md) and [Prysm](/docs/theory/blockchain-knowledge/client-providers.md) clients with an active [slasher service](/docs/theory/node-operation/slasher-service.md) without any data compromization since genesis. The storage numbers might vary based on other client providers and the total runtime of the slasher service.

:::

[Geth]: https://geth.ethereum.org/docs/getting-started/hardware-requirements
[Erigon]: https://docs.erigon.tech/getting-started/hw-requirements
[Nethermind]: https://docs.nethermind.io/get-started/system-requirements/
[Besu]: https://besu.hyperledger.org/24.3.0/public-networks/get-started/system-requirements
[Prysm]: https://docs.prylabs.network/docs/prysm-usage/slasher
[Lighthouse]: https://lighthouse-book.sigmaprime.io/installation.html#recommended-hardware
[Teku]: https://docs.teku.consensys.io/development/get-started/system-requirements
[Nimbus]: https://nimbus.guide/hardware.html

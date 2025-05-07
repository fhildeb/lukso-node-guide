---
sidebar_label: "Node Specification"
sidebar_position: 1
---

# Node Specification

> _For more information, read the official [Hardware Requirements of Geth](https://geth.ethereum.org/docs/getting-started/hardware-requirements) on the Ethereum Page or the [Requirements of Erigon](https://github.com/ledgerwatch/erigon#system-requirements) as examples from the Ethereum ecosystem._

## Slasher Requirements

#### Requirements

The [hardware requirements](https://docs.prylabs.network/docs/prysm-usage/slasher) for the slasher service can be seen below. It needs more system resources, namely more than 1GB of additional RAM and more storage space. However, there is not a particular number.

- Processor: Intel Core i7–4770 or AMD FX-8310 or better
- Memory: 16GB RAM
- Storage: 1TB available space SSD
- Internet: Broadband connection

> The slasher database will take additional space on your hard disk, up to hundreds of GBs. If you want to know more about how much storage the node will need, have a look at the [client setup](#) section.

<!--TODO: 04-client-setups.md-->

If you run the slasher on a low-performance node or can not keep up with the requirements, it could lead to the following problems:

- The slasher service could lag behind the head of the chain, making it ineffective at timely detecting slashable offenses.
- The node could become unstable and crash due to running out of resources, disrupting its participation in the consensus process and potentially leading to penalties if it's also running a validator client.
- The service could slow down other processes running on the same node, such as if it's also running a beacon node or validator client.

If you are operating an **advanced hardware setup**, **staking pool** or **data center**, you should be fine with the requirements. Still, it is an entirely optional process.

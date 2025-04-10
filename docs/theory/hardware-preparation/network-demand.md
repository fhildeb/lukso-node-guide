---
sidebar_label: "Network Demand"
sidebar_position: 1
---

# Network Demand

## 1.3 Network Stats

Running an EVM Proof of Stake validator node at home requires a stable and reliable internet connection with sufficient network speeds and low latency. A stable internet connection is crucial to ensure optimal performance and maintain the validator's active status within the EVM 2.0 network. Here's why network speeds and latency are essential:

- **Blockchain Synchronization**: A fast and stable internet connection is required to synchronize the blockchain data with the Ethereum network efficiently. Slow download speeds can lead to longer sync times, which may prevent your validator from actively participating in the consensus process, causing missed opportunities for rewards.
- **Attestations and Proposals**: As a validator, your node creates attestations and proposes blocks. A low-latency connection ensures that your attestations and proposals reach the network promptly, increasing the likelihood of inclusion in the final chain and earning rewards.
- **Missed Events and Penalties**: In Ethereum PoS, validators can be penalized for failing to participate in the consensus process. If your network connection is slow or unstable, it could cause missed attestations or proposals, resulting in penalties and reduced rewards.
- **Network Resilience**: A reliable internet connection with low latency helps your validator node stay connected to the network and recover quickly from temporary network outages. Strength reduces the risk of being isolated from the rest of the network and missing important consensus events.

#### Minimal Network Speeds

- **Download speed**: A minimum download speed of `10-15 Mbps` is recommended, with higher rates being more desirable for faster blockchain synchronization and data transfer. I got a fiber connection at home locked at _100 Mbps_, which is enough for my needs.
- **Upload speed**: A minimum upload speed of `2-4 Mbps` is suggested to ensure your attestations and proposals can be sent to the network quickly. With my fiber connection at home, I get around _70 Mbps_.
- **Latency**: A low-latency connection below `30-100 ms` is ideal for guaranteeing timely participation in the consensus process and reducing the risk of missing attestations or proposals. While the block time of 12 seconds defines the average time for new block proposals, having good latency remains important for timely synchronization, data propagation, and network participation. I usually get a latency below _15 ms_ on my end.

Based on research within the community, the node itself will fetch similar network traffic amounts when running as validator fullnode: The archive nodes will get similar numbers but store data more consistently and in more detail.

```text
--AVERAGE DAILY UPLOAD....................45 GB
--AVERAGE DAILY DOWNLOAD..................43 GB
-----------------------------------------------------
--AVERAGE DAILY DATA......................88 GB TOTAL

--AVERAGE WEEKLY UPLOAD..................330 GB
--AVERAGE WEEKLY DOWNLOAD................300 GB
-----------------------------------------------------
--AVERAGE WEEKLY DATA....................630 GB TOTAL

--AVERAGE MONTHLY UPLOAD................1400 GB
--AVERAGE MONTHLY DOWNLOAD..............1330 GB
-----------------------------------------------------
--AVERAGE MONTHLY DATA..................2730 GB TOTAL
```

In conclusion, having sufficient network speeds and low latency is essential for running an Ethereum PoS validator node at home. It ensures optimal performance, maximizes reward potential, and minimizes the risk of penalties or missed events.

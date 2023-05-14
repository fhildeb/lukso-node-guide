## 1.3 Network Stats

Running an EVM Proof of Stake validator node at home requires a stable and reliable internet connection with sufficient network speeds and low latency. This is crucial to ensure optimal performance and maintain the validator's active status within the EVM 2.0 network. Here's why network speeds and latency are essential:

- **Blockchain Synchronization**: A fast and stable internet connection is required to efficiently synchronize the blockchain data with the Ethereum network. Slow download speeds can lead to longer sync times, which may prevent your validator from actively participating in the consensus process, causing missed opportunities for rewards.
- **Attestations and Proposals**: As a validator, your node is responsible for creating attestations and proposing blocks. A low-latency connection ensures that your attestations and proposals reach the network promptly, increasing the likelihood of inclusion in the final chain and earning rewards.
- **Missed Events and Penalties**: In Ethereum PoS, validators can be penalized for failing to participate in the consensus process. If your network connection is slow or unstable, it could cause missed attestations or proposals, resulting in penalties and reduced rewards.
- **Network Partition Resilience**: A reliable internet connection with low latency helps your validator node stay connected to the network and recover quickly from temporary network partitions. This reduces the risk of being isolated from the rest of the network and missing important consensus events.
- **Security**: A stable and fast internet connection allows your validator node to stay updated with the latest security patches and software updates, reducing the risk of vulnerabilities and potential attacks.

#### Minimal Network Speeds

- **Download speed**: A minimum download speed of `10-15 Mbps` is recommended, with higher speeds being more desirable for faster blockchain synchronization and data transfer. I got a fiber connection at home locked at _100 Mbps_, as it is enough for my needs.
- **Upload speed**: A minimum upload speed of `2-4 Mbps` is suggested to ensure your attestations and proposals can be sent to the network quickly. With my fiber connection at home I get around _70 Mbps_.
- **Latency**: A low-latency connection below `80-100 ms` is ideal for ensuring timely participation in the consensus process and increasing the chances of rewards. I usually get a latency below _10 ms_ on my end.

In conclusion, having sufficient network speeds and low latency is essential for running an Ethereum PoS validator node at home. It ensures optimal performance, maximizes reward potential, and minimizes the risk of penalties or missed events.

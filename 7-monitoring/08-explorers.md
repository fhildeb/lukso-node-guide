## 7.8 Explorer Page Monitoring

You can also use LUKSO's official explorer webpages to monitor your nodes or validator status without relying directly on your local metrics. It's one of the most efficient methods and does not require any login to work. Their links can be verified at the [Mainnet Parameter](https://docs.lukso.tech/networks/mainnet/parameters) and [Testnet Parameter](https://docs.lukso.tech/networks/testnet/parameters) sections of the official [LUKSO Tech Docs](https://docs.lukso.tech/) page.

### 7.8.1 Execution Block Explorer

![Execution Block Explorer](/img/explorer-pages-1.png)

The Execution Block Explorer is a valuable tool that allows you to examine your blockchain's detailed transactions and blocks. It provides information about who validated the blocks and the number of blocks your validator has validated. It also displays the balance of the transaction recipient's fees addresses. With the aid of the Execution Block Explorer, you can maintain a comprehensive understanding of your transactional environment, ensuring the continued smooth operation of your blockchain network.

- [Mainnet Execution Explorer](https://explorer.execution.mainnet.lukso.network/)
- [Testnet Execution Explorer](https://explorer.execution.testnet.lukso.network/)

### 7.8.2 Execution Status Page

![Execution Status Page](/img/explorer-pages-2.png)

The Execution Status Page is a crucial resource for tracking your node's overall health and performance. It displays your node if it has been added to the ETHStats page, showing the names of the nodes, their types, latencies, and the number of their peers. It also indicates pending transactions, the last synced block and its hash, and the timing of the last block. Furthermore, the total count of active nodes that activated the ETHStats client is readily available. The Execution Status Page is essentially a dashboard, providing all the critical metrics required to assess the performance of your node.

- [Mainnet Execution Stats](https://stats.execution.mainnet.lukso.network/)
- [Testnet Execution Stats](https://stats.execution.testnet.lukso.network/)

### 7.8.3 Consensus Block Explorer

![Consensus Block Explorer](/img/explorer-pages-3.png)

The Consensus Block Explorer offers comprehensive insights into the blockchain's current consensus status. It displays the present epoch, current slot, active and pending validator counts, the staked LYX, and the average balance. For each slot, the explorer provides information about the proposer, the sync participation, time, and status. The explorer also allows for an in-depth examination of each block, revealing the proposer's graffiti and all associated metadata. From the validator's perspective, it provides critical information about attestations and deposits, the validators' status and effectiveness, and their balance. This tool gives a clear view of the consensus health of the blockchain.

If you need more information about slots, epochs, and their status types, look into this guide's [Network Theory](/6-blockchain-clients/02-network-theory.md) section.

- [Mainnet Consensus Explorer](https://explorer.consensus.mainnet.lukso.network/)
- [Testnet Consensus Explorer](https://explorer.consensus.testnet.lukso.network/)

### 7.8.4 Consensus Status Page

![Consensus Status Page](/img/explorer-pages-4.png)

The Consensus Status Page is another tool for monitoring your node's operation. If your node has been added to the ETH2Stats page, it will show up here, along with details such as the node's name, consensus client type, consensus peers, attestations, head slot, justified slot, and finalized slot. It even displays the memory usage on the machine running the node. This information is crucial in monitoring the performance of your consensus mechanism and ensuring your blockchain system runs efficiently.

If you need more information about slots, epochs, and their status types, look into this guide's [Network Theory](/6-blockchain-clients/02-network-theory.md) section.

- [Mainnet Consensus Stats](https://stats.consensus.mainnet.lukso.network/)
- [Testnet Consensus Stats](https://stats.consensus.testnet.lukso.network/)

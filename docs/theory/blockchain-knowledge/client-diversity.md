---
sidebar_label: "Client Diversity"
sidebar_position: 7
---

# Client Diversity

Client diversity refers to the practice of using **multiple, independently developed software clients** across one blockchain network. These clients are built by different engineering teams, often in different programming languages, and serve the same purpose of running the blockchain protocol Maintaining client diversity is essential **for network resilience**, security, and decentralization. If too many validators rely on the same software, a single bug or vulnerability could have catastrophic consequences.

:::tip

A detailed list of supported client software and differences can be found on the [Client Providers](/docs/theory/blockchain-knowledge/client-providers.md) page.

:::

## Diversity Measures

| Topic                                            | Description                                                                                                                                                                             |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Security & Resilience** </nobr>         | Individual bugs or attacks on a single client are not harmful to the other clients on the network and hence do not increase the risk of a mass failure happening as a consequence.      |
| <nobr> **Decentralization & Governance** </nobr> | No particular development group or codebase has an inordinate amount of power or control over the overall functionality and operation of the network as a whole.                        |
| <nobr> **Implementation Independence** </nobr>   | Different clients have different understandings of the protocol, highlighting some of the ambiguities in the specifications. This ends up with collevtive refinements of the standards. |
| <nobr> **Update Flexibility** </nobr>            | With multiple software manufacturers to choose from, there is less chance of delays in applying upgrades and a unified competition across companies to deliver features.                |

:::tip

Node operators should aim to **distribute their client usage** across the officially supported clients **to avoid dominance** by any single implementation. The current network metrics can be found on the [LUKSO Diversity Dashboard](https://clientdiversity.lukso.network/).

:::

## Historical Incidents

Client diversity has always proven to be of fundamental significance in the wide Ethereum Ecosystem. Below are some of the most important events in which diversity served an essential function in either protecting the network or bringing to light crucial vulnerabilities that would have had severe consequences.

- **[Shanghai DoS Attacks, 2016](https://blog.ethereum.org/2016/09/22/ethereum-network-currently-undergoing-dos-attack)**  
  Throughout the course of the Devcon2, Ethereum was targeted by a series of denial-of-service attacks that had a profound effect on its performance and stability. The dominant Geth client struggled, causing degraded performance and crashes. The alternative Parity client proved to be more resilient, keeping the network functional until highlighed issues were fixed.

- **[OpenEthereum Consensus Bug, 2020](https://www.coindesk.com/tech/2020/08/27/buggy-code-release-knocks-13-of-ethereum-nodes-offline/)**  
  A bug that was found in the OpenEthereum client led to a situation in which approximately 13% of all nodes halted at a particular block. The issue could have resulted in a chain split that would have been disruptive to the network. However, the chain kept operating normally and uninterrupted due to other nodes running Geth and Besu clients without issues.

- **[Prysm Client Finality Failure, 2023](https://offchain.medium.com/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2)**  
  Shortly before the DappCon event, the Prysm client experienced severe delays due to a transaction ordering bug, also partially effecting other consensus clients. The only client not suffering from these issues at the time was Lighthouse and instrumentally kept the finality process alive even when following a long network stall of 25 minutes.

:::info

Client diversity is a **core pillar of network health to avoid systemic risks** and ensure long-term sustainability.

:::

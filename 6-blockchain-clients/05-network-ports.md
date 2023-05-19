## 6.5 Open Network Ports

In order to let the Blockchain CLients communicate correctly, the ports, e.g., data communication channels, have to be enabled on the node and the router. For each supported blockchain client, there are different ports to open.

Each supported client has different ports for various purposes that have to be open for a clear connection:

> To discover peers of other nodes, all outbound traffic should be allowed across all UDP and TCP ports when using Prysm and Lighthouse.

| CLIENT     | DESCRIPTION                               | PORT  | TCP | UDP |
| ---------- | ----------------------------------------- | ----- | --- | --- |
| GETH       | Execution Chain Data Channel              | 30303 | X   |     |
| GETH       | Execution Chain Discovery                 | 30303 |     | X   |
| ERIGON     | Execution Chain Data Channel              | 30303 | X   |     |
| ERIGON     | Execution Chain Discovery                 | 30303 |     | X   |
| LIGHTHOUSE | Beacon Communication and Data             | 9000  | X   | X   |
| PRYSM      | Beacon Gossip, Requests, and Responses    | 13000 | X   |     |
| PRYSM      | Beacon Discovery, Requests, Data Exchange | 12000 |     | X   |

> Within the [monitoring section](/7-monitoring/01-core-tools.md) of this guide you can find further internal communication channels.

References:

- [Lighthouse Port Specification](https://lighthouse-book.sigmaprime.io/faq.html?highlight=9000#do-i-need-to-set-up-any-port-mappings)
- [Prysm Port Specification](https://docs.prylabs.network/docs/prysm-usage/p2p-host-ip#configure-your-firewall)
- [Geth Port Specification](https://github.com/ethereum/go-ethereum#configuration)
- [Erigon Port Specification](https://github.com/ledgerwatch/erigon#default-ports-and-firewalls)

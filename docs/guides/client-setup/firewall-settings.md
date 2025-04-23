---
sidebar_label: "6.1 Firewall Settings"
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 6.1 Firewall Settings

A tightly controlled firewall lets your node participate in peer-to-peer networks while blocking unsolicited traffic. Below are the mandatory ports for each supported blockchain client of the LUKSO network, followed by firewall commands to open their communication channels and check current their current status.

:::tip

Please ensure you have a basic understanding of blockchain networks before operating a node. If you're not yet familiar with [proof of stake](/docs/theory/blockchain-knowledge/proof-of-stake.md), [tokenomics](/docs/theory/blockchain-knowledge/tokenomics.md), [panelties](/docs/theory/blockchain-knowledge/slashing-and-panelties.md), or [clients](/docs/theory/blockchain-knowledge/client-types.md) and their [differences](/docs/theory/blockchain-knowledge/client-providers.md), you can refer to the [**🧠 Theory**](/docs/theory/blockchain-knowledge/proof-of-stake.md) section.

:::

## 1. Open Network Ports

Your node needs specific inbound ports open so that execution and consensus clients can exchange blocks, transactions, and peer‑discovery messages. Below is a list of the TCP and UDP ports each client uses. By opening these ports on your node’s firewall, you ensure that your client stays in sync and reachable by the wider network.

:::info

Consensus clients rely on broad outbound connectivity to discover other nodes, meaning only inbound traffic will be restricted.
:::

| PORT  | CLIENT(S)                                                       | DESCRIPTION                        | TCP | UDP |
| ----- | --------------------------------------------------------------- | ---------------------------------- | --- | --- |
| 30303 | [Geth] ↗ <br />[Erigon] ↗ <br /> [Nethermind] ↗ <br /> [Besu] ↗ | Execution Chain Data & Discovery   | ✔️  | ✔️  |
| 9000  | [Lighthouse] ↗ <br /> [Teku] ↗ <br /> [Nimbus] ↗ <br />         | Beacon Gossip & Data               | ✔️  | ✔️  |
| 13000 | [Prysm] ↗                                                       | Beacon Gossip, Requests, Responses | ✔️  |     |
| 12000 | [Prysm] ↗                                                       | Beacon Discovery, Data Exchange    |     | ✔️  |

:::tip

Clients use extra ports for monitoring, which don't need firewall exposure. Check the [Monitoring](/docs/guides/monitoring/introduction.md) chapter for details.

:::

## 2. Configure Firewall

You can apply the specific port settings to your firewall.

:::info

The following step is performed on your 💻 **personal computer**.

:::

**2.1 Node Connection**: _Log in to your node if you are not already connected._

```sh
ssh <ssh-device-alias>
```

:::info

The following steps are performed on your 📟 **node server**.

:::

**2.2 Add Port Rules**: _Allow the TCP and UDP ports depending on which clients you want to operate._

:::tip

You will have to chose one execution client and one consensus client.

- **Execution Clients**: Geth, Erigon, Nethermind, Besu
- **Consensus Clients**: Prysm, Lighthouse, Teku, Nimbus

Further details about [client types](/docs/theory/blockchain-knowledge/client-types.md) and their [providers](/docs/theory/blockchain-knowledge/client-providers.md) can be found in the [**🧠 Theory**](/docs/theory/blockchain-knowledge/proof-of-stake.md) section.

:::

<Tabs>
  <TabItem value="execution" label="Geth, Erigon, Nethermind, Besu">

```sh
sudo ufw allow 30303/tcp
sudo ufw allow 30303/udp
```

</TabItem> <TabItem value="consensus" label="Lighthouse, Teku, Nimbus">

```sh
sudo ufw allow 9000/tcp
sudo ufw allow 9000/udp
```

</TabItem> <TabItem value="prysm" label="Prysm">

```sh
sudo ufw allow 13000/tcp
sudo ufw allow 12000/udp
```

</TabItem> </Tabs>

The output of each command should always show:

```sh
Rule added
Rule added (v6)
```

**2.3 Check Configuration**: _Verify the new firewall rules._

```sh
sudo ufw status
```

The output should look similar to this:

<Tabs>
  <TabItem value="execution" label="Execution Client + Lighthouse, Teku, or Nimbus">

```text
Status: active

To                               Action      From
--                               ------      ----
<preferred-ssh-port>/tcp         ALLOW       Anywhere
30303/tcp                        ALLOW       Anywhere
30303/udp                        ALLOW       Anywhere
9000/tcp                         ALLOW       Anywhere
<preferred-ssh-port>/tcp (v6)    ALLOW       Anywhere (v6)
30303/tcp (v6)                   ALLOW       Anywhere (v6)
30303/udp (v6)                   ALLOW       Anywhere (v6)
9000/tcp (v6)                    ALLOW       Anywhere (v6)
```

</TabItem> <TabItem value="prysm" label="Execution Client + Prysm">

```text
Status: active

To                               Action      From
--                               ------      ----
<preferred-ssh-port>/tcp         ALLOW       Anywhere
30303/tcp                        ALLOW       Anywhere
30303/udp                        ALLOW       Anywhere
13000/tcp                        ALLOW       Anywhere
12000/udp                        ALLOW       Anywhere
<preferred-ssh-port>/tcp (v6)    ALLOW       Anywhere (v6)
30303/tcp (v6)                   ALLOW       Anywhere (v6)
30303/udp (v6)                   ALLOW       Anywhere (v6)
13000/tcp (v6)                   ALLOW       Anywhere (v6)
12000/udp (v6)                   ALLOW       Anywhere (v6)
```

</TabItem> </Tabs>

:::info

The `<preferred-ssh-port>` property will be exchanged with your actual SSH port.

:::

:::warning

If something is missing, retry to apply the above rules or have a look into the [firewall configuration](/docs/guides/system-setup/firewall-configuration.md) for further details.

:::

:::tip

If all required ports are featured with the `ALLOW` property, your node’s local firewall is correctly configured. To expose these ports at the network level, you will have to proceed to configure the router’s port forwarding rules.

:::

[Geth]: https://github.com/ethereum/go-ethereum#configuration
[Erigon]: https://github.com/ledgerwatch/erigon#default-ports-and-firewalls
[Nethermind]: https://www.quicknode.com/guides/infrastructure/node-setup/how-to-run-nethermind-node#firewall-configuration
[Besu]: https://besu.hyperledger.org/stable/public-networks/how-to/connect/configure-ports#:~:text=To%20enable%20Prometheus%20to%20access,defaults%20are%209545%20and%209001%20.
[Lighthouse]: https://lighthouse-book.sigmaprime.io/faq.html?highlight=9000#do-i-need-to-set-up-any-port-mappings
[Prysm]: https://docs.prylabs.network/docs/prysm-usage/p2p-host-ip#configure-your-firewall
[Teku]: https://docs.teku.consensys.io/how-to/find-and-connect/improve-connectivity#configure-ports
[Nimbus]: https://nimbus.guide/networking.html

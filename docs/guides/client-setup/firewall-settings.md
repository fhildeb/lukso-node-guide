---
sidebar_label: "6.1 Firewall Settings"
sidebar_position: 1
---

<!--TODO: Previous: All blockchain knowledge chapters-->

# 6.1 Firewall Settings

## 6.5 Open Network Ports

To let the Blockchain CLients communicate correctly, the ports, e.g., data communication channels, must be enabled on the node and the router. For each supported blockchain client, there are different ports to open.

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

> Within the [monitoring section](#) of this guide, you can find other internal communication channels that will be used for monitoring.

<!--TODO: 7-monitoring/01-core-tools.md-->

References:

- [Lighthouse Port Specification](https://lighthouse-book.sigmaprime.io/faq.html?highlight=9000#do-i-need-to-set-up-any-port-mappings)
- [Prysm Port Specification](https://docs.prylabs.network/docs/prysm-usage/p2p-host-ip#configure-your-firewall)
- [Geth Port Specification](https://github.com/ethereum/go-ethereum#configuration)
- [Erigon Port Specification](https://github.com/ledgerwatch/erigon#default-ports-and-firewalls)

## 6.6 Firewall Settings

We can edit the firewall settings after you spot which ports you need to open. We can do this the same way as in this guide's [system setup](/3-system-setup/) section.

Log in to your node if you are not already connected:

```sh
ssh <ssh-device-alias>
```

### 6.6.1 Opening the ports on the firewall

I will open all public ports used for the Geth and Prysm clients. Prysm is needed as it is the only fully supported validator for the LUKSO CLI for now. Since I choose stability over performance, I choose Geth, based on the warning notices from Erigon's repository.

```sh
# Geth or Erigon Execution Chain Data Channel
sudo ufw allow 30303/tcp

# Geth or Erigon Execution Chain Discovery
sudo ufw allow 30303/udp

# Prysm Beacon Gossip, Requests, and Responses
sudo ufw allow 13000/tcp

# Prysm Beacon Discovery, Requests, Data Exchange
sudo ufw allow 12000/udp

# Lighthouse or Teku Beacon Communication and Data
sudo ufw allow 9000/tcp
sudo ufw allow 9000/udp
```

The output of each command should always show:

```sh
Rule added
Rule added (v6)
```

### 6.6.2 Checking the configured ports

Now we can verify our firewall configuration as we did previously. If something is missing or configured wrong, look into the firewall section [firewall section](/3-system-setup/) of the system's setup.

```sh
sudo ufw status
```

The output for Geth and Prysm should look similar to the one underneath. Please note that `<preferred-ssh-port>` will be exchanged with your actual SSH port.

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

**If your client ports match, they are allowed from the node's point of view. In the next step, we need to enable inputs from the router's side.**

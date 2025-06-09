---
sidebar_label: "8.2 Port Configuration"
sidebar_position: 2
---

# 8.2 Port Configuration

:::danger

This page is currently under maintenance reworked and contains outdated content.

:::

## Opening Monitoring Ports

Our Blockchain Clients have various default ports over which specific monitoring can occur. We already used `8545` within the CLI setup to check the status of the execution client. Prometheus will the similar steps in a more advanced and automated way to generate metrics.

#### Blockchain Clients

| CLIENT / SERVICE | DESCRIPTION             | TCP PORT     |
| ---------------- | ----------------------- | ------------ |
| LIGHTHOUSE       | Prometheus              | 9090         |
| LIGHTHOUSE       | Grafana                 | not built-in |
| LIGHTHOUSE       | Ethereum JSON-RPC       | 8545         |
| PRYSM            | Prometheus              | 9090         |
| PRYSM            | Grafana                 | 8080         |
| PRYSM            | Ethereum JSON-RPC       | 8545         |
| PRYSM            | Validator               | 8081         |
| ---------------  | ----------------------- | --------     |
| NODE             | Prometheus Exporter Job | 9100         |
| BLACKBOX         | Prometheus Exporter Job | 9115         |
| JSON             | Prometheus Exporter Job | 7979         |
| Grafana          | Monitoring Dashboard    | 3000         |

#### Prometheus

Opening the Prometheus port allows access to the service's metrics in your personal computer's web browser. You can do this by adding the port rule to your firewall as previously done in the [Firewall Config](#):

<!--TODO: /3-system-setup/06-firewall-config.md -->

> Opening these ports allows access if your personal computer is connected to the local network. For external access, you would need advanced configurations on your router.

Log into your node machine if you are not signed in already.

```sh
ssh <ssh-device-alias>
```

Opening Prometheus Port:

```sh
sudo ufw allow 9090/tcp
```

Opening Grafana Port:

```sh
sudo ufw allow 3000/tcp
```

```sh
sudo ufw status
```

The output for Geth and Prysm should look similar to the one underneath. Please note that `<preferred-ssh-port>` will be exchanged with your actual SSH port.

```text
Status: active

To                         Action      From
--                         ------      ----
<preferred-ssh-port>/tcp        ALLOW       Anywhere
30303/tcp                       ALLOW       Anywhere
30303/udp                       ALLOW       Anywhere
13000/tcp                       ALLOW       Anywhere
12000/udp                       ALLOW       Anywhere
9090/tcp                        ALLOW       Anywhere
3000/tcp                        ALLOW       Anywhere
<preferred-ssh-port>/tcp (v6)   ALLOW       Anywhere (v6)
30303/tcp (v6)                  ALLOW       Anywhere (v6)
30303/udp (v6)                  ALLOW       Anywhere (v6)
13000/tcp (v6)                  ALLOW       Anywhere (v6)
12000/udp (v6)                  ALLOW       Anywhere (v6)
9090/tcp  (v6)                  ALLOW       Anywhere (v6)
3000/tcp  (v6)                  ALLOW       Anywhere (v6)
```

:::info

To `delete` a specific port rule using `UFW`, type the `<rule-number>` that is no longer required.

:::

```sh
sudo ufw delete <rule-number>
```

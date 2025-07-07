---
sidebar_label: "8.2 Port Configuration"
sidebar_position: 2
description: "Review and configure the required firewall and service ports to enable secure access to Grafana, Prometheus, and LUKSO node monitoring tools."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 8.2 Port Configuration

Dashboard and monitoring tools like Grafana and Prometheus require open access to be viewed from your personal computer or trough a VPN connecting to your node. This section outlines which ports are used, which need to be open, and what additional ports are used internally during further service configurations.

:::info

Similar to [checking peers](/docs/guides/modifications/peer-count-limits.md#1-check-peer-connections) or [attaching clients](/docs/guides/maintenance/problem-scanning.md#attach-execution-clients), Prometheus can listen to consensus client ports to collect status messages.

:::

## Monitoring Ports

Consensus blockchain clients have default monitoring ports that allow Prometheus to gather metrics.

| PORT | CLIENT                         | DESCRIPTION                      | TCP | External |
| ---- | ------------------------------ | -------------------------------- | --- | -------- |
| 3500 | [Prysm] ↗                      | Consensus and Validator REST API | ✔️  | ❌       |
| 5051 | [Teku] ↗                       | Consensus and Validator REST API | ✔️  | ❌       |
| 5052 | [Nimbus-Eth2] ↗                | Consensus and Validator REST API | ✔️  | ❌       |
| 5054 | [Lighthouse] ↗                 | Consensus Metrics                | ✔️  | ❌       |
| 5064 | [Lighthouse] ↗                 | Validator Metrics                | ✔️  | ❌       |
| 8008 | [Teku] ↗ <br/> [Nimbus-Eth2] ↗ | Consensus and Validator Metrics  | ✔️  | ❌       |
| 8080 | [Prysm] ↗                      | Consensus Metrics                | ✔️  | ❌       |
| 8081 | [Prysm] ↗                      | Validator Metrics                | ✔️  | ❌       |

Service ports also come with default ports to bundle and present data.

| PORT | SERVICE               | DESCRIPTION          | TCP | External |
| ---- | --------------------- | -------------------- | --- | -------- |
| 3000 | [Grafana] ↗           | Monitoring Dashboard | ✔️  | ✅       |
| 7979 | [JSON-Exporter] ↗     | Income Metrics       | ✔️  | ❌       |
| 9090 | [Prometheus] ↗        | Data Analytics       | ✔️  | ✅       |
| 9100 | [Node-Exporter] ↗     | Hardware Metrics     | ✔️  | ❌       |
| 9115 | [Blackbox-Exporter] ↗ | Connectivity Metrics | ✔️  | ❌       |

:::tip

Node clients and exporter services are for internal use. All their data is collected by Prometheus, that further sends it to Grafana to create visual graphs to the metrics.

:::

:::info

Client port numbers must be defined when creating the [**Prometheus**](/docs/guides/monitoring/prometheus.md) configuration file.

:::

## Firewall Configuration

You can add the Grafana and Prometheus port rules to your firewall as previously done in the [Client Setup](/docs/guides/client-setup/firewall-settings.md).

:::info

The following step is performed on your 💻 **personal computer**.

:::

**1. Node Connection**: _Log in to your node if you are not already connected._

```sh
ssh <ssh-device-alias>
```

:::info

The following steps are performed on your 📟 **node server**.

:::

**2. Add Port Rules**: _Allow the TCP ports from both Grafana and Prometheus to allow data access._

```sh
sudo ufw allow 3000/tcp
sudo ufw allow 9090/tcp
```

The output of each command should always show:

```sh
Rule added
Rule added (v6)
```

**3. Check Configuration**: _Verify the new firewall rules._

```sh
sudo ufw status
```

The output should look similar to this:

<Tabs>
<TabItem value="lh-teku-nimbus" label="Execution Client + Lighthouse, Teku, or Nimbus-Eth2">

```text
Status: active

To Action From

---

<preferred-ssh-port>/tcp         ALLOW       Anywhere
30303/tcp                        ALLOW       Anywhere
30303/udp                        ALLOW       Anywhere
9000/tcp                         ALLOW       Anywhere
3000/tcp                         ALLOW       Anywhere
9090/tcp                         ALLOW       Anywhere
<preferred-ssh-port>/tcp (v6)    ALLOW       Anywhere (v6)
30303/tcp (v6)                   ALLOW       Anywhere (v6)
30303/udp (v6)                   ALLOW       Anywhere (v6)
9000/tcp (v6)                    ALLOW       Anywhere (v6)
3000/tcp (v6)                    ALLOW       Anywhere (v6)
9090/tcp (v6)                    ALLOW       Anywhere (v6)
```

</TabItem> 
<TabItem value="prysm" label="Execution Client + Prysm">

```text
Status: active

To Action From

---

<preferred-ssh-port>/tcp         ALLOW       Anywhere
30303/tcp                        ALLOW       Anywhere
30303/udp                        ALLOW       Anywhere
13000/tcp                        ALLOW       Anywhere
12000/udp                        ALLOW       Anywhere
3000/tcp                         ALLOW       Anywhere
9090/tcp                         ALLOW       Anywhere
<preferred-ssh-port>/tcp (v6)    ALLOW       Anywhere (v6)
30303/tcp (v6)                   ALLOW       Anywhere (v6)
30303/udp (v6)                   ALLOW       Anywhere (v6)
13000/tcp (v6)                   ALLOW       Anywhere (v6)
12000/udp (v6)                   ALLOW       Anywhere (v6)
3000/tcp (v6)                    ALLOW       Anywhere (v6)
9090/tcp (v6)                    ALLOW       Anywhere (v6)
```

</TabItem> 
</Tabs>

:::info

The `<preferred-ssh-port>` property will be exchanged with your actual SSH port.

:::

:::warning

If something is missing, retry to apply the above rules or have a look into the [firewall configuration](/docs/guides/system-setup/firewall-configuration.md) for further details.

:::

If you need to modify the firewall rules, such as removing an unwanted port rule, you can list them all.

```sh
sudo ufw status
```

:::info

To `delete` a specific port rule using `UFW`, type the `<rule-number>` that is no longer required.

:::

```sh
sudo ufw delete <rule-number>
```

[Lighthouse]: https://lighthouse-book.sigmaprime.io/api_metrics.html
[Prysm]: https://prysm.offchainlabs.com/docs/monitoring-alerts-metrics/grafana-dashboard/
[Teku]: https://docs.teku.consensys.io/how-to/monitor/use-metrics
[Nimbus-Eth2]: https://nimbus.guide/options.html
[Grafana]: https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#http_port
[Prometheus]: https://prometheus.io/docs/introduction/first_steps/
[JSON-Exporter]: https://github.com/prometheus-community/json_exporter
[Node-Exporter]: https://github.com/prometheus/node_exporter
[Blackbox-Exporter]: https://github.com/prometheus/blackbox_exporter

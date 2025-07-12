---
sidebar_label: "11.9 Restart Monitoring"
sidebar_position: 9
description: "Fix stalled metrics and restore accurate monitoring on your LUKSO node by restarting Prometheus, Grafana, and exporter services safely."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 11.9 Restart Monitoring

Monitoring services collect and display important performance, health, and status metrics of your node. While these services are designed to start automatically with the system, issues like stalled exporters, configuration changes, or failed updates can require a manual restart. Resetting ensures metrics are refreshed, dashboards are populated correctly, and alerts are based on accurate data.

:::info

The following steps are performed on your 📟 **node server**.

:::

:::note

Monitoring tools can be restarted while the node is running.

:::

```sh
# Restart System & Hardware Metrics
sudo systemctl restart node_exporter

# Restart LYX Price Metrics
sudo systemctl restart json_exporter

# Restart Ping Metrics
sudo systemctl restart blackbox_exporter

# Restart Node Client Metrics
sudo systemctl restart prometheus

# Restart Grafana Dashboard
sudo systemctl restart grafana-server
```

:::info

Check the monitoring service's status and uptimes.

<Tabs>
<TabItem value="node" label="Node Exporter">

```sh
sudo systemctl status node_exporter
```

</TabItem> <TabItem value="json" label="JSON Exporter">

```sh
sudo systemctl status json_exporter
```

</TabItem> <TabItem value="blackbox" label="Blackbox Exporter">

```sh
sudo systemctl status blackbox_exporter
```

</TabItem> <TabItem value="prometheus" label="Prometheus">

```sh
sudo systemctl status prometheus
```

</TabItem> <TabItem value="grafana" label="Grafana Server">

```sh
sudo systemctl status grafana-server
```

</TabItem>
</Tabs>

:::

:::tip

Further details can be found within the [**Monitoring Tools**](/docs/theory/node-operation/monitoring-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section or the [**Monitoring Setup**](/docs/guides/monitoring/software-preparation.md).

:::

---
sidebar_label: "11.8 Reset Monitoring"
sidebar_position: 8
---

# 11.8 Reset Monitoring

Monitoring services collect and display important performance, health, and status metrics of your node. While these services are designed to start automatically with the system, issues like stalled exporters, configuration changes, or failed updates can require a manual restart. Resetting ensures metrics are refreshed, dashboards are populated correctly, and alerts are based on accurate data.

:::info

The following steps are performed on your 📟 **node server**.

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

:::tip

Further details can be found within the [**Monitoring Tools**](/docs/theory/node-operation/monitoring-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section or the [**Monitoring Setup**](/docs/guides/monitoring/software-preparation.md).

:::

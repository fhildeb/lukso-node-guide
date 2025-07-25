---
sidebar_label: "Monitoring Tools"
sidebar_position: 8
description: "Discover tools to monitor your LUKSO node’s health, uptime, network status, and validator performance using Prometheus, Grafana, and exporters."
---

# Monitoring Tools

Monitoring tools help node operators monitor hardware health, service availability, connection reliability, and validator performance. Whether someone is running a home setup or cloud nodes, real-time observability is essential to avoid downtime, correct bottlenecks, and respond quickly to any type of anomaly.

| Category                               | Description                                                                                                  | <nobr> Related Services </nobr>                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Local Monitoring** </nobr>    | Tracks and collects data **from within your own node**. <br /> Useful for internal health & uptime tracking. | - [Prometheus](/docs/guides/monitoring/prometheus.md) and [Grafana Dashboard](/docs/guides/monitoring/grafana.md)<br/>- [Node](/docs/guides/monitoring/node-exporter.md), [JSON](/docs/guides/monitoring/json-exporter.md), and [Blackbox Exporters](/docs/guides/monitoring/blackbox-exporter.md)                                                                                  |
| <nobr> **External Monitoring** </nobr> | Provides visibility into **your node's public behavior**. <br /> Useful for consensus and network analysis.  | - [Execution Explorer](/docs/guides/monitoring/external-monitoring.md#execution-block-explorer) and [Status Page](/docs/guides/monitoring/external-monitoring.md#execution-status-page)<br/>- [Consensus Explorer](/docs/guides/monitoring/external-monitoring.md#consensus-block-explorer) and [Status Page](/docs/guides/monitoring/external-monitoring.md#consensus-status-page) |

:::tip

A list of external tools, descriptions, and validator setups can be found within [**External Monitoring**](/docs/guides/monitoring/external-monitoring.md) of the 📖 [**Guide**](/docs/guides/validator-setup/precautions.md) section.

:::

:::info

Monitoring tools typically get connected to [**Alert Systems**](/docs/guides/alert-systems/telegram-bot.md) for receiving status updates and warnings via message or email.

:::

## Software List

Local node monitoring tracks the hardware condition and performance of a node. Commonly measured parameters usually include CPU load, memory pressure level, disk utilization, consensus and execution metrics, validator uptimes and syncing health. Having everything measured in real time, the software enables preemptive debugging and extended stability.

| Tool           | Description                                                                                                                                                                                                                                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prometheus** | Prometheus is an open source system and service monitor and alert tool. It gathers statistics from exporters based on periodic time intervals and provides historical data storage. The service works based on custom rules and alert configurations to proactively detect and diagnose anomalies within the node's infrastructure. |
| **Grafana**    | Grafana is a data visualisation system that converts Prometheus metrics into insightful dashboards. The service supports querying, visualising, alerting, and monitoring data over time. At local node configuration level, it is generally utilized as primary interface to monitor node health and blockchain-specific telemetry. |

## Exporter Services

In a Prometheus environment, internal as well as external metrics get exposed as local HTTP targets that get scraped and saved through exporter services. Depending on their purpose for use, they become system-level or application-level services.

:::info Categories

- **Machine-Centric Exporters**: Monitor system resources from the host's operation system or hardware.
- **Application-Centric Exporters**: Monitor specific services, blochain clients, or fetch external APIs.

:::

| Exporter                             | Description                                                                                                                                                                                                                                                                                                                |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Node Exporter** </nobr>     | Monitors hardware and statistics from the operation system such as CPU utilization, memory load, disk utilization growth, and network throughput. Running it on each node outlines a full picture of the system's health and prevents potential performance degradation.                                                   |
| <nobr> **JSON Exporter** </nobr>     | Periodically fetches data from JSON APIs. This type of exporter is generally used to fetch current prices of the staked coin to synchronize validator activity with market data. For LUKSO homestakers, the LYX price is fetchable using the [🦎 CoinGecko](https://www.coingecko.com/) API.                               |
| <nobr> **Blackbox Exporter** </nobr> | Frequently sends data requests to an stable external server, like the [📡 Google DNS](https://developers.google.com/speed/public-dns?hl=en), to ensure connectivity and low latency. The exporter is used to determine potential connection issues or clarify if downtime comes from the home network or external parties. |

:::tip

The table only shows the node's most important datapoints configured within the [**Monitoring Setup**](/docs/guides/monitoring/software-preparation.md) of the 📖 [**Guide**](/docs/guides/validator-setup/precautions.md) section. Optional exporters can be configured for various metrics and a more comprehensive dashboards.

:::

## Client Metrics

Each blockchain client comes with at least one built-in endpoint metrics endpoint to let Prometheus scrape and observe chain progression, peer connectivity, syncronization lag, and validator performance and returns in real-time.

| Client Type                         | Description                                                                                                                                                                                                                                                                                   |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Consensus Client** </nobr> | Consensus clients typically expose metrics for chain synchronization, finality, slot and epoch tracking, peer count, memory usage, and log events. Key metrics include the current head slot, network liveness and participation rate, and peer connections.                                  |
| <nobr> **Validator Client** </nobr> | Validator clients usually provide detailed telemetry on validator-specific behavior like earnings, return rates, successful or failed duties, inactivity scores, and slashing status. Often, they also monitory the average balance or the number of currently exiting or pending validators. |

:::warning Differences

The **Metrics** and **Dashboards** differ across clients, as they expose various lables.

- **Prysm**: Exposes all data streams from validators and consensus clients.
- **Teku**: Does not show slashing validators, failed attestations and aggregations, <br/> inactivity scores, or validator balances, statuses, returns, and earnings.
- **Nimbus-Eth2**: Does not show slashing validators or separated validator <br/> logs for memory usage, uptime, restarts, errors, and warnings.
- **Lighthouse**: Does not expose slashing validators.

:::

:::tip

The **Nimbus-Eth2** client is not supported for Staking within the [**LUKSO CLI**](https://github.com/lukso-network/tools-lukso-cli). Additionally, the consensus client requires a custom `--validator-monitor-details` flag to expose regular blockchain metrics. When using the LUKSO CLI, the dashboard will still lack metrics until staking is fully supported. Further details can be found on the [**Monitoring Settings**](/docs/guides/maintenance/monitoring-settings.md) page of the 📖 [**Guide**](/docs/guides/validator-setup/precautions.md) section.

:::

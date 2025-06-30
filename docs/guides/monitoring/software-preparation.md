---
sidebar_label: "8.1 Software Preparation"
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 8.1 Software Preparation

Node monitoring ensures that operators can solve issues ahead of time, maintain uptime, and optimize performance by providing real-time insight into system health, client status, and network usage. This page will walk you through the software installs and configurations needed to get your monitoring environment up and running. All the monitoring tooling, regardless of the client configurations, generally follows a modular approach of software modules.

| Step | Name                                    | Description                                                |
| ---- | --------------------------------------- | ---------------------------------------------------------- |
| 1    | Install Core Tools & Port Configuration | Install required packages and expose monitoring ports.     |
| 2    | Create Exporter Services                | Export metrics like system, consensus, and execution data. |
| 3    | Setup Prometheus                        | Scrape and process metrics from exporter services.         |
| 4    | Configure Grafana                       | Visualizing metrics and creating dashboards.               |
| 5    | Configure Dashboard                     | Load dashboards and configure alerts.                      |

:::tip

Further details about node analytics can be found on the [**Monitoring Tools**](/docs/theory/node-operation/monitoring-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

<Tabs groupId="editor">
  <TabItem value="lukso-cli" label="👾 LUKSO CLI" default>

The LUKSO CLI does not restrict the use of additional tools and monitoring solutions, but it also doesn’t include any monitoring tools out of the box. That means the setup must be done manually and will dock onto the already running clients. The following six tools are essential to install before setting up Prometheus, Grafana, and the required Exporters:

| Tool                                          | Description                                                                            |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| <nobr> **wget** </nobr>                       | Utility for downloading files to fetch resources directly from the terminal.           |
| <nobr> **make** </nobr>                       | Automation tool used to compile software, required for compiling some exporter tools.  |
| <nobr> **git** </nobr>                        | Version control system used to clone repositories for exporter services.               |
| <nobr> **apt-transport-https** </nobr>        | Allows to securely download packages over HTTPS, required for third-party software.    |
| <nobr> **software-properties-common** </nobr> | Provides useful tools like `add-apt-repository` to manage software sources.            |
| <nobr> **gnupg2** </nobr>                     | Standard for secure encryption and signing, required for verifying package signatures. |

:::info

The following step is performed on your 📟 **node server**.

:::

```sh
sudo apt install wget make git apt-transport-https software-properties-common gnupg2
```

</TabItem> <TabItem value="dappnode" label="🎨 DAppNode">

DAppNode provides an integrated monitoring solution called [**DAppNode Monitoring Service**](https://docs.dappnode.io/docs/user/packages/dms/). The software solution includes all necessary tools such as node exporters, Prometheus, and Grafana out of the box. The dashboards come pre-configured, and services are automatically hooked into the DAppNode-managed blockchain clients without custom installation.

- [DAappNode DMS Setup](https://docs.dappnode.io/docs/user/packages/dms/)
- [DAppNode Metrics](https://docs.dappnode.io/docs/user/ethical-metrics/overview/)

</TabItem> <TabItem value="docker" label="🐳 Docker">

The LUKSO team provides a separate [**Docker Monitoring Setup**](https://github.com/lukso-network/network-docker-monitoring), designed to work alongside their default Docker repositories for node operators. The configuration includes all necessary exporter services, Prometheus, and Grafana within one single container.

- [LUKSO Docker Monitoring Setup](https://github.com/lukso-network/network-docker-monitoring)
- [LUKSO Docker Containers](https://github.com/lukso-network/network-docker-containers)

</TabItem>
</Tabs>

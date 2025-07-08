---
sidebar_label: "8.8 Dashboard Configuration"
sidebar_position: 8
description: "Set up a Grafana dashboard to visualize Prometheus metrics, monitor node health, and track performance with real-time charts and alerts."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 8.8 Dashboard Configuration

A Grafana dashboard is a powerful interface for visualizing real-time metrics, allowing node operators to monitor client performance, hardware usage, validator income, and network health. This guide will cover how to configure the dashboard interface after previously setting up the Prometheus data collector and exporter services.

![Dashboard Preview](/img/guides/monitoring/dashboard.jpeg)

:::tip

Further details about node analytics can be found on the [**Monitoring Tools**](/docs/theory/node-operation/monitoring-tools.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::info

The following step is performed on your 📟 **node server**.

:::

## 1. Resolve IP Address

<Tabs>
<TabItem value="local-ip" label="Local IP Check" default>

:::info

You can use the `ip` tool to display the system’s default package route and source IP when connecting to the router. The default gateway's IP address is the intermediate route the system takes when sending data to an IP address outside its local network.

:::

```sh
ip route show default
```

The output will look like this:

```sh
default via <GATEWAY_IP_ADDRESS> dev eno1 proto dhcp src <NODE_IP_ADDRESS> metric <ROUTING_WEIGHT>
```

</TabItem>
<TabItem value="public-ip" label="Public IP Check">

:::info

You can use the `ip` tool to query a stable external address like the Google DNS address `8.8.8.8` to reveal your source IP and further filter the IP parameter from the server's response using the text-processing tool `awk`.

:::

```sh
ip route get 8.8.8.8 | awk '{print $7}'
```

</TabItem>
</Tabs>

Remember or copy your node's IP address, then log out of your node and continue using your personal computer's browser.

```sh
exit
```

:::info

The following steps are performed on your 💻 **personal computer**.

:::

## 2. Access Web Interface

Open your browser and access your node's IP address on the [previously opened](/docs/guides/monitoring/port-configuration.md) Grafana port.

```text
http://<static-node-ip>:3000
```

:::info

Exchange `your-static-node-ip` with the actual retreived IP address.

:::

The default login credentials to the Grafana dashboard will be the following:

```text
DEFAULT CREDENTIALS
-------------------
username: admin
password: admin
```

:::warning

Set a new secure and long password when prompted by Grafana. Security is vital as this page will be exposed through VPNs.

:::

## 3. Add Prometheus Data Source

By default, Grafana is not listening to any metrics that were previously set up using [Prometheus](/docs/guides/monitoring/prometheus.md) and all it's data sources. You have to first attach the running Prometheus service to the Grafana Dashboard so it can listen and gather metrics in it's own database.

1. Open the **Burger Menu** icon on the left side
2. Click **Connections** to manage data sources
3. Clic **Data sources** on the left menu bar
4. Click the **Add Data Source** button at the top right
5. Click the **Prometheus** card in the middle screen
6. Enter `http://127.0.0.1:9090/` as **URL** to listen for data
7. Click **Save & Test** before continuing with the setup

:::tip

You should see a green _Data source is working_ checkmark before continuing to import the dashboard.

:::

## 4. Import Dashboard

After configuring the data source, you can continue to add the dashboard to vizualize the collected data and configure alerts. This guide already comes with a set of prebuilt Grafana templates that are ready to use. If you want, those dashboards can later be adjusted and modified to further customize your experience.

1. Navigate to the 📝 [**Template**](/templates) section of this page
2. Choose the **JSON File** based on your [Consensus Client](/docs/guides/monitoring/prometheus.md), [Grafana Version](/docs/guides/monitoring/grafana.md), and [Fiat Currency](/docs/guides/monitoring/json-exporter.md).
3. Copy the raw **JSON File** contents by opening the file with a text editor
4. Open the **Grafana Landing Page** by clicking on the logo on the top left
5. Click the **Plus Icon** on the top right corner of the page
6. Click on **Import Dashboard** to add a new interface
7. Paste the raw contents to the **Import via Panel JSON** text box
8. Click the **Load** button to apply validity checks
9. Click the **Import** button to install the dashboard

:::tip

If you chose different **Ports** or **Prometheus Job-Names**, you will have to modify and match all configuration files.

1. Consensus client ports can be adjusted within the [Prometheus Dataset Configuration](/docs/guides/monitoring/prometheus.md#3-dataset-configuration).
2. Price Conversions require updating the [JSON Explorer Configuration](/docs/guides/monitoring/json-exporter.md#3-price-configuration) and [Prometheus Dataset Configuration](/docs/guides/monitoring/prometheus.md#3-dataset-configuration).
3. Job Names of the [Prometheus Dataset](/docs/guides/monitoring/prometheus.md#3-dataset-configuration) must match the Jobs of the [Grafana Dashboard](/templates).

:::

:::info

Great and free examples of editors with JSON formatting are 🦎 [**Notepad++**](https://notepad-plus-plus.org/) or 🔹 [**Visual Studio Code**](https://code.visualstudio.com/).

:::

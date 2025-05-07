---
sidebar_label: "Monitoring Tools"
sidebar_position: 10
---

# Monitoring Tools

<!--TODO: Add link to external monitoring guide page and show explorers previews-->
<!--TODO: differentiate between local and external monitoring in a table, listing the tools and the info they gather-->

## 7.1 Core Tools for Monitoring

Local node monitoring is observing and tracking a blockchain or validator node's performance, health, and status within a network. This monitoring ensures that the validator node functions correctly, efficiently, and securely. By regularly gathering and analyzing key performance metrics, such as CPU usage, memory consumption, disk space, network latency, and the number of connected peers, local node monitoring helps to identify potential issues and bottlenecks, enabling prompt corrective actions.

Additionally, monitoring the validator's activity, such as the number of proposed and validated blocks, can provide insights into the overall performance and contribution of the node to the blockchain network.

### 7.1.1 Monitoring Software List

It's crucial to monitor various aspects of its functionality, such as hardware usage, network connectivity, and even the performance of the associated cryptocurrency in the market. A comprehensive monitoring setup can help detect potential issues early, reduce downtime, and optimize performance. In this guide, we will install five core monitoring services widely used across servers and nodes.

- **Prometheus**: Prometheus is an open-source system monitoring and alerting toolkit. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays the results, and can trigger alerts if some condition is observed to be true. In the context of the blockchain node, Prometheus collects metrics for various exporter services. This data is vital for monitoring your blockchain nodes' performance, health, and reliability, providing alerts for abnormal data, and helping you diagnose and fix issues more quickly.
- **Grafana**: Grafana is an open-source platform for monitoring and observability. It queries, visualizes, alerts on, and understands your metrics no matter where they are stored. In the node setup, Grafana is used to query Prometheus for metrics and display this information in a user-friendly dashboard. It's an essential tool because it helps visualize the data in an easy-to-understand format, allowing you to spot trends, track the performance over time, and identify abnormal patterns. Grafana's alerting feature can also notify you when certain conditions are met, helping you respond quickly to potential issues.

### 7.1.2 Exporter Services

In the Prometheus monitoring ecosystem, exporters play a crucial role. They are applications that expose a system's metrics in a format that Prometheus can understand, enabling Prometheus to track those metrics over time. This capacity to tap into a wide variety of system metrics is a vital part of what makes Prometheus such a versatile and powerful monitoring tool.

Prometheus exporters are typically used for two primary types of jobs:

- **Machine-centric exporters**: These exporters fetch metrics from the host machine's kernel and operating system. They expose system-level metrics, such as CPU usage, memory, disk I/O, network traffic, and more. An example of this kind of exporter is the Node Exporter.
- **Application-centric exporters**: These exporters fetch metrics about the performance of a specific application or service running on a system. Such software could include request latency, error rates, and queue lengths. Examples include the MySQL exporter for MySQL databases, the JSON Exporter for network probing, and the JSON Exporter for data from JSON endpoints.

By leveraging the right mix of exporters, the node can create a comprehensive monitoring solution that provides deep insights into performance and health. In this guide, we will focus on these Prometheus exporter services:

- **Node Exporter**: Exporter for hardware and OS metrics. It allows you to measure various machine resources such as memory, disk I/O, CPU usage, and network statistics. Hardware metrics are crucial because they give you a broad overview of your machine's performance and health. They allow you to monitor how your node affects your system's resources and catch any potential issues (like memory leaks or high CPU usage) before they cause problems. Running Node Exporter on every node of your network provides you with valuable insights and helps ensure the smooth operation of your blockchain applications.
- **JSON Exporter**: Exporter to scrape data from JSON endpoints and expose it as Prometheus. In our case, it's being used to fetch LUKSO price information from CoinGecko. Conveying price information is important because it enables us to monitor LUKSO's market performance directly from your Prometheus and Grafana setup, providing a unified view of your node's performance and the associated token's market performance. It saves time and provides convenience, eliminating the need to check this information on separate platforms.
- **Blackbox Exporter**: Exporter that probes endpoints over protocols such as HTTP, HTTPS, DNS, TCP, and ICMP and provides detailed metrics on the results. In our case, it monitors the ping time between the node machine and two DNS servers. This information can be crucial in diagnosing network-related issues. If the ping time is too long or the connection fails, it could indicate network problems affecting your node's performance or its ability to stay in sync with the rest of the blockchain network.

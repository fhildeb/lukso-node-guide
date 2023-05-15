## 7.1 Core Tools for Monitoring

Local node monitoring is the process of observing and tracking the performance, health, and status of a blockchain or validator node within a network. This monitoring ensures that the validator node is functioning correctly, efficiently, and securely. By regularly gathering and analyzing key performance metrics, such as CPU usage, memory consumption, disk space, network latency, and the number of connected peers, local node monitoring helps to identify potential issues and bottlenecks, enabling prompt corrective actions.

Additionally, monitoring the validator's activity, such as the number of proposed and validated blocks, can provide insights into the overall performance and contribution of the node to the blockchain network.

### 7.1.1 Monitoring Software List

To ensure the smooth operation of a node, it's crucial to monitor various aspects of its functionality, such as hardware usage, network connectivity, and even the performance of the associated cryptocurrency in the market. A comprehensive monitoring setup can help detect potential issues early, reduce downtime, and optimize performance. In this guide, we gonna install five core monitoring services that are widely used across servers and nodes.

- **Prometheus**: Prometheus is an open-source system monitoring and alerting toolkit. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays the results, and can trigger alerts if some condition is observed to be true. In the context of the blockchain node, Prometheus collects metrics various exporter services. This data is vital for monitoring the performance, health, and reliability of your blockchain nodes, providing alerts for abnormal data, and helping you diagnose and fix issues more quickly.
- **Grafana**: Grafana is an open-source platform for monitoring and observability. It queries, visualizes, alerts on, and understands your metrics no matter where they are stored. In the node setup, Grafana is used to query Prometheus for metrics and display this information in a user-friendly dashboard. It's an essential tool because it helps visualize the data in an easy-to-understand format, allowing you to spot trends, track the performance over time, and identify abnormal patterns. Grafana's alerting feature can also notify you when certain conditions are met, helping you respond quickly to any potential issues.

### 7.1.2 Exporter Services

In the Prometheus monitoring ecosystem, exporters play a crucial role. They are applications that expose a system's metrics in a format that Prometheus can understand, enabling Prometheus to track those metrics over time. This capacity to tap into a wide variety of system metrics is a key part of what makes Prometheus such a versatile and powerful monitoring tool.

Prometheus exporters are typically used for two primary types of jobs:

- **Machine-centric exporters**: These exporters fetch metrics from the host machine's kernel and operating system. They expose system-level metrics, such as CPU usage, memory, disk I/O, network traffic, and more. An example of this kind of exporter is the Node Exporter.
- **Application-centric exporters**: These exporters fetch metrics about the performance of a specific application or service running on a system. This could include things like request latency, error rates, queue lengths, and more. Examples include the MySQL exporter for MySQL databases, the JSON Exporter for network probing, and the JSON Exporter for data from JSON endpoints.

By leveraging the right mix of exporters, the node can create a comprehensive monitoring solution that provides deep insights into the performance and health. In this guide, we will focus on these Prometheus exporter services:

- **Node Exporter**: Exporter for hardware and OS metrics. It allows you to measure various machine resources such as memory, disk I/O, CPU usage, network statistics, and more. This is crucial because these metrics give you a broad overview of your machine's performance and health, allowing you to monitor how your node is affecting your system's resources and catch any potential issues (like memory leaks or high CPU usage) before they cause problems. Running Node Exporter on every node of your network provides you with valuable insights and helps ensure the smooth operation of your blockchain applications.
- **JSON Exporter**: Exporter to scrape data from JSON endpoints and expose it as Prometheus. In our case, it's being used to scrape LUKSO price information from CoinGecko. This is important because it enables us to monitor LUKSO's market performance directly from your Prometheus and Grafana setup, providing a unified view of both your node's performance and the associated token's market performance. It saves time and provides convenience, eliminating the need to check this information on separate platforms.
- **Blackbox Exporter**: Exporter that probes endpoints over a series of protocols such as HTTP, HTTPS, DNS, TCP, and ICMP, and provides detailed metrics on the results. In our case, it's used to monitor the ping time between the node machine and two DNS servers. This information can be crucial in diagnosing network-related issues. If the ping time is too long or the connection fails altogether, it could indicate network problems affecting your node's performance or its ability to stay in sync with the rest of the blockchain network.

### 7.1.3 Opening Default Monitoring Ports

Our Blockchain Clients have various default ports over which certain monitoring can take place. We already used `8545` within the CLI setup to check the status of the execution client. Prometheus will to the similar steps in a more advanced and automated way to generate metrics.

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

Opening the Prometheus port allows access to the service's metrics in the web browser of you personal computer. You can do this by adding the port to your firewall as previously done in the [Firewall Config](/3-system-setup/06-firewall-config.md):

> Opening these ports allows access to them if you personal is connected to the local network. For external access, you would need advanced configurations on your router.

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

The output for Geth and Prysm should look similar to the one underneath. Please note that `<prefered-ssh-port>` will be exchanged with your actual SSH port.

```text
Status: active

To                               Action      From
--                               ------      ----
<prefered-ssh-port>/tcp          ALLOW       Anywhere
3000/tcp                         ALLOW       Anywhere
9090/tcp                         ALLOW       Anywhere
30303/tcp                        ALLOW       Anywhere
30303/udp                        ALLOW       Anywhere
13000/tcp                        ALLOW       Anywhere
12000/udp                        ALLOW       Anywhere
<prefered-ssh-port>/tcp (v6)     ALLOW       Anywhere (v6)
3000/tcp                         ALLOW       Anywhere (v6)
9090/tcp                         ALLOW       Anywhere (v6)
30303/tcp (v6)                   ALLOW       Anywhere (v6)
30303/udp (v6)                   ALLOW       Anywhere (v6)
13000/tcp (v6)                   ALLOW       Anywhere (v6)
12000/udp (v6)                   ALLOW       Anywhere (v6)
```

### 7.1.4 Installing Core Tools

Effective node monitoring is essential for maintaining a reliable and secure node and fostering trust within the blockchain ecosystem. Let's follow up with explaining the different tools and installing some core packages needed to download and execute such software.

- **wget**: Utility for non-interactive download of files from the Web. It supports HTTP, HTTPS, and FTP protocols, as well as retrieval through HTTP proxies. It's particularly useful for downloading files from the command line, automating downloads, or when a graphical user interface is not available, like on our server installation.
- **make**: Build automation tool that automatically builds executable programs and libraries from source code by reading files called Makefiles, which specify how to derive the target program. It's widely used in software development for compiling and linking source code files.
- **git**: Distributed version control system for tracking changes in source code during software development, allowing developers to collaborate, clone and manage software projects effectively. It will help us downloading code repositories.
- **apt-transport-https**: Service that allows the package management utility apt to retrieve files over the https protocol. Once it's installed, it allows APT to retrieve packages from HTTPS URLs using the `deb` keyword.
- **software-properties-common**: Software package that provides some useful tools for adding and managing software repositories. The most common tool it offers is the `add-apt-repository` command to add package archivesto the node.

Log into your node machine, if you are not signed in already.

```sh
ssh <ssh-device-alias>
```

Then continue with installing the following six tools that we will need to set up Prometheus, Grafana, and all the Exporters:

```sh
sudo apt install wget make git apt-transport-https software-properties-common
```

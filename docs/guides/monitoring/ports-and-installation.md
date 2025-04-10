---
sidebar_label: "8.2 Ports and Installation"
sidebar_position: 2
---

# 8.2 Monitoring Ports

### 7.1.3 Opening Default Monitoring Ports

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

# 8.2 Ports and Installation

### 7.1.4 Installing Core Tools

Effective node monitoring is essential for maintaining a reliable and secure node and fostering trust within the blockchain ecosystem. Let's follow up by explaining the different tools and installing some core packages needed to download and execute such software.

- **wget**: Utility tool for non-interactive download of files from the Web. It supports HTTP, HTTPS, and FTP protocols and retrieval through HTTP proxies. It's beneficial for downloading files from the command line, automating downloads, or when a graphical user interface is unavailable, like on our server installation.
- **make**: Automation tool for software builds, generating executable programs and libraries from source code by reading files called Makefiles, which specify how to derive the target program. It's widely used in software development for compiling and linking source code files.
- **git**: Distributed version control system for tracking changes in source code during software development, allowing developers to collaborate, clone, and manage software projects effectively. It will help us download code repositories.
- **apt-transport-https**: Software service allowing the package management utility to retrieve files over the HTTPS protocol. Once installed, APT can retrieve packages more securely.
- **software-properties-common**: A software package that provides some useful tools for adding and managing software repositories. The most common tool it offers is the `add-apt-repository` command to add software packages to the node.
- **gnupg2**: OpenPGP standard for encrypting and signing data and communication. It is used to receive and install signed software packages.

Install the following six tools that we will need to set up Prometheus, Grafana, and all the Exporters:

```sh
sudo apt install wget make git apt-transport-https software-properties-common gnupg2
```

---
sidebar_label: "Operation Systems"
sidebar_position: 4
---

# Operation Systems

## 2.1 Operating System

When it comes to setting up blockchain nodes, both Ubuntu and Debian can be good choices for operating systems, and your choice can depend on factors like stability, ease of use, and the specific features and tools each offers. Here's a comparison of the two in the context of an EVM node setup:

### 2.1.1 Ubuntu Focus Points

Ubuntu 22.04.2 Server is the latest iteration of one of the world's most popular and widely-used Linux distributions. It's a proven, reliable platform designed to provide you with a secure, high-performance, and low-maintenance solution tailored to decentralized networks' demanding world.

- **Ease of Use**: Ubuntu has a reputation for being more user-friendly, with a well-documented community and a large collection of easily-installable packages. For users new to Linux or node setups, this can be beneficial.
- **Support**: Ubuntu has robust support, both through official channels and its vibrant community, which can be a plus if you're likely to need assistance.
  **Release Cycle**: Ubuntu follows a six-month release cycle for new versions, with Long Term Support (LTS) versions released every two years. This regular release schedule can mean more frequent updates and access to newer software.
- **Software Compatibility**: Ubuntu often provides more up-to-date software packages.

### 2.1.2 Debian Focus Points

Debian 11 Bullyeye is the most recent stable release of one of the pioneering and deeply respected Linux distributions. It's a tried-and-true platform engineered to deliver a secure, high-performing, and low-maintenance solutions. Debian is celebrated for its commitment to stability, reliability, and its broad software library.

- **Stability**: Debian is known for its focus on stability, which can be an advantage if you need to maintain a long-running node without unexpected issues or downtime.
- **Security**: Debian has a strong emphasis on security, with a dedicated security team and a rigorous testing process for new software packages. For a critical application like an node, this can be a significant advantage.
- **Resource Usage**: Debian generally uses fewer system resources than Ubuntu, which can be a benefit if you're running an node on a system with limited resources.
- **Advanced Users**: Debian is often seen as a distribution for more experienced Linux users. If you're comfortable digging into the command line and solving problems independently, Debian can offer a powerful, stable platform for an node.

### 2.1.3 System Decision

Both Ubuntu and Debian are built on similar foundations, but their philosophies and approaches can lead to different experiences when setting up and running an node. If you're a beginner or value ease of use and good support, Ubuntu might be the best choice. If you're an advanced user who values stability, security, and lower resource usage, Debian might be the better fit.

Remember that either distribution will be capable of running a node successfully. Your personal preferences, familiarity with the distribution, and specific requirements will be the decisive factors.

As both Ubuntu and Debian are based on the Linux kernel, a vast majority of Linux commands will work on both. The guide will be done installing Ubuntu 22.04.2, and there might be slight differences. However, it should not worry you since you can always find help online quickly.

### 2.1.4 Important Specifications

Based on [Ether Nodes](https://www.ethernodes.org/os), more than 97% of EVM nodes run on Linux distributions, most popularly Ubuntu or Debian. The famous EVM Node and Software Company [Dappnode](https://dappnode.com/) is using Debian under the hood. But both operating systems come with lots of different versions and packages. Let's list what is relevant for us when we want to operate our node:

#### Using the Server Version

Choosing the server over the desktop version for a blockchain node offers several advantages that make it a more suitable option for running server-oriented applications, such as nodes. Some of the key reasons for selecting Ubuntu Server include:

- **Minimal resource usage**: Server versions are designed without a graphical user interface (GUI) and has minimal pre-installed packages. This results in lower resource consumption (CPU, memory, and storage), which is essential for optimizing the performance of a blockchain node.
- **Increased stability and reliability**: The streamlined nature of server versions, with fewer packages and no GUI, reduces the potential for software conflicts, crashes, and security vulnerabilities. Fewer packages lead to a more stable and reliable node environment.
- **Focus on server applications**: Server versions are tailored explicitly for server applications, with pre-installed packages and tools designed to support server use cases. Packages designed for continuous operation make it an ideal platform for running blockchain nodes, often requiring server-grade performance, networking, and security features.
- **Regular updates and security patches**: Server versions in general receive more frequent updates and security patches, ensuring your node remains secure and up-to-date with the latest software versions.

#### Having Long-Term Support

LTS refers to a software version that receives extended support regarding updates, bug fixes, and security patches. For both, Ubuntu and Debian Server, LTS releases are maintained for five years, whereas non-LTS releases are supported for only nine months. This extended support period is crucial for blockchain nodes, ensuring that your node remains secure, stable, and compatible with the ever-evolving blockchain ecosystem.

- [Ubuntu LTS Declaration](https://wiki.ubuntuusers.de/Long_Term_Support/)
- [Debian LTS Page](https://wiki.debian.org/LTS)

Selecting an LTS release for Ubuntu 22 or Debian 11 offers several key advantages:

- **Improved Stability**: LTS releases prioritize stability and reliability, making them ideal for mission-critical applications like blockchain nodes, which require uninterrupted operation and minimal downtime.
- **Greater Security**: With an LTS release, you can be assured of regular security updates and patches, safeguarding your node from potential vulnerabilities and threats.
- **Lower Maintenance Overhead**: The extended support period means you won't need to upgrade your node's OS as frequently, reducing the maintenance effort and associated downtime.
- **Wider Compatibility**: LTS releases are often better supported by third-party software and tools, ensuring seamless integration with various blockchain networks and applications.

#### Installation Types

<!--TODO: reorg and rewrite-->

Choose your type of installation for the node:

- `Ubuntu Server`
- `Ubuntu Server (minimized)`

Here are some of the [core differences](https://ubuntuforums.org/showthread.php?t=2474104):

```text
Minimized Ubuntu Server has 420 packages installed.
Regular Ubuntu Server has 606 packages installed.
That is a 31% reduction.

Minimized Ubuntu Server takes up ~4,200 MB storage when initially installed
Regular Ubuntu Server takes up ~4,600 MB storage when initially installed
That is a difference of 400 MB in size, a reduction of 11%.

Minimized Ubuntu Server uses ~180,000 KB of RAM
Regular Ubuntu Server uses ~197,000 KB of RAM
That is a difference of 17,000 KB of RAM, a reduction of 9%.

User Interaction on Minimized Ubuntu Server:
- No text editor (vi, vim, nano)
- No `ufw` nor `iptables` commands
- No man pages (documentation)
```

As the installation screen states, `Ubuntu Server (minimized)` is designed for automated deployment at scale for cloud substrates without user interaction. They use the optimized kernels, optimized boot process, and significantly reduced default packages to be smaller, boot faster, and require fewer security updates over time. All those properties might be vital if you're maintaining multiple VMs or containers.

While `Ubuntu Server (minimized)` boils down to saving packets and having a slightly faster system, it can be a hazard for our node maintenance, as it would mean that you have to install every tool package during the node setup manually.

> During some minimal version test runs, this also affected some internal processes without throwing errors during run time. Because of the lack of process documentation, some logging services are not triggered on the core system. The reduced logging affects checking the status of external software, which expects log or configuration data creation. Here, specific files had to be manually created and adjusted for status commands to work.

Installing the `Ubuntu Server` version is recommended, as we want to do all user interaction ourselves and need text editors, firewall configuration, and, most importantly, all available backend processes that might break some automation.

> Shoutout to Lumenous, who helped me clarify these differences

:::info

The minimized version is designed for automated deployment at scale (primarily for cloud setups) and is optimized for speed and smaller footprint. However, for a blockchain node where manual maintenance, logging, and configuration are important, we recommend installing the full **Ubuntu Server** version.

:::

Below is a table outlining the core differences between these two options:

| Feature                                 | Ubuntu Server          | Ubuntu Server (minimized)                                     |
| --------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| **Installed Packages**                  | ~606 packages          | ~420 packages (31% reduction)                                 |
| **Storage Footprint (Initial Install)** | ~4,600 MB              | ~4,200 MB (11% reduction)                                     |
| **RAM Usage (Initial Install)**         | ~197,000 KB            | ~180,000 KB (9% reduction)                                    |
| **User Interaction**                    | Full interactive setup | Minimal; lacks text editors, firewall commands, and man pages |

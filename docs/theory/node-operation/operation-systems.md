---
sidebar_label: "Operation Systems"
sidebar_position: 1
---

# Operation Systems

The choice of operating system for blockchain nodes makes a considerable difference in terms of security, availability, and compatibility. Node operators mostly use open source-based Linux distributions because they are very stable and perform well and have wide compatibility with Ethereum Virtual Machine toolsets. Ubuntu and Debian lead among them because they have strong package management and support life cycles.

:::tip External Analysis

- According to 🍃 [**Ether Nodes**](https://www.ethernodes.org/os), more than 95% of EVM-based nodes run on Linux, with **Ubuntu** and **Debian** on top.
- Wide-spread consumer software like 🎨 [**DAppNode**](https://dappnode.com/) also operates **Debian** under the hood.

:::

## System Comparison

Ubuntu and Debian are both capable operating systems for running a blockchain node.

| Feature      | Ubuntu                                                                                                       | Debian                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Overview** | _Most popular and widespread Linux distribution with regular updates, low maintenance, and great stability._ | _Rock-solid Linux distribution focused on long-term stability, reliability, security, and minimalism._       |
| **Focus**    | - User-Friendliness <br/> - Frequent Updates <br/> - Easy Access to Latest Software <br/> - Active Community | - Maximum Stability <br/> - Lower Resource Use <br/> - Conservative Release Cycles <br/> - Ideal for Experts |

:::info

Ubuntu and Debian both are distributions of high-performance operating systems with considerable support for various platforms. Both distributions act as effective nodes. The main difference is how users want to balances usability and stability, and how much manual effort one is willing to take in setting up modern defaults.

:::

:::tip

The [Hardware Setup](/docs/guides/hardware-setup/introduction.md) of the [📖 **Guide**](/docs/guides/validator-setup/precautions.md) section uses **Ubuntu 22.04.2 LTS Server**. While Debian users can follow along, some commands or package names may slightly differ. Feel free to look up distribution-specific alternatives when needed.

:::

## Server Systems

It is strongly advised to use a server version of an operating system over a desktop version. Server versions are designed to be operated headless and ensure a decrease in background processes that could interfere with system functioning.

| Feature                                              | Description                                                                                                                                                             |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Minimal Resource Usage** </nobr>            | It lacks a graphical user interface and unnecessary packages, thus reducing the overall CPU, memory, and disk usage, which improves the performance of the node.        |
| <nobr> **Increased Stability & Reliability** </nobr> | Fewer packages mean fewer points of failure, such as avoiding graphical rendering and display output, unwanted package interactions, or reserved ports.                 |
| <nobr> **Focus on Server Apps** </nobr>              | The system is built using command-line tools and services that mainly target the backend, making it very fitting for persistent processes and software daemons.         |
| <nobr> **Security and Patch Cycle** </nobr>          | It gets more regular security and software updates than regular consumer repositories, thus allowing all its components to be kept up-to-date to their newest versions. |

## Long-Term Support

Both software manufacturers offer special long-term-support versions of their operation systems, serving as checkpoints through their rollouts. LTS versions get more frequent security upgrades, receive support over extended periods, and go through rigorous testing before their releases. These versions are critically designed for business servers expected to run with little interruption.

:::info Additional Resources

- **Ubuntu**: [Lifecycle and Release Cadence](https://ubuntu.com/about/release-cycle)
- **Debian**: [Long Term Support](https://wiki.debian.org/LTS)

:::

| Feature                                 | Description                                                            |
| --------------------------------------- | ---------------------------------------------------------------------- |
| <nobr> **Improved Stability** </nobr>   | Prioritizes uptime and reliability for all included software packages. |
| <nobr> **Greater Security** </nobr>     | Extended patch cycle with regular updates for core system packages.    |
| <nobr> **Lower Maintenance** </nobr>    | Avoids frequent upgrades or reinstallations over the years.            |
| <nobr> **Better Compatibility** </nobr> | Supported by a wider range of node software and community guides.      |

## Installation Types

Most installers support different images types, most notably normal and minimized setups.

| Type            | Regular Installation                                                                   | Minimized Installation                                                                      |
| --------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Purpose**     | User-Operated Devices and Instances                                                    | Automated Deployments and Containers                                                        |
| **Description** | - normal boot process <br /> - regular package support <br /> - frequent update cycles | - smaller boot process <br /> - fewer pre-installed packages <br /> - reduced update cycles |

:::tip

The **regular installation** is **recommended**, as it contains all relevant configuration tools and full logging capabilities.

:::

:::warning

The **minimal installation** [lacks essential tools](https://ubuntuforums.org/showthread.php?t=2474104) for debugging and user configuration and is **only advised** for **professionals**. Subsequent installations for any missing software can lead to additional friction during maintenance, customization, or when troubleshooting issues.

:::

The following comparison presents a more detailed look at the different installation types for Ubuntu:

| Ubuntu 22.04.2 Server                        | Regular Installation                                                                    | Minimized Installation                                                        |
| -------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| <nobr> **Installed Packages** </nobr>        | ~606 packages                                                                           | ~420 packages                                                                 |
| <nobr> **Initial Storage Footprint** </nobr> | ~4,5 GB                                                                                 | ~ 4,1 GB                                                                      |
| <nobr> **Initial RAM Usage** </nobr>         | ~192 MB                                                                                 | ~176 MB                                                                       |
| <nobr> **User Interaction** </nobr>          | - Multiple Text Editors <br /> - Full Firewall Capabilities <br /> - Includes MAN Pages | - Without Text Editors <br /> - Lacks Firewall Commands <br /> - No MAN Pages |

:::danger

During community testing, the minimized installation lacked debugging commands and generated incomplete service logs. Some configuration files had to be generated manually before configuring monitoring processes.

:::

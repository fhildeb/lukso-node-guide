---
sidebar_label: "Client Setups"
sidebar_position: 1
---

# Client Setups

Running a blockchain node on LUKSO can be accomplished through different methods, depending on your experience level, use case, and available infrastructure. Whether you're looking for a simple setup or a more advanced environment with isolated containers, there’s a suitable option available.

| Setup                                                                                                          | Difficulty                 | Description                                                                                                                                                                                                                                                                                                                                                                 | Advantages                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> 🎨 [**DAppNode**](https://dappnode.com) </nobr>                                                         | <nobr> 🟢 Simple </nobr>   | Platform to manage multiple blockchain clients using a preconfigured operating system and apps for node management and remote access. <br/><br/> **→** [DAppNode Staking Guide](https://docs.dappnode.io/docs/user/staking/lukso/solo/)                                                                                                                                     | - Graphical User Interface <br /> <nobr> - Runs Multiple Chains Simultaneously </nobr> <br /> - Integrated Network Configuration <br/> - Includes Auto-Updates |
| <nobr> 👾 [**LUKSO CLI**](https://github.com/lukso-network/tools-lukso-cli) </nobr>                            | <nobr> 🔵 Advanced </nobr> | Command line interface to set up and maintain a LUKSO node in a home or server environment. <br/><br/> **→** [Server Configuration](/docs/guides/client-setup/firewall-settings.md) <br /> **→** [CLI Client Setup](/docs/guides/client-setup/lukso-cli-installation.md) <br /> **→** [Client Modifications](/docs/guides/modifications/slasher-configuration.md)           | - Simple Terminal Commands <br /> - Wide OS and Platform Support <br /> - Integrated Network Configuration <br /> - Runs All Supported Clients                 |
| <nobr> 🐳 [**Docker**](https://github.com/lukso-network/network-docker-containers) </nobr>                     | <nobr> 🔴 Expert </nobr>   | Container-based configuration to manage isolated nodes in a home or server environment. <br/><br/> **→** [LUKSO Docker Setup](https://github.com/lukso-network/network-docker-containers) <br /> **→** [Docker Configuration Factory](https://docker-factory.lukso.tech) <br /> **→** [Docker Monitoring Setup](https://github.com/lukso-network/network-docker-monitoring) | - Flexible Data Management <br /> - Runs Multiple Chains Simultaneously <br /> - Wide OS and Platform Support <br />                                           |
| <nobr> 🗂️ [**Custom**](https://docs.lukso.tech/networks/mainnet/running-a-node#-with-your-own-clients) </nobr> | <nobr> 🔴 Expert </nobr>   | Custom client installation and setup using the public LUKSO network configuration. <br/><br/> **→** [LUKSO Network Configuration](https://github.com/lukso-network/network-configs) <br /> **→** [Custom Client Advice](https://docs.lukso.tech/networks/mainnet/running-a-node#-with-your-own-clients)                                                                     | - Total Customizability <br /> - Wide OS and Platform Support <br /> - Runs All Supported Clients <br />                                                       |

:::info

The 🎨 [**DAppNode**](https://dappnode.com) setup utilizes 🐳 [**Docker**](https://www.docker.com/) under the hood, combining the flexibility of containers with a user-friendly GUI.

:::

:::warning DAppNode Support

Currently, 🎨 [**DAppNode**](https://dappnode.com) **only supports Geth** as execution client, further decreasing the [**Client Diversity**](/docs/theory/blockchain-knowledge/client-diversity.md) of the LUKSO Network. If you're technically skilled, consider an alternative setup using the LUKSO CLI or Docker.

:::

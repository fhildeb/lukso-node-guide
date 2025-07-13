# lukso-node-guide

This repository contains all the necessary information to build, set up, and run a node for EVM Proof-of-Stake blockchains, such as [LUKSO](https://docs.lukso.tech/). It is the essence of running a node at home and should act as a Wiki if you need detailed information about any possible step.

- 📖 **More than 80 Pages of Theory and Best Practice**
- 🌍 **Compiled from a dozen Guides, Forums, and Wikis**
- 🚀 **Beginner-Friendly Step-by-Step Documentation**
- 📝 **Plug-and-Play Grafana Dashboards**

_If the guide helped you, I would be pleased about a donation:_
`0xE8DFceC1B3637226f05E6828F56815f6417a6116`

## Preview

![Node Guide Webpage](/static/img/web.jpeg)

## Description

The repository includes theory pages and guides on network and consensus, validator deposits, node builds, system setups, client installation and configuration, as well as operating staking and monitoring software. Within the archive section, network updates, applied forks, and historical guides are listed. The pages in the repository are split into multiple sections.

> ⚠️ _Pages are for informational purposes only. Contributors do not warrant the guide's accuracy or completeness. Developers shall not be liable for any direct, indirect, incidental, or consequential damages arising out of or in connection with the use of this guide. The disclaimer of warranty also applies to business interruption, data loss, or financial loss._

### 🧠 Theory

- [`preparations`](/docs/theory/preparations/): Node and Router Specifications, Network Demand
- [`blockchain-knowledge`](/docs/theory/blockchain-knowledge/): Proof of Stake, Tokenomics, Peer Networks, Slashing and Penalties, Clients
- [`node-operation`](/docs/theory/node-operation/): Setup Types, OS, Validator Credentials, DDNS, SSH, and VPN, Utility Tools

### 📖 Guides

- [`validator-setup`](/docs/guides/hardware-setup/): Device Setup, Key Generation, Launchpad Walkthrough
- [`hardware-setup`](/docs/guides/hardware-setup/): Node, Router, and Network Setup, BIOS Config, OS Install
- [`system-setup`](/docs/guides/system-setup/): Permissions, Storage Volumes, Updates, Remote Access, and Firewall Setup
- [`router-setup`](/docs/guides/router-setup/): Fetching Device Addresses and Configuring the Address Reservation
- [`ssh-setup`](/docs/guides/ssh-setup/):Access Properties, Connections, and Authentication Keys
- [`client-setup`](/docs/guides/client-setup/): LUKSO Blockchain Node and Validator Setup
- [`modifications`](/docs/guides/modifications/): Slasher, Node Name, Graffiti, IP & DDNS, Peer Config, Service Automation
- [`monitoring`](/docs/guides/monitoring/): Node Monitoring for Hardware, Software Clients, and Connections
- [`alert-systems`](/docs/guides/alert-systems/): Image Notifications and Constant Mobile Device Updates
- [`external-access`](/docs/guides/external-access/): Secure External Node Access Configuration
- [`maintenance`](/docs/guides/maintenance/): Tips for Finding and Resolving Node Errors
- [`withdrawals`](/docs/guides/withdrawals/): Adding Withdrawals and Exiting Validators

### 🏛️ Archive

- [`network`](/docs/archive/network/): Blockchain Timeline, Configuration Updates, Network Forks
- [`testnet-operators`](/docs/archive/testnet-operators/): L16 Client Setup, Node Tooltips, and Software Removal
- [`genesis-validators`](/docs/archive/genesis-validators/): Blockchain Launch and GasHawn Deposits

### 🪞 Templates

- [`templates`](/static/templates/): Grafana Dashboard Presets for LYXt & LYX Staking

## Installation

```sh
yarn
```

## Enable Caching

1. Open the [`docusaurus.config.ts`](/docusaurus.config.ts) file
2. Comment out the `customWebpackPlugin` setup

```ts
// function customWebpackPlugin() {
//       return {
//         name: "custom-webpack-plugin",
//         configureWebpack() {
//           return {
//             cache: false,
//           };
//         },
//       };
//     },
```

## Local Runtime

```sh
yarn start
```

## Deployment

```sh
yarn build
```

## Tools

- [Docusaurus](https://docusaurus.io/)
- [Prometheus](https://prometheus.io/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Grafana Monitoring](https://grafana.com/)
- [Docker](https://docs.docker.com/)

## Credits

- [Luksoverse L16 CLI Guide](https://luksoverse.io/2022/04/l16-re-spin-extra-tools-and-explanation/)
- [Vlad's Node Guide](https://github.com/lykhonis/lukso-node-guide)
- [Metanull's ETH2 Guide](https://github.com/metanull-operator/eth2-ubuntu)

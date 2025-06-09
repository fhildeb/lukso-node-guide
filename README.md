# lukso-node-guide

**INFO: THIS REPO IS CURRENTLY UNDER MAINTENANCE TO BECOME A DOCUMENTATION WEBPAGE FOR ALL SUPPORTED BLOCKCHAIN CLIENTS.**

This repository features all information needed to build, set up, and run a node for EVM Proof-of-Stake blockchains such as [LUKSO](https://docs.lukso.tech/). It is the essence of running a node at home and should act as a Wiki if you need detailed information about any possible step.

> _It's a documentation of every single step I went through and explains every desicion I had to cut during the process._

- 📖 **More than 80 Pages of Theory and Best Practice**
- 🌍 **Compiled from a dozen Guides, Forums, and Wikis**
- 🚀 **Beginner-Friendly Step-by-Step Documentation**

The repository includes a pictured guide of the node build and components, the proper BIOS and operation system setup, installation of the blockchain clients, the configuration of staking and monitoring software, and even includes lagacy guides for the outdated L16 network of LUKSO.

## CLI Support

- Legacy Software: `LUKSO CLI v 0.1.0 - 0.4.4`
- Full Node Setup: `LUKSO CLI v 0.5.0 +`
- Service Automation: `LUKSO CLI v 0.6.1 +`

## Description

> _**Disclaimer**: This guide is for informational purposes only. We do not warrant its accuracy or completeness and shall not be liable for any direct, indirect, incidental, or consequential damages arising out of or in connection with the use of this guide. The disclaimed warranty also applies to business interruption, data loss, or financial loss._

The guides in the repository are split into multiple folders and sections.

### 🧠 Theory

- [`preparations`](/docs/theory/preparations/): Node and Router Specifications, Network Demand
- [`blockchain-knowledge`](/docs/theory/blockchain-knowledge/): Proof of Stake, Tokenomics, Peer Networks, Slashing and Panalties, Clients
- [`node-operation`](/docs/theory/node-operation/): Setup Types, OS, Validator Credentials, DDNS, SSH and VPN, Utility Tools

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

### Templates

- [`templates`](/static/templates/): Grafana Dashboard Presets for LYXt & LYX Staking

## Development

```sh
# Installation
yarn

# Live Runtime
yarn start
```

## Deployment

```sh
# Local Build
yarn build

# SSH Deployment
USE_SSH=true yarn deploy

# GitHub Pages Branch Deployment
GIT_USER=<Your GitHub username> yarn deploy
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

# lukso-node-guide

This repository features all information needed to build, set up, and run a node for EVM Proof-of-Stake blockchains such as [LUKSO](https://docs.lukso.tech/). It is the essence of running a node at home and should act as a Wiki if you need detailed information about any possible step.

> _It's a documentation of every single step I went through and explains every desicion I had to cut during the process._

- 📖 **More than 50 Pages of Theory and Best Practice**
- 🌍 **Compiled from a dozen Guides, Forums, and Wikis**
- 🚀 **Beginner-Friendly Step-by-Step Documentation**

The repository includes a pictured guide of the node build and components, the proper BIOS and operation system setup, installation of the blockchain clients, the configuration of staking and monitoring software, and even includes lagacy guides for the outdated L16 network of LUKSO.

> _**Publication:** This guide is live on [Luksoverse Docs](https://docs.luksoverse.io/). Please note, that this GitHub repository is always the latest version, as the website is updated manually by an external party._

## CLI Support

- Legacy Software: `LUKSO CLI v 0.1.0 - 0.4.4`
- Full Node Setup: `LUKSO CLI v 0.5.0 +`
- Service Automation: `LUKSO CLI v 0.6.1 +`

## Description

> _**Disclaimer**: This guide is for informational purposes only. We do not warrant its accuracy or completeness and shall not be liable for any direct, indirect, incidental, or consequential damages arising out of or in connection with the use of this guide. The disclaimed warranty also applies to business interruption, data loss, or financial loss._

The guides in the repository are split into multiple folders and sections.

### Full Node Setup

- [`1-hardware-build`](/1-hardware-build/): Hardware, Router, and Network Setup including the Node Build
- [`2-bios-installation`](/2-bios-installation/): BIOS Configuration, Ubuntu Install, and System Preparations
- [`3-system-setup`](/3-system-setup/): Permissions, Storage Volumes, Updates, Remote Access, and Firewall Setup
- [`4-router-config`](/4-router-config/): Fetching Device Addresses and Configuring the Address Reservation
- [`5-access-connection`](/5-access-connection/): SSH Setup, Access Properties, and Authentication Keys
- [`6-blockchain-clients`](/6-blockchain-clients/): LUKSO Blockchain Validator Setup, Ports, and Peers
- [`7-monitoring`](/7-monitoring/): Node Monitoring for Hardware, Software Clients, and Connections
- [`8-notifications`](/8-notifications/): Image Notifications and Constant Mobile Device Updates
- [`9-external-access`](/8-notifications/): Secure External Node Access Configuration

### Monitoring Presets

- [`grafana`](/grafana/): Grafana Dashboard Presets for LYXt & LYX Staking

### Legacy Software

- [`l16-install`](/l16-install/): Installation for L16 Testnet Software
- [`l16-tooltips`](/l16-tooltips/): Tooltips for L16 LUKSO CLI
- [`l16-uninstall`](/l16-uninstall/): Uninstalling L16 Testnet Software

### Validator Setup

- [`validatork-key-generation`](/validator-key-generation/): Device Setup, Key Generation for CLI and Wagyu
- [`validator-key-stake`](/validator-key-stake/): Genesis Startup, Launchpad Walkthrough, GasHawk Guide

## Tools

- [Prometheus](https://prometheus.io/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Grafana Monitoring](https://grafana.com/)
- [Docker](https://docs.docker.com/)

## Credits

- [Luksoverse L16 CLI Guide](https://luksoverse.io/2022/04/l16-re-spin-extra-tools-and-explanation/)
- [Vlad's Node Guide](https://github.com/lykhonis/lukso-node-guide)
- [Metanull's ETH2 Guide](https://github.com/metanull-operator/eth2-ubuntu)

## Links

- [Luksoverse Docs](https://docs.luksoverse.io)
- [LUKSO Docs](https://docs.lukso.tech/networks/l16-testnet/run-node)

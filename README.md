# lukso-node-guide

This repository features all information needed to build, set up, and run a node for EVM Proof-of-Stake blockchains such as [LUKSO](https://docs.lukso.tech/).

> _It's a documentation of every single step I went through and explains every desicion I had to cut during the process._

The repository includes a pictured guide of the node build and components, the proper BIOS and operation system setup, installation of the blockchain clients, the configuration of staking and monitoring software, and even includes lagacy guides for the outdated L16 network of LUKSO.

> _In addition to this repository, I recommend having a look into the [Luksoverse Docs](https://docs.luksoverse.io/). Its the most comprehensive node guide page for LUKSO. It's likely that even my extended explanations and descriptions of terminal commands will end up there at some point. For now, I wanted to gather things on my own end._

## CLI Support

- Legacy Software: `LUKSO CLI v 0.1.0 - 0.4.4`
- Full Node Setup: `LUKSO CLI v 0.5.0 +`

## Description

The guides in the repository are split into multiple folders and sections.

### Full Node Setup

- [`1-hardware-build`](/1-hardware-build/): Hardware Configuration and Node Build
- [`2-bios-installation`](/2-bios-installation/): BIOS Configuration and Ubuntu Install
- [`3-system-setup`](/3-system-setup/): Updating and Installing Server Software
- [`4-router-config`](/4-router-config/): Configuring the Address Reservation
- [`5-access-connection`](/5-access-connection/): Setting up Node Access Properties
- [`6-blockchain-clients`](/6-blockchain-clients/): LUKSO Blockchain Validator Setup
- [`7-monitoring`](/7-monitoring/): Client, Validator, and Node Monitoring
- [`8-notifications`](/8-notifications/): Image Notifications and Constant Updates

### Monitoring Presets

- [`grafana`](/grafana/): Grafana Dashboard Presets for LYXt & LYX Staking

### Legacy Software

- [`l16-install`](/l16-install/): Installation for L16 Testnet Software
- [`l16-tooltips`](/l16-tooltips/): Tooltips for L16 LUKSO CLI
- [`l16-uninstall`](/l16-uninstall/): Uninstalling L16 Testnet Software

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

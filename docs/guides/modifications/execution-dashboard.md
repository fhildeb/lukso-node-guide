---
sidebar_label: "7.8 Execution Dashboard"
sidebar_position: 8
description: "Attach your LUKSO execution node to the ETHStats dashboard to monitor versions, latency, peers, blocks, and gas-price metrics."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 7.8 Execution Dashboard

To list your node on an [Execution Status Page](/docs/guides/monitoring/external-monitoring.md#execution-status-page), you can add a ETHStats secret to your execution client to monitor versions, latencies, peers, synced blocks, and pending transactions based on their current [gas price configuration](/docs/guides/maintenance/gas-price-configuration.md). You node will then begin to synchronize data with the dashboard service, so the service can be monitored from any device.

| Dashboard                                                                         | Maintainer | Access  | Credentials                                                                                                                                |
| --------------------------------------------------------------------------------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [Mainnet Execution Status Page ↗](https://stats.execution.mainnet.lukso.network/) | LUKSO Team | Private | **Server:** `stats.execution.mainnet.lukso.network` <br/> **Secret**: _Apply as core contributors via [Discord](https://discord.gg/lukso)_ |
| [Testnet Execution Status Page ↗](https://stats.execution.testnet.lukso.network/) | LUKSO Team | Private | **Server:** `stats.execution.testnet.lukso.network` <br/> **Secret**: _Apply as Testnet operator via [Discord](https://discord.gg/lukso)_  |
| [Stakingverse Status Page ↗](https://community.stats.execution.stakingverse.io/)  | Community  | Public  | **Server:** `community.stats.execution.stakingverse.io` <br/> **Secret**: `Stakingverse-JordyDutch-69420`                                  |

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Stop Node Operation

Depending on your setup method, there are different ways to stop your node before listing your node on a dashboard.

<Tabs groupId="setup">
  <TabItem value="cli" label="LUKSO CLI" default>

```sh
cd <lukso-working-directory>
lukso stop
```

:::info

Exchange `<lukso-working-directory>` with the path of the node folder.

:::

</TabItem> <TabItem value="automation" label="Service Automation">

```sh
sudo systemctl stop lukso-validator
```

</TabItem>
</Tabs>

<details>
<summary>Force Client Shutdown</summary>

<Tabs>
<TabItem value="geth" label="Geth">

```sh
sudo pkill geth
```

</TabItem> <TabItem value="erigon" label="Erigon">

```sh
sudo pkill erigon
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```sh
sudo pkill nethermind
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
sudo pkill besu
```

</TabItem> <TabItem value="teku" label="Teku">

```sh
sudo pkill teku
```

</TabItem> <TabItem value="nimbus2" label="Nimbus-Eth2">

```sh
sudo pkill nimbus_beacon_node
sudo pkill nimbus_validator_client
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

```sh
sudo pkill lighthouse
```

:::tip

The Lighthouse client uses a single binary for both the consensus and validator processes.

:::

</TabItem> <TabItem value="prysm" label="Prysm">

```sh
sudo pkill prysm
sudo pkill validator
```

</TabItem>
</Tabs>

</details>

## 2. Add ETHStats Secret

You can either set your dashboard credentials via startup flags or persistently within the configuration files of your execution client. If you only want to check your node temporarily, using the flag is recommended, as it will only persist until the next restart of the node.

<Tabs groupId="configuration">
  <TabItem value="flag" label="Setting a Startup Flag" default>

Depending on your setup method, there are different ways to pass down the ETHStats flag using the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli).

<Tabs groupId="setup">
<TabItem value="clinode" label="LUKSO CLI Node" default>

Every execution client has a individual flag to set the ETHStats Secret during startup.

<Tabs>
<TabItem value="geth" label="Geth">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with a ETHStats Secret
lukso start --checkpoint-sync --geth-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"

# Start the Testnet Node with a ETHStats Secret
lukso start --testnet --checkpoint-sync --geth-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"
```

</TabItem> <TabItem value="erigon" label="Erigon">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with a ETHStats Secret
lukso start --checkpoint-sync --erigon-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"

# Start the Testnet Node with a ETHStats Secret
lukso start --testnet --checkpoint-sync --erigon-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with Custom Name
lukso start --checkpoint-sync --nethermind-ethstats-enabled=true --nethermind-ethstats-name "<your-dashboard-name>" --nethermind-ethstats-secret "<ethstats-secret>" --ethstats-server "wss://<ethstats-server>"

# Start the Testnet Node with Custom Name
lukso start --testnet --checkpoint-sync --nethermind-ethstats-enabled=true --nethermind-ethstats-name "<your-dashboard-name>" --nethermind-ethstats-secret "<ethstats-secret>" --nethermind-ethstats-server "wss://<ethstats-server>"
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
cd <lukso-working-directory>

# Start the Mainnet Node with a ETHStats Secret
lukso start --checkpoint-sync --besu-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"

# Start the Testnet Node with a ETHStats Secret
lukso start --testnet --checkpoint-sync --besu-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"
```

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path of the node folder
- `<your-dashboard-name>` with the node name to show up on the dashboard
- `ethstats-secret` with the actual secret of your dashboard server
- `ethstats-server` with the address of your dashboard server

:::

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

</TabItem> <TabItem value="clivalidator" label="LUKSO CLI Validator" default>

Every execution client has a individual flag to set the EthStats Secret during startup.

<Tabs>
<TabItem value="geth" label="Geth">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Name
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --geth-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"

# Start the Testnet Validator Node with Custom Name
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync  --geth-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"
```

</TabItem> <TabItem value="erigon" label="Erigon">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Name
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --erigon-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"

# Start the Testnet Validator Node with Custom Name
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --erigon-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Name
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --nethermind-ethstats-enabled=true --nethermind-ethstats-name "<your-dashboard-name>" --nethermind-ethstats-secret "<ethstats-secret>" --nethermind-ethstats-server "wss://<ethstats-server>"

# Start the Testnet Validator Node with Custom Name
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --nethermind-ethstats-enabled=true --nethermind-ethstats-name "<your-dashboard-name>" --nethermind-ethstats-secret "<ethstats-secret>" --nethermind-ethstats-server "wss://<ethstats-server>"
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
cd <lukso-working-directory>

# Start the Mainnet Validator Node with Custom Name
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --besu-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"

# Start the Testnet Validator Node with Custom Name
lukso start --testnet --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync --besu-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"
```

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path of the node folder
- `<your-fee-recipient-address>` with the wallet address receiving staking profits
- `<your-dashboard-name>` with the node name to show up on the dashboard
- `ethstats-secret` with the actual secret of your dashboard server
- `ethstats-server` with the address of your dashboard server

:::

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

</TabItem> <TabItem value="automation" label="Service Automation">

Open the startup script within your node directory with your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
sudo vim <lukso-working-directory>/static/lukso_startup.sh
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
sudo nano <lukso-working-directory>/static/lukso_startup.sh
```

</TabItem>
</Tabs>

:::info

Exchange `<lukso-working-directory>` with the path to the node folder.

:::

Add the ETHStats flag new line to the start command, then save and exit the file.

<Tabs>
<TabItem value="geth" label="Geth">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --geth-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"
```

</TabItem> <TabItem value="erigon" label="Erigon">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --erigon-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --nethermind-ethstats-enabled=true \
        --nethermind-ethstats-name   "<your-dashboard-name>" \
        --nethermind-ethstats-secret "<ethstats-secret>" \
        --nethermind-ethstats-server "wss://<ethstats-server>" \
```

</TabItem> <TabItem value="besu" label="Besu">

```text
exec /usr/local/bin/lukso start \
        --validator \
        --validator-wallet-password ./static/<your-generic-password-file> \
        --transaction-fee-recipient "<your-fee-recipient-address>" \
        --checkpoint-sync \
        --besu-ethstats "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"
```

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<your-generic-password-file>` with the name of your validator password file
- `<your-fee-recipient-address>` with the wallet address receiving staking profits
- `<your-dashboard-name>` with the node name to show up on the dashboard
- `ethstats-secret` with the actual secret of your dashboard server
- `ethstats-server` with the address of your dashboard server

:::

After the startup script was updated, you can restart the node by executing the related service.

```sh
sudo systemctl start lukso-validator
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="file" label="Modifying the Client Configuration">

Depending on your execution client, the ETHStats Secret can be set with different properties.

<Tabs groupId="client">
<TabItem value="geth" label="Geth">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/geth/
vim geth.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/geth/
nano geth.toml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="erigon" label="Erigon">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/erigon/
vim erigon.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/erigon/
nano erigon.toml
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="nethermind" label="Nethermind">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/nethermind/
vim nethermind.cfg
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/nethermind/
nano nethermind.cfg
```

</TabItem>
</Tabs>

</TabItem> <TabItem value="besu" label="Besu">

Open the configuration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>/besu/
vim besu.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>/besu/
nano besu.toml
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path to the node folder.
- `<network>` with the name of your node's network.

:::

Add the ETHStats Secret as a new line within the settings, then save and exit the file.

<Tabs groupId="client">
<TabItem value="geth" label="Geth">

Search for the _Ethstats_ section, then add and uncomment the _URL_ property under it.

```text
[Ethstats]
URL = "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"
```

</TabItem> <TabItem value="erigon" label="Erigon">

Set and uncomment the _ethstats_ property at the end of the file.

```text
"ethstats" = "<your-dashboard-name>:<ethstats-secret>@<ethstats-server>"
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

Set the _EthStats_ object and _Name_ property at the ending bracket of the _Network_ object.

```text
"EthStats": {
  "Enabled": true,
  "Name": "<your-dashboard-name>",
  "Secret": "<ethstats-secret>",
  "Server": "wss://<ethstats-server>"
}
```

</TabItem> <TabItem value="besu" label="Besu">

Set the _ethstats_ property at the end of the file.

```text
'ethstats'='<your-dashboard-name>:<ethstats-secret>@<ethstats-server>'
```

</TabItem>
</Tabs>

:::info

The following properties need to be exchanged:

- `<your-dashboard-name>` with the node name to show up on the dashboard
- `ethstats-secret` with the actual secret of your dashboard server
- `ethstats-server` with the address of your dashboard server

:::

:::warning

Ensure there are no missing spaces, characters or unintended linebreaks before saving the configuration file.

:::

Depending on your setup method, there are different ways to start your node after setting the ETHStats Secret.

<Tabs groupId="setup">
  <TabItem value="clinode" label="LUKSO CLI Node" default>

```sh
cd <lukso-working-directory>
lukso start --checkpoint-sync
```

:::info

Exchange `<lukso-working-directory>` with the path of the node folder.

:::

</TabItem> <TabItem value="clivalidator" label="LUKSO CLI Validator" default>

```sh
cd <lukso-working-directory>
lukso start --validator --transaction-fee-recipient "<your-fee-recipient-address>" --checkpoint-sync
```

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the path of the node folder
- `<your-fee-recipient-address>` with the wallet address receiving staking profits

:::

</TabItem> <TabItem value="automation" label="Service Automation">

```sh
sudo systemctl start lukso-validator
```

</TabItem>
</Tabs>

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

</TabItem>
</Tabs>

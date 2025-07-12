---
sidebar_label: "11.8 Monitoring Settings"
sidebar_position: 8
description: "Learn how to enable validator metrics for Nimbus-Eth2 on LUKSO. Includes step-by-step guides for CLI, Docker, and custom setups."
---

# 11.8 Monitoring Settings

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Within the network configuration files, validators can adjust which metrics are exposed to allow more detailed [Grafana Dashboard](/templates) insights. By default, the [LUKSO Network Configuration](https://github.com/lukso-network/network-configs) already exposes [Ports and APIs](/docs/guides/monitoring/port-configuration.md) for every consensus client. Extended access or data can be enabled individually.

:::warning Support

The **Nimbus-Eth2** client is not supported for Staking within the [**LUKSO CLI**](https://github.com/lukso-network/tools-lukso-cli). Additionally, the consensus client requires a custom `--validator-monitor-details` flag to expose regular blockchain metrics. When using the LUKSO CLI, the dashboard will still lack metrics until staking is fully supported.

:::

:::tip

Further details on client versions and support can be found on the [**Client Providers**](/docs/theory/blockchain-knowledge/client-providers.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.
:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## Add Validator Metrics

If you are running the Nimbus-Eth2 consensus client and lack dashboard metrics, you can enable advanced validator monitoring.

<Tabs>
<TabItem value="cli" label="👾 LUKSO CLI" default>

**1. Stop Node Operation**: _Depending on your setup method, there are different ways to stop your node to adjust configurations._

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
nethermind --version
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
besu --version
```

</TabItem> <TabItem value="nimbus2" label="Nimbus-Eth2">

```sh
sudo pkill nimbus_beacon_node
sudo pkill nimbus_validator_client
```

</TabItem>
</Tabs>

</details>

**2. Adjust Validator Metrics**: _Modify the default validator configuration of Nimbus-Eth2 using your preferred editor._

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>
vim nimbus2/nimbus.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>
nano nimbus2/nimbus.toml
```

</TabItem>
</Tabs>

:::info

Exchange `<lukso-working-directory>` and `<network>` with the path of the node folder and the network type.

:::

Add the validator monitor details setting to enable extended metrics.

```text
validator-monitor-details = true
```

Save the file and exit the editor.

**3. Restart the Node**: _Depending on your setup, there are different ways to start your node with the updated configuration._

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
<TabItem value="docker" label="🐳 Docker Image">

**1. Stop Node Operation**: Stop the docker containers for both execution and consensus clients.

**2. Adjust Validator Metrics**: Open the _docker-compose.yml_ file of Nimbus-Eth2, add validator monitoring, and safe the file.

```text
  --validator-monitor-details
```

**3. Restart the Node**: Restart the docker containers for execution and consensus clients.

</TabItem>
<TabItem value="custom" label="🗂️ Custom Setup">

**1. Stop Node Operation**: _Stop the execution and consensus services._

<Tabs groupId="customization">
  <TabItem value="file" label="File Configuration" default>

**2. Adjust Validator Metrics**: Adjusting the nimbus.toml\_ file within your setup using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
vim nimbus2/nimbus.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
nano nimbus2/nimbus.toml
```

</TabItem>
</Tabs>

Add the validator monitor details setting to enable extended metrics.

```text
validator-monitor-details = true
```

Save the file and exit the editor.

**3. Restart the Node**: _Restart the execution and consensus services._

</TabItem> <TabItem value="flag" label="Flag Customization">

**2. Custom Restart**: Restart the service and attach a customization flag for your monitor setting.

```sh
  --validator-monitor-details
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

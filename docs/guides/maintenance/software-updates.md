---
sidebar_label: "11.1 Software Updates"
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 11.1 Software Updates

This guide explains how to update system software, and perform cleanups, important for security and performance.

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Retrieve Outdated Packages

```sh
# Update Package List
sudo apt update

# List Upgradable Packages
apt list --upgradable
```

:::warning Monitoring Compatability

The monitoring tool [Grafana](/docs/guides/monitoring/grafana.md) is installed as a system package. If you want to prevent incompatibilities, its recommended to pause these updates until the latest dashboard templates are available for your blockchain clients.

:::

<Tabs >
  <TabItem value="hold" label="Pause Grafana Updates" default>

```sh
sudo apt-mark hold grafana
```

</TabItem> <TabItem value="unhold" label="Resume Grafana Updates">

```sh
sudo apt-mark unhold grafana
```

</TabItem>
</Tabs>

## 2. Stop Node Operation

Depending on your setup method, there are different ways to stop your node before applying updates.

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

</TabItem>

<TabItem value="erigon" label="Erigon">

```sh
sudo pkill erigon
```

</TabItem>

<TabItem value="nethermind" label="Nethermind">

```sh
sudo pkill nethermind
```

</TabItem>

<TabItem value="besu" label="Besu">

```sh
sudo pkill besu
```

</TabItem>

<TabItem value="teku" label="Teku">

```sh
sudo pkill teku
```

</TabItem>

<TabItem value="nimbus" label="Nimbus">

```sh
sudo pkill nimbus_beacon_node
sudo pkill nimbus_validator_client
```

</TabItem>

<TabItem value="lighthouse" label="Lighthouse">

```sh
sudo pkill lighthouse
```

:::tip

The Lighthouse client uses a single binary for both the consensus and validator processes.

:::

</TabItem>

<TabItem value="prysm" label="Prysm">

```sh
sudo pkill prysm
sudo pkill validator
```

</TabItem>
</Tabs>

</details>

## 3. Apply Software Updates

Update all currently installed packages and hardware drivers to their latest versions and reboot to apply changes.

```sh
sudo apt upgrade
```

:::info

When prompted during upgrade:

- Choose to keep your current SSH configuration (`<OK>`)
- Acknowledge updates to system libraries and services (`<OK>`)

:::

:::tip

Kernel and background services will update after a system reboot.

:::

```sh
sudo reboot
```

:::info

You will be logged out of the SSH connection. Once the system rebooted, reconnect using SSH to continue.

:::

## 4. System Cleanup

Remove unnecessary packages and clean up outdated cache data of system installation processes.

```sh
# Remove Unused Dependencies
sudo apt autoremove

# Clean Cached Package Files
sudo apt autoclean
```

## 5. Restart the Node

Depending on your setup method, there are different ways to start your node.

<Tabs groupId="setup">
  <TabItem value="clinode" label="LUKSO CLI Node" default>

```sh
cd <lukso-working-directory>
lukso start --checkpoint-sync
```

:::info

Exchange `<lukso-working-directory>` with the path of the node folder

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

:::info

If the system was rebooted before, automated services like the validator node should restart automatically. You can check the current status of the service to clarify whether it is necessary to start it manually or if updates introduced any problems.

:::

```sh
sudo systemctl status lukso-validator
```

If the service is not active or you did not reboot your node, you can start the service manually.

```sh
sudo systemctl start lukso-validator
```

</TabItem>
</Tabs>

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

:::tip

[**Monitoring Tools**](/docs/theory/node-operation/monitoring-tools.md) like [Grafana](/docs/guides/monitoring/grafana.md), [Prometheus](/docs/guides/monitoring/prometheus.md), or the [Exporter](/docs/guides/monitoring/node-exporter.md) services will automatically start during the system reboot.

:::

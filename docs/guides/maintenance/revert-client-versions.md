---
sidebar_label: "11.4 Revert Client Versions"
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 11.4 Revert Client Versions

The [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) allows to downgrade clients to an earlier version below the latest supported one. This might solve potential stability, database, or configuration issues that happen after an upgrade or maintenance. However, keep in mind that older versions must feature support for the latest [network fork](/docs/archive/network/network-forks.md) to keep up with the current chain head and stake funds.

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Stop Node Operation

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

## 2. Install Custom Version

Custom client versions can be installed using the regular installation command with additional flags. The terminal interface will give you the option to choose your execution and consensus client and will download the specified version from the flags. Multiple flags can be attached to install a custom consensus and execution client version simultaneously.

```sh
# Overwrite default Geth Version
lukso install --geth-tag 1.12.2 --geth-commit-hash bed84606

# Overwrite default Erigon Version
lukso install --erigon-tag 2.52.1

# Overwrite default Besu Version
lukso install --besu-tag 24.5.1

# Overwrite default Nethermind Version
lukso install --nethermind-tag v1.22.0 --nethermind-commit-hash ae444a4

# Overwrite default Prysm Version
lukso install --prysm-tag v4.0.8

# Overwrite default Lighthouse Version
lukso install --lighthouse-tag v4.1.0

# Overwrite default Teku Version
lukso install --teku-tag v23.10.0

# Overwrite default Nimbus-Eth2 Version
lukso install --nimbus2-tag v24.2.1 --nimbus2-commit-hash 7fe43fc
```

:::tip

The **Geth**, **Nethermind**, and **Nimbus-Eth2** clients require an additional commit hash to the release tag, both attached as flags.

:::

:::warning

Each release tag has different version formatting. Ensure you are using the correct format as shown in above examples.

:::

:::info

Version numbers and commit hashes can be derived from the client repositories:

- [Geth Releases](https://github.com/ethereum/go-ethereum/releases)
- [Erigon Releases](https://github.com/ledgerwatch/erigon/releases)
- [Besu Releases](https://github.com/hyperledger/besu/releases)
- [Nethermind Releases](https://github.com/nethermindeth/nethermind/releases)
- [Prysm Releases](https://github.com/prysmaticlabs/prysm/releases)
- [Lighthouse Releases](https://github.com/sigp/lighthouse/releases)
- [Teku Releases](https://github.com/ConsenSys/teku/releases)
- [Nimbus-Eth2 Releases](https://github.com/status-im/nimbus-eth2/releases)

:::

## 3. Restart the Node

Depending on your setup method, there are different ways to start your node after custom versions have been installed.

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

:::warning

For improved security, the service automation is started from a separate user with restricted rights. New permissions must be assigned to all data and software folders affected by the previous updates before the node should be restarted.

:::

```sh
sudo chown -R lukso-validator-worker:lukso-validator-worker /home/<user-name>/<lukso-working-directory>
sudo chown lukso-validator-worker:lukso-validator-worker /usr/local/bin/lukso
sudo chmod -R 750 /home/<user-name>/<lukso-working-directory>
sudo chmod 755 /home/<user-name>/<lukso-working-directory>
sudo chmod 400 /home/<user-name>/<lukso-working-directory>/static/<your-generic-password-file>
sudo chmod 500 /home/<user-name>/<lukso-working-directory>/static/lukso_startup.sh
```

:::info

The following properties need to be exchanged:

- `<user-name>` with the user name used to login to your node
- `<lukso-working-directory> ` with the path of the node folder
- `<your-generic-password-file>` with the full name of the password file to start the validator

:::

<details>
  <summary>Full Command Descriptions</summary>

| **Setting**                                              | **Description**                                                     |
| -------------------------------------------------------- | ------------------------------------------------------------------- |
| <nobr> `sudo chown -R <user>:<user> <directory>` </nobr> | Recursively assign user ownership to all directory contents.        |
| <nobr> `sudo chown <user>:<user> <directory>` </nobr>    | Assign ownership to a single folder or file.                        |
| <nobr> `sudo chmod -R 750 <directory>` </nobr>           | Set executable and readable permissions for a user and group.       |
| <nobr> `sudo chmod 755 <directory>` </nobr>              | Set readable permissions for everyone, typically for general files. |
| <nobr> `sudo chmod 400 <directory>/<file>` </nobr>       | Read-only access for owner, typically for secret information.       |
| <nobr> `sudo chmod 500 <directory>/<file>` </nobr>       | Executable-only by owner, typically for service scripts.            |

</details>

Once the original rights have been restored, the service can be started.

```sh
sudo systemctl start lukso-validator
```

:::warning

If the service does not start up, check the service status before and reapply the necessary permissions.

:::

```sh
sudo systemctl status lukso-validator
```

</TabItem>
</Tabs>

After the clients were started, verify that their services are still up.

```sh
sudo lukso status
```

:::warning

If you are still running into issues, [scan for problems](/docs/guides/maintenance/problem-scanning.md) or [update your clients](/docs/guides/maintenance/client-updates.md) and their specific [network configurations](/docs/archive/network/configuration-updates.md).

:::

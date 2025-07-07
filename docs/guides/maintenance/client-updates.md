---
sidebar_label: "11.2 Client Updates"
sidebar_position: 2
description: "Learn how to safely update your LUKSO CLI, blockchain clients, and configurations. Includes instructions for validator nodes and service automation setups."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 11.2 Client Updates

This guide explains how to update your LUKSO CLI, blockchain clients, configuration files, and validator permissions.

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

<Tabs groupId="client">
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

## 2. Update CLI and CLients

Install the latest CLI version and update the client software.

```sh
# Install Latest LUKSO CLI
sudo curl https://install.lukso.network | sh

# Verify CLI Version
lukso version
```

:::info

Check your current client versions.

<Tabs groupId="client">
<TabItem value="geth" label="Geth">

```sh
geth version
```

</TabItem> <TabItem value="erigon" label="Erigon">

```sh
erigon --version
```

</TabItem> <TabItem value="nethermind" label="Nethermind">

```sh
nethermind --version
```

</TabItem> <TabItem value="besu" label="Besu">

```sh
besu --version
```

</TabItem> <TabItem value="teku" label="Teku">

```sh
teku --version
```

</TabItem> <TabItem value="nimbus2" label="Nimbus-Eth2">

```sh
nimbus_beacon_node --version
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

```sh
lighthouse --version
```

</TabItem> <TabItem value="prysm" label="Prysm">

```sh
prysm --version
```

</TabItem>
</Tabs>

:::

```sh
# Move into Node Directory
cd <lukso-working-directory>

# Update the Blockchain Clients
sudo lukso update
```

:::tip

Check your updated client versions again using the commands above to verify they were installed correctly.

:::

## 3. Update Client Configs

This optional step ensures your client configuration files stay aligned with the latest specifications and network forks.

```sh
sudo lukso init
sudo lukso update configs
```

:::info

None of your client-specific settings will be overwritten.

- The `lukso update configs` command only updates the global `/configs/<network>/shared/` files.
- The `lukso init` command only creates missing files and folders within the `/configs/` folder.

:::

:::warning

The LUKSO Network Team regularly introduces changes to the default client-specific configurations. It's recommended to update them manually. Further guidance can be found on the [**Configuration Updates**](/docs/archive/network/configuration-updates.md) page of the 🏛️ [**Archive**](/docs/archive/network/blockchain-timeline.md) section.

:::

## 4. Remove Genesis Flags

Make sure that you no longer use Genesis flags to start the node, as the network was launched and flags are no longer needed.

:::tip

This step is only required for genesis validators using a [service automation](/docs/guides/modifications/service-automation.md) setup to manage their node. Regular node setups simply do no longer attach the `--genesis-json` and `--genesis-ssz` flags during the startup.

:::

**4.1 Open the Service File**: Open the startup script with your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/static/
sudo vim ./lukso_startup.sh
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/static/
sudo nano ./lukso_startup.sh
```

</TabItem>
</Tabs>

:::info

Exchange `<lukso-working-directory>` with the path to the node folder.

:::

**4.2 Modify the Service File**: Remove the following lines from the startup script.

```text
        --genesis-json ./configs/mainnet/shared/genesis_42.json \
        --genesis-ssz ./configs/mainnet/shared/genesis_42.ssz \
```

## 5. Restart the Node

Depending on your setup method, there are different ways to start your node after updates have been applied.

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

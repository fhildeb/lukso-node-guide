---
sidebar_label: "13.2 Client Logs"
sidebar_position: 2
description: A guide for LUKSO homestakers on exporting client log files to analyze or share reports with others.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 13.2 Client Logs

Clients automatically generate log files that record important operational data, such as network status, validator events, and errors. While these logs can be accessed directly in the terminal, it can be cumbersome due to the lack advanced search tools, formatting, or the ability to view multiple logs side-by-side. For easier analysis, you can download these log files to your local computer to read them in a styled editor, share them with others for troubleshooting, or archive them for performance tracking.

:::warning

Log files can expose sensitive data. Only share log files with trusted people or modify them before sharing at own risk.

- **Execution Logs**: Expose client name, version, folder path, operator name, and IP or DDNS address.
- **Consensus Logs**: Reveal client name, version, IP, ENRs, and RPC configuration.
- **Validator Logs**: Record validator indices, attestations, proposals, and graffitis.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Access Log Folder

Navigate to the node folder of the [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) to access client logs.

<Tabs groupId="network-type">
<TabItem value="mainnet" label="Mainnet">

```sh
cd
cd <lukso-working-directory>/mainnet-logs
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```sh
cd
cd <lukso-working-directory>/testnet-logs
```

</TabItem>
</Tabs>

:::info

Exchange `<lukso-working-directory>` with the name of your node folder.

:::

## 2. Copy Log Files

Since log files are typically owned by a specific user and SSH sessions cannot elevate directly to superuser for file transfers, its best to copy the files to a temporary folder where you have full permissions. This ensures the original logs remain untouched and the node does not have to be stopped.

```sh
# Retrieve Current File Path
pwd

# Copy Content to Temporary Folder
sudo cp -r <my-logging-folder> /tmp/client-logs

# Change Permisions to Current Owner
sudo chown -R <user-name>:<user-name> /tmp/client-logs
```

:::info

Within the commands, exchange the following properties:

- `<my-logging-folder>` with the path that was printed from the `pwd` command.
- `<user-name>` with the name of the user you're logging into the node.

:::

## 3. Download Log Files

After the temporary folder was prepared, you can download it to your computer that is used to log into your node using SSH.

:::info

The following step is performed on your 💻 **personal computer**.

:::

```sh
scp -r <node-username>@<ssh-device-alias>:/tmp/client-logs ~/Downloads/
```

:::info

Within the command, exchange the following properties:

- `<node-username>` with the name of the user you're logging into the node.
- `<ssh-device-alias>` with the name of the SSH server entry.

:::

:::tip

You can now reference, open, or share all client log files from your default _Downloads_ folder.

:::

## 4. Cleanup

After successfully exporting the logs, remove the temporary folder from your node server to free up disk space and ensure sensitive data is not left accessible.

:::info

The following step is performed on your 📟 **node server**.

:::

```sh
rm -rf /tmp/client-logs
```

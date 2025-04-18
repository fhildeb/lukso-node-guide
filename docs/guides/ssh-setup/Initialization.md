---
sidebar_label: "5.1 Initialization"
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 5.1 Initialization

This page will cover your SSH client preparation for seamless access to your node. You will verify that SSH is installed on your personal computer, create a convenient host alias in your SSH configuration, and perform a test connection.

## 1. Check SSH Installation

Before verifying basic access, we must check if SSH is already installed, like most modern operation systems.

:::info

The following steps are performed on your 💻 **personal computer**.

:::

Open the terminal and check your SSH client version:

```sh
ssh -V
```

You should see output similar to:

```sh
OpenSSH_9.0p1, LibreSSL 3.3.6
```

:::warning

If SSH is not installed, follow your operating system’s documentation to install the latest OpenSSH client.

:::

## 2. Configure SSH

To avoid typing full connection details each time, define a host entry in the SSH config file.

:::info

The default SSH configuration file should be located at `~/.ssh/config`. The file is a user-specific SSH file to customize various settings for the SSH client on a per-host basis. It allows you to define different options for each remote host you connect to via SSH, such as hostname, username, port, identity files, and other preferences.

:::

**2.1 Create or ensure that the SSH directory exists and set proper permissions**:

```sh
mkdir -p ~/.ssh/
chmod 700 ~/.ssh
```

:::info

You can use the `mkdir` command to create a directory. Adding the `p` flag will create any necessary parent directories.

:::

**2.2 Open your SSH config file with your preferred text editor**:

<Tabs>
  <TabItem value="vim" label="Vim" default>

```sh
vim ~/.ssh/config
```

  </TabItem>
  <TabItem value="nano" label="Nano">

```sh
nano ~/.ssh/config
```

  </TabItem>
</Tabs>

**2.3 Add a host snippet and replace placeholders**:

```text
Host <ssh-device-alias>
  User <node-username>
  HostName <node-ip-address>
  Port <ssh-port>
```

:::info

- `<ssh-device-alias>`: a memorable short name
- `<node-username>`: your node’s administrative login user
- `<node-ip-address>`: your node’s static IP
- `<ssh-port>`: the custom SSH port you configured

:::

:::warning

Ensure each property line is indented by two spaces and safe the file.

:::

## 3. Trial Connection

Now verify the connection by opening the first connection to your node:

```sh
ssh <ssh-device-alias>
```

- onfirm the host fingerprint by typing yes.
- Enter your node password when prompted.

You should see the Ubuntu welcome banner:

```text
Welcome to Ubuntu 22.04.2 LTS [BUILD]

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of [DATE]

  System load:           1.0
  Usage of /:            1.2% of 997.87GB
  Memory usage:          1%
  Swap usage:            0%
  Temperature:           36.0 C
  Processes:             219
  Users logged in:       0
  IPv4 address [Connection Type]: [IPv4 IP Address]
  IPv6 address [Connection Type]: [IPv6 IP Address]

[NEWS]

[SECURITY_NOTICES]

0 updates can be applied immediately.

[EMS_NOTICE]


Last login: [DATE] from [IP_FROM_PERSONAL_COMPUTER]
```

To end the session, run:

```sh
exit
```

:::warning

Always confirm you’ve fully disconnected before continuing further terminal steps.

:::

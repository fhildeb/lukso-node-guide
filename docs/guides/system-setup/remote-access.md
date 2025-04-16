---
sidebar_label: "3.4 Remote Access"
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 3.4 Remote Access

Establishing secure remote access to your node is essential for system maintenance and monitoring. In this guide, we focus on configuring the OpenSSH Server by editing its main configuration file, selecting a non-standard port for added security, and verifying that the changes have been applied correctly.

:::info

OpenSSH Server was installed during the operation system setup, is located at `/etc/ssh/sshd_config`, and controls key parameters such as authentication methods, the listening port, and security directives. In comparison to the OpenSSH Client, which allows you tio connect and use a certain system, its a more lightway version simply granting access to a remote system.

:::

:::tip

Unlike the OpenSSH Client, which allows you to connect to and use a particular remote system, its server variant is a lighter tool only granting access. In this regard, the node cannot act as an active part.

:::

## 1. SSH Port Configuration

Changing the SSH port from its defaul to a non-standard port can reduce the risk of automated attacks and port scanning. Although changing the port is not a comprehensive security solution, it adds an extra layer of obscurity.

:::info

The default port number is `22`. It is recommended to choose a port number higher than `1024`, often above `50000`, to avoid conflicts with standard services. Always ensure the chosen port is not used by any other service on your system. The highest possible number is `65535`, as port numbers are 16-bit unsigned integers.

:::

Use your preferred text editor to open the SSH configuration file:

<Tabs>
  <TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/ssh/sshd_config
```

  </TabItem>
  <TabItem value="nano" label="Nano">

```sh
sudo nano /etc/ssh/sshd_config
```

  </TabItem>
</Tabs>

1. Locate the line `#Port 22`.
2. Remove the `#` in front to uncomment the line.
3. Change the number to your desired port value.
4. Save the file and exit the editor.

:::tip

This change instructs SSH to listen on the new port. You will need to specify this port number when connecting remotely. For example you could change it to `50022` or `60022`, both fulfilling all requirements of the numerical range.

:::

## 2. Managing the SSH Service

After modifying the configuration file, restart the SSH service to apply the changes.

**2.1 Verify the Configuration**: _Before restarting, test the updated configuration._

```sh
sudo sshd -t
```

If no output is returned, the configuration is valid.

**2.2 Restart the SSH Service**: _Restart the SSH daemon._

```sh
sudo systemctl restart sshd
```

:::info Daemon Services

Daemon services, like `sshd` are background processes that run continuously on Unix-like operating systems, including Linux. These services perform various tasks and provide essential functionalities without direct user interaction.

:::

:::tip

Further information about system control commands can be found on the [Utility Tools](/docs/theory/node-operation/utility-tools.md) page of the [**🧠 Theory**](/docs/theory/preparations/node-specification.md) section.

:::

**2.3 Check System Services**: _Inspect all system services to ensure SSH is running._

```sh
systemctl list-unit-files --type=service
```

:::info

- The command provides a list of services along with their status.
- Both `ssh` and `sshd` services should be active enabled.

:::

With these changes, remote access to your node will be securely configured with a custom port, and you can now connect to your node using your preferred SSH client.

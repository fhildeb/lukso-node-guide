---
sidebar_label: "3.5 Startup Utility"
sidebar_position: 5
---

# 3.5 Startup Utility

Ensuring that the OpenSSH service starts automatically at system boot is critical for maintaining remote access to your node. We will verify that the SSH service is enabled at startup, meaning you dont have to log in manually each time the system reboots.

## 1. Check SSH Bootprocess

First, verify whether the OpenSSH service is already enabled to start at boot:

```sh
sudo systemctl is-enabled ssh
```

:::tip

Further information about system control commands can be found on the [Utility Tools](/docs/theory/node-operation/utility-tools.md) page of the [**🧠 Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::note

- If the service is `enabled`, it already starts during the boot process.
- If the service is `disabled`, you must configure a symbolic link.

:::

:::info Symbolic Links

A symbolic link is a special type of file that serves as a pointer to another file or directory. This means that services can be referenced without duplicating any files. In the context of system services, such a link must be created between the OpenSSH service file and the system directory. During the boot process, the operating system scans it's system directory and automatically launches all service files with a symbolic link.

:::

## 2. Enable SSH Startup

If the SSH service is not enabled, we can enable the automated OpenSSH startup during the boot process.

```sh
sudo systemctl enable ssh
```

:::info

After running this command, the `systemd` daemon will create the required symbolic link in the system directory.

:::

---
sidebar_label: "3.7 Bruteforce Protection"
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 3.7 Bruteforce Protection

Bruteforce protection is a critical aspect of securing blockchain nodes and servers. As these systems handle sensitive data and valuable assets, they are prime targets for attackers attempting systematic login attempts. To mitigate such threats, we can use a security tool that monitors failed logins and automatically updates firewall rules.

:::tip

We'll install the famous security tool named `Fail2Ban`, that blocks offending IP addresses for a specified duration.

:::

## 1. Installation

First, we need to get the service installed using APT:

```sh
sudo apt install fail2ban
```

After the installation has been successful, we can continue its configuration.

## 2. Configuration

This sequence will add properties for the SSH daemon process. Protecting the SSH port on any blockchain node or server is recommended, as it is the only way to access our node.

:::info

The brutefore protection comes with separate configuration files:

- `/etc/fail2ban/jail.conf` : The updateble default configuration
- `/etc/fail2ban/jail.local`: An optional, static rules for each port and service

Its recommended to create the additional file, as those settings persist through any software updates.

:::

Open the configuration file in your preferred text editor:

<Tabs>
  <TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/fail2ban/jail.local
```

  </TabItem>
  <TabItem value="nano" label="Nano">

```sh
sudo nano /etc/fail2ban/jail.local
```

  </TabItem>
</Tabs>

Then, add the following configuration snippet to protect the SSH daemon:

```text
[sshd]
enabled=true
port=<desired-port-number>
filter=sshd
logpath=/var/log/auth.log
maxretry=3
findtime=300
bantime=28800
backend=auto
ignoreip=127.0.0.1/8
```

:::info

Replace `<desired-port-number>` with the SSH port you configured for your node.

- **maxretry** = 3: Limits failed login attempts.
- **findtime** = 300: Specifies a time window of 5 minutes before failed attempts are reset.
- **bantime** = 28800: Bans an IP for 8 hours if the limit is exceeded.

:::

  <details>
    <summary>Full Property Explanation</summary>

| **Option** | **Description**                                                                     | **Value**           |
| ---------- | ----------------------------------------------------------------------------------- | ------------------- |
| `[ ]`      | Tag for the service declaration.                                                    | `sshd`              |
| `enabled`  | Whether this rule is active when the SSH service is running.                        | `true`              |
| `port`     | Port number on which the SSH daemon listens.                                        | `22`                |
| `filter`   | Name of the filter definition used to parse log entries and detect failed attempts. | `sshd`              |
| `logpath`  | Full path to the log file to monitor for failed login attempts.                     | `/var/log/auth.log` |
| `maxretry` | Number of failed login attempts within the `findtime` window before banning the IP. | `3`                 |
| `findtime` | Time window in seconds during which `maxretry` failures are counted.                | `300`               |
| `bantime`  | Duration in seconds for which an IP is banned after exceeding `maxretry`            | `28800`             |
| `backend`  | Default backend type used to monitor the log file.                                  | `auto`              |
| `ignoreip` | Space‑separated list of IP addresses exempted from banning.                         | `127.0.0.1/8`       |

</details>

:::tip

Instead of just including the localhost range to the ignored IP addresses in order to avoid self‑lockout, you can also append any trusted IP or VPN range if you are using a specific tunnel network.

:::

:::warning

Ensure there are no extra spaces between property names and their values to avoid syntax errors.

:::

## 3. Startup

After configuring the brutefore protection for our SSH Port, we need to refresh our services to include newly set up rules.

**1. Reload the System Manager Configuration**: _Registers any new or updated service files._

```sh
sudo systemctl daemon-reload
```

**2. Start the Bruteforce Protection Tool**: _Launches the service file._

```sh
sudo systemctl start fail2ban
```

**3. Enable Automatic Startup**: _Creates a symbolic link to include the service in the boot process._

```sh
sudo systemctl enable fail2ban
```

**4. Verify Service Status**: _Checks the service's unit files, state, and log file._

```sh
sudo systemctl status fail2ban
```

The output should indicate that the service is active and running:

```text
● fail2ban.service - Fail2Ban Service
     Loaded: loaded (/lib/systemd/system/fail2ban.service; enabled; vendor preset: enabled)
     Active: active (running) since [DATE]; [TIME] ago
       Docs: man:fail2ban(1)
   Main PID: 5875 (fail2ban-server)
      Tasks: 5 (limit: 38043)
     Memory: [USED_MEMORY]
        CPU: [EXECUTION_TIME]
     CGroup: /system.slice/fail2ban.service
             └─5875 /usr/bin/python3 /usr/bin/fail2ban-server -xf start

[DATE] [USER] systemd[PID]: Started Fail2Ban Service.
[DATE] [USER] fail2ban-server[PID]: Server ready
```

If _Fail2Ban_ is active, your node is now protected against brute force attempts on SSH and other services you may configure.

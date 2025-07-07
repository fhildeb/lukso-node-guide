---
sidebar_label: "Utility Tools"
sidebar_position: 11
description: "Master essential Linux tools for running a LUKSO node, including Vim, Nano, APT package management, systemctl commands, and logging with journalctl."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Utility Tools

Proficiently running a node requires an in-depth knowledge of the command line. From updating packages, editing configuration files, and running system services, having basic tool familiarity will save time and reduce the chances of misconfiguration.

## Text Editors

Text editors allow editing configuration files, service configurations, and application setting tweaking directly from the command line. Ubuntu comes with Vim installed as its default editor, while Nano provides an easier option.

:::tip

For additional commands and descriptions, have a look at the 🐍 [**Vim Help Page**](https://manpages.ubuntu.com/manpages/noble/de/man1/vim.1.html) or ☂️ [**Nano Help Page**](https://manpages.ubuntu.com/manpages/bionic/man1/nano.1.html) for 🔸 [**Ubuntu**](https://ubuntu.com/).

:::

| **Editor**      | **Vim**                                                                        | **Nano**                                                          |
| --------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **Description** | Advanced, modal editor used in Unix systems                                    | <nobr> Beginner-friendly, modeless editor for quick edits </nobr> |
| **Benefits**    | - Highly Configurable <br/> - Ideal for Power Users                            | - Intuitive and Immediate Editing <br/> - Features On-Screen Help |
| **Startup**     | - Write `vim [file]` to open file                                              | - Write `nano [file]` to open file                                |
| **Navigation**  | - Navigate with arrows                                                         | - Navigate with arrows                                            |
| **Insertion**   | - Press `i` to start insertion mode <br/> - Press `Esc` to return to view mode | - No separate modes <br/> - Start typing immediately              |
| **Save**        | - Write `:wq` from view mode to save and quit                                  | - Press `Ctrl + O` to save and `Y` to confirm                     |
| **Quit**        | - Write `:q!` from view mode to exit                                           | - Press `Ctrl + X` to exit                                        |

## Package Management

The Advanced Package Tool is the default package manager used in Debian-based distributions, such as Ubuntu. It is used for the installation, update, and maintenance of software packages downloaded from online repositories.

:::tip

For additional commands and descriptions, have a look at the 📦 [**APT Help Page**](https://manpages.ubuntu.com/manpages/xenial/man8/apt.8.html) for 🔸 [**Ubuntu**](https://ubuntu.com/).

:::

| Frequent Commands                      | Description                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------- |
| <nobr> `apt update` </nobr>            | Updates the list of available packages and their versions                   |
| <nobr> `apt list --upgradable` </nobr> | Displays a list of packages that can be updated                             |
| <nobr> `apt install [service]` </nobr> | Installs the package of a service                                           |
| <nobr> `apt upgrade` </nobr>           | Upgrades all upgradable packages                                            |
| <nobr> `apt autoremove` </nobr>        | Removes packages that were automatically installed and are no longer needed |
| <nobr> `apt autoclean` </nobr>         | Cleans up the local repository of retrieved package files                   |

## System Control

A system daemon service forms a critical part of modern Debian-based operating systems, as it starts and manages the running programs in the background. System control commands allow the user to monitor and manage such programs individually.

:::tip

For additional commands and descriptions, have a look at the 🕹️ [**System Control Help Page**](https://manpages.ubuntu.com/manpages/trusty/man1/systemctl.1.html) for 🔸 [**Ubuntu**](https://ubuntu.com/).

:::

| Frequent Commands                          | Description                                                |
| ------------------------------------------ | ---------------------------------------------------------- |
| `systemctl list-unit-files --type=service` | Lists all available services and their enablement state    |
| `systemctl daemon-reload`                  | Reloads systems daemon manager configuration               |
| `systemctl is-enabled [service]`           | Checks whether a service is enabled to start at boot       |
| `systemctl start [service]`                | Starts a service immediately                               |
| `systemctl stop [service]`                 | Stops a running service                                    |
| `systemctl restart [service]`              | Restarts a running service                                 |
| `systemctl enable [service]`               | Enables a service to start on boot                         |
| `systemctl disable [service]`              | Disables a service from starting on boot                   |
| `systemctl status [service]`               | Displays current status, logs, and metadata of the service |

## Service Logging

When configuring your service file output, you can choose between journal and system logging, two variants that are very common for reading data and the status of services during maintenance or if there are hickups on ports or interfaces.

| Feature          | Journal Logging                                 | System Logging                           |
| ---------------- | ----------------------------------------------- | ---------------------------------------- |
| Format           | Human Friendly, Structured Format with Metadata | Basic Output as Plain Text               |
| Filtering        | Powerful Filtering by Unit, Process ID, Time    | Less Advanced Filtering through _grep_   |
| Remote Logging   | Not built-in                                    | Supports remote logging over UDP and TCP |
| Space Efficiency | More Compact using Binary Format                | Larger due to Plain Text Format          |
| Tooling          | Requires _journalctl_ from Ubuntu or Linux      | Compatible across all UNIX tools         |

:::tip

For additional commands and descriptions, have a look at the 📰 [**Journal Control Help Page**](https://manpages.ubuntu.com/manpages/focal/man1/journalctl.1.html) for 🔸 Ubuntu.

:::

<Tabs groupId="logging-tool">
  <TabItem value="journal" label="Journal Logging" default>

| Frequent Commands                          | Description                                                    |
| ------------------------------------------ | -------------------------------------------------------------- |
| `journalctl`                               | Show all logs                                                  |
| `journalctl -r`                            | Show logs in reverse chronological order                       |
| `journalctl -u [service]`                  | Show logs for a specific service                               |
| `journalctl -b`                            | Show logs from the current boot                                |
| `journalctl -b -1`                         | Show logs from the previous boot                               |
| `journalctl --since "YYYY-MM-DD HH:MM:SS"` | Show logs since a specific date and time                       |
| `journalctl --since "1 hour ago"`          | Show logs from the last hour                                   |
| `journalctl -p [priority]`                 | Show logs of a specific priority like `err`, `warning`, `info` |
| `journalctl -f`                            | Follow new log entries in real-time                            |
| `journalctl \| grep [keyword]`             | Search logs for a specific keyword                             |

</TabItem> <TabItem value="system" label="System Logging">

| Frequent Commands                | Description                                      |
| -------------------------------- | ------------------------------------------------ |
| `cat /var/log/syslog`            | Display the entire syslog file                   |
| `less /var/log/syslog`           | View syslog file with pagination                 |
| `tail -f /var/log/syslog`        | Monitor new log entries in real-time             |
| `grep [keyword] /var/log/syslog` | Search for a specific keyword in the syslog file |
| `logger "Your message"`          | Add a custom message to the syslog               |
| `sudo systemctl restart rsyslog` | Restart the syslog service                       |
| `sudo systemctl status rsyslog`  | Check the status of the syslog service           |

</TabItem>
</Tabs>

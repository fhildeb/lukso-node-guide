---
sidebar_label: "Utility Tools"
sidebar_position: 11
---

# Utility Tools

Proficiently running a node requires an in-depth knowledge of the command line. From updating packages, editing configuration files, and running system services, having basic tool familiarity will save time and reduce the chances of misconfiguration.

## Text Editors

Text editors allow editing configuration files, service configurations, and application setting tweaking directly from the command line. Ubuntu comes with Vim installed as its default editor, while Nano provides an easier option.

:::tip

For additional commands and descriptions, have a look at the [VIM MAN Page](https://manpages.ubuntu.com/manpages/noble/de/man1/vim.1.html) or [NANO MAN Page](https://manpages.ubuntu.com/manpages/bionic/man1/nano.1.html) for Ubuntu.

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

For additional commands and descriptions, have a look at the [APT MAN Page](https://manpages.ubuntu.com/manpages/xenial/man8/apt.8.html) for Ubuntu.

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

For additional commands and descriptions, have a look at the [SYSTEMCTL MAN Page](https://manpages.ubuntu.com/manpages/trusty/man1/systemctl.1.html) for Ubuntu.

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

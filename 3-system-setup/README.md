# 3. System Setup

> **_NOTE:_** The following steps are performed directly on a node machine.

In order to remotelly access a machine running a node, it needs to be configured with the right software tools and up to date at best.

## 3.1 Change Permission Set

By locking the root account, we can enhance the security of the node system, as it requires users to use superuser permissions to execute commands with root privileges, which leaves an audit trail of actions performed with elevated permissions.

#### Super User Permission

The root access does have unlimited rights. But as set up a regular user profile, some commands will require superuser privileges to run. The related `sudo` option, short for "superuser do", is a command-line utility that allows users to execute commands with the privileges of another user, typically the superuser or "root" user. It provides a controlled way to grant administrative access to specific users without sharing the root password. By using sudo, users can run commands that require elevated permissions

> Always be cautious when using `sudo`, as there is the risk of accidentally performing potentially harmful actions on the system.

Log into the system with the previous configured user profile. Type in the specified username followed by the password.

#### Password Utility

The `passwd` command is a fundamental utility in Unix-based operating systems, including Linux, for managing user passwords. It allows users to change their own passwords and, when executed with administrative privileges, to modify passwords for other users on the system.

The command offers various options for managing passwords, such as setting password expiry, locking and unlocking user accounts, and forcing users to change their password at the next login.

### 3.1.1 Disbale Root Access

Using the `passwd` command, we can lock the root account on the node system, effectively disabling the ability to directly log in as the root user using a password. We use the `-l` option to lock the specified account.

```sh
sudo passwd -l root
```

The outcome should look like this:

```
passwd: password expiry information changed.
```

All commands will now always have to ask for the sudo password, as you can not log in as root account anymore.

## 3.2 Update Ubuntu

Keeping the system and it's software up to date is essential and should be done on a regular basis.

#### Advanced Package Tool

APT is a package management system used in Debian-based Linux distributions, such as Ubuntu, to handle the installation, upgrade, and removal of software packages. It simplifies the process of managing software on Linux systems by automatically handling dependencies and providing a user-friendly interface for software installation.

Its implementation `apt` is a command-line tool and the most commonly used APT software. It provides a convenient way to interact with APT software systems, allowing users to search, install, update, and remove software packages with ease.

### 3.2.1 Update Package List

First we want to update the package list on your system. When executed, it fetches the latest package information from the repositories specified in your system's sources list. This helps to keep our system informed about the latest available versions of packages.

```sh
sudo apt update
```

### 3.2.2 Upgrade Packages

After the list is up to date, we can upgrade the installed packages on our system to their latest versions. After updating the package list using `sudo apt update`, running `sudo apt upgrade` will install any newer versions of the currently installed packages, ensuring that your system is up-to-date with the latest software and security patches.

```sh
sudo apt upgrade
```

### 3.2.3 Remove Legacy Dependencies

Now we want to remove packages that were automatically installed to satisfy dependencies for other packages and are no longer needed on the system. It helps to keep your system clean from unused packages and their associated files.

```sh
sudo apt autoremove
```

### 3.2.4 Clean Local Package Cache

After everything is up to date and removed, we can clean up the local cache of downloaded package files that are no longer needed. Cleaning removes the package files for older versions of installed packages and any packages that are no longer available in the repositories. It frees up disk space and keeps the system lean.

```sh
sudo apt autoclean
```

## 3.3 Configure Remote Access

Within the Ubuntu installation, we already installed openSSH server and I explained why it is an essential tool. If you did not configure it already, now is time to set it up so we can connect to our server from other devices in a secure manner.

The `/etc/ssh/sshd_config` file is the main configuration file for openSSH server. It contains various settings and directives that control the behavior of the SSH server, such as authentication methods, listening address, port number, and other security options. By modifying this file, you can customize the openSSH server to fit your specific requirements and enhance the security of your node.

#### Port Number

Regarding the SSH port number, the default port for openSSH server is `22`. However, it is a common practice to change the port number to a non-standard, higher value to improve security through obscurity. While changing the port number alone is not a comprehensive security solution, it can help reduce the likelihood of automated attacks and port scans targeting the default port.

It is recommended to choose a port number higher than `1024`, as ports below this range are considered privileged and require root access to bind. The highest possible number is `65535`, as port numbers are 16-bit unsigned integers. Some administrators prefer using a port number higher than `50000` to further avoid conflicts with other services and minimize the chances of being targeted by automated scans. Ultimately, the choice of port number depends on your preferences and network configuration, but it is essential to ensure that the selected port is not already in use by another service on your system.

#### Text Editor

To configure files on the node, we use Ubuntus default text editor called Vi Improved. Vim is an enhanced version of the classic Unix text editor, Vi, with additional features and improved usability. Vim operates in multiple modes, primarily normal mode, insert mode, and command mode, allowing users to efficiently navigate, edit, and manipulate text files.

Once the file is open in Vim, you'll start in normal mode. You navigate through files by using the arrow keys.

To enter insert mode to edit the text, press `i`. You'll see `-- INSERT --`showing up at the bottom of the screen. To exit insert mode and return to normal mode, press `Esc`.

To enter command mode to manage save and exit, press `:` while in normal mode. A colon will appear at the bottom of the screen.

- To write and quit, type `wq` and press `Enter`.
- To quit without saving: type `q!` and press `Enter`.

### 3.3.1 Edit SSH Configuration

Lets open the configuration file using Vim.

```sh
sudo vim /etc/ssh/sshd_config
```

Locate the line that starts with `#Port 22` and uncomment it by removing the `#` at the beginning, if it is present. This will activate the static port number you want to use for connecting to the node.

Change the port number `22` to your desired one, for example, port `50022`, then save and exit.

In order to apply the change, we need to restart the SSH service of the node.

#### Manage System Services

System Control is a powerful command-line utility that serves as the primary management tool for system processes, which is widely used across modern Linux distributions. By leveraging `systemctl`, administrators can control and get insights into their system's state, enabling to fine-tune their environment for optimal performance, stability, and security. The system control command offers a unified and consistent approach to starting, stopping, enabling, disabling, and checking the status of various components.

You can use the following command to check all system services:

```sh
systemctl list-unit-files --type=service
```

### 3.3.2 Adapt to Changes

To make the SSH service use the updated config file, we need to restart the OpenSSH server using the `systemctl` command.

#### Deamon Processes

As you saw in the system service list, both `ssh` and `sshd` services refer to the SSH processes.

Daemon services are background processes that run continuously on Unix-like operating systems, including Linux. These services perform various tasks and provide essential functionalities, often without direct user interaction.

In our case, `sshd` is the SSH deamon which is managed by the `ssh` service. We can use it to validate our updated SSH configuration in a test run.

```sh
sudo sshd -t
```

If there is no output, everything is fine to run it live on the machine, affecting the real service.

```sh
sudo systemctl restart sshd
```

## 3.4 Remote Access on Startup

Next, we want to check if OpenSSH server starts automatically when the system boots up. Here we can also use the system control to check if it is enabled already.

### 3.4.1 Check SSH on Startup

```sh
sudo systemctl is-enabled ssh
```

If it should not be enabled, we need to configure it using a symbolic link.

#### Symbolic Links

A symbolic link, also known as a symlink or soft link, is a special type of file in Unix-like operating systems that serves as a reference or pointer to another file or directory. It establishes a link between the path of the symbolic link and the target file or directory, allowing users and applications to access the target resource as if it were at the symlink's location.

In our example, the symbolic link needs to be created between the OpenSSH service unit file and a corresponding file in the system directory meant for system services that are enabled to start at boot. This system directory is then scanned during the boot process, and all service unit files that have a symbolic link in this directory are automatically started. A smybolic link is used, so there are no duplications of the actual service.

### 3.4.2 Enable SSH on Startup

We call the system control with the `enable` subcommand to create a symbolic link for the SSH application.

```sh
sudo systemctl enable ssh
```

## 3.5 Configure Firewall

Now we need to enable ssh in firewall by allowing incoming connections to the previous configured port.

#### Uncomplicated Firewall

UFW is a user-friendly command-line interface for managing firewall configurations on Linux systems. It simplifies the process of configuring and maintaining a firewall by providing an intuitive set of commands and options. UFW streamlines the process of setting up and managing firewall rules.

### 3.5.1 General Port Locking

By default, all outgoing traffic should be enabled, all incoming traffic should be disabled.

```sh
sudo ufw default allow outgoing
sudo ufw default deny incoming
```

### 3.5.2 Enable SSH Connection

If you allow for just the port number, both TCP and UDP protocols will be possible. However, the User Datagram Protocol is a connectionless protocol. It offers faster data transmission but does not guarantee reliable, ordered, or error-checked delivery.

#### TCP Forcing

For SSH connections, it is recommended to only allow TCP. SSH uses the TCP protocol for its connections because it relies on a reliable and error-checked data transmission. Therefore, TCP is more secure and appropriate for SSH connections, instead of leaving the port open to all protocols.

We use UFW to allow SSH connections. Make sure to change your port number accordingly.

```sh
sudo ufw allow 50022/tcp
```

#### Internet Protocol Versioning

The Internet Protocol is responsible for identifying and locating devices on networks and routing traffic across the internet.

If you enabled both, IPv6 and IPv4 during the installation of your node, the command will print out that a rule was added for `v6` connections.

The `v6` suffix in the UFW rules indicates that the rule is applied to IPv6 network traffic. The Internet Protocol version 6 is the most recent version of the Internet Protocol.

Basic port rules without any suffix, mean that they apply to IPv4 network traffic, the previous version 4.

Both are widely used. The primary differences between IPv4 and IPv6 are in their address space, addressing mechanisms, and additional features. The expanded address space in IPv6 helps accommodate the growing number of devices connected to the internet. IPv6 also introduces several enhancements over IPv4, such as built-in support for Internet Protocol Security, providing secure, encrypted communication between devices.

### 3.5.3 Firewall Checkup

After executing those firewall commands, you do not need to restart the firewall. The changes take effect immediately, and UFW will begin applying the changes according to the new default policy. However, check if the firewall is enabled:

```sh
sudo systemctl is-enabled ufw
```

If the firewall is running, you can check if the firewall is within an `active` or `inactive` status:

```sh
sudo ufw status
```

### 3.5.4 Enable Firewall

If it should not be inactive, we need to configure it using a symbolic link as before:

```sh
sudo ufw enable
```

### 3.5.5 Edit Port Rules

If you have made some port rules you do not want, print out a list with all existing rules like before.

```sh
sudo ufw status
```

Every row within the list has a number, stating by 1. If you want to delete the rule in the second row, type:

```sh
sudo ufw delete 2
```

If your ports are alright, we can continue setting up the router and address assignment.

**Continue with Section 4: [Router Config](/4-router-config/)**

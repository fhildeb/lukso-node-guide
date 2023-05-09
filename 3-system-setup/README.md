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

### 3.1.2 Check Root Account

To verify that the change was effective, use the password command again with the `-S` option, so you can see the status of the root account:

```sh
sudo passwd -S root
```

The outcome should look like this:

```
root L 02/17/2023 0 99999 7 -1
```

The uppercase `L` behind the account name means the root account has been locked successfully. If you see a uppercase `P`, it indicates that the account is not locked and still has a valid password. If the `L` shows up, all commands will now always have to ask for the sudo password, as you can not log in as root account anymore.

## 3.2 Manage Storage Volumes

As described in the previous guide of the system installation, the LVM is a flexible and powerful storage management system. It delivers great functionality, however initially only allocates `100GB` of storage for the install volume by default.

The default allocation ensures that there is ample storage for basic system functionality without consuming the entire available storage capacity. This approach provides users with the flexibility to extend the storage volumes as needed, based on their specific requirements and the growth of their data.

One of the main reasons for this conservative allocation is that it is much easier to extend storage volumes than it is to shrink them. Shrinking volumes can be a more complicated and time-consuming process, often requiring unmounting and remounting of the filesystems and a greater risk of data loss. By starting with a smaller allocation, LVM allows you to manage your storage more efficiently.

> As we use the server as the main node machine, we want to extend the capacity of the logical storage to the maximum of the physical storage device before even the physical storage space is no longer sufficient and new hard disks have to be added.

**Before we extend the storage, we have to check the volume group's status.**

### 3.2.1 Checking the volume group

By using the volume group display command we can track information about the existing volume groups of LVM. It provides details on the properties, such as the VG name, total size, free size, and the number of physical volumes and logical volumes that it contains.

```sh
sudo vgdisplay
```

The output should be something like this:

```
  --- Volume group ---
  VG Name               ubuntu-vg
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  2
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                1
  Open LV               1
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               [VOLUME_GROUP_SIZE]
  PE Size               4.00 MiB
  Total PE              [TOTAL_PE]
  Alloc PE / Size       [ALLOCATED_PE] / 100.00 GiB
  Free  PE / Size       [FREE_PE] / [FREE_DISK_SPACE]
  VG UUID               [UNIVERSALLY_UNIQUE_IDENTIFIER]
```

#### Physical Extents

When a physical volume is added to a volume group, the disk space in the physical volume is divided into Physical Extents. The size of the physical extend is determined when the volume group is created and all extents within a group are the same size.

They are portions of disk space on a physical volume, usually several megabytes.

- `Total Physical Extents`: Total Number of Physical Extents that are allocated or free across all volumes.
- `Alloc Physical Extents / Size`: displays how much space has been allocated by the logical volume.
- `Free Physical Extents / Size`: displays how much free space units are left on the physical volume. If it is already zero, there is no more physical free disk space left.

Check the amount of free disk space that is still left on the physical volume. There should be plenty of space left that we can add to the logical volume of the group.

### 3.2.2 Extending the volume groups

LVM itself comes with its own toolkit on Unix-like operating systems such used to increase the size of a logical volume. We can pass the following arguments:

- `-l`: the flag specifies the size should be given in extents. We can use the `+100%FREE` parameter to tell the extension tool to use all of the free Physical Extents in the volume group. It will then effectively extend the logical volume to use all of the remaining free space in the volume group.
- `path`: the parameter defines the logical volume that you want to extend

```sh
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
```

The output should look like the following:

```sh
  Size of logical volume ubuntu-vg/ubuntu-lv changed from 100.00 GiB ([ALLOCATED_PE] extents) to [FULL_DISK_SPACE] ([TOTAL_PE] extents).
  Logical volume ubuntu-vg/ubuntu-lv successfully resized.
```

**After running this command, the file system on the LV needs to be resized to take advantage of the newly added space.**

### 3.2.3 Resizing the volume groups

LVM itself comes with its own utility that allows you to resize Linux file systems. It can be used to increase or decrease the size of an existing file system. We can pass the device file representing the logical volume we want to resize.

```sh
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```

> When `resize2fs` command is called without specifying a new size, it will default to resizing the file system to take up all available space on the device we extended before.

The output should look like the following:

```sh
resize2fs 1.46.5 ([DATE])
Filesystem at /dev/mapper/ubuntu--vg-ubuntu--lv is mounted on /; on-line resizing required
old_desc_blocks = [DESC_BLOCKS], new_desc_blocks = [NEW_DESC_BLOCKS]
The filesystem on /dev/mapper/ubuntu--vg-ubuntu--lv is now [TOTAL_BLOCKS] ([BLOCK_NUMBER]) blocks long.
```

#### Descriptor Blocks Usage

File systems, have two key components: index nodes and descriptor blocks.

- **Index Nodes** are data structures within a filesystem that contain information about a file or directory, such as its size, owner, and access rights. Every file or directory has an associated inode, which essentially serves as a table of contents for the file's data.
- **Descriptor Blocks** are part of the filesystem's metadata. They contain information about where the actual file data is located on the disk and keep track of arrangement information, such as the number of free index nodes, when new files are created.

In the context of the resizing, new descriptor blocks have been created in order to map the file metadata to the actual physical counterpart.

### 3.2.4 Verifying the disk volume

After extending and resizing the volumes, we need to make sure that everything was executed properly. Run the volume group display in order to check the current setup:

```sh
sudo vgdisplay
```

The output should be something like this:

```
  --- Volume group ---
  VG Name               ubuntu-vg
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  3
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                1
  Open LV               1
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               [VOLUME_GROUP_SIZE]
  PE Size               4.00 MiB
  Total PE              [TOTAL_PE]
  Alloc PE / Size       [ALLOCATED_PE] / [FULL_DISK_SPACE]
  Free  PE / Size       0 / 0
  VG UUID               [UNIVERSALLY_UNIQUE_IDENTIFIER]
```

During the checkup, look out for the following values:

- `[VOLUME_GROUP_SIZE]` should be equal to `[FULL_DISK_SPACE]`
- `[ALLOCATED_PE]` should be equal to `[TOTAL_PE]`
- `Free PE / Size` should be `0 / 0`

**If the storage volumes are extended correctly, we can continue configuring our software updates.**

## 3.3 Ubuntu Updates

Keeping the system and it's software up to date is essential and should be done on a regular basis.

#### Advanced Package Tool

APT is a package management system used in Debian-based Linux distributions, such as Ubuntu, to handle the installation, upgrade, and removal of software packages. It simplifies the process of managing software on Linux systems by automatically handling dependencies and providing a user-friendly interface for software installation.

Its implementation `apt` is a command-line tool and the most commonly used APT software. It provides a convenient way to interact with APT software systems, allowing users to search, install, update, and remove software packages with ease.

### 3.3.1 Update Package List

First we want to update the package list on your system. When executed, it fetches the latest package information from the repositories specified in your system's sources list. This helps to keep our system informed about the latest available versions of packages.

```sh
sudo apt update
```

### 3.3.2 Upgrade Packages

After the list is up to date, we can upgrade the installed packages on our system to their latest versions. After updating the package list using `sudo apt update`, running `sudo apt upgrade` will install any newer versions of the currently installed packages, ensuring that your system is up-to-date with the latest software and security patches.

```sh
sudo apt upgrade
```

### 3.3.3 Remove Legacy Dependencies

Now we want to remove packages that were automatically installed to satisfy dependencies for other packages and are no longer needed on the system. It helps to keep your system clean from unused packages and their associated files.

```sh
sudo apt autoremove
```

### 3.3.4 Clean Local Package Cache

After everything is up to date and removed, we can clean up the local cache of downloaded package files that are no longer needed. Cleaning removes the package files for older versions of installed packages and any packages that are no longer available in the repositories. It frees up disk space and keeps the system lean.

```sh
sudo apt autoclean
```

### 3.3.5 Enable Automatic Security Updates

Servers have security beams and are often operated continuously, which makes it hard to install software on the fly. However, it is a must have to always be up to date.

The `unattended-upgrades` package is a valuable tool for maintaining the security and stability of a Linux system. It automates the process of installing important updates, primarily focusing on security patches and critical bug fixes, ensuring that your system is up-to-date and protected against known vulnerabilities.

By using unattended-upgrades, node operators can reduce the manual effort involved in monitoring and applying updates, while minimizing the risk of potential downtime or breaches caused by outdated software. The package offers various configuration options to tailor the upgrade process according to the specific needs of a system, such as the ability to select which packages to update, schedule the upgrade frequency, and control notifications.

First, we have to install the package itself using APT:

```sh
sudo apt install unattended-upgrades
```

Afterwards, we can reconfigure the `unattended-upgrades` package using the package reconfigurment tool.

#### Package Reconfigurment Utility

The `dpkg-reconfigure` command is a utility that reconfigures an already-installed package using values provided by the user. It is part of the Debian package management system and allows you to modify the configuration of a package after its installation. This can be helpful for us to change settings or preferences for a specific package without reinstalling it.

We can use it to reconfigure the `unattended-upgrades` package. Using the `-plow` flag, we are able to set the priority to "low", which means only essential questions will be asked during the reconfiguration process, and most options will be set to their default values.

The purpose of this is to ensure that the `unattended-upgrades` package is set up correctly, enabling automatic security updates for your system.

```sh
sudo dpkg-reconfigure -plow unattended-upgrades
```

You will get a screen prompt in the terminal. Agree with `<Yes>` and continue the setup.

![Auto Update Screen](/img/setup-autoupdate.png)

**Now that package maintanance is set up, we can continue with the remote access.**

## 3.4 Configure Remote Access

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

### 3.4.1 Edit SSH Configuration

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

### 3.4.2 Adapt to Changes

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

## 3.5 Set Remote Access on Startup

Next, we want to check if OpenSSH server starts automatically when the system boots up. Here we can also use the system control to check if it is enabled already.

### 3.5.1 Check SSH on Startup

```sh
sudo systemctl is-enabled ssh
```

If it should not be enabled, we need to configure it using a symbolic link.

#### Symbolic Links

A symbolic link, also known as a symlink or soft link, is a special type of file in Unix-like operating systems that serves as a reference or pointer to another file or directory. It establishes a link between the path of the symbolic link and the target file or directory, allowing users and applications to access the target resource as if it were at the symlink's location.

In our example, the symbolic link needs to be created between the OpenSSH service unit file and a corresponding file in the system directory meant for system services that are enabled to start at boot. This system directory is then scanned during the boot process, and all service unit files that have a symbolic link in this directory are automatically started. A smybolic link is used, so there are no duplications of the actual service.

### 3.5.2 Enable SSH on Startup

We call the system control with the `enable` subcommand to create a symbolic link for the SSH application.

```sh
sudo systemctl enable ssh
```

## 3.6 Configure Firewall

Now we need to enable ssh in firewall by allowing incoming connections to the previous configured port.

#### Uncomplicated Firewall

UFW is a user-friendly command-line interface for managing firewall configurations on Linux systems. It simplifies the process of configuring and maintaining a firewall by providing an intuitive set of commands and options. UFW streamlines the process of setting up and managing firewall rules.

### 3.6.1 General Port Locking

By default, all outgoing traffic should be enabled, all incoming traffic should be disabled.

```sh
sudo ufw default allow outgoing
sudo ufw default deny incoming
```

### 3.6.2 Enable SSH Connection

If you allow for just the port number, both TCP and UDP protocols will be possible. However, the User Datagram Protocol is a connectionless protocol. It offers faster data transmission but does not guarantee reliable, ordered, or error-checked delivery.

#### TCP Forcing

For SSH connections, it is recommended to only allow TCP. SSH uses the TCP protocol for its connections because it relies on a reliable and error-checked data transmission. Therefore, TCP is more secure and appropriate for SSH connections, instead of leaving the port open to all protocols.

We use UFW to allow SSH connections and make sure to change `<desired-port-number>` to your actual port.

```sh
sudo ufw allow <desired-port-number>/tcp
```

#### Internet Protocol Versioning

The Internet Protocol is responsible for identifying and locating devices on networks and routing traffic across the internet.

If you enabled both, IPv6 and IPv4 during the installation of your node, the command will print out that a rule was added for `v6` connections.

The `v6` suffix in the UFW rules indicates that the rule is applied to IPv6 network traffic. The Internet Protocol version 6 is the most recent version of the Internet Protocol.

Basic port rules without any suffix, mean that they apply to IPv4 network traffic, the previous version 4.

Both are widely used. The primary differences between IPv4 and IPv6 are in their address space, addressing mechanisms, and additional features. The expanded address space in IPv6 helps accommodate the growing number of devices connected to the internet. IPv6 also introduces several enhancements over IPv4, such as built-in support for Internet Protocol Security, providing secure, encrypted communication between devices.

### 3.6.3 Firewall Checkup

After executing those firewall commands, you do not need to restart the firewall. The changes take effect immediately, and UFW will begin applying the changes according to the new default policy. However, check if the firewall is enabled:

```sh
sudo systemctl is-enabled ufw
```

If the firewall is running, you can check if the firewall is within an `active` or `inactive` status:

```sh
sudo ufw status
```

### 3.6.4 Enable Firewall

If it should not be inactive, we need to configure it using a symbolic link as before:

```sh
sudo ufw enable
```

### 3.6.5 Edit Port Rules

If you have made some port rules you do not want, print out a list with all existing rules like before.

```sh
sudo ufw status
```

Every row within the list has a number, stating by 1. If you want to delete the rule in the second row, type:

```sh
sudo ufw delete 2
```

If your ports are alright, we can continue setting up the brute force protection that will utilize the firewall.

## 3.7 Set Brute Force Protection

Brute force protection is a critical aspect of securing blockchain nodes and servers. As these systems often manage valuable assets and sensitive information, they are prime targets for attackers seeking unauthorized access. Brute force attacks involve systematically attempting various combinations of ports, usernames, and passwords to gain access to a target system. To mitigate such attacks, it is essential to implement robust security measures on blockchain nodes and servers.

While we will protect our system with key authentication later on, it is smart limiting login attempts and pintests. One widely used security tool is called Fail2Ban. It is a security tool that helps protect your system against brute-force attacks and other types of unauthorized access attempts. It monitors log files for patterns that indicate malicious activities, such as repeated failed login attempts.

When such activities are detected, Fail2Ban automatically updates the firewall rules to block the offending IP addresses for a specified duration.

### 3.7.1 Install Fail2Ban

First we need to get the service installed using APT:

```sh
sudo apt install fail2ban
```

After the installation was successful, we can continue it's configuration.

### 3.7.2 Configure Protection Rules

Fail2Ban comes with its own preset of configurations that are saved within the `/etc/fail2ban/jail.conf` file. However, the tool comes with its own behavior if you want to apply custom rules.

Within Fail2Ban, the `/etc/fail2ban/jail.local` file is used to define custom configurations and rules for it. It allows you to specify settings for individual services, determine how many failed login attempts should trigger a ban, set the duration of the ban, and define other security measures.

By creating and editing the `jail.local` file, you can override the default settings found in `/etc/fail2ban/jail.conf` without modifying the original configuration file.

Using a separate file for custom configurations is a recommended practice because it ensures that your changes are preserved when Fail2Ban is updated.

For the blockchain node, its recommended to set properties for the SSH deamon process, as it is the only way to access our node. We can do so by defining the `[sshd]` tag and set `enabled=true`. These are the recommended settings:

- **port**: This specifies the port number on which the SSH daemon is listening. Set your opened port number you've configured for SSH on the node.
- **filter**: This option sets the filter to be used for parsing log files and detecting failed login attempts. In our case, the filter should be set to `sshd`, which is a predefined filter for the SSH daemon.
- **logpath**: This sets the path to the log file for monitoring for failed login attempts. The file typically contains information about authentication events, including failed SSH login attempts. I will set its path to `/var/log/auth.log` as it is the standard location for log files on Unix-based systems. It is designed to store log files generated by various system processes, services, and applications. Placing it in the `/var/log/` directory follows the standard convention and allows system administrators to easily locate and manage log files related to different system components in a centralized location.
- **maxretry**: This option sets the maximum number of failed login attempts allowed within the specified findtime period before an IP address gets banned. My personal preference would be `3` attemps, as its a common number also used for bankcard payments.
- **findtime**: This option sets the time window in seconds, during which maxretry failed login attempts can occur before an IP address gets banned. In my case, I set to `300 seconds`, e.g., `5 minutes` but you could also reduce the number.
- **bantime**: This option sets the duration in seconds for which an IP address will be banned after exceeding the allowed number of failed login attempts within the findtime period. In my case, it's set to `28,800 seconds`, e.g., `8 hours` before the IP address is allowed to try again.
- **backend**: This option sets the backend used to monitor the specified log file. When set to `auto`, the service will automatically select the most appropriate backend based on your system's configuration.

> If you only want to maintain your node from home you can also set the following `ignoreip` property.
>
> It is not recommended by default as this will limit yourself when accessing the node from the outside world with changing IPs. You could allow connections from your VPN service's address range. But keep in mind that people with the same VPN service could still bypass the restrictions.

Open the configuration file:

```sh
sudo vim /etc/fail2ban/jail.local
```

Input the properties into the configuration snippet:

```
[sshd]
enabled=true
port=<desired-port-number>
filter=sshd
logpath=/var/log/auth.log
maxretry=3
findtime=300
bantime=28800
backend=auto
```

Please make sure to exchange `<desired-port-number>` with the port number you opened for SSH. You may want to change certain settings to personalize your setup.

> Be cautious: When creating new rules or modifying existing ones, it's essential to follow the correct syntax and structure to ensure that Fail2Ban functions properly and provides the desired level of security. Verify that you do not use spaces between properties and their values.

### 3.7.3 Start the Fail2Ban Service

First we need to reload the system manager configuration. It is used when making changes to service configuration files or create new service files, ensuring that systemd is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterwards we can start the Fail2Ban service using the system control command

```sh
sudo systemctl start fail2ban
```

To enable the Fail2Ban service to start automatically when the system boots we can use the system control to creates a symbolic link as we did before.

```sh
sudo systemctl enable fail2ban
```

To check if the Fail2Ban service is running and configured properly, we can fetch the current status from the system control. It will display whether it is active, enabled, or disabled, and show any recent log entries.

```sh
sudo systemctl status fail2ban
```

The output should look like this:

```
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

If everything was alright, we can start configuring our network and router settings for the node.

**Continue with Section 4: [Router Config](/4-router-config/)**

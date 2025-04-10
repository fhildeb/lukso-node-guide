---
sidebar_label: "3.3 Ubuntu Updates"
sidebar_position: 3
---

# 3.3 Ubuntu Updates

Keeping the system and its software up to date is essential and should be done regularly.

#### Advanced Package Tool

APT is a package management system used in Debian-based Linux distributions, such as Ubuntu, to handle installing, upgrading, and removing software packages. It simplifies managing software on Linux systems by automatically taking dependencies and providing a user-friendly interface for software installation.

Its implementation `apt` is a command-line tool and the most commonly used APT software. It provides a convenient way to interact with APT software systems, allowing users to quickly search, install, update, and remove software packages.

### 3.3.1 Update Package List

First, we want to update the package list on your system. When executed, it fetches the latest package information from the repositories specified in your system's sources list. List updates help to keep our system informed about the latest available versions of packages.

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

After everything is up to date and removed, we can clean up the local cache of downloaded package files that are no longer needed. Cleaning eliminates the package files for older versions of installed packages and any packages no longer available in the repositories. It frees up disk space and keeps the system lean.

```sh
sudo apt autoclean
```

### 3.3.5 Enable Automatic Security Updates

Servers have security beams and are often operated continuously, making installing software on the fly hard. However, it is a must-have to always be up to date.

The `unattended-upgrades` package is a valuable tool for maintaining the security and stability of a Linux system. It automates installing important updates, primarily focusing on security patches and critical bug fixes, ensuring your system is up-to-date and protected against known vulnerabilities.

Using the `unattended-upgrades` package, node operators can reduce the manual effort involved in monitoring and applying updates while minimizing the risk of potential downtime or breaches caused by outdated software. The package offers various configuration options to tailor the upgrade process according to the specific needs of a system, such as the ability to select which packages to update, schedule the upgrade frequency, and control notifications.

First, we have to install the package itself using APT:

```sh
sudo apt install unattended-upgrades
```

Afterward, we can reconfigure the `unattended-upgrades` package using the package reconfiguring tool.

#### Package Reconfigurment Utility

The `dpkg-reconfigure` command is a utility that reconfigures an already-installed package using values provided by the user. It is part of the Debian package management system and allows you to modify a package's configuration after its installation. Automated reconfigurations can be helpful for us to change settings or preferences for a specific package without reinstalling it.

We can use it to reconfigure the `unattended-upgrades` package. Using the `-plow` flag, we can set the priority to "low," meaning only essential questions will be asked during the reconfiguration process, and most options will be charged to their default values.

Low priorities aim to ensure that the `unattended-upgrades` package is set up correctly, enabling automatic security updates for your system.

```sh
sudo dpkg-reconfigure -plow unattended-upgrades
```

You will get a screen prompt in the terminal. Agree with `<Yes>` and continue the setup.

![Auto Update Screen](/img/guides/system-setup/setup-autoupdate.png)

**Now that package maintenance is set up, we can continue with the remote access.**

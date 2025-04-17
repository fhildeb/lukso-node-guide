---
sidebar_label: "3.3 Ubuntu Updates"
sidebar_position: 3
---

# 3.3 Ubuntu Updates

Keeping your Ubuntu system up to date is essential for security, stability, and performance. Regular updates ensure that all software packages and security patches are current, reducing vulnerabilities and maintaining optimal performance of your node. This section details how to update the package list, upgrade installed packages, remove obsolete dependencies, clean the package cache, and enable automatic security updates.

## Advanced Package Tool

APT is the package management system used in Ubuntu and other Debian-based distributions to install, upgrade, and remove software packages. Its command-line tool _apt_ handles dependencies automatically and provides a user-friendly way to manage software on your system.

:::tip

APT also ensures that your system receives timely security patches and performance improvements.

:::

## 1. Updating the Package List

Updating the package list fetches the latest package information from the repositories defined in your system's sources list. This step is crucial to ensure that you’re installing the most recent versions of software. Without an updated package list, your system cannot identify new updates or security fixes available from the Ubuntu repositories.

```sh
sudo apt update
```

## 2. Upgrading Packages

After updating the package list, you can upgrade the installed packages on your system to their latest versions. This ensures that you benefit from recent updates, security patches, and performance improvements. Keeping packages upgraded minimizes vulnerabilities and ensures the system is running the most efficient versions of all software components.

```sh
sudo apt upgrade
```

## 3. Removing Legacy Dependencies

Over time, the system may accumulate packages that were automatically installed as dependencies but are no longer required. Removing these legacy dependencies frees up disk space, reduces the risk of conflicts, and simplifies system maintenance.

```sh
sudo apt autoremove
```

## 4. Cleaning Local Package Cache

Cleaning the local package cache removes outdated package files that are no longer needed after installation. This step helps reclaim disk space and keeps your system lean. Regularly cleaning the cache prevents the build-up of obsolete cache files.

```sh
sudo apt autoclean
```

## 5. Enabling Security Updates

For a secure and stable server environment, it is important to apply critical updates automatically. It's possible to automate the installation of security updates and essential patches to ensure your system is up-to-date and protected against known vulnerabilities.

:::info

Using the `unattended-upgrades` package, node operators can reduce the manual effort involved in monitoring and applying updates while minimizing the risk of potential downtime or breaches caused by outdated software. The package offers various configuration options to tailor the upgrade process according to the specific needs of a system, such as the ability to select which packages to update, schedule the upgrade frequency, and control notifications.

:::

**1. Install Unattended Upgrades**: _Download the package using APT_

```sh
sudo apt install unattended-upgrades
```

**2. Configure Unattended Upgrades**: _Reconfigure the package to enable automatic updates._

```sh
sudo dpkg-reconfigure -plow unattended-upgrades
```

:::tip

Setting the priority to low using `plow` ensures that only essential questions are asked, and default options are applied.

:::

:::info

The `dpkg-reconfigure` command is a utility that reconfigures an already-installed package using user-provided values.
:::

You will get a screen prompt in the terminal. Agree with \<Yes\> and continue the setup.

![Auto Update Screen](/img/guides/system-setup/setup-autoupdate.png)

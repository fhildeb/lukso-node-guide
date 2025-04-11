---
sidebar_label: "1.2 OS Installation"
sidebar_position: 2
---

# 1.2 OS Installation

### Download and Preparation

> I will use Ubuntu as it's the quickest and easiest setup for an offline machine using USB.

Download the latest official Ubuntu version from `ubuntu.com/download/desktop`. You need a USB device with at least 4GB that you can use to install the firmware on the storage disk. Ideally, the operating system is the latest LTS build, so there are no errors with dependencies that could not load for the generation software for the keys.

1. Download [Ubuntu 22.04.2 LTS](https://ubuntu.com/download/desktop)
2. Create a Bootable USB Drive with the ISO file
   - Windows: [Rufus Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-overview)
   - Linux: [Disk Creator Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-ubuntu#1-overview)
   - MacOS: [Etcher Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-macos#1-overview)
3. Disconnect the USB drive
4. Connect the USB drive to your machine

> An up-to-date system is essential to use the Deposit CLI tool.

### System Installation

After getting the boot device ready, we can continue with the installation.

**Make sure to never connect to the internet. Do not connect an Ethernet Cable.**

#### Enter BIOS

> Connect your machine to power and attach a keyboard and monitor.

1. Connect your Bootbable USB device to the node
2. Turn on the node using the power button
3. Press `F2` on your keyboard during boot to enter the BIOS setup

#### Change Boot Order

1. Go to `Boot` -> `Boot Priority`
2. Set `Boot Option #1` to your USB device
3. Set `Boot Option #2` to your internal SSD

#### Operating System Startup

Now that we configured the BIOS correctly, we can exit and start up the node from the defined boot device.

1. Press `F10` to save changes and exit BIOS
2. Wait for the stick to boot up
3. Choose `Try or Install Ubuntu Server`

### Ubuntu Installation

You will be left with the following screen:

![Try or Install Ubuntu Server](/img/guides/validator-setup/validator_install_1.png)

Afterward, the initial Ubuntu setup screen will come up.

#### Setup Process

![Initial Setup Screen](/img/guides/validator-setup/validator_install_2.png)

1. **System Language**: Choose your operating system's language.
2. **Keyboard Configuration**: Specify your keyboard layout and language.
3. **Updates and Software**: Choose `Minimal Installation` to reduce installation time and program scope, to reduce potential bugs or leaks. Remove the tick from `Download updates while installing Ubuntu` as it won't work on an offline device. Also, ensure there is no tick at `Install third-party software for graphics and Wi-Fi hardware and additional media formats`. We don't need all those things as the system will never be used as a regular pc for this installation. As this device will be flashed right after, we do not need encryption.
4. **Installation Type**: Choose `Erase disk and install Ubuntu`. The machine's storage will be formatted, erasing the previous data. When prompted with a pop-up, click on `Continue`.
5. **Time Zones**: Choose any timezone you like. It will be the default time configured on the clock.
6. **Login Data**: Define a name, username, and password.

> Finish the setup and remove the bootable USB stick when prompted.

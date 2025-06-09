---
sidebar_label: "1.2 OS Installation"
sidebar_position: 2
---

# 1.2 OS Installation

This section covers the installation of the operating system for your offline machine used to generate the validator keys.

:::info

The guide uses the latest Ubuntu LTS release to ensure compatibility with the key generation tools and provides a stable, secure environment for generating your validator keys. It’s the quickest and easiest setup for an offline machine using a USB drive. However, you could also use MacOS or Windows.

:::

## 1. Download and Preparation

Follow these steps to prepare your bootable USB device from a machine that connected to the internet:

**1. Download Ubuntu**: Get the latest official Ubuntu version from [Ubuntu 22.04.2 LTS](https://ubuntu.com/download/desktop).

**2. Create a Bootable USB Drive**: Use the ISO file to create a bootable device:

- Windows: [Rufus Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-overview)
- Linux: [Disk Creator Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-ubuntu#1-overview)
- macOS [Etcher Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-macos#1-overview)

**3. Finalize USB Preparation**:

- Disconnect the USB drive from your current computer.
- Reconnect the USB drive to your offline machine when ready.

## 2. System Installation

In this phase, Ubuntu will be installed on your offline machine. Keeping the system offline is crucial for ensuring the security and integrity of the key generation process as outlined in detail within the previous [Precautions](./precautions.md) page.

:::warning

Make sure to never connect to the internet during the installation process. Do not connect an Ethernet cable.

:::

:::info

Steps have been done on an Intel NUC. Key combinations or commands may be different across devices.

:::

**2.1 Enter the BIOS**: _Power your machine, attach keyboard and monitor, and follow these steps to enter the BIOs menu._

1. Connect your bootable USB device to the machine.
2. Turn on the machine using the power button.
3. Press `F2` on your keyboard during boot to enter the BIOS setup.

**2.2 Change Boot Order**: _Adjust the boot priority to ensure the machine boots from the USB drive._

1. Navigate to `Boot` -> `Boot Priority` in the BIOS.
2. Set `Boot Option #1` to your USB device.
3. Set `Boot Option #2` to your internal SSD.

**2.3 Operating System Startup**: _After configuring the BIOS settings, start the OS from the bootable USB device._

1. Press `F10` to save changes and exit the BIOS.
2. Wait for the system to boot from the USB drive.
3. Select **Try or Install Ubuntu Server** from the boot menu.

![Try or Install Ubuntu Server](/img/guides/validator-setup/validator_install_1.png)

## 3. Ubuntu Installation

Once the machine boots from the USB drive, the Ubuntu installation environment will launch. Follow these steps to ensure a minimal and secure installation without unneccesary software bloating the system or previous data still being on the device.

:::tip

Further details about [**Operating Systems**](/docs/theory/node-operation/operation-systems.md) and [**Disk Management**](/docs/theory/node-operation/disk-management.md)
can be found in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.
:::

![Initial Setup Screen](/img/guides/validator-setup/validator_install_2.png)

1. System Language: Choose your preferred language for the operating system.
2. Keyboard Configuration: Select the appropriate keyboard layout.
3. Updates and Software: Choose Minimal Installation to speed up installation and reduce unnecessary load.
4. Installation Type: Select Erase disk and install Ubuntu to ensure a clean installation.
5. Time Zones: Choose any time zone; this sets the default system clock.
6. Login Data: Enter your name, username, and password for the system.
7. Finish the setup and remove the bootable USB stick when prompted.

:::warning

- Do not **download updates while installing Ubuntu** since the device is offline.
- Do not **install third-party software for graphics and Wi-Fi hardware** to reduce unnecessary load.

:::

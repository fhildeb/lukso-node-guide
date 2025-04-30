---
sidebar_label: "2.4 OS Installation"
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 2.4 OS Installation

Installing the right operating system is crucial for your node's stability and performance. In the blockchain space, almost every node is either run using Ubuntu or Debian under the hood.
They're open-source and flexible, provide excellent stability, extensive community support, and seamless integration with software automation.

:::tip

If you are uncertain about which operating system and version to choose, you can find further details and comparisons in the [Operating Systems](/docs/theory/node-operation/operation-systems.md) chapter of the [**🧠 Theory**](/docs/theory/preparations/node-specification.md) section.

:::

:::warning

If you plan to become a validator and do not have a separate computer available to safely generate your validator keys offline, head over to the [Key Generation](/validator-key-generation/) section and generate your keys using your current node first. Then reflash your machine to continue with the OS installation.

:::

## Creating a Bootable Device

Both Ubuntu and Debian require a USB device with at least 2GB of capacity to create a bootable installer. Once downloaded, the bootable USB device is created on your personal computer. Once the update is complete, the USB device can be removed and inserted to your node to install the operation system on it's primary storage disk.

<Tabs>
<TabItem value="ubuntu" label="Ubuntu">
  
1. **Download the Ubuntu Server LTS**  
   Download [Ubuntu 22.04.2 Server](https://ubuntu.com/download/server) from the official website.

2. **Create a Bootable USB Drive**  
   Use the ISO file to create a bootable USB drive:

   - **Windows:** Follow the [Rufus Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-overview).
   - **Linux:** Use the [Disk Creator Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-ubuntu#1-overview).
   - **MacOS:** Refer to the [Etcher Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-macos#1-overview).

3. **Prepare the Installer**  
   Safely remove the USB drive from your current computer once the bootable USB drive is created.

4. **Connect to Your Node**  
   Insert the USB drive into your node to install Ubuntu Server on its storage disk.

</TabItem>
<TabItem value="debian" label="Debian">
  
1. **Download the Debian Server Version**  
   Download [Debian 11 Bullseye](https://www.debian.org/distrib/) from the official Debian website.

2. **Create a Bootable USB Drive**  
   Use the ISO file to create a bootable USB drive:

   - **Windows:** Follow the [Rufus Guide for Debian](https://rufus.ie/).
   - **Linux:** Use the [Etcher Guide for Debian](https://etcher.balena.io/#download-etcher).
   - **MacOS:** Refer to the [Etcher Guide for Debian](https://etcher.balena.io/#download-etcher).

3. **Prepare the Installer**  
   Safely remove the USB drive from your current computer once the bootable USB drive is created.

4. **Connect to Your Node**  
   Insert the USB drive into your node to install Debian on its storage disk.

</TabItem>
</Tabs>

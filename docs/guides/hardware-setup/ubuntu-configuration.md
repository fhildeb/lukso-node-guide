---
sidebar_label: "2.6 Ubuntu Configuration"
sidebar_position: 6
---

# 2.6 Ubuntu Configuration

Configuring Ubuntu for your blockchain node is a crucial step to ensure stability, performance, and secure connectivity. In this guide, we document the complete process and considerations for installing and setting up Ubuntu Server on your node.

:::tip

For additional reference, you can view the official but outdated [Ubuntu's Install Guide](https://ubuntu.com/tutorials/install-ubuntu-server#1-overview).

:::

## System Settings

After completing the [BIOS Setup](./bios-setup.md) and connecting the prepared bootable USB device, you should be faced with the Ubuntu installation screen. You can select _Try or Install Ubuntu Server_ in order to boot up the operation system on the USB drive or copying and installing the full version on the primary hard drive.

![Try or Install Ubuntu Server](/img/guides/hardware-setup/install_01.png)

Connect your machine to the router using an Ethernet cable so that the installer can receive updates. A stable internet connection and low latency is also necessary for running the blockchain and monitoring system later on.

:::info

More details about network usage and connections can be found on the [Network Demand](/docs/theory/preparations/network-demand.md) page of the [**🧠 Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

**1. System Language**: _Choose your operating system's language._

:::tip

It is recommended to select _English_, as most troubleshooting guides and support documentation are written in English.

:::

![Ubuntu System Language](/img/guides/hardware-setup/install_02.png)

**2. Keyboard Config**: _Select your keyboard layout or click on *Identify keyboard* and follow the on-screen guide._

:::tip

The correct configuration ensures that your command-line entries during setup and maintenance work as expected.

:::

![Ubuntu Keyboard Config](/img/guides/hardware-setup/install_03.png)

**3. Installation Type**: _Choose the regular Ubuntu Server installation for your node._

:::tip

Detailed differences of a minimal or regular installation can be found in the [Operation Systems](/docs/theory/node-operation/operation-systems.md) page of the [**🧠 Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

![Ubuntu Installation Type](/img/guides/hardware-setup/install_04.png)

:::note

Do not _Search for third-party drivers_. Only remote access is needed, which will be installed later. Other applications and web services could potentially cause harm to security, and ease of software maintenance in the long run.

:::

**4. Network and Access Settings**: _Configure your network settings to allow external access to your node._

:::info

If your node is connected via Ethernet, set the network type to _eth_ and configure both IPv4 and IPv6 as _Automatic (DHCP)_.

:::

![Ubuntu Network and Access Settings](/img/guides/hardware-setup/install_05.png)

**5. Network Proxy**: _Here, you could select a proxy address. If you do not already have a proxy setup, leave the address blank._

:::info

The HTTP proxy and static IP addresses can be configured later together with the router once the node is ready for operation.
:::

![Ubuntu Proxy Setup](/img/guides/hardware-setup/install_06.png)

**6. Download and Installer**: _Proceed with the installation using the official Ubuntu mirror address and press Enter._

:::tip

If a new installer update becomes available during this phase, download the latest version and resume once the update is complete. It's always recommended to use the latest official software release of the manufacturer in case important security updates have been implemented.

:::

![Ubuntu Download and Installer](/img/guides/hardware-setup/install_07.png)

**7. Storage Setup**: _For storage configuration, choose to use the entire disk and configure your LVM and encryption setup._

:::info

- Logical Volume Management (LVM) is recommended as it allows flexible resizing of storage volumes without downtime. This is particularly useful if you plan to run multiple blockchain nodes or add additional disks in the future. LVM groups multiple physical disks into a single logical volume, simplifying management.
- Full disk encryption is optional. While encryption can secure data, it may complicate remote access by requiring manual intervention at boot. Since your validator keys and wallet are already encrypted, full disk encryption is generally not recommended for this use case.

:::

:::tip

LVM is enabled by default on new DAppnode machines and has been the default option on Ubuntu since version 20.04.

:::

![Ubuntu Partition Config](/img/guides/hardware-setup/install_08.png)

:::note

On the storage screen, you will see your available disks along with their mount points. If you enabled LVM, a volume group (_ubuntu-vg_) with a logical volume (_ubuntu-lv_) will be created.

- To maximize your storage, set the logical volume size to the maximum available.
- Default naming conventions (e.g., _ubuntu-vg_ and _ubuntu-lv_) are recommended prevent confusion later.
- The storage format should be kept at _ext4_, supporting large file sizes, efficient disk allocation, and robust performance.

:::

:::tip

Further details about disks and volumes can be found on the [Disk Management](/docs/theory/node-operation/disk-management.md) page in the [**🧠 Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

## User and Software Settings

After the general device and operation system configuration, you will be faced with administrative settings for your node and the additional software to be installed.

**1. User Creation**: _Create your user account and assign a strong password. This account will be used to administer the node._

![Ubuntu User Config](/img/guides/hardware-setup/install_09.png)

:::note

It is advisable to avoid [Ubuntu Pro](https://ubuntu.com/pricing/pro), as this premium service is intended for enterprise use that comes with additional features, security updates, and support compared to the standard Ubuntu release. The primary target are businesses and organizations seeking a more comprehensive and secure Ubuntu experience.

:::

**2. SSH Installation**: _Install the OpenSSH server to enable secure remote access._

:::info

OpenSSH is essential for encrypted communication, command-line management, and key-based authentication, offering numerous benefits for remote node administration from your home environment or even global networks.

:::

:::tip

Further details about node connectivity can be found on the [SSH and VPN Tunnel](/docs/theory/node-operation/ssh-and-vpn-tunnel.md) page of the [**🧠 Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

![Ubuntu SSH Install](/img/guides/hardware-setup/install_10.png)

:::note

If you do not have an SSH identity set up yet, leave the field blank. We will configure SSH access once the node is operational.

:::

**3. Additional Software**: _Skip through the additional server snaps without enabling extra packages._

:::tip

It is best to manually install and configure software packages as needed for your specific node setup.

:::
![Ubuntu Additional Software](/img/guides/hardware-setup/install_11.png)

## Installation Process

Let the Ubuntu installation process run until it is fully complete. This might take some minutes depending on your hardware components or if you choose to encrypt or configure the disk with multiple logical volumes. Once done, remove the USB device and press _Enter_ to reboot your machine. After the reboot process is successful, you can continue with the system's core setup.

![Ubuntu Additional Software](/img/guides/hardware-setup/install_12.png)

:::tip

The USB device will no longer be needed. You could reformat it for regular use. However, its generally recommended to label the disk and keep it around in case there are problems and you want to create a fresh setup of your node again.

:::

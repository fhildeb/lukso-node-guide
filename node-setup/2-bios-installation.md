# 2. BIOS Settings and Ubuntu Installation

## 2.1 Operating System Download

> You need a USB device with at least 2GB

1. Download [Ubuntu 22.04.2 Server](https://ubuntu.com/download/server)
2. Create a Bootable USB Drive with the ISO file
   - Windows: [Rufus Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-overview)
   - Linux: [Disk Creator Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-ubuntu#1-overview)
   - MacOS: [Etcher Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-macos#1-overview)
3. Disconnect the USB drive
4. Connect the USB drive it to your node

## 1.3 BIOS Setup

Connect your machine to power and attach a keyboard and monitor.

1. Connect your Bootbable USB device to the node
2. Press `F2` during boot to enter the BIOS setup

### 1.3.1 Power Settings

> Ensure that NUC auto starts after power failure.

1. Go to `Power` -> `Secondary Power Settings`
2. Set `After Power Failure` to `Power One`
3. Set `Wake on LAN from S4/S5` to `Power On - Normal Boot`

### 1.3.2 CPU Settings

> Adjust Cooling for fanless housing

1. Go to `Cooling`
2. Set `Fan Control Mode` to `Fanless`
3. Go to `Performance` -> `Processor`
4. Set `Hyper-Threading` to `Enabled`
5. Enable `Intel Turbo Boost Technlogy`
6. Set `Active Processor Cores` to `All`
7. Enable `Real-Time Performance Tuning`

> Adjust performance for the server's energy efficiency

1. Go to `Power`
2. Enable `Max Performance Enabled`
3. Set `Intel Dynamic Power Technology` to `Energy Efficient Performance`
4. Set `Package Power Limit 1 (Sustained)` to `25`
5. Set `Package Power Limit 2 (Burst Mode)` to `25`
6. Set `Package Power Time Window (Tau)` to `0`

### 1.3.3 LED Settings

> Turn off status LED signatures for server use

1. Go to `Power` -> `Secondary Power Settings`
2. Set `S0 Indicator Brightness (%)` to `0`
3. Set `Modern Standby Indicator Brightness (%)` to `0`
4. Set `RGB LED` -> `Brightness (%)` to `0`
5. Set `HDD LED` -> `Brightness (%)` to `0`

### 1.3.4 Boot Order

1. Go to `Boot` -> `Boot Priority`
2. Set `Boot Option #1` to your USB device
3. Set `Boot Option #2` to your internal SSD

## 1.4 Operating System Setup

1. Press `F10` to save changes and exit BIOS
2. Wait for the stick to boot up
3. Choose `Try or Install Ubuntu Server`
4. Let the installation setup run through

## 1.5 Ubuntu Configuration

> You can have a look at [Ubuntu's Install Guide](https://ubuntu.com/tutorials/install-ubuntu-server#1-overview) for further information. However, most of it seems outdated for the most recent Ubuntu versions.

### 1.5.1 System Language

First, you have to choose your operating system's language. It's recommended to set it to `English`. In case errors appear on the screen, most guides and guides for fixes are stated in English if you search for them online. So it will help to resolve incidents quickly.

### 1.5.2 Keyboard Config

Right after, define your keyboard type or click `Identify keyboard` and follow the guide.

### 1.5.3 Installation Type

Choose your type of installation for the node. Its recommended to set it to `Ubuntu Server (minimized)` as it has significant advantages for security and performance. Only remote access is needed, and no other applications and web services could potentially harm the software. Both desktop and non-minimized versions also use more system resources.

Do not have `Search for third-party drivers` enabled during installation.

### 1.5.4 Network and Access Settings

Now configure your network settings to talk to the node from the outside world. Connect your node to your router or switch, then choose the network type `eth` and edit `IPv4` and `IPv6` to both set as `Automatic (DHCP)`. We will configure the static IP later but allow various connections to reach the node later.

If you do not already have a proxy setup, leave the proxy address blank. We will update the HTTP proxy to access the node later on.

### 1.5.5 Download and Installer

Leave the official Ubuntu mirror address and continue with the setup.

If there is any new installer during the next step, download the latest version, and you will get back to this step after it is done. It's always recommended to use the newest software releases.

### 1.5.6 Storage Setup

For storage, set the entire disk.

#### Logical Volume Manager

It's recommended to enable the LVM group option. A flexible management system allows you to easily set and resize your storage volumes. If you plan to run a blockchain node and might add another disk, later on, LVM can be beneficial. If you need to add more storage space later, you can easily add a new disk to the existing LVM group and expand the logical volumes as needed. Maintenance can be done without any downtime or data loss. It also allows for resizing storage volumes, so you can easily resize them on the fly, allowing you to adapt to changing storage requirements of your blockchain node. Some trade-offs when using LVM are the complexity of disk management and a tiny performance dint in performance.

Considering the benefits, LVM is generally recommended and enabled on new [Dappnode](https://dappnode.com/) machines and has been set as default on Ubuntu since version 20.04.

#### Encryption

Encryption is not necessary, as you could encrypt a small portion of the disk later on if needed. Encrypting the whole disk could become cumbersome for remote access, requiring manual intervention each time the server is restarted. There are ways to automate the unlocking process, such as using a remote key server or network-bound disk encryption. However, these methods can increase complexity and may have security implications.

Your validator keys are safe anyway, as they are encrypted by default. The validator also has its encrypted wallet needed to restart the client with a modified address for the fee recipient. The only risk here is physical access or modification- except for the keys or wallet. These could include log data, configuration files, or other personal data stored on the node. The added complexity won't be necessary if these points are not deemed high-risk.

### 1.5.7 User Configuration

In the next step, pick your user and server names and choose a strong password.

Continue without [Ubuntu Pro](https://ubuntu.com/pricing/pro). It's a premium version of Ubuntu designed for enterprise use and comes with additional features, security updates, and support compared to the standard Ubuntu release. The primary target is businesses and organizations seeking a more comprehensive and secure Ubuntu experience.

### 1.5.8 SSH Setup

In the next step, you can add the OpenSSH server installation for secure remote access. The server-only variant will only allow the connection to the node, not the functionality for the node also to set up a client- which is lean and ideal for a node setup that only wants external devices to connect for maintenance.

If you do not already have an SSH configuration, leave the SSH identity blank. We will configure access later on.

### 1.5.9 Additional Software

It's recommended to skip through the additional server snaps without enabling packages. The best practice would be choosing the packages later when installing or configuring specific software.

**Let the Ubuntu Installation process run through until fully complete. Remove the USB device and press enter to reboot the machine.**

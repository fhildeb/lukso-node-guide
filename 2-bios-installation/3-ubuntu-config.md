## 1.3 Ubuntu Configuration

> You can have a look at [Ubuntu's Install Guide](https://ubuntu.com/tutorials/install-ubuntu-server#1-overview) for further information. However, most of it seems outdated for the most recent Ubuntu versions. Therefore, I will document the whole process and considerations.

#### Starting Point

Coming from the [BIOS Setup](./2-bios-setup.md) section, we are left at the beginning of the Ubuntu configuration after selecting `Try or Install Ubuntu Server`.

![Try or Install Ubuntu Server](/img/install_01.png)

Connect your machine to the router using an Ethernet cable to already receive updates during the install. This will also let you set up IPv4 and IPv6 addresses already.

#### Ethernet Connection

When setting up a node for blockchain networks, the choice of network connection can significantly impact the node's performance and reliability. Using an Ethernet connection is often the preferred method over Wi-Fi for several reasons:

- **Stability**: Ethernet connections provide a more stable and consistent connection compared to Wi-Fi. Wired connections are less prone to signal interference and environmental factors that can affect Wi-Fi performance, resulting in fewer disconnections or connectivity issues.
- **Speed**: Ethernet connections generally offer higher data transfer speeds compared to Wi-Fi. A gigabit Ethernet connection can reach speeds of up to 1000 Mbps, while most Wi-Fi connections are limited to a few hundred Mbps. This increased speed translates into better performance and reduced latency for your node, allowing for faster data processing and communication with other nodes.
- **Security**: Ethernet connections are inherently more secure than Wi-Fi, as they require physical access to the network cable to intercept or tamper with the data being transmitted. Wi-Fi networks are susceptible to various security threats, such as eavesdropping or man-in-the-middle attacks, which could compromise the integrity and privacy of the data being processed by your node.
- **Reduced Packet Loss**: Ethernet connections typically experience lower packet loss rates compared to Wi-Fi. Packet loss can cause delays in data transmission and affect the overall performance of your node. With a wired Ethernet connection, your node can maintain a more reliable and efficient data transfer, ensuring optimal operation.
- **Easy Troubleshooting**: Troubleshooting connectivity issues is generally more straightforward with Ethernet connections. With fewer variables, such as signal strength, interference, or router configuration, diagnosing and resolving network issues becomes a simpler process.

### 1.3.1 System Language

![Ubuntu System Language](/img/install_02.png)

First, you have to choose your operating system's language. It's recommended to set it to `English`. In case errors appear on the screen, most guides and guides for fixes are stated in English if you search for them online. So it will help to resolve incidents quickly.

### 1.3.2 Keyboard Config

![Ubuntu Keyboard Config](/img/install_03.png)

Right after, define your keyboard type or click `Identify keyboard` and follow the guide.

### 1.3.3 Installation Type

![Ubuntu Installation Type](/img/install_04.png)

Choose your type of installation for the node. There are two types of installations:

- `Ubuntu Server`
- `Ubuntu Server (minimized)`

Here are some of the [core differences](https://ubuntuforums.org/showthread.php?t=2474104):

```text
Minimized has 420 packages installed.
Normal has 606 packages installed.
That is a 31% reduction.

Minimized takes up ~4,200 MB storage when initially installed
Normal takes up ~4,600 MB storage when initially installed
That is a difference of 400 MB in size, reduction of 11%.

Minimized uses ~180,000 KB of RAM
Normal uses ~197,000 KB of RAM
That is a difference of 17,000 KB of RAM, reduction of 9%.

User Interaction on Minimized:
- No text editor (vi, vim, nano)
- No ufw nor iptables command
- No man pages (documentation)
```

As the installation screen states, `Ubuntu Server (minimized)` is designed for automated deployment at scale for cloud substrates without user interaction. They use the optimised kernels, optimised boot process, and greatly reduced default packages in order to be smaller, boot faster, and require fewer security updates over time. This might be important if you're maintaining multiple VMs or containers.

While `Ubuntu Server (minimized)` boils down to saving packets and having a slightly faster system, it can be a hazard for our node maintenance, as it would mean that you have to manually install every single tool package during the node setup.

> During some test-runs using the minimal version, it occured that this also affected some internal processes without throwing errors during run time. Because of the lack of documentation for processes, some logging services are not triggered on the core system. This affects checking the status of external software, which expects the creation of log or configuration data. Here, certain files had to be created and adjusted manually in order for status commands to work.

Its recommended to install the `Ubuntu Server` version, as we want to do all user interaction ourselves and need text editors, firewall configuration, and most importantly all available backend processes that might break some autmation.

> Shoutout to Lumenous who helped me clarifying these differences

Do not have `Search for third-party drivers` enabled. Only remote access is needed, which will be installed later during the install process. Other applications and web services could potentially harm the software, security and ease of software maintenance in the long run.

### 1.3.4 Network and Access Settings

![Ubuntu Network and Access Settings](/img/install_05.png)

Now configure your network settings to talk to the node from the outside world. If your node is connected via Ethernet, choose the network type `eth` and edit `IPv4` and `IPv6` to both set as `Automatic (DHCP)`. We will configure the static IP later but allow various connections to reach the node later.

![Ubuntu Proxy Setup](/img/install_06.png)

If you do not already have a proxy setup, leave the proxy address blank. We will update the HTTP proxy to access the node later on.

### 1.3.5 Download and Installer

![Ubuntu Download and Installer](/img/install_07.png)
Leave the official Ubuntu mirror address and continue with the setup.

If there is any new installer during the next step, download the latest version, and you will get back to this step after it is done. It's always recommended to use the newest software releases.

### 1.3.6 Storage Setup

For storage, set the entire disk.

#### Logical Volume Manager

It's generally recommended to enable the LVM group option. A flexible management system allows you to easily set and resize your storage volumes. If you plan to run multiple blockchain nodes or might add another disk, later on, LVM can be beneficial. If you need to add more storage space later, you can easily add a new disk to the existing LVM group and expand the logical volumes as needed. This would mean that you do not have to split your data folders across multiple storage devices. Maintenance can be done without any true downtime, re-sync or data loss. It also allows for resizing storage volumes, so you can easily resize them on the fly, allowing you to adapt to changing storage requirements of your blockchain node.

> Considering the benefits, LVM is also enabled on new [Dappnode](https://dappnode.com/) machines and has been set as default on Ubuntu since version 20.04.

Some trade-offs when using LVM are the complexity of disk management and a tiny performance dint in performance. If you have lots of SSD space and want to run everything on the main physical partition, this might not be needed. If you are unsure, simply activate the option- maybe you run out of storage space at some point and do not want to re-sync or configure data folders of blockchain data.

#### Encryption

Encryption is not necessary, as you could encrypt a small portion of the disk later on if needed. Encrypting the whole disk could become cumbersome for remote access, requiring manual intervention each time the server is restarted. There are ways to automate the unlocking process, such as using a remote key server or network-bound disk encryption. However, these methods can increase complexity and may have security implications.

Your validator keys are safe anyway, as they are encrypted by default. The validator also has its encrypted wallet needed to restart the client with a modified address for the fee recipient. The only risk here is physical access or modification- except for the keys or wallet. These could include log data, configuration files, or other personal data stored on the node. The added complexity won't be necessary if these points are not deemed high-risk.

#### Storage Configuration

On the storage configuration screen you will see your available physical disks with their physically available storage and mount points. If you enabled LVM, you will see that it automatically created a volume group with a logical volume inside.

The volume group can be seen as parent container of multiple digital storage partitions, so called logical volumes. These groups can extend across multiple physical disks.

By default, the logical volume will have the size of `100GB` to allow flexibility of partitions. To change properties, you can select `ubuntu-lv` under `ubuntu-vg (new)` in the `USED DEVICES` section to adjust the name, size and format of the logical volume in a pop-up window.

If you are certain that you want to use the whole disk space available, set the `Size` property of the logical volume to the maximum value that is shown in front of the input field of the logical volumes pop-up window.

> Within the [system setup](/3-system-setup/) section of the guide there is also whole chapter about extending the the LVM storage of a logical volume later on and how new disks can be added to your system.

![Ubuntu Partition Config](/img/install_08.png)

#### Partition Naming

The name of the volume group `ubuntu-vg` and logical volumes, e.g., `ubuntu-lv` can be changed. If you do not plan to have different partitions for different blockchain networks, its recommended to just leave the default names. Keeping the default naming is highly recommended and helps to not create confusion later and find help quickly online when you post logs- since everyone can associate the default names with the LVM setup.

#### Storage Formats

The same rule about going with the default values also applies to the default storage format `ext4`. Storage formats like, `ext2`, `ext3`, and `ext4` are all part of the same family of Linux filesystems, but each brings improvements and added features over the previous. The type `ext4` is the most common used as it comes with support for files up to 16TB, faster and more efficient allocation of disk space and lots of other convinience features.

### 1.3.7 User Configuration

In the next step, pick your user and server names and choose a strong password.

![Ubuntu User Config](/img/install_09.png)

Continue without [Ubuntu Pro](https://ubuntu.com/pricing/pro). It's a premium version of Ubuntu designed for enterprise use and comes with additional features, security updates, and support compared to the standard Ubuntu release. The primary target is businesses and organizations seeking a more comprehensive and secure Ubuntu experience.

### 1.3.8 SSH Setup

In the next step, add the openSSH server installation for secure remote access. The Open Secure Shell is a suite of secure networking utilities. It enables encrypted communication and secure data transfer between two networked devices, providing a secure alternative to traditional, non-encrypted protocols. openSSH server is widely used for remote administration, secure file transfers, and executing commands on remote systems.

![Ubuntu SSH Install](/img/install_10.png)

The server-only variant will only allow the connection to the node, not the functionality for the node also to set up a client- which is lean and ideal for a node setup that only wants external devices to connect for maintenance.

In the context of a blockchain node setup, openSSH server offers several key advantages that make it a valuable component:

- **Secure remote access**: It allows you to remotely access and manage your node using a secure, encrypted connection. This is crucial for maintaining the confidentiality and integrity of your data and commands, especially when operating the node in a data center, cloud environment, or across untrusted networks.
- **Command-line interface**: It provides a command-line interface for managing your node, which is the preferred method for administering server-based systems like Ubuntu Server. The command-line interface allows for efficient and scriptable management of your node.
- **Key-based authentication**: It supports public key authentication, which is more secure than password-based authentication. By using key pairs, you can enhance the security of your node by ensuring that only authorized users with the correct private key can access it.
- **Port forwarding and tunneling**: It enables port forwarding and tunneling, which can help secure other network services and create encrypted tunnels for data transfer. This can be useful for securing communication between your node and other components of the blockchain network or related services.
- **Extensive compatibility**: openSSH server is widely supported across various platforms and operating systems, making it easy to integrate into a diverse range of node and client setups.

If you do not already have an SSH configuration, leave the SSH identity blank. We will configure access later on.

### 1.3.9 Additional Software

It's recommended to skip through the additional server snaps without enabling packages. The best practice would be choosing the packages later when installing or configuring specific software.

![Ubuntu Additional Software](/img/install_11.png)

Let the Ubuntu Installation process run through until fully complete. Remove the USB device and press enter to reboot the machine.

![Ubuntu Additional Software](/img/install_12.png)

If your boot was alright, we can continue with the system's core setup.

## 2.1 Operating System

When it comes to setting up blockchain nodes, both Ubuntu and Debian can be good choices for operating systems, and your choice can depend on factors like stability, ease of use, and the specific features and tools each offers. Here's a comparison of the two in the context of an EVM node setup:

### 2.1.1 Ubuntu Focus Points

Ubuntu 22.04.2 Server is the latest iteration of one of the world's most popular and widely-used Linux distributions. It's a proven, reliable platform designed to provide you with a secure, high-performance, and low-maintenance solution tailored to decentralized networks' demanding world.

- **Ease of Use**: Ubuntu has a reputation for being more user-friendly, with a well-documented community and a large collection of easily-installable packages. For users new to Linux or node setups, this can be beneficial.
- **Support**: Ubuntu has robust support, both through official channels and its vibrant community, which can be a plus if you're likely to need assistance.
  **Release Cycle**: Ubuntu follows a six-month release cycle for new versions, with Long Term Support (LTS) versions released every two years. This regular release schedule can mean more frequent updates and access to newer software.
- **Software Compatibility**: Ubuntu often provides more up-to-date software packages.

### 2.1.2 Debian Focus Points

Debian 11 Bullyeye is the most recent stable release of one of the pioneering and deeply respected Linux distributions. It's a tried-and-true platform engineered to deliver a secure, high-performing, and low-maintenance solutions. Debian is celebrated for its commitment to stability, reliability, and its broad software library.

- **Stability**: Debian is known for its focus on stability, which can be an advantage if you need to maintain a long-running node without unexpected issues or downtime.
- **Security**: Debian has a strong emphasis on security, with a dedicated security team and a rigorous testing process for new software packages. For a critical application like an node, this can be a significant advantage.
- **Resource Usage**: Debian generally uses fewer system resources than Ubuntu, which can be a benefit if you're running an node on a system with limited resources.
- **Advanced Users**: Debian is often seen as a distribution for more experienced Linux users. If you're comfortable digging into the command line and solving problems independently, Debian can offer a powerful, stable platform for an node.

### 2.1.3 System Decision

Both Ubuntu and Debian are built on similar foundations, but their philosophies and approaches can lead to different experiences when setting up and running an node. If you're a beginner or value ease of use and good support, Ubuntu might be the best choice. If you're an advanced user who values stability, security, and lower resource usage, Debian might be the better fit.

Remember that either distribution will be capable of running a node successfully. Your personal preferences, familiarity with the distribution, and specific requirements will be the decisive factors.

As both Ubuntu and Debian are based on the Linux kernel, a vast majority of Linux commands will work on both. The guide will be done installing Ubuntu 22.04.2, and there might be slight differences. However, it should not worry you since you can always find help online quickly.

### 2.1.4 Important Specifications

Based on [Ether Nodes](https://www.ethernodes.org/os), more than 97% of EVM nodes run on Linux distributions, most popularly Ubuntu or Debian. The famous EVM Node and Software Company [Dappnode](https://dappnode.com/) is using Debian under the hood. But both operating systems come with lots of different versions and packages. Let's list what is relevant for us when we want to operate our node:

#### Using the Server Version

Choosing the server over the desktop version for a blockchain node offers several advantages that make it a more suitable option for running server-oriented applications, such as nodes. Some of the key reasons for selecting Ubuntu Server include:

- **Minimal resource usage**: Server versions are designed without a graphical user interface (GUI) and has minimal pre-installed packages. This results in lower resource consumption (CPU, memory, and storage), which is essential for optimizing the performance of a blockchain node.
- **Increased stability and reliability**: The streamlined nature of server versions, with fewer packages and no GUI, reduces the potential for software conflicts, crashes, and security vulnerabilities. Fewer packages lead to a more stable and reliable node environment.
- **Focus on server applications**: Server versions are tailored explicitly for server applications, with pre-installed packages and tools designed to support server use cases. Packages designed for continuous operation make it an ideal platform for running blockchain nodes, often requiring server-grade performance, networking, and security features.
- **Regular updates and security patches**: Server versions in general receive more frequent updates and security patches, ensuring your node remains secure and up-to-date with the latest software versions.

#### Having Long-Term Support

LTS refers to a software version that receives extended support regarding updates, bug fixes, and security patches. For both, Ubuntu and Debian Server, LTS releases are maintained for five years, whereas non-LTS releases are supported for only nine months. This extended support period is crucial for blockchain nodes, ensuring that your node remains secure, stable, and compatible with the ever-evolving blockchain ecosystem.

- [Ubuntu LTS Declaration](https://wiki.ubuntuusers.de/Long_Term_Support/)
- [Debian LTS Page](https://wiki.debian.org/LTS)

Selecting an LTS release for Ubuntu 22 or Debian 11 offers several key advantages:

- **Improved Stability**: LTS releases prioritize stability and reliability, making them ideal for mission-critical applications like blockchain nodes, which require uninterrupted operation and minimal downtime.
- **Greater Security**: With an LTS release, you can be assured of regular security updates and patches, safeguarding your node from potential vulnerabilities and threats.
- **Lower Maintenance Overhead**: The extended support period means you won't need to upgrade your node's OS as frequently, reducing the maintenance effort and associated downtime.
- **Wider Compatibility**: LTS releases are often better supported by third-party software and tools, ensuring seamless integration with various blockchain networks and applications.

### 2.1.5 Validator Preparation

If you want to become a validator and have no other computer at home that can be flashed and used to safely generate your validator keys offline, head over to the [Key Generation](/validator-key-generation/) section and continue to use your node for it. After you receive your validator keys, you can continue with this guide, effectively flashing your machine again.

### 2.1.6 Ubuntu Download

After understanding operating system properties and considerations, download the official Ubuntu Server LTS version from `ubuntu.com/download/server`. You need a USB device with at least 2GB that you can use to install the firmware on the node's storage disk.

1. Download [Ubuntu 22.04.2 Server](https://ubuntu.com/download/server)
2. Create a Bootable USB Drive with the ISO file
   - Windows: [Rufus Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-overview)
   - Linux: [Disk Creator Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-ubuntu#1-overview)
   - MacOS: [Etcher Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-macos#1-overview)
3. Disconnect the USB drive
4. Connect the USB drive to your node

### 2.1.7 Debian Download

After understanding the properties and considerations of the operating system, download the official Debian server version from `debian.org/distrib/`. You will require a USB device with a minimum of 2GB capacity to install the firmware on the node's storage disk.

1. Download [Debian 11 Bullseye](https://www.debian.org/distrib/)
2. Create a Bootable USB Drive with the ISO file as if you would do with Ubuntu.
   - Windows: [Rufus Guide for Debian](https://rufus.ie/)
   - Linux: [Ethcher Guide for Debian](https://etcher.balena.io/#download-etcher)
   - MacOS: [Etcher Guide for Debian](https://etcher.balena.io/#download-etcher)
3. Safely remove the USB drive
4. Connect the USB drive to your node

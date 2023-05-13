## 2.1 Operating System

Ubuntu 22.04.2 Server is the latest iteration of one of the most popular and widely-used Linux distributions in the world. Its a proven, reliable platform designed to provide you with a secure, high-performance, and low-maintenance solution tailored for the demanding world of decentralized networks.

### 2.1.1 Ubuntu Node

Ubuntu Server is renowned for its ease of use, flexibility, and robustness, making it an excellent choice for various server applications. An LTS version is particularly significant for those seeking a stable and reliable platform for their nodes.

_Based on [Ethernodes](https://www.ethernodes.org/os) more than 97% of EVM nodes are running on Linux distributions._

#### Server Version

Choosing Ubuntu Server over Ubuntu Desktop for a blockchain node offers several advantages that make it a more suitable option for running server-oriented applications, such as nodes. Some of the key reasons for selecting Ubuntu Server include:

- **Minimal resource usage**: Ubuntu Server is designed without a graphical user interface (GUI) and comes with a minimal set of pre-installed packages. This results in lower resource consumption (CPU, memory, and storage), which is essential for optimizing the performance of a blockchain node.
- **Increased stability and reliability**: The streamlined nature of Ubuntu Server, with fewer packages and no GUI, reduces the potential for software conflicts, crashes, and security vulnerabilities. This leads to a more stable and reliable environment for running a node.
- **Focus on server applications**: Ubuntu Server is specifically tailored for server applications, with a selection of pre-installed packages and tools designed to support server use cases. This makes it an ideal platform for running blockchain nodes, which often require server-grade performance, networking, and security features.
- **Regular updates and security patches**: Ubuntu Server receives more frequent updates and security patches, ensuring that your node remains secure and up-to-date with the latest software versions.

#### Long-Term Support

LTS refers to a version of the software that receives extended support in terms of updates, bug fixes, and security patches. For Ubuntu Server, LTS releases are maintained for a period of five years, whereas non-LTS releases are supported for only nine months. This extended support period is crucial for blockchain nodes, as it ensures that your node remains secure, stable, and compatible with the ever-evolving blockchain ecosystem.

Selecting an LTS release, such as Ubuntu 22.04.2 Server, for your blockchain node offers several key advantages:

- **Stability**: LTS releases prioritize stability and reliability, making them ideal for mission-critical applications like blockchain nodes, which require uninterrupted operation and minimal downtime.
- **Security**: With an LTS release, you can be assured of regular security updates and patches, safeguarding your node from potential vulnerabilities and threats.
- **Lower maintenance overhead**: The extended support period means that you won't need to upgrade your node's OS as frequently, reducing the maintenance effort and associated downtime.
- **Wider compatibility**: LTS releases are often better supported by third-party software and tools, ensuring seamless integration with various blockchain networks and applications.

> **If you want to become a validator and have no other computer at home that can be flashed and used to safely generate your validator keys offline, head over to the [Key Generation](/key-generation/) section and continue to use your node for it. After you received your validator keys, you can continue with this guide, effectively flashing your machine again.**

### 2.1.2 Download and Preparation

After understanding operating system properties and considerations, download the official Ubuntu server version from `ubuntu.com/download/server`. You need a USB device with at least 2GB that you can use to install the firmware on the node's storage disk.

1. Download [Ubuntu 22.04.2 Server](https://ubuntu.com/download/server)
2. Create a Bootable USB Drive with the ISO file
   - Windows: [Rufus Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-overview)
   - Linux: [Disk Creator Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-ubuntu#1-overview)
   - MacOS: [Etcher Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-macos#1-overview)
3. Disconnect the USB drive
4. Connect the USB drive it to your node

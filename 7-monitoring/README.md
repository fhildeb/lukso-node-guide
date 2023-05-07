# 7. Node Monitoring

Local node monitoring is the process of observing and tracking the performance, health, and status of a blockchain validator node within a network. This monitoring ensures that the validator node is functioning correctly, efficiently, and securely. By regularly gathering and analyzing key performance metrics, such as CPU usage, memory consumption, disk space, network latency, and the number of connected peers, local node monitoring helps identify potential issues and bottlenecks, enabling prompt corrective actions. Additionally, monitoring the validator's activity, such as the number of proposed and validated blocks, can provide insights into the overall performance and contribution of the node to the blockchain network.

## 7.1 Install Core Tools for Monitoring

As effective node monitoring is essential for maintaining a reliable and secure distributed ledger and fostering trust within the blockchain ecosystem, we follow up with installing three core packages needed to download and execute such software:

- **wget**: Utility for non-interactive download of files from the Web. It supports HTTP, HTTPS, and FTP protocols, as well as retrieval through HTTP proxies. It's particularly useful for downloading files from the command line, automating downloads, or when a graphical user interface is not available, like on our server installation.
- **make**: Build automation tool that automatically builds executable programs and libraries from source code by reading files called Makefiles, which specify how to derive the target program. It's widely used in software development for compiling and linking source code files.
- **git**: Distributed version control system for tracking changes in source code during software development, allowing developers to collaborate, clone and manage software projects effectively. It will help us downloading code repositories.

```sh
sudo apt install wget make git
```

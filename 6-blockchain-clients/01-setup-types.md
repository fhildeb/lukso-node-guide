## 6.1 LUKSO Blockchain Setup Types

Regarding the Blockchain Client Setup, there will be multiple ways of running the blockchain clients for LUKSO:

- **Single Network Setup**: Run the LUKSO CLI on the Operating System
- **Multi-Network Setup**: Running Clients in Docker Containers

> This guide will cover both types at some point. However, only the LUKSO CLI version is officially released and supported.

### 6.1.1 Pure Operating System Management

In a Single Network Setup, you run the LUKSO CLI directly on the host operating system. The software will be installed in the system's user directory `/usr/local/bin/lukso` and manages the blockchain clients under the hood.

This method is generally simpler to set up and uses fewer system resources since it doesn't involve the overhead of a virtualization layer. However, running multiple networks would only be possible with complex software knowledge of virtual running various operating systems in parallel since each software instance will interfere with the others.

### 6.1.2 Docker Container Management

In a Multi-Network Setup, you run the LUKSO clients inside Docker containers on one operating system. Docker is a platform that allows you to package an application with its runtime environment into a standardized software development unit called a container. Each container runs in isolation from the others so that you can have multiple instances of the LUKSO client running in separate containers, each with its own configuration and network connections.

> Docker containers would allow running testnet and mainnet on one machine

The setup is more complex and uses more system resources but provides excellent flexibility. You can efficiently run multiple nodes with different configurations by starting and stopping other containers. It also makes upgrading or downgrading the LUKSO software easier since you can replace the Docker image for a particular container without affecting the others. The separation is not the case if you are modifying system components.

> DappNode is a platform that utilizes Docker containers to run decentralized applications and blockchain nodes. It provides a user-friendly interface and automates many complexities of running nodes in Docker containers. DappNode not only has its software but also comes with pre-configured node machines.

It's also planned to have LUKSO officially supported on the DappNode suite. However, this will come after the mainnet is released.

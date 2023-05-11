# 6. Blockchain Client Setup

Regarding the Blockchain Client Setup, there will be multiple ways of running the blockchain clients for LUKSO:

- **Single Network Setup**: Run the LUKSO CLI on the Operating System
- **Multi Network Setup**: Running Clients in Docker Containers

> This guide will cover both types at some point. However, for now only the LUKSO CLI version is officially released and supported.

#### Pure Operating System Management

In a Single Network Setup, you run the LUKSO CLI directly on the host operating system. This means installing the software directly in a system's user directory `/usr/local/bin/lukso`. The CLI manages the blockchain clients and handles all inputs.

This method is generally simpler to set up and uses fewer system resources since it doesn't involve the overhead of a virtualization layer. However, running multiple networks would only be possible with complex software knowledge of virtual of running multiple operating systems in parallel, since each instance of the software will interfere with the others.

#### Docker Container Management

In a Multi Network Setup, you run the LUKSO clients inside Docker containers on one operating system. Docker is a platform that allows you to package an application with its runtime environment into a standardized unit for software development, called a container. Each container runs in isolation from the others, so you can have multiple instances of the LUKSO client running in separate containers, each with its own configuration and network connections.

> Docker containers would allow to run testnet and mainnet on one machine

The setup is more complex and uses more system resources, but it provides a great deal of flexibility. You can easily run multiple nodes with different configurations just by starting and stopping different containers. It also makes it easier to upgrade or downgrade the LUKSO software, since you can just replace the Docker image for a particular container without affecting the others.

> DappNode is a platform that utilizes Docker containers to run decentralized applications and blockchain nodes. It provides a user-friendly interface and automates many of the complexities of running nodes in Docker containers. DappNode not only has it's own software, but also comes with their own pre-configured node machines.

It's also planned to have LUKSO being officially support on the DappNode suite, however, this will come after the mainnet is released.

### firewall

Allow P2P ports for Lukso clients:

```shell=
sudo ufw allow 30303/tcp
sudo ufw allow 13000/tcp
sudo ufw allow 12000/udp
sudo ufw allow 30303/udp
```

> **_NOTE:_** make sure to open same ports on your home router

Enable Firewall:

```shell=
sudo ufw enable
```

Verify firewall configuration:

```shell=
sudo ufw status
```

It should look something like this (may be missing some ports):

```shell=
Status: active

To                         Action      From
--                         ------      ----
13000/tcp                  ALLOW       Anywhere
12000/udp                  ALLOW       Anywhere
30303/tcp                  ALLOW       Anywhere
ssh-port/tcp               ALLOW       Anywhere
30303/udp                  ALLOW       Anywhere
13000/tcp (v6)             ALLOW       Anywhere (v6)
12000/udp (v6)             ALLOW       Anywhere (v6)
30303/tcp (v6)             ALLOW       Anywhere (v6)
ssh-port/tcp (v6)          ALLOW       Anywhere (v6)
30303/udp (v6)             ALLOW       Anywhere (v6)
```

## Node Setup

> **_NOTE:_** Following steps are performed on personal machine.

Access a remote node machine

```shell=
ssh lukso
```

---
sidebar_label: "5.1 Installation"
sidebar_position: 1
---

# 5.1 Installation

## 5.1 Check SSH Install

Before verifying basic access to a node machine using SSH on our personal computer, we must check if all packages are installed correctly.

On my side, Im running MacOS, and SSH is installed by default in MacOS Ventura on Version `9.0`. We can check the version directly by calling the SSH software:

> **NOTE**: All the following steps are performed on a personal computer.

Open the terminal to continue.

```sh
ssh -V
```

The Output should look like this:

```sh
OpenSSH_9.0p1, LibreSSL 3.3.6
```

If you use another operating system or don't have SSH installed, please search how to install the latest SSH version for your operating system accordingly. We must run the SSH counterpart to establish a secure connection to our node.

## 5.2 Configure SSH

If you have SSH installed, we can continue with the next step. We set the connection parameters for our node, so we can communicate easily without constantly typing the IP and Port.

#### SSH Configuration File

Within the SSH packages, the global configuration files should be at `~/.ssh/config`. The file is a user-specific SSH configuration file used to customize various settings for the SSH client on a per-host basis. It allows you to define different options for each remote host you connect to via SSH, such as hostname, username, port, identity files, and other preferences. Using this configuration file, you can simplify the SSH command to connect to remote servers and apply specific settings for each host.

Start by checking if the folder already exists using the directory test. We can use the `-p` option to create the directory and any necessary parent directories. Therefore it will not display an error if the directory already exists.

```sh
mkdir -p ~/.ssh/
```

The configuration file requires at least the following:

- the user name of a node machine
- the IP address
- the previously opened SSH port

Open the file using Vim as before. If you're more comfortable using your preferred text editor with a graphical user interface, go ahead now that you can.

```sh
vim ~/.ssh/config
```

The system setup and the router configuration guide have determined all the needed properties. Within the file, type in the following snippet. Replace:

- `<ssh-device-alias>` with a preferred device name
- `<node-username>` with your node's username
- `<node-ip-address>` with your node's static IP address
- `<ssh-port>` with your opened port number

```text
Host <ssh-device-alias>
  User <node-username>
  HostName <node-ip>
  Port <ssh-port>
```

> The property rows under _Host_ are indented by _2 Spaces_.

Write to and save the file after rechecking the input.

# 5.3 Trial Connection

## 5.3 Test the SSH Connection

Verify the configuration by connecting the node machine. Therefore, immediately call the `SSH` application and type your preferred SSH device alias.

```sh
ssh <ssh-device-alias>
```

You should now be able to log into your system by typing in your password. Afterward, you will be greeted by the node's welcoming printout:

```text
Welcome to Ubuntu 22.04.2 LTS [BUILD]

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of [DATE]

  System load:           1.0
  Usage of /:            1.2% of 997.87GB
  Memory usage:          1%
  Swap usage:            0%
  Temperature:           36.0 C
  Processes:             219
  Users logged in:       0
  IPv4 address [Connection Type]: [IPv4 IP Address]
  IPv6 address [Connection Type]: [IPv6 IP Address]

[NEWS]

[SECURITY_NOTICES]

0 updates can be applied immediately.

[EMS_NOTICE]


Last login: [DATE] from [IP_FROM_PERSONAL_COMPUTER]
```

If it works correctly, you can close the connection without shutting down the node.

```sh
exit
```

**Make sure you're disconnected before continuing the next steps.**

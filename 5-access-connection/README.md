# 5. Establishing a Secure Access Connection

> **NOTE**: All following steps are performed a personal computer.

Before we can verify basic access to a node machine by using SSH on our personal computer, we need to check if all packages are installed correctly.

Open the terminal to continue.

## 5.1 Check SSH Install

On my side, Im running MacOS and SSH is installed by default in MacOS Ventura on Version `9.0`. We can check the version directly by calling the SSH software:

```sh
ssh -V
```

The Output should look like this:

```sh
OpenSSH_9.0p1, LibreSSL 3.3.6
```

If you are using another operating system or dont have SSH installed, please search on how to install the latest SSH version for your operating system accordingly. Wee need to run the SSH counterpart to establish a secure connection to our node.

## 5.2 Configure SSH

If you have SSH installed, we can continue with the next step. We set the connection parameters for our node, so we can communicate easily without typing the IP and Port all the time.

#### SSH Configuration File

Within the SSH packages, there is a global configuration file at `~/.ssh/config`. The file is a user-specific SSH configuration file used to customize various settings for the SSH client on a per-host basis. It allows you to define different options for each remote host you connect to via SSH, such as hostname, username, port, identity files, and other preferences. Using this configuration file, you can simplify the SSH command to connect to remote servers and apply specific settings for each host.

The configuration file requires at least the following:

- the user name of a node machine
- the IP address
- the previously opened SSH port

Open the file using Vim as before. If you're more comfortable using your preferred text editor with a graphical user interface, go ahead now that you have the chance to do so.

```sh
vim ~/.ssh/config
```

All the needed properties have been determinated within the system setup and the router configuration guide. Within the file, type in the following snippet. Replace:

- `<ssh-device-alias>` with a perferred device name
- `<node-username>` with your node's username
- `<node-ip-address>` with your node's static IP address
- `<ssh-port>` with your opened port number

```
Host <ssh-device-alias>
  User <node-username>
  HostName <node-ip>
  Port <ssh-port>
```

> The property rows under _Host_ are indented by _2 Spaces_.

Write to and save the file after checking the input again.

## 5.3 Test the SSH Connection

Verify the configuration by connecting the the node machine. Therefore, call the `SSH` application and type your preferred SSH device alias right after.

```sh
ssh <ssh-device-alias>
```

You should now be able to log into your system by typing in your password. Afterwards, you will be greeted by the node's welcoming printout:

```
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

If it worked correctly, you can close the connection without shutting down the node.

```sh
exit
```

**Make sure your're disconnected before continuing the next steps.**

## 5.4 Configuring a Login Key

In the next step, we will significantly increase the security of the node access flow by using SSH keys for authentication instead of the basic password.

#### SSH Keys

SSH keys are a widely used cryptographic method for providing secure and passwordless authentication between a client and a server. They are based on the concept of public-key cryptography, where a pair of keys is generated: one private key, which should be kept secret, and one public key, which can be freely shared.

The process of using SSH keys involves generating a key pair on the client machine and then copying the public key to the server. When the client attempts to authenticate with the server, it will prove its identity by performing a cryptographic operation with the private key. The server can verify this operation using the public key without ever needing to see the private key. This method of authentication is not only more secure than using passwords but also more convenient, as it eliminates the need to remember and enter complex passwords.

#### Keys in Traveling Situations

When it comes to storing your private SSH key, especially while traveling or in situations where your device may be damaged or lost, it's crucial to ensure the key's safety. Here are some recommendations:

- **Backup**: Always create a backup of your private key and store it in a secure and separate location. This could be an encrypted USB drive, an encrypted cloud storage service, or a hardware security device like a YubiKey.
- **Encryption**: Ensure that your private key is protected with a strong passphrase. This adds an extra layer of security by requiring the passphrase to be entered before the key can be used, even if someone gains access to the file.

If you really want to go crazy on security, the following might be something to have a look at. In my opinion, its a bit exaggerated because on your node, all keys are encrypted, and there is no critical or dangerous data on it if you chose strong passwords for your validator wallet.

- **Hardware Tokens**: You could consider using hardware tokens like YubiKey or other FIDO U2F devices, which store your private key securely on a physical device. These devices are designed to protect cryptographic keys from theft or unauthorized access and can be carried with you while traveling.

> Ledger supports the FIDO application and you could use your Ledger device to log into your node, not only to protect the validator's withdrawel and fee addresses.

#### SSH Key Generation Tool

SSH-Keygen is a widely used command-line tool for generating, managing, and converting SSH public and private key pairs. It is an integral part of the OpenSSH suite, which provides secure and encrypted communication over a network using the SSH protocol.

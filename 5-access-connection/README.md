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

## 5.4.1 Checking for existing keys

In case you already created keys before, lets check the default key directory.

> In case you have set up a custom key path, adjust the command accordingly.

The default location is the `~/.ssh` directory in your home folder, and the default name depends on the key type are the following:

- **RSA keys**: `~/.ssh/id_rsa`
- **ECDSA keys**: `~/.ssh/id_ecdsa`
- **Ed25519 keys**: `~/.ssh/id_ed25519`

There isn't a specific command to list all SSH keys generated on the device, but you can achieve this by listing the contents of the` ~/.ssh` directory. Therefore, we use the default command-line utility `ls`, used for listing the contents of a directory. When executed, it displays files and directories within the specified directory or, if no directory is specified, within the current working directory. In our case, we specifically search for files with the `.pub` type to show all public keys in the default folder.

```sh
ls ~/.ssh/*.pub
```

> **NOTE**: If you already generated one key, you could use if for the node. However, it is strongly recommended to always have one key pair for every application, so that a potential attacker can not get access to multiple authentication systems at once.

### 5.4.2 Creating a new key

When generating a new SSH key pair, the `ssh-keygen` command allows you to specify various options, such as the type of key, key length, and other configurations. The following options are used to define the type and strength of the generated key:

- `-t rsa`: The `-t` option is used to specify the type of key to generate. In our case, `rsa` denotes that an RSA key pair will be generated.
- `-b 4096`: The `-b` option is used to specify the number of bits in the key. A higher number of bits usually results in a stronger key. In this case, 4096 indicates that a 4096-bit RSA key will be generated. The default key length for RSA keys is typically 2048 bits, but using a 4096-bit key provides an additional layer of security.

#### RSA Cryptography

RSA is a widely used public-key cryptosystem in modern computing and cryptography. The RSA algorithm is based on the mathematical properties of large prime numbers and is used for secure data transmission, digital signatures, and encryption.

The main benefit for choosing it for SSH is that it is widely supported and compatible with most SSH clients and servers. RSA keys with a length of 4096 bits provide a high level of security. The only small deduction you have to make here is that RSA keys tend to be larger, and key generation and cryptographic operations can be slower compared to ECDSA and Ed25519.

- ECDSA is faster and more efficient. However, not as widely supported as RSA, and its security depends on the choice of the underlying elliptic curve.
- Ed25519 is the most current supported and highly secure elliptic curve-based algorithm with excellent performance and more prone to attacks then ECDSA. However there may be some compatibility issues in some environments.

On your personal computer, create the new key pair for SSH authentication.

```sh
ssh-keygen -t rsa -b 4096
```

### 5.4.3 Defining a keyname

You will be prompted to `Enter file in which to save the key`. Here, it is highly recommended to define a specific name for the key so that you can reference it at a later time, especially if you use multiple keys for different authentications. You can still use the default folder. Exchange:

- `<your-username>` with the username of your personal computer
- `<your-chosen-keyname>` with your preferred name of the key without spaces

```sh
/Users/<your-username>/.ssh/<your-chosen-keyname>
```

> If you do not want to specify a name, you can hit `Enter` to generate a random numbered file as I explained above.

### 5.4.4 Adding a passphrase

Now, enter a password used to encrypt the key. It is **highly recommended** to choose a strong password to raise the security level if someone gains access to your machine. This is also essential for key backups, if your working machine is demaged during a trip and you need to re-gain access from a fresh machine.

> If you do not want to set up a passphrase, you can hit `Enter` to generate a key without password-encryption.

### 5.4.5 Backing up the private key

> Before you set up the key to your node environment, make sure to generate a backup of it.

Here, you could use a container of a cloud provider to store the file, that can always be accessed even if devices get compromised or destroyed during a trip where you do not get pysical access to your node in any short time. You could also store the backup on a dedicated USB device.

Because the key as a passphrase itself, noone could sign anything without also knowing it's password, in case the cloud container is compromised. You could also use a encrypted container to further improve security. Just make sure you always have secure and different passwords.

**After backing up the generated key, we can continue using it in production.**

### 5.4.6 Copying the public key to the node

Copy a generated public key to the node machine. Make sure to replace:

- `<your-chosen-keyname>` with your keyfile path
- `<ssh-device-alias>` with your SSH node alias

```sh
ssh-copy-id -i ~/.ssh/<your-chosen-keyname>.pub <ssh-device-alias>
```

> If you set up a custom key directory, change the path as well.

You will be asked to input your node's user password one last time. Then this should be your final output:

```sh
Number of key(s) added:        1

Now try logging into the machine, with:   "ssh <ssh-device-alias>"
and check to make sure that only the key(s) you wanted were added.
```

The command line tool autoimatically disconnects from your node after the key was added. Continue with testing the key login.

### 5.4.7 Checking for the added keys

We can check if the key was added correctly by logging into the node. It will still ask you for the regular node's user password for now.

```sh
ssh <ssh-device-alias>
```

Check if the key was added

```sh
ls -al ~/.ssh/authorized_keys
```

You should find your authentication key in the specific folder. If not, you need to redo the previous step.

**Stay logged in to your node to enable secure key authentication in the following step.**

## 5.5 Enable Secure Authentictionon

Now we need to enable key authentication on the SSH configuration of the node. Therefore we adjust the config file like we did in the systems setup.

```sh
sudo vim /etc/ssh/sshd_config
```

Within the file scroll down to the following lines:

```
#PermitRootLogin prohibit-password
...
#PubkeyAuthentication yes
...
#AuthorizedKeysFile .ssh/authorized_keys ./ssh/authored_keys2
...
#PasswordAuthentication yes
#PermitEmptyPasswords no
...
#KbdInteractiveAuthentication no
```

Here is a descirption of what those settings are:

- **PermitRootLogin**: This setting controls whether the root user is allowed to log in via SSH. The "prohibit-password" value means that the root user can log in using public key authentication but not with a password.
- **PubkeyAuthentication**: This setting enables or disables public key authentication, which allows users to authenticate using their SSH keys instead of a password. When set to "yes," public key authentication is enabled.
- **AuthorizedKeysFile**: This setting specifies the file(s) that contain the public keys that are authorized to log in to the system.
- **PasswordAuthentication**: This setting enables or disables password-based authentication. When set to "no," users cannot authenticate using a password. The default value for this setting is "yes," so we want to uncomment the line and set it to "no" explicitly to disable password authentication.
- **PermitEmptyPasswords**: This setting controls whether users with empty passwords are allowed to authenticate. When set to "no," users with empty passwords are not allowed to authenticate.
- **KbdInteractiveAuthentication**: This setting enables or disables challenge-response authentication, which is a more interactive form of authentication that typically involves the server sending a challenge to the client, and the client responding with an appropriate answer. When set to "no," challenge-response authentication is disabled. We do not need this when we want to exclusively use our new key.

Now edit the properties within the config file:

- uncomment them by removing the `#` in front
- change `PasswordAuthentication` to `no`.
- remove the second key folder from the authorized key files

The final outcome should look like this:

```
PermitRootLogin prohibit-password
...
PubkeyAuthentication yes
...
AuthorizedKeysFile .ssh/authorized_keys
...
PasswordAuthentication no
PermitEmptyPasswords no
...
KbdInteractiveAuthentication no
```

Save and close the file. We can use the SHH deamon to validate our updated SSH configuration in a test run before we apply the change in production. This is important as we will not be able to do a regular login afterwards.

```sh
sudo sshd -t
```

If there is no output everything went alright. Restart the running SSH deamon, for the new adjustments to take affect.

```sh
sudo systemctl restart sshd
```

**Log out of your node**

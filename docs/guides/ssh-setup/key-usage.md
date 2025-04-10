---
sidebar_label: "5.4 Key Usage"
sidebar_position: 4
---

# 5.4 Key Usage

## 5.4 Configuring a Login Key

In the next step, we will significantly increase the security of the node access flow by using SSH keys for authentication instead of the direct password.

#### SSH Keys

SSH keys are a widely used cryptographic method for providing secure and passwordless authentication between a client and a server. They are based on public-key cryptography, where a pair of keys is generated: one private key, which should be kept secret, and one public key, which can be freely shared.

Using SSH keys involves generating a key pair on the client machine and copying the public key to the server. When the client attempts to authenticate with the server, it will prove its identity by performing a cryptographic operation with the private key. The server can verify this operation using the public key without seeing the private key. This authentication method is more secure than using passwords and more convenient, as it eliminates the need to remember and enter complex passwords.

#### Keys in Traveling Situations

It's crucial to ensure the key's safety when storing your private SSH key, especially while traveling or when your device may be damaged or lost. Here are some recommendations:

- **Backup**: Always create a backup of your private key and store it in a secure and separate location. The backup could be an encrypted USB drive, a cloud storage service, or a hardware security device like a YubiKey.
- **Encryption**: Protect your private key with a strong passphrase. Encryption adds an extra layer of security by requiring the passphrase to be entered before the key can be used, even if someone gains access to the file.

If you want to go crazy on security, the following might be something to consider. It's a bit exaggerated because all keys are encrypted on your node, and there is no critical or dangerous data on it if you choose strong passwords for your validator wallet.

- **Hardware Tokens**: You could consider using hardware tokens like YubiKey or other FIDO U2F devices, which store your private key securely on a physical device. These devices protect cryptographic keys from theft or unauthorized access and can be carried while traveling.

> Ledger supports the FIDO application, and you could use your Ledger device to log into your node, not only to protect the validator's withdrawal and fee addresses.

#### SSH Key Generation Tool

SSH-Keygen is a widely used command-line tool for generating, managing, and converting SSH public and private key pairs. It is an integral part of the OpenSSH suite, which provides secure and encrypted communication over a network using the SSH protocol.

## 5.4.1 Checking for existing keys

If you have already created keys before, let's check the default
directory for them.

> Adjust the command accordingly if you have set up a custom path for the key.

The default location is the `~/.ssh` directory in your home folder, and the default name depends on the type of the key:

- **RSA keys**: `~/.ssh/id_rsa`
- **ECDSA keys**: `~/.ssh/id_ecdsa`
- **Ed25519 keys**: `~/.ssh/id_ed25519`

There isn't a specific command to list all SSH keys generated on the device, but you can achieve this by listing the contents of the `~/.ssh` directory. Therefore, we use the default command-line utility `ls` to list the contents of a directory. When executed, it displays files and directories within the specified directory or, if no directory is specified, within the current working directory. In our case, we search for files with the `.pub` type to show all public keys in the default folder.

```sh
ls ~/.ssh/*.pub
```

> **NOTE**: If you already generated one key, you could use it for the node. However, it is strongly recommended always to have one key pair for every application, so a potential attacker can not access multiple authentication systems simultaneously.

### 5.4.2 Creating a new key

When generating a new SSH key pair, the `ssh-keygen` command allows you to specify various options, such as the type of key, key length, and other configurations. The following options are used to define the type and strength of the generated key:

- `-t rsa`: The `-t` option is used to specify the type of key to generate. In our case, `rsa` denotes that an RSA key pair will be generated.
- `-b 4096`: The `-b` option is used to specify the number of bits in the key. A higher number of bits usually results in a more vital key. In this case, 4096 indicates that a 4096-bit RSA key will be generated. The default key length for RSA keys is typically 2048 bits, but using a 4096-bit key provides an additional layer of security.

#### RSA Cryptography

RSA is a widely used public-key cryptosystem in modern computing and cryptography. The RSA algorithm is based on the mathematical properties of large prime numbers and is used for secure data transmission, digital signatures, and encryption.

The main benefit of choosing it for SSH is that it is widely supported and compatible with most SSH clients and servers. RSA keys with a length of 4096 bits provide high security. The only small deduction you must make here is that RSA keys tend to be larger, and key generation and cryptographic operations can be slower than ECDSA and Ed25519.

- ECDSA is faster and more efficient. However, not as widely supported as RSA, and its security depends on the choice of the underlying elliptic curve.
- Ed25519 is the most currently supported and highly secure elliptic curve-based algorithm with excellent performance and is more prone to attacks than ECDSA. However, there may be some compatibility issues in some environments.

On your personal computer, create the new key pair for SSH authentication.

```sh
ssh-keygen -t rsa -b 4096
```

### 5.4.3 Defining a Key Name

You will be prompted to `Enter file in which to save the key`. Here, defining a specific name for the key is highly recommended to reference it later, mainly if you use multiple keys for different authentications. You can still use the default folder. Exchange:

- `<your-username>` with the username of your personal computer
- `<your-chosen-keyname>` with your preferred name of the key without spaces

```sh
/Users/<your-username>/.ssh/<your-chosen-keyname>
```

> As I explained above, If you do not want to specify a name, you can hit `Enter` to generate a random numbered file.

### 5.4.4 Adding a passphrase

Now, enter a password used to encrypt the key. It is **highly recommended** to choose a solid password to raise the security level if someone gains access to your machine. A strong password is also essential for backups of the keys if your working machine is damaged during a trip and you need to regain access from a new device.

> If you do not want to set up a passphrase, you can hit `Enter` to generate a key without password encryption.

### 5.4.5 Backing up the private key

> Generate a backup before you set the authentication key to your node environment.

Here, you could use a container of a cloud provider to store the file that can always be accessed even if devices get compromised or destroyed during a trip where you do not get physical access to your node in any short time. You could also store the backup on a dedicated USB device.

Because the key is a passphrase itself, no one could sign anything without knowing its password in case the cloud container is compromised. You could also use an encrypted container to improve security further. Just make sure you always have secure and different passwords.

**After backing up the generated key, we can continue using it in production.**

### 5.4.6 Copying the public key to the node

Copy a generated public key to the node machine. Make sure to replace:

- `<your-chosen-keyname>` with your key's file path
- `<ssh-device-alias>` with your SSH node alias

```sh
ssh-copy-id -i ~/.ssh/<your-chosen-keyname>.pub <ssh-device-alias>
```

> Change the path if you set up a custom directory for the key.

You will be asked to input your node's user password one last time. Then this should be your final output. Please make sure that only the keys you wanted were added.

```sh
Number of key(s) added:        1
```

Now try logging into the machine with the following:

```sh
ssh <ssh-device-alias>
```

The command line tool automatically disconnects from your node after adding the key. Continue with testing the login using the authentication key.

### 5.4.7 Checking for the added keys

Logging into the node, we can check if the key was added correctly. It will still ask you for the standard node's user password.

```sh
ssh <ssh-device-alias>
```

Check if the key was added.

```sh
ls -al ~/.ssh/authorized_keys
```

You should find your authentication key in the specific folder. If not, you need to redo the previous step.

**Stay logged in to your node to enable secure key authentication in the following step.**

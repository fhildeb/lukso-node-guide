---
sidebar_label: "5.2 Key Login"
sidebar_position: 2
---

# 5.2 Key Login

Using SSH key authentication greatly enhances your node’s security by replacing password-based logins with cryptographic keys. In this section, you will generate a key pair, secure your private key, deploy the public key to the node, and verify passwordless login.

SSH keys use public‑key cryptography to authenticate without sending passwords over the network. You generate a private key, which will be kept secret, and a public key, that will be copied to the node. When you connect, the server challenges your client to prove you hold the private key—without ever exposing it. SSH key authentication is resistant to brute‑force attacks, since an attacker cannot guess your private key in the same way they could guess a password.

## 1. Check for Existing Keys

Before creating a new key, you can check whether you already have one in the default SSH key directory.

:::info

By default, SSH keys are located in the `~/.ssh` directory. The file names of the keys will depend on their encryption type:

- RSA keys: `~/.ssh/id_rsa`
- ECDSA keys: `~/.ssh/id_ecdsa`
- Ed25519 keys: `~/.ssh/id_ed25519`

Use the `ls` command to list the contents of a directory and serach for all public key files ending on `.pub`.

:::

```sh
ls ~/.ssh/*.pub
```

:::tip

If you see `id_rsa.pub`, `id_ecdsa.pub`, or `id_ed25519.pub` keys, you could reuse an existing key. However, best practice is to generate a separate key pair for each service to limit exposure if one key is compromised.

:::

## 2. Generate Key Pair

:::tip

You could alternatively consider generating a **hardware token** instead of generating a regular key file for maximum security. Such USB devices store your private key physically and must be plugged into the computer for a secure connection, protected from digital piracy.

Great examples would be 🟡 [**YubiKey**](https://developers.yubico.com/SSH/Securing_SSH_with_FIDO2.html) or other devices like 🔲 [**Ledger**](https://support.ledger.com/article/115005198545-zd) supporting 👤 [**FIDO U2F**](https://fidoalliance.org/).

:::

:::info

The following steps are performed on your 💻 **personal computer**.

:::

To create a new key, we can use the SSH Key Generation Tool. It is a widely used and integral part of the OpenSSH suite to generate, manage, and convert SSH public and private key pairs. First, we must decide which type of key to generate:

| Key Type | Security  | Efficiency | Compatibility        | Size  |
| -------- | --------- | ---------- | -------------------- | ----- |
| RSA      | Very High | Slower     | Widely supported     | Large |
| ECDSA    | High      | Fast       | Moderately supported | Small |
| Ed25519  | Very High | Very fast  | Mostly supported     | Small |

RSA is generally recommended for its strong security and wide compatibility.

**2.1 Create a new key pair**:

```sh
ssh-keygen -t rsa -b 4096
```

  <details>
    <summary>Full Property Explanation</summary>

| **Option** | **Description**                                                                                                                                                                                                                        | **Value** |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `-t`       | Specifies the cryptographic key type.                                                                                                                                                                                                  | `rsa`     |
| `-b`       | Specifies the number of bits in the key. A higher number of bits usually results in better security. The default key length for RSA keys is `2048` bits, but using a `4096` bits provides contemporary security for a blockchain node. | `4096`    |

</details>

**2.2 Enter file directory, name, and passphrase**:

```sh
/Users/<your-username>/.ssh/<your-chosen-keyname>
```

:::tip

Setting a passphrase is highly recommended for extra protection. This will mean you will be prompted to enter an additional password each time you connect to your node. The passphrase setup can be skipped by pressing `Enter`.

:::

:::warning

Never share or expose your private key. Treat it as your highest‑value secret.

:::

## 3. Set Key Permissions

After its generation, set strict permissions to protect your private key:

```sh
chmod 600 ~/.ssh/<your-chosen-keyname>
```

:::info

The command `chmod 600` sets the permissions of your private key file so that only the owner can read and write into it. Without this restriction, anyone with access to your system could potentially misuse your private key.

:::

## 4. Create Key Backup

Generate a backup before setting up the node authentication, otherwise you might not be able to remotely access your node. It's crucial to ensure the key is safety stored, especially while traveling or when your device may be damaged or lost.

| **Precaution** | **Description**                                                                                                                                                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backup**     | Always create a backup and store it in a secure and separate location like an encrypted USB drive or a cloud.                                                                                                                          |
| **Encryption** | Protect your private key with a strong passphrase or create an encrypted archive of the file to add an extra layer of security before the key can be used, even if someone gains access to the machine, USB drive, or cloud container. |

After backing up the generated key, we can continue using it in production.

## 5. Transfer Public Key

Install your public key on the node for passwordless login:

```sh
ssh-copy-id -i ~/.ssh/<your-chosen-keyname>.pub <ssh-device-alias>
```

:::info

Exchange `<your-chosen-keyname>` and `<ssh-device-alias>` with your generated key's file path and node's SSH alias.

:::

You will be prompted for your node’s password one last time. Afterward, this should be your final output:

```sh
Number of key(s) added:        1
```

## 6. Key Verification

Test to log into your node only using the newly deployed key:

```sh
ssh <ssh-device-alias>
```

You should connect without entering your node password.

:::info

The following steps are performed on your 📟 **node server**.

:::

Ensure your public key file got added to the list of authorized keys:

```sh
ls -al ~/.ssh/authorized_keys
```

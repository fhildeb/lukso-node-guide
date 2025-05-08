---
sidebar_label: "5.3 Authentication"
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 5.3 Authentication

In this section, you will lock down SSH on the node to accept only key‑based logins. We will adjust the config file, test that password logins are disabled, and update your personal computer's configuration file to include your private key for automated authentication.

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Enable Secure Authentication

**1.1 Open the Configuration File**: _Open the SSH daemon's file with your preferred text editor._

<Tabs>
<TabItem value="vim" label="Vim" default>

```sh
sudo vim /etc/ssh/sshd_config
```

</TabItem>
<TabItem value="nano" label="Nano">

```sh
sudo nano /etc/ssh/sshd_config
```

</TabItem>
</Tabs>

**1.2 Locate the Settings**: _Search for specific setting entries that are inactive by default._

```text
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

:::warning

Dots indicate that there are further setting properties between these lines that remain untouched.

:::

<details>
    <summary>Full Property Explanation</summary>

| **Directive**                | **Description**                                          | **Value**            |
| ---------------------------- | -------------------------------------------------------- | -------------------- |
| PermitRootLogin              | Allows root login by public‑key only, not by password.   | prohibit-password    |
| PubkeyAuthentication         | Enables authentication with authorized public keys.      | yes                  |
| AuthorizedKeysFile           | Specifies the single file to read for valid public keys. | .ssh/authorized_keys |
| PasswordAuthentication       | Disables login with a password entirely.                 | no                   |
| PermitEmptyPasswords         | Ensures accounts with blank passwords cannot log in.     | no                   |
| KbdInteractiveAuthentication | Disables challenge–response authentication methods.      | no                   |

</details>

**1.3 Update the Settings**: _Uncomment the entries and change their values._

- Remove any leading _#_ to uncomment each line.
- Set _PasswordAuthentication_ no.
- Ensure only the first _AuthorizedKeysFile_ entry remains.

**1.4 Verify the Changes**: _Check for spelling mistakes or unneeded spaces._

```text
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

**1.5 Save and Exit**: _Apply changes and close the file._

**1.6 Test the new Configuration File**: _Validate your file changes using the SSH daemon._

:::danger

Testing is crucial as you cannot use the regular password login after applying the changes on the main service.

:::

```sh
sudo sshd -t
```

:::info

A blank output indicates no syntax errors.

:::

**1.7 Restart the Service**: _Restart the running SSH daemon for the new adjustments to take effect._

```sh
sudo systemctl restart sshd
```

**1.8 Log Out of the Node**: _Exit the node's terminal and SSH session._

```sh
exit
```

## 2. Testing Password Login

:::info

The following steps are performed on your 💻 **personal computer**.

:::

Attempt to SSH with your user password to confirm it is now disabled:

```sh
ssh <ssh-device-alias>
```

:::info

Exchange `<ssh-device-alias` with your actual SSH device name of the node.

:::

You should see:

```sh
ssh: connect to host <ssh-device-alias> port 22: Connection refused
```

:::warning

If you can still log in with a password, verify your configuration file again.

:::

## 3. Update SSH Login Key

To connect to your node again, we need to add the previously generated SSH key to the SSH client.

**3.1 Open the Configuration File**: _Open the SSH client's file with your preferred text editor._

<Tabs>
<TabItem value="vim" label="Vim" default>

```sh
vim ~/.ssh/config
```

</TabItem>
<TabItem value="nano" label="Nano">

```sh
nano ~/.ssh/config
```

</TabItem>
</Tabs>

**3.2 Add the Identity Reference**: _Under the host block of your node, add your private key._

```text
  IdentityFile ~/.ssh/<chosen-keyname>
```

:::info

Ensure that your `IdentityFile` points to your private `<chosen-keyname>` without the `.pub` extension behind its name.

:::

The final host block should look like this:

```text
Host <ssh-device-alias>
  User <node-username>
  HostName <node-ip>
  Port <ssh-port>
  IdentityFile ~/.ssh/<chosen-keyname>
```

:::info

- `<ssh-device-alias>`: your nodes SSH device name
- `<node-username>`: your node's username
- `<node-ip-address>`: your node's static IP address
- `<ssh-port>`: your opened port number
- `<chosen-keyname>`: your SSH key

:::

**3.3 Save and Exit**: _Apply changes and close the file._

## 4. Testing Key Login

Now connect using your SSH alias:

```sh
ssh <ssh-device-alias>
```

After entering the correct passphrase, you will end up on the Ubuntu server welcoming printout.

:::info

Instead, of the password promt, the SSH client should ask to encrypt the private key with the passphrase.

:::

:::tip

If you did not set up any password for the key, you will connect automatically.

:::

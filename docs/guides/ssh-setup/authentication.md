---
sidebar_label: "5.3 Authentication"
sidebar_position: 3
---

# 5.3 Authentication

## Enable Secure Authentication

Now we need to enable key authentication on the SSH configuration of the node. Therefore we adjusted the config file as we did in the system's setup.

```sh
sudo vim /etc/ssh/sshd_config
```

Within the file, scroll down to the following lines:

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

Here is a description of what those settings are:

- **PermitRootLogin**: Controls whether the root user can log in via SSH. The "prohibit-password" value means the root user can log in using public key authentication but not a password.
- **PubkeyAuthentication**: Enables or disables public key authentication, which allows users to authenticate using their SSH keys instead of a password.
- **AuthorizedKeysFile**: Specifies the file(s) containing the public keys authorized to log in to the system.
- **PasswordAuthentication**: Enables or disables password-based authentication. It is enabled by default, so we want to uncomment the line and explicitly set it to "no" to disable password authentication.
- **PermitEmptyPasswords**: Controls whether users with empty passwords can authenticate. When disabled, users with blank passwords cannot establish a connection.
- **KbdInteractiveAuthentication**: Enables or disables challenge-response authentication, a more interactive form of authentication that typically involves the server sending a challenge to the client, and the client responds with an appropriate answer. When set to "no," challenge-response authentication is disabled. We do not need this when we want to use our new key exclusively.

Now edit the properties within the config file:

- uncomment them by removing the `#` in front
- change `PasswordAuthentication` to `no`
- remove the second key folder from the authorized key files

The outcome should look like this:

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

Save and close the file. We can use the SHH daemon to validate our updated SSH configuration in a test run before we apply the change in production. Testing is crucial as we cannot do a regular password login afterward.

```sh
sudo sshd -t
```

If there is no output, everything has been alright. Restart the running SSH daemon for the new adjustments to take effect.

```sh
sudo systemctl restart sshd
```

**Log out of your node**

### 5.5.1 Testing the password connection

After these configurations were applied correctly, we want to test if we can still log in using our password. Please exchange `<ssh-device-alias` with your actual SSH device name of the node.

```sh
ssh <ssh-device-alias>
```

You should not be permitted anymore and see the following output:

```sh
ssh: connect to host <ssh-device-alias> port 22: Connection refused
```

If you can still log in using your user's password, redo the previous step and make sure the SSH client is restarted correctly.

**To connect to our node again, we need to add the SSH key to the SSH client of our personal computer.**

### 5.5.2 Adding the key on the computer

Add the RSA key as an identity to your SSH connection properties on your personal computer by opening the configuration file.

```sh
vim ~/.ssh/config
```

Below the port of your node host, add the following line starting with two spaces. Ensure to update `<my-chosen-keyname>` with the actual name of the key.

```text
  IdentityFile ~/.ssh/<my-chosen-keyname>
```

> The identity file points to your private SSH key, so do not add the `.pub` file type extension behind the name.

The final output should look like this:

```text
Host <ssh-device-alias>
  User <node-username>
  HostName <node-ip>
  Port <ssh-port>
  IdentityFile ~/.ssh/<my-chosen-keyname>
```

Of course, you will see your actual properties:

- `<ssh-device-alias>`: your nodes SSH device name
- `<node-username>`: your node's username
- `<node-ip-address>`: your node's static IP address
- `<ssh-port>`: your opened port number
- `<my-chosen-keyname>`: your SSH key.

Save and close the file so we can continue to test the SSH key login.

### 5.5.3 Testing the new authentification

Test the new key login by starting the SSH connection to our node. This time the SSH client should not prompt for the user's password. Instead, it should ask to encrypt the private key with the passphrase.

> If you did not set up any password for the key, you will connect automatically.

```sh
ssh <ssh-device-alias>
```

After entering the correct passphrase, you will end up on the Ubuntu server welcoming printout.

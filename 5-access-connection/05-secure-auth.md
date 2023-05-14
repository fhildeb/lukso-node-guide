## 5.5 Enable Secure Authentictionon

Now we need to enable key authentication on the SSH configuration of the node. Therefore we adjust the config file like we did in the systems setup.

```sh
sudo vim /etc/ssh/sshd_config
```

Within the file scroll down to the following lines:

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

Save and close the file. We can use the SHH deamon to validate our updated SSH configuration in a test run before we apply the change in production. This is important as we will not be able to do a regular login afterwards.

```sh
sudo sshd -t
```

If there is no output everything went alright. Restart the running SSH deamon, for the new adjustments to take affect.

```sh
sudo systemctl restart sshd
```

**Log out of your node**

### 5.5.1 Testing the password connection

After these configurations were applied correctly, we want to test if we can still log in using our password. Exchange `<ssh-device-alias` with your actual SSH device name of the node.

```sh
ssh <ssh-device-alias>
```

You should not be permitted anymore and see the following output:

```sh
ssh: connect to host <ssh-device-alias> port 22: Connection refused
```

If you can still log in using your user's password, redo the previous step and make sure the SSH client is restarted properly.

**To be able to connect to our node again, we need to add the SSH key to the SSH client of our personal computer.**

### 5.5.2 Adding the key on the computer

On your personal machine, add the RSA key as identity to your SSH connection properties by opening the configuration file.

```sh
vim ~/.ssh/config
```

Below the port of your node host, add the following line starting with two spaces. Make sure to update `<my-chosen-keyname>` with the actual name of the key.

```text
  IdentityFile ~/.ssh/<my-chosen-keyname>
```

> The identity file is pointing to your private SSH key, so do not add the `.pub` file type extension behind the name.

The final output should look like this:

```text
Host <ssh-device-alias>
  User <node-username>
  HostName <node-ip>
  Port <ssh-port>
  IdentityFile ~/.ssh/<my-chosen-keyname>
```

Of corse, you will see your own properties:

- `<ssh-device-alias>`: your nodes SSH device name
- `<node-username>`: your node's username
- `<node-ip-address>`: your node's static IP address
- `<ssh-port>`: your opened port number
- `<my-chosen-keyname>`: your SSH key.

Save and close the file so we can continue to test the SSH key login.

### 5.5.3 Testing the new authentification

Test the new key login by starting the SSH connection to our node. This time the SSH client should not prompt for the user's password, instead it should ask to encrypt the pivate key with the passphrase.

> If you did not set up any password for the key, you will connect automatically.

```sh
ssh <ssh-device-alias>
```

After entering the correct passphrase, you will end up on the nodes's welcoming printout.

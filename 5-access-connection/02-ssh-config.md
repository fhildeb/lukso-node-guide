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

## 3.4 Configure Remote Access

We already installed the OpenSSH server within the Ubuntu installation, and I explained why it is an essential tool. If you did not configure it already, now is the time to set it up so we can securely connect to our server from other devices.

The `/etc/ssh/sshd_config` file is the main configuration file for the OpenSSH server. It contains various settings and directives that control the behavior of the SSH server, such as authentication methods, listening address, port number, and other security options. By modifying this file, you can customize the openSSH server to fit your specific requirements and enhance the security of your node.

#### Port Number

Regarding the SSH port number, the default port for the OpenSSH server is `22`. However, it is a common practice to change the port number to a non-standard, higher value to improve security through obscurity. While changing the port number alone is not a comprehensive security solution, it can help reduce the likelihood of automated attacks and port scans targeting the default port.

Choosing a port number higher than `1024` is recommended, as ports below this range are considered privileged and require root access to bind. The highest possible number is `65535`, as port numbers are 16-bit unsigned integers. Some administrators prefer using a port number higher than `50000` to avoid conflicts with other services further and minimize the chances of being targeted by automated scans. Ultimately, the choice of port number depends on your preferences and network configuration. Still, ensuring that the selected port is not already used by another service on your system is essential.

#### Text Editors

We can use various terminal text editors to configure files on the node. Ubuntus's default text editor is called Vi Improved. I will use the default editor `vim` in this guide. However, you can also choose a more user-friendly one like `nano`. Here is a description of the two:

#### Vim

Vim is an enhanced version of the classic Unix text editor Vi, with additional features and improved usability. Vim operates in multiple modes: normal mode, insert mode, and command mode, allowing users to navigate, edit, and manipulate text files efficiently.

You'll start in normal mode once the file is open in Vim. You navigate through files by using the arrow keys.

To enter insert mode to edit the text, press `i`. You'll see `-- INSERT --` at the bottom of the screen- press `Esc` to exit insert mode and return to normal mode.

To enter command mode to manage to save and exit, press `:` while in normal mode. A colon will appear at the bottom of the screen.

- To write and quit, type `wq` and press `Enter`.
- To quit without saving: type `q!` and press `Enter`.

#### Nano

Nano is a beginner-friendly text editor on Ubuntu. Nano is a simple, modeless, command-line text editor in most Linux distributions. It is designed to be easy to use and suitable for editing system configuration files, writing programming scripts, and other text editing tasks.

Once you've opened a file in Nano, you can edit it immediately. Navigation through the file is accomplished using the arrow keys.

Unlike Vim, Nano doesn't have different modes like normal or insert mode. You're in editing mode as soon as the file opens and can start changing the text.

At the bottom of the Nano screen, you'll see a row of commands, each represented by a caret symbol (`^`) and a letter. The caret symbol represents the `Ctrl` key.

- To save changes, press `Ctrl + O`, and press `Enter`.
- To exit, press `Ctrl + X`. If you've made changes, you will be asked to save them- press `Y` for Yes or `N` for No.

### 3.4.1 Edit SSH Configuration

Let's open the configuration file using Vim.

```sh
sudo vim /etc/ssh/sshd_config
```

Locate the line that starts with `#Port 22` and uncomment it by removing the `#` at the beginning if it is present. Removing the hash will activate the static port number you want to use for connecting to the node.

Change the port number `22` to your desired one, for example, port `50022`, then save and exit.

To apply the change, we need to restart the SSH service of the node.

#### Manage System Services

System Control is a powerful command-line utility that is the primary management tool for system processes, widely used across modern Linux distributions. By leveraging `systemctl`, administrators can control and get insights into their system's state, enabling them to fine-tune their environment for optimal performance, stability, and security. The system control command offers a unified and consistent approach to starting, stopping, enabling, disabling, and checking the status of various components.

You can use the following command to check all system services:

```sh
systemctl list-unit-files --type=service
```

### 3.4.2 Adapt to Changes

We need to restart the OpenSSH server using the `systemctl` command to make the SSH service use the updated config file.

#### Daemon Processes

As you saw in the system service list, both `ssh` and `sshd` services refer to the SSH processes.

Daemon services are background processes that run continuously on Unix-like operating systems, including Linux. These services perform various tasks and provide essential functionalities without direct user interaction.

In our case, `sshd` is the SSH daemon managed by the `ssh` service. We can use it to validate our updated SSH configuration in a test run.

```sh
sudo sshd -t
```

If there is no output, everything is fine to run it live on the machine, affecting the global service.

```sh
sudo systemctl restart sshd
```

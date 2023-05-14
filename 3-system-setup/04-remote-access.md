## 3.4 Configure Remote Access

Within the Ubuntu installation, we already installed openSSH server and I explained why it is an essential tool. If you did not configure it already, now is time to set it up so we can connect to our server from other devices in a secure manner.

The `/etc/ssh/sshd_config` file is the main configuration file for openSSH server. It contains various settings and directives that control the behavior of the SSH server, such as authentication methods, listening address, port number, and other security options. By modifying this file, you can customize the openSSH server to fit your specific requirements and enhance the security of your node.

#### Port Number

Regarding the SSH port number, the default port for openSSH server is `22`. However, it is a common practice to change the port number to a non-standard, higher value to improve security through obscurity. While changing the port number alone is not a comprehensive security solution, it can help reduce the likelihood of automated attacks and port scans targeting the default port.

It is recommended to choose a port number higher than `1024`, as ports below this range are considered privileged and require root access to bind. The highest possible number is `65535`, as port numbers are 16-bit unsigned integers. Some administrators prefer using a port number higher than `50000` to further avoid conflicts with other services and minimize the chances of being targeted by automated scans. Ultimately, the choice of port number depends on your preferences and network configuration, but it is essential to ensure that the selected port is not already in use by another service on your system.

#### Text Editor

To configure files on the node, we use Ubuntus default text editor called Vi Improved. Vim is an enhanced version of the classic Unix text editor, Vi, with additional features and improved usability. Vim operates in multiple modes, primarily normal mode, insert mode, and command mode, allowing users to efficiently navigate, edit, and manipulate text files.

Once the file is open in Vim, you'll start in normal mode. You navigate through files by using the arrow keys.

To enter insert mode to edit the text, press `i`. You'll see `-- INSERT --`showing up at the bottom of the screen. To exit insert mode and return to normal mode, press `Esc`.

To enter command mode to manage save and exit, press `:` while in normal mode. A colon will appear at the bottom of the screen.

- To write and quit, type `wq` and press `Enter`.
- To quit without saving: type `q!` and press `Enter`.

### 3.4.1 Edit SSH Configuration

Lets open the configuration file using Vim.

```sh
sudo vim /etc/ssh/sshd_config
```

Locate the line that starts with `#Port 22` and uncomment it by removing the `#` at the beginning, if it is present. This will activate the static port number you want to use for connecting to the node.

Change the port number `22` to your desired one, for example, port `50022`, then save and exit.

In order to apply the change, we need to restart the SSH service of the node.

#### Manage System Services

System Control is a powerful command-line utility that serves as the primary management tool for system processes, which is widely used across modern Linux distributions. By leveraging `systemctl`, administrators can control and get insights into their system's state, enabling to fine-tune their environment for optimal performance, stability, and security. The system control command offers a unified and consistent approach to starting, stopping, enabling, disabling, and checking the status of various components.

You can use the following command to check all system services:

```sh
systemctl list-unit-files --type=service
```

### 3.4.2 Adapt to Changes

To make the SSH service use the updated config file, we need to restart the OpenSSH server using the `systemctl` command.

#### Deamon Processes

As you saw in the system service list, both `ssh` and `sshd` services refer to the SSH processes.

Daemon services are background processes that run continuously on Unix-like operating systems, including Linux. These services perform various tasks and provide essential functionalities, often without direct user interaction.

In our case, `sshd` is the SSH deamon which is managed by the `ssh` service. We can use it to validate our updated SSH configuration in a test run.

```sh
sudo sshd -t
```

If there is no output, everything is fine to run it live on the machine, affecting the real service.

```sh
sudo systemctl restart sshd
```

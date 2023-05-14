## 3.5 Set Remote Access on Startup

Next, we want to check if OpenSSH server starts automatically when the system boots up. Here we can also use the system control to check if it is enabled already.

### 3.5.1 Check SSH on Startup

```sh
sudo systemctl is-enabled ssh
```

If it should not be enabled, we need to configure it using a symbolic link.

#### Symbolic Links

A symbolic link, also known as a symlink or soft link, is a special type of file in Unix-like operating systems that serves as a reference or pointer to another file or directory. It establishes a link between the path of the symbolic link and the target file or directory, allowing users and applications to access the target resource as if it were at the symlink's location.

In our example, the symbolic link needs to be created between the OpenSSH service unit file and a corresponding file in the system directory meant for system services that are enabled to start at boot. This system directory is then scanned during the boot process, and all service unit files that have a symbolic link in this directory are automatically started. A smybolic link is used, so there are no duplications of the actual service.

### 3.5.2 Enable SSH on Startup

We call the system control with the `enable` subcommand to create a symbolic link for the SSH application.

```sh
sudo systemctl enable ssh
```

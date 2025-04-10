---
sidebar_label: "3.5 Startup Utility"
sidebar_position: 5
---

# 3.5 Startup Utility

## 3.5 Set Remote Access on Startup

Next, we want to check if the OpenSSH server starts automatically when the system boots up. Here we can also use the system control to check if it is enabled already.

### 3.5.1 Check SSH on Startup

```sh
sudo systemctl is-enabled ssh
```

We need to configure it using a symbolic link if it should not be enabled.

#### Symbolic Links

A symbolic link is a type of file in a Unix-like operating system that serves as a reference or pointer to another file or directory. It establishes a link between the path of the symbolic link and the target file or directory, allowing users and applications to access the target resource as if it were at the symlink's location.

In our example, the symbolic link must be created between the OpenSSH service unit file and a corresponding file in the system directory for system services that can start at boot. This system directory is then scanned during the boot process, and all service unit files that have a symbolic link in this directory are automatically started. A symbolic link is used so the actual service is not duplicated.

### 3.5.2 Enable SSH on Startup

We call the system control with the `enable` subcommand to create a symbolic link for the SSH application.

```sh
sudo systemctl enable ssh
```

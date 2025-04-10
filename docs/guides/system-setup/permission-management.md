---
sidebar_label: "3.1 Permission Management"
sidebar_position: 1
---

# 3.1 Permission Management

## 3.1 Change Permission Set

By locking the root account, we can enhance the security of the node system, as it requires users to use superuser permissions to execute commands with root privileges, which leaves an audit trail of actions performed with elevated permissions.

#### Super User Permission

The root access does have unlimited rights. But as a regular user profile is set up, some commands will require superuser privileges to run. The related `sudo` option, short for "superuser do," is a command-line utility that allows users to execute commands with the privileges of another user, typically the superuser or "root" user. It provides a controlled way to grant administrative access to specific users without sharing the root password. By using sudo, users can run commands that require elevated permissions.

> Always be cautious when using `sudo`, as there is the risk of accidentally performing potentially harmful actions on the system.

Log into the system with the previously configured user profile and type in the specified username followed by the password.

#### Password Utility

The `passwd` command is an essential utility in Unix-based operating systems, including Linux, for managing user passwords. It allows users to change their passwords and, when executed with administrative privileges, modify passwords for other users on the system.

The command offers various options for managing passwords, such as setting password expiry, locking and unlocking user accounts, and forcing users to change their password at the next login.

### 3.1.1 Disable Root Access

Using the `passwd` command, we can lock the root account on the node system, effectively disabling the ability to log in directly as the root user using a password. We use the `-l` option to lock the specified account.

```sh
sudo passwd -l root
```

The outcome should look like this:

```text
passwd: password expiry information changed.
```

### 3.1.2 Check Root Account

To verify that the change was effective, use the password command again with the `-S` option so that you can see the status of the root account:

```sh
sudo passwd -S root
```

The outcome should look like this:

```text
root L 02/17/2023 0 99999 7 -1
```

The uppercase `L` behind the account name means the root account has been locked successfully. If you see an uppercase `P`, it indicates that the account is not locked and still has a valid password. If the `L` shows up, all commands will always have to ask for the sudo password, as you can no longer log in as the root account.

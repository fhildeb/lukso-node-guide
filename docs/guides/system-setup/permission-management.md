---
sidebar_label: "3.1 Permission Management"
sidebar_position: 1
---

# 3.1 Permission Management

Managing user permissions is a critical component for securing your node system. By locking direct root access and enforcing the use of superuser privileges, you create an auditable environment that minimizes the risk of accidental or malicious system changes. This guide explains how to disable direct root login and manage user passwords for better security.

| **Command** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sudo`      | When the system is set up with a regular user account, certain commands require elevated privileges. The superuser command, allows a user to run commands with the privileges of another user, usually the root user, without exposing the root password. This controlled mechanism is essential for maintaining system security and accountability.                                                                           |
| `passwd`    | The password command is a fundamental utility in Unix-based operating systems for managing user passwords. With administrative rights, you can use _passwd_ to change passwords for any account on the system. Options include setting password expiry, locking/unlocking accounts, and forcing password resets on next login. This is essential for ensuring that only authorized users can access critical system functions. |

:::warning

Always be cautious when using _sudo_, as executing commands with root privileges can inadvertently harm your system.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Disable Root Access

To improve system security, it is best practice to disable direct root login Locking the root account prevents unauthorized direct access, forcing all administrative commands to go through superuser permissions, ensuring that no one can bypass the security policies of elevated privileges.

:::info

Using the `passwd` command with the lock `-l` option, disables the root account's ability to log in with a password.

:::

Open a terminal and type the following command:

```sh
sudo passwd -l root
```

The outcome should look like this:

```text
passwd: password expiry information changed.
```

## 2. Check Root Account

After locking the root account, you should verify the change. With the root account locked, any command requiring administrative rights will prompt you for your user password through superuser permissions.

:::info

Using the `passwd` command with the status `-S` option prints the current settings.

:::

In the terminal, type:

```sh
sudo passwd -S root
```

You should see an output similar to:

```text
root L [DATE] 0 99999 7 -1
```

:::tip

- Uppercase `L` signifies that the root account has been locked.
- Uppercase `P`, means that the account is still active with a valid password.

:::

## 5.1 Check SSH Install

Before verifying basic access to a node machine using SSH on our personal computer, we must check if all packages are installed correctly.

On my side, Im running MacOS, and SSH is installed by default in MacOS Ventura on Version `9.0`. We can check the version directly by calling the SSH software:

> **NOTE**: All the following steps are performed on a personal computer.

Open the terminal to continue.

```sh
ssh -V
```

The Output should look like this:

```sh
OpenSSH_9.0p1, LibreSSL 3.3.6
```

If you use another operating system or don't have SSH installed, please search how to install the latest SSH version for your operating system accordingly. We must run the SSH counterpart to establish a secure connection to our node.

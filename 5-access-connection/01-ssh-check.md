## 5.1 Check SSH Install

On my side, Im running MacOS and SSH is installed by default in MacOS Ventura on Version `9.0`. We can check the version directly by calling the SSH software:

> **NOTE**: All following steps are performed a personal computer.

Open the terminal to continue.

```sh
ssh -V
```

The Output should look like this:

```sh
OpenSSH_9.0p1, LibreSSL 3.3.6
```

If you are using another operating system or dont have SSH installed, please search on how to install the latest SSH version for your operating system accordingly. Wee need to run the SSH counterpart to establish a secure connection to our node.

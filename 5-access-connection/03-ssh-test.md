## 5.3 Test the SSH Connection

Verify the configuration by connecting the node machine. Therefore, immediately call the `SSH` application and type your preferred SSH device alias.

```sh
ssh <ssh-device-alias>
```

You should now be able to log into your system by typing in your password. Afterward, you will be greeted by the node's welcoming printout:

```text
Welcome to Ubuntu 22.04.2 LTS [BUILD]

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of [DATE]

  System load:           1.0
  Usage of /:            1.2% of 997.87GB
  Memory usage:          1%
  Swap usage:            0%
  Temperature:           36.0 C
  Processes:             219
  Users logged in:       0
  IPv4 address [Connection Type]: [IPv4 IP Address]
  IPv6 address [Connection Type]: [IPv6 IP Address]

[NEWS]

[SECURITY_NOTICES]

0 updates can be applied immediately.

[EMS_NOTICE]


Last login: [DATE] from [IP_FROM_PERSONAL_COMPUTER]
```

If it works correctly, you can close the connection without shutting down the node.

```sh
exit
```

**Make sure you're disconnected before continuing the next steps.**

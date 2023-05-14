## 6.6 Firewall Settings

After you have spot out which ports you need to open, we can go back to editing the firewall settings. We can do this the same way as we did before in the [system setup](/3-system-setup/) section of this guide.

Log in to your node if you are not already connected:

```sh
ssh <ssh-device-alias>
```

### 6.6.1 Opening the ports on the firewall

I will go ahead and open all public ports used for the Geth and Prysm clients. Prysm is needed as it is the only fully supported validator for the LUKSO CLI for now. Since I choose stability over performance, I choose Geth, based on the warning notices from Erigon's repository.

```sh
# Geth's Execution Chain Data Channel
sudo ufw allow 30303/tcp

# Geth's Execution Chain Discovery
sudo ufw allow 30303/udp

# Prysm's Beacon Gossip, Requests, and Responses
sudo ufw allow 13000/tcp

# Prysm's Beacon Discovery, Requests, Data Exchange
sudo ufw allow 12000/udp
```

The output of each command should always show:

```sh
Rule added
Rule added (v6)
```

### 6.6.2 Checking the configured ports

Now we can verify our firewall configuration as we did previously. If something is missing or configured wrong, have a look into the system setup's [firewall section](/3-system-setup/) on how to remove them.

```sh
sudo ufw status
```

The output for Geth and Prysm should look similar to the one underneath. Please note that `<prefered-ssh-port>` will be exchanged with your actual SSH port.

```text
Status: active

To                               Action      From
--                               ------      ----
<prefered-ssh-port>/tcp          ALLOW       Anywhere
30303/tcp                        ALLOW       Anywhere
30303/udp                        ALLOW       Anywhere
13000/tcp                        ALLOW       Anywhere
12000/udp                        ALLOW       Anywhere
<prefered-ssh-port>/tcp (v6)     ALLOW       Anywhere (v6)
30303/tcp (v6)                   ALLOW       Anywhere (v6)
30303/udp (v6)                   ALLOW       Anywhere (v6)
13000/tcp (v6)                   ALLOW       Anywhere (v6)
12000/udp (v6)                   ALLOW       Anywhere (v6)
```

**If your client ports match, it means they are allowed from the node's point of view. In the next step, we need to enable inputs from the router's side.**

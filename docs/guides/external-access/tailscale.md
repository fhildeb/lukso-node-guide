---
sidebar_label: "10.1 Tailscale"
sidebar_position: 1
description: "Set up Tailscale VPN for secure remote access to your LUKSO node. Learn how to install Tailscale, configure auto-start, update SSH settings, and access Grafana dashboards from anywhere."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 10.1 Tailscale

Tailscale is a modern VPN service that allows you to create a secure, encrypted connection between your devices using a simple and user-friendly interface. It is especially useful for remote server access, such as connecting to your node from anywhere in the world without exposing public ports or relying on complicated firewall configurations.

:::tip

Further details about SSH and VPN protocols can be found on the [**SSH and VPN Tunnel**](/docs/theory/node-operation/ssh-and-vpn-tunnel.md) page in the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## 1. Software Installation

Visit the [Tailscale Webpage](https://tailscale.com/) and register for the service. It's a free for a limited amount of users and devices. After logging in with your favorite identity provider, you will be prompted to connect your first two devices. Click on _Linux_ to connect your node.

```sh
sudo apt-get update
sudo apt-get install tailscale
```

You can also enable auto-updates for Tailscale.

```sh
tailscale set --auto-update
```

After the installation, activate Tailscale.

```sh
tailscale up
```

You will receive a link that you must copy and paste to the terminal of your node in order to connect the device with your account.

:::info

Continue with the second device, like your personal computer or smartphone. The Guide on the Tailscale webpage will give you a selection of possible installations. After activating Tailscale on both, your devices will be able to communicate.

:::

## 2. Configure Auto Startup

Tailscale comes with its own CLI tool called _tailscaled_. By default, it will list itself as a system service for easy maintenance. You can retreive the service's status directly from the system control or further stop, restart, or disable autostarts in a similar way.

```sh
systemctl status tailscaled
```

The output should be something similar to the following:

```text
● tailscaled.service - Tailscale node agent
     Loaded: loaded (/lib/systemd/system/tailscaled.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2023-05-19 20:01:42 UTC; 3h 19min ago
       Docs: https://tailscale.com/kb/
   Main PID: 1005 (tailscaled)
     Status: "Connected; [EMAIL-ACCOUNT]; [TAILSCALE-IP] [MAC-ADDRESS]"
      Tasks: 17 (limit: 38043)
     Memory: 40.6M
        CPU: 1min 29.134s
     CGroup: /system.slice/tailscaled.service
             └─1005 /usr/sbin/tailscaled --state=/var/lib/tailscale/tailscaled.state --socket=/run/tailsc>

[DATE] [TIME] [USER] tailscaled[4974]: control: NetInfo: NetInfo{varies=false hairpin=false ipv6=true ipv>...
```

The service should already be configured to start and connect during boot or failure. Verify it once again.

```sh
sudo systemctl enable tailscaled
```

If it was not set already, the command created a _symlink_ and print out the filenames.

:::info

The following steps are performed on your 💻 **personal computer**.

:::

## 3. Update SSH Config

As Tailscale uses internal static IP addresses on both ends of the tunnel, you must also update the SSH configuration to connect to the new IP once outside of your home network. On your personal computer, open up the SSH file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
vim ~/.ssh/config
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
nano ~/.ssh/config
```

</TabItem>
</Tabs>

If you want to connect to your node via Tailscale, you must use the new Tailscale IP instead. You will find this static and internal IP on the _Tailscale Device Dashboard_. You can copy it over to a text file. Then dplicate the node's _Host_ entry and exchange the _HostName_ with the new IP and the _Host_ property with a new alias. The final entry should look like this:

```text
Host <ssh-device-alias-for-home-environment>
  User <node-username>
  HostName <node-ip>
  Port <ssh-port>
  IdentityFile ~/.ssh/<my-chosen-keyname>

Host <ssh-device-alias-for-tailscale-environment>
  User <node-username>
  HostName <tailscale-node-ip>
  Port <ssh-port>
  IdentityFile ~/.ssh/<my-chosen-keyname>
```

Save the file and exit. Then try to connect to your node while Tailscale is active.

```sh
ssh <ssh-device-alias-for-tailscale-environment>
```

:::info

Exchange the `<ssh-device-alias-for-tailscale-environment>` with the actual SSH device name.

:::

## 4. Update Grafana Dashboard

If you want to visit your Grafana Dashboard outside your home network using Tailscale, you will need to adjust the IP once again. As you did with the SSH, having two different browser bookmarks is recommended: one for your home environment and one for the static Tailscale IP. Within your browser, you can find Grafana at the following address in case your VPN is activated:

```text
http://<tailscale-node-ip>:3000/login
```

:::info

Exchange the `<tailscale-node-ip>` with the actual IP address found in the _Tailscale Device Dashboard_.

:::

## 5. Disable Key Expiry

By default, Tailscale session keys from devices expire after 180 days of being unused, meaning you wont be able to re-connect to your node without maintenance. If you want to raise the limit or turn key expiry off for your main devices, you can do so by navigating into the _Tailscale Device Dashboard_ once logged in to their web service. On your node device, click on the three dots menu behind the static Tailscale IP and either select _Disable Expiry Date_ or _Specify Expiry Period_.

:::tip

Expiry settings are device-specific and can be adjusted anytime within the _Tailscale Device Dashboard_.

:::

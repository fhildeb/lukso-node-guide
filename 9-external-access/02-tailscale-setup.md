## 9.2 Tailscale Setup

Now that we have spoken about VPN services and the benefits of Tailscale, we can continue with the installation. If you want to use a different software service to set up a tunnel connection to your node, feel free to do so.

### 9.2.1 Installation

Visit [Tailscale](https://tailscale.com/) and register for the service. It is a free service for a limited amount of users and devices. After logging in with your favorite identity provider, you will be prompted to connect your first two devices. Click on `Linux` to connect your node. On your node, install the Tailscale package using `curl`. The `-fsSL` options instruct curl to silently follow HTTP redirects, not output any content for error HTTP codes, but still display error messages if the operation fails. The silent mode is needed for the pipe, as the script gets executed right after it is fetched.

```sh
curl -fsSL https://tailscale.com/install.sh | sh
```

After you have installed Tailscale run the following command to start Tailscale

```sh
tailscale up
```

You will receive a printed-out link that you must copy and paste into the address bar of your machine. Do so and connect with your previously created account. Your first device has been added.
:::info
Now continue with the second device. The Guide on the Tailscale screen will give you a selection of possible installations. Install the software on your primary computer and go through the minimal setup to log in. Now, everything should already be set up in place. You can try it out in the guide section by pinging each device over the VPN.
:::

### 9.2.2 Configure Auto Startup

Tailscale comes with its own CLI tool called `tailscaled`. By default, it will automatically list itself as a system service. We can check the status of Tailscale with the following command:

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
     Status: "Connected; voulex.4128@gmail.com; 100.87.208.19 fd7a:115c:a1e0:ab12:4843:cd96:6257:d013"
      Tasks: 17 (limit: 38043)
     Memory: 40.6M
        CPU: 1min 29.134s
     CGroup: /system.slice/tailscaled.service
             └─1005 /usr/sbin/tailscaled --state=/var/lib/tailscale/tailscaled.state --socket=/run/tailsc>

[DATE] [TIME] [USER] tailscaled[4974]: control: NetInfo: NetInfo{varies=false hairpin=false ipv6=true ipv>...
```

It should already be configured to start up on boot or failure, but we can check once again:

```sh
sudo systemctl enable tailscaled
```

If it was not correctly set up, it should've created a `symlink` and printed out the filenames.

You should be set and can turn off the VPN service until you need to connect with your node outside your home environment.

## 9.2.3 Update SSH Config

As Tailscale uses internal static IP addresses on both ends of the tunnel, we must also update the SSH configuration file to connect to the IP. On your personal computer, open up the file:

```sh
nano ~/.ssh/config
```

Then Copy the node Host entry of your node device. Only change the `HostName` address and the `Host`. If you want to connect to your node via Tailscale, you must use the new name.

You will find the new static internal IP of the node device on the Tailscales Device Dashboard. You can copy it over.

The final entry should look like this:

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

Save and exit. You will have successfully configured your external remote access. Try to connect to your node.

## 9.2.4 Update Grafana Dashboard

If you want to visit your Grafana Dashboard outside your home network using Tailscale, you will need to adjust the IP. As you did with SSH, having two different browser bookmarks is recommended- one for your home network and one for the Tailscale address.

Within your browser, you can find Grafana at the following address in case your VPN is activated:

```text
http://<tailscale-node-ip>:3000/login
```

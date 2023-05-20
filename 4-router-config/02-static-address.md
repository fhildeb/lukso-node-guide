## 4.2 Address Reservation

You can avoid connectivity issues by assigning a static IP address or reserving an IP address for your node in your home network. A dedicated IP address ensures that the node will always use the same IP address, making configuring port forwarding, firewall rules, and other networking settings easier.

> **Let the node sit aside and change back to your personal computer.**

### 4.2.1 Log into your Router's Web Interface

Open a web browser and enter the router's IP address or web address. You'll be prompted to enter your router's admin username and password. Check your router's documentation or label for the default credentials if you haven't changed them.

### 4.2.2 Locate the Dynamic Host Settings

In your router's web interface, navigate to the section related to DHCP settings. This section is usually under `LAN` or `local network` settings. In more consumer-friendly machines like mine, it could be found in:

`Home Network` > `Network` > `Connections`

### 4.2.3 Enter the IP Assignment Options

Look for a feature that allows you to reserve or assign static IP addresses. The section might be called `IP address reservation`, `Static IP assignment`, `Fixed IP assignment`, or something similar.

Click on the option to add a new IP address reservation or assignment. You'll be prompted to enter the device's MAC address and the desired static IP address. In more modern firmware, you can write down the IP address that is currently already picked. Just write down the addresses you've noted from the previous steps.

> If you want to assign a new IP address, choose an IP address within your router's IP address range but outside the scope of IP addresses automatically allocated by the DHCP server to prevent conflicts.

On my end, I found the settings within:

`Connections` > `Device`

After clicking on my node's device name, I could set a new static IP assignment by ticking the box for the `Always assign this network device the same IPv4 address` option. A new window for advanced connection settings appeared that let me customize the IP address. However, I left the IP that was already assigned.

### 4.2.4 Apply and Save

Double-check that both IP and MAC addresses are showing up correctly on the router's interface.

> If you manually entered the device's MAC address and the desired static IP address, your router may require a reboot for the changes to take effect.

Apply the changes and log out of your router.

### 4.2.5 Verify the IP Assignment

If you applied the same IP address as the static property, everything should have worked on the fly.

> In case of manual input, wait for the router to reboot and restart your node. Then log in and continue.

Verify that your static IP address is set up as wished using the same commands as before:

- **Local check, looking up the second address:**

```sh
ip route show default
```

- **Online check, fetching the requests source address:**

```sh
ip route get 8.8.8.8 | awk '{print $7}'
```

If the outputs contradict what we have set above, return to your router settings and repeat the last steps.

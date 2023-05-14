## 6.7 Router Configuration

To allow external incoming communication into your home network, so they can be forwarded to your node machine with open ports, we also have to open these ports on your router, acting as a second firewall in this case.

### 6.7.1 Resolve the Node's IP Address

Resolve the nodes IP address again as we already did and explained in detail on the [router config](/4-router-config/) section of the guide:

```sh
ip route show default
```

The output will look like this:

```sh
default via <GATEWAY_IP_ADDRESS> dev eno1 proto dhcp src <NODE_IP_ADDRESS> metric <ROUTING_WEIGHT>
```

Alternatively you can also send an request to the Google server and filter their response:

```sh
ip route get 8.8.8.8 | awk '{print $7}'
```

### 6.7.2 Resolve the Node's Hardware Address

Now we can retrieve the information about the MAC addresses

```sh
ip link show
```

The output will list all the network interfaces on the system. Look into the interface that is used to broadcast and send information to the outside world using an Ethernet connection. The entry you're looking for looks like this:

```sh
<NETWORK_INFERFACE_NAME>: <BROADCAST,MULTICAST,UP,LOWER_UP> ...
    link/ether <MAC_ADDRESS> brd <BROADCAST_ADDRESS>
```

**Write down or remember both names so you can check them later on and identify your device for router settings.**

### 6.7.3 Log into your Router's Web Interface

Open a web browser and enter the router's IP address or web address. You'll be prompted to enter your router's admin username and password. If you haven't changed them, check your router's documentation or label for the default credentials.

### 6.7.4 Navigate to Port Forwarding Settings

In your router's web interface, navigate to the section related to port forwarding settings. This section might be named something like `Port Forwarding`, `Applications`, or `Firewall`. In more consumer friendly machines like mine, it could be found in:

`Internet` > `Permit Access` > `Port Sharing`

### 4.7.5 Add a New Port Forwarding Rule

Usually, there will be a button or link labeled `Add`, `Create`, `New Rule`, or something similar. Click on it to start creating a new port forwarding rule for a specific device.

You'll be prompted to enter the device's MAC address and the static IP address you gave your device before. In modern firmwares, you can just select one of your devices that are currently connected. Choose your node device.

On my end, I found the settings within:

`Port Sharing` > `Add Device for Sharing`

After clicking on the node's device name or clicking new rules you should be able to set a new port access rule. There are the following properties:

- **Device Info/MAC Address/IP Address**: These are the fields for device information. In newer firmware, you can just select the device, on older firmware you have to manually input your devices MAC and static IP addresses you've read out before. The incoming traffic on the specified port will be forwarded to the device with this IP address. The MAC address is there for the IP to always be assigned statically.
- **Service Name/ID/Description**: This is just a label for you to identify the rule. You can enter something like a short description of the above table, so you will associate it later. I chose `<client-name>-<2-word-description>-<port-number>` as naming convention, to always know what the port is used for.
- **External Port**: This is the port number you want to open for incoming traffic. For Geth and Prysm, you might need to open ports such as `30303`, `13000`, `12000` for blockchain clients.
- **Internal Port/Port to Device**: This is the port number on your local machine that will handle the incoming traffic. Usually, this will be the same as the external port. If you did not manually configure port forwarding, input the same as in the external port. If there is a second field for `through port` for advanced redirects, input the same port number again. If they are equal, no additional ruleset will apply.
- **Protocol**: This is the network protocol used for the incoming traffic. It could be TCP, UDP, or both. Make sure to match the protocol with the requirements of your blockchain clients. Some router might not allow to set one rule for multiple protocols. If so, you have to set one rule for each protocol of the same port number.

On my router, I set the following rule packages for Geth and Prysm:

```text
---------------------------------------------------------------------------------
| DEVICE:               <node-device-name>                                      |
| IPV4 ADDRESS:         <node-ip-address>                                       |
| MAC ADDRESS:          <node-mac-address>                                      |
| IPV6 INTERFACE ID:    <ipv6-interface-id>     (assigned automatically)        |
---------------------------------------------------------------------------------
| □ Permit independent port sharing for this device                             |
---------------------------------------------------------------------------------
| IPV4                                                                          |
| □ Open this device completely for internet sharing via IPv4 (exposed host)    |
---------------------------------------------------------------------------------
| IPv6                                                                          |
| Enable PING6                                                                  |
| Open firewall for delegated IPv6 prefixes of this device                      |
| Open this device completely for internet sharing via IPv6 (exposed host)      |
---------------------------------------------------------------------------------

SHARING RULES
1 ---
        -------------------------------------------------------------------------
        | NAME:                         execution-data-30303                    |
        | PROTOCOL:                     TCP                                     |
        | PORT TO DEVICE:               30303   THROUGH PORT:       3030        |
        | PORT REQUESTED EXTERNALLY:    30303                                   |
        | (IPv4 only)                                                           |
        -------------------------------------------------------------------------
        | ⊠ Enable sharing                                                      |
        -------------------------------------------------------------------------
        | IPV4 ADDRESS IN THE INTERNET: <internet-ip-address>                   |
        | PORT ASSIGNED EXTERNALLY:     30303   THROUGH PORT:       3030        |
        -------------------------------------------------------------------------
2 ---
        -------------------------------------------------------------------------
        | NAME:                         beacon-sync-13000                       |
        | PROTOCOL:                     TCP                                     |
        | PORT TO DEVICE:               13000   THROUGH PORT:       13000       |
        | PORT REQUESTED EXTERNALLY:    13000                                   |
        | (IPv4 only)                                                           |
        -------------------------------------------------------------------------
        | ⊠ Enable sharing                                                      |
        -------------------------------------------------------------------------
        | IPV4 ADDRESS IN THE INTERNET: <internet-ip-address>                   |
        | PORT ASSIGNED EXTERNALLY:     13000   THROUGH PORT:       13000       |
        -------------------------------------------------------------------------
3 ---
        -------------------------------------------------------------------------
        | NAME:                         beacon-data-12000                       |
        | PROTOCOL:                     UDP                                     |
        | PORT TO DEVICE:               12000   THROUGH PORT:       12000       |
        | PORT REQUESTED EXTERNALLY:    12000                                   |
        | (IPv4 only)                                                           |
        -------------------------------------------------------------------------
        | ⊠ Enable sharing                                                      |
        -------------------------------------------------------------------------
        | IPV4 ADDRESS IN THE INTERNET: <internet-ip-address>                   |
        | PORT ASSIGNED EXTERNALLY:     12000   THROUGH PORT:       12000       |
        -------------------------------------------------------------------------
4 ---
        -------------------------------------------------------------------------
        | NAME:                         execution-discovery-30303               |
        | PROTOCOL:                     UDP                                     |
        | PORT TO DEVICE:               30303   THROUGH PORT:       3030        |
        | PORT REQUESTED EXTERNALLY:    30303                                   |
        | (IPv4 only)                                                           |
        -------------------------------------------------------------------------
        | ⊠ Enable sharing                                                      |
        -------------------------------------------------------------------------
        | IPV4 ADDRESS IN THE INTERNET: <internet-ip-address>                   |
        | PORT ASSIGNED EXTERNALLY:     30303   THROUGH PORT:       3030        |
        -------------------------------------------------------------------------
```

### 6.7.6 Apply and Save

Once you've filled out all fields, save the new rule. You will be asked to apply changes, which might take a few seconds until it takes effect.

> **Note**: Some routers may require a reboot to apply the changes.

After the rules were applied, check back to your port sharing screen of the router. You should find a list with the newly added rules to verify your previous step. On my end, the list looks like this:

```text
PORT SHARING DEVICE SCREEN

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| DEVICE / NAME      | IP ADDRESS          | SHARING                           | PORT ASSIGNED EXTERNALLY IPV4 | PORT ASSIGNED EXTERNALLY IPC6 | INDIPENDENT PORT SHARING |
|--------------------|---------------------|-----------------------------------|-------------------------------|-------------------------------|--------------------------|
| <node-device-name> | <node-ip-address>   | active: execution-data-30303      | 30303                         |                               | □                        |
|                    | <ipv6-interface-id> | active: beacon-sync-13000         | 13000                         |                               | 0 enabled                |
|                    |                     | active: beacon-data-12000         | 12000                         |                               |                          |
|                    |                     | active: execution-discovery-30303 | 30303                         |                               |                          |
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

PORT SHARING RULES SCREEN

---------------------------------------------------------------------------------------------------------
| STATUS | NAME                      | PROTOCOL | IP ADDRESS IN THE INTERNET | PORT ASSIGNED EXTERNALLY |
|--------|---------------------------|----------|----------------------------|--------------------------|
| active | execution-data-30303      | TCP      | <internet-ip-address>      | 30303                    |
| active | beacon-sync-13000         | TCP      | <internet-ip-address>      | 13000                    |
| active | beacon-data-12000         | UDP      | <internet-ip-address>      | 12000                    |
| active | execution-discovery-30303 | UDP      | <internet-ip-address>      | 30303                    |
---------------------------------------------------------------------------------------------------------
```

**After we opened all required ports, we're able to set up and sync the blockchain clients.**

---
sidebar_label: "6.2 Router Port Arrangement"
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 6.2 Router Port Arrangement

To expose your node’s open ports to the internet, you must forward them on your home router. This allows external peers to connect through your network’s public IP and reach your node’s static IP and ports.

:::tip

Additionally to opening the router ports, you must configure the [**Firewall Settings**](./firewall-settings.md) of your node to allow data throughput.

:::

:::info

You will have to know both **IP** and **MAC** addresses from the [**Router Setup**](/docs/guides/router-setup/address-checkup) to identify your node while configuring the router.

:::

## 1. Log into the Router

In a browser, navigate to your router’s admin interface and log into your router's dashboard with its admin credentials.

:::info

The following steps are performed on your 💻 **personal computer**.

:::

:::note

Router interfaces are typically located at [`192.168.0.1`](https://192.168.0.1/), [`192.168.1.1`](https://192.168.1.1/) or [`192.168.178.1`](http://192.168.178.1/).

:::

## 2. Add Port Forwarding Rules

**2.1 Navigate to Port Forwarding**: _In your router's web interface, navigate to the firewall or port forwarding settings._

:::note Fritzbox Router

Navigate to `Internet` > `Permit Access` > `Port Sharing`

:::

**2.2 Select the Device**: _Select or configure your node device to create new port forwarding rules._

:::note Fritzbox Router

`Port Sharing` > `Add Device for Sharing`

:::

```text
---------------------------------------------------------------------------------
| DEVICE:               <device-name>                                           |
| IPV4 ADDRESS:         <ip-address>                                            |
| MAC ADDRESS:          <mac-address>                                           |
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
```

:::info

The `<device-name>`, `<ip-address>`, `<mac-address>`, and `<ipv6-interface-id>` will reflect your node's properies.

:::

**2.3 Add Execution Port Forwarding Rules**: _Set multiple port access rules for UDP and TCP connections._

```text
RULE 1
        -------------------------------------------------------------------------
        | NAME:                         execution-tcp-30303                     |
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
```

```text
RULE 2
        -------------------------------------------------------------------------
        | NAME:                         execution-udp-30303                     |
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

<details>
    <summary>Full Property Explanation</summary>

| **Setting**    | **Description**                                                       |
| -------------- | --------------------------------------------------------------------- |
| Service Name   | A label to categorize and find the forwarding rule.                   |
| External Port  | The port number for incoming traffic.                                 |
| Port to Device | Port on your device to handle traffic, usually same as external port. |
| Protocol       | Indicator if the network protocol is TCP, UDP, or both.               |

</details>

**2.4 Add Consensus Port Forwarding Rules**: _Set multiple port access rules for UDP and TCP connections._

<Tabs>
<TabItem value="execution" label="Lighthouse, Teku, or Nimbus-Eth2">

```text
RULE 3
        -------------------------------------------------------------------------
        | NAME:                         consensus-tcp-9000                      |
        | PROTOCOL:                     TCP                                     |
        | PORT TO DEVICE:               9000   THROUGH PORT:       9000         |
        | PORT REQUESTED EXTERNALLY:    9000                                    |
        | (IPv4 only)                                                           |
        -------------------------------------------------------------------------
        | ⊠ Enable sharing                                                      |
        -------------------------------------------------------------------------
        | IPV4 ADDRESS IN THE INTERNET: <internet-ip-address>                   |
        | PORT ASSIGNED EXTERNALLY:     9000   THROUGH PORT:       9000         |
        -------------------------------------------------------------------------
```

```text
RULE 4
        -------------------------------------------------------------------------
        | NAME:                         consensus-udp-9000                      |
        | PROTOCOL:                     UDP                                     |
        | PORT TO DEVICE:               9000   THROUGH PORT:       9000         |
        | PORT REQUESTED EXTERNALLY:    9000                                    |
        | (IPv4 only)                                                           |
        -------------------------------------------------------------------------
        | ⊠ Enable sharing                                                      |
        -------------------------------------------------------------------------
        | IPV4 ADDRESS IN THE INTERNET: <internet-ip-address>                   |
        | PORT ASSIGNED EXTERNALLY:     9000   THROUGH PORT:       9000         |
        -------------------------------------------------------------------------
```

</TabItem> 
<TabItem value="prysm" label="Prysm">

```text
RULE 3
        -------------------------------------------------------------------------
        | NAME:                         consensus-tcp-13000                     |
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
```

```text
RULE 4
        -------------------------------------------------------------------------
        | NAME:                         consensus-udp-12000                     |
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
```

</TabItem> 
</Tabs>

<details>
    <summary>Full Property Explanation</summary>

| **Setting**    | **Description**                                                       |
| -------------- | --------------------------------------------------------------------- |
| Service Name   | A label to categorize and find the forwarding rule.                   |
| External Port  | The port number for incoming traffic.                                 |
| Port to Device | Port on your device to handle traffic, usually same as external port. |
| Protocol       | Indicator if the network protocol is TCP, UDP, or both.               |

</details>

**2.5 Apply Forwarding Rules**: _Save each rule and apply changes._

## 3. Verify Open Ports

Check back to your port sharing screen of the router to find a list with all added rules.

<Tabs>
<TabItem value="execution" label="Execution Client + Lighthouse, Teku, or Nimbus-Eth2">

```text
DEVICE SCREEN

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| DEVICE / NAME      | IP ADDRESS          | SHARING                           | PORT ASSIGNED EXTERNALLY IPV4 | PORT ASSIGNED EXTERNALLY IPC6 | INDIPENDENT PORT SHARING |
|--------------------|---------------------|-----------------------------------|-------------------------------|-------------------------------|--------------------------|
| <device-name>      | <ip-address>        | active: execution-tcp-30303       | 30303                         |                               | □                        |
|                    | <ipv6-interface-id> | active: consensus-tcp-9000        | 9000                          |                               | 0 enabled                |
|                    |                     | active: consensus-udp-9000        | 9000                          |                               |                          |
|                    |                     | active: execution-udp-30303       | 30303                         |                               |                          |
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

```text
PORT RULES SCREEN

---------------------------------------------------------------------------------------------------------
| STATUS | NAME                      | PROTOCOL | IP ADDRESS IN THE INTERNET | PORT ASSIGNED EXTERNALLY |
|--------|---------------------------|----------|----------------------------|--------------------------|
| active | execution-tcp-30303       | TCP      | <internet-ip-address>      | 30303                    |
| active | consensus-tcp-9000        | TCP      | <internet-ip-address>      | 9000                     |
| active | consensus-udp-9000        | UDP      | <internet-ip-address>      | 9000                     |
| active | execution-udp-30303       | UDP      | <internet-ip-address>      | 30303                    |
---------------------------------------------------------------------------------------------------------
```

</TabItem> 
<TabItem value="prysm" label="Execution Client + Prysm">

```text
DEVICE SCREEN

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| DEVICE / NAME      | IP ADDRESS          | SHARING                           | PORT ASSIGNED EXTERNALLY IPV4 | PORT ASSIGNED EXTERNALLY IPC6 | INDIPENDENT PORT SHARING |
|--------------------|---------------------|-----------------------------------|-------------------------------|-------------------------------|--------------------------|
| <device-name>      | <ip-address>        | active: execution-tcp-30303       | 30303                         |                               | □                        |
|                    | <ipv6-interface-id> | active: consensus-tcp-13000       | 13000                         |                               | 0 enabled                |
|                    |                     | active: consensus-udp-12000       | 12000                         |                               |                          |
|                    |                     | active: execution-udp-30303       | 30303                         |                               |                          |
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

```text
PORT RULES SCREEN

---------------------------------------------------------------------------------------------------------
| STATUS | NAME                      | PROTOCOL | IP ADDRESS IN THE INTERNET | PORT ASSIGNED EXTERNALLY |
|--------|---------------------------|----------|----------------------------|--------------------------|
| active | execution-tcp-30303       | TCP      | <internet-ip-address>      | 30303                    |
| active | consensus-tcp-13000       | TCP      | <internet-ip-address>      | 13000                    |
| active | consensus-udp-12000       | UDP      | <internet-ip-address>      | 12000                    |
| active | execution-udp-30303       | UDP      | <internet-ip-address>      | 30303                    |
---------------------------------------------------------------------------------------------------------
```

</TabItem> 
</Tabs>

:::info

It might take a few seconds until port sharing rules are applied, some routers even require a reboot.

:::

---
sidebar_label: "8.8 Dashboard Configuration"
sidebar_position: 8
---

# 8.8 Dashboard Configuration

:::danger

This page is currently under maintenance reworked and contains outdated content.

:::

The following section will configure the Grafana Dashboard after all exporter services and the Grafana Server are up and running on the node.

## 1. Get Node IP Address

If you opened the port as stated within the [Core Tools](#) section of the guide, you would now have access to the web interface.

<!--TODO: ./01-core-tools.md-->

Fetch your node's IP address so you can use it on your machine as it is described within the [Address Check](#) section of the guide:

<!--TODO: /4-router-config/01-address-check.md-->

```sh
ip route show default
```

The output will look like this:

```sh
default via <GATEWAY_IP_ADDRESS> dev eno1 proto dhcp src <NODE_IP_ADDRESS> metric <ROUTING_WEIGHT>
```

Alternatively, you can request a commonly used and stable server IP, for instance, Google. You will receive a response with your source IP address that you can filter using the text-processing tool `awk`, used for pattern scanning and processing.

```sh
ip route get 8.8.8.8 | awk '{print $7}'
```

Log out of your node and continue using your personal computer's browser.

```sh
exit
```

## 2. Web Interface

Open your browser at the following address. Make sure to use the node IP you gathered in the previous step.

```text
http://<static-node-ip>:3000
```

The default credentials will be the following:

```text
DEFAULT CREDENTIALS
-------------------
username: admin
password: admin
```

Set a new secure and long password when prompted by Grafana. Security is vital as this page might be accessed through the external internet later so that you can access it from everywhere.

## 3. Add Prometheus Data Source

Now we have to add the running Prometheus service to the Grafana Dashboard to utilize all the significant metrics we collected from all the Prometheus jobs we've set up.

1. Open the burger menu icon on the left side
2. Click `Connections`
3. Clic `Data sources`
4. Click the `Add Data Source` button
5. Click the Prometheus card on screen
6. Enter `http://127.0.0.1:9090/` as URL
7. Click `Save & Test` before continuing with the setup

> You should see a green checkmark "Data source is working" and can continue to import the dashboard.

## 4. Import Dashboard

Choose a dashboard preset you want to load for the LUKSO mainnet and testnet. Within this guide, there are two main templates:

- [LUKSO Dashboard EUR](/grafana/lukso-dashboard-eur.json)
- [LUKSO Dashboard USD](/grafana/lukso-dashboard-usd.json)

> Make sure the file matches with the [JSON Exporter](#) External Data Configuration file. You could also specify your dashboard by adjusting the contents and jobs.

<!--TODO: ./03-json-exporter.md-->

1. Copy the raw contents of the file you want
2. Return to the Grafana starting page
3. Click the plus icon on the top right
4. Click on `Import dashboard`
5. Paste the raw contents to the `Import via panel json` text box
6. Click the `Load` button
7. Click the `Import` button

You now have your dashboard up and running.

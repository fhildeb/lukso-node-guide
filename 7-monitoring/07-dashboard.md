## 7.7 Dashboard Setup

The following section will configure the Grafana Dashboard after all exporter services and the Grafana Server are up and running on the node.

### 7.7.1 Get Node IP Address

If you opened the port as stated within the [Core Tools](./01-core-tools.md) section of the guide, you would now have access to the web interface.

Fetch your node's IP address so you can use it on your machine as it is described within the [Address Check](/4-router-config/01-address-check.md) section of the guide:

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

### 7.7.2 Web Interface

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

### 7.7.3 Add Prometheus Data Source

Now we have to add the running Prometheus service to the Grafana Dashboard to utilize all the significant metrics we collected from all the Prometheus jobs we've set up.

1. Open the burger menu icon on the left side
2. Click `Connections`
3. Clic `Data sources`
4. Click the `Add Data Source` button
5. Click the Prometheus card on screen
6. Enter `http://127.0.0.1:9090/` as URL
7. Click `Save & Test` before continuing with the setup

> You should see a green checkmark "Data source is working" and can continue to import the dashboard.

### 7.7.4 Import Dashboard

Choose a dashboard preset you want to load for the LUKSO mainnet and testnet. Within this guide, there are two main templates:

#### Grafana 8 Boards

These are the default but depricated Grafana boards that are still working in later versions, however, there might be hickups with alerts and notifications.

- [LUKSO Dashboard EUR V8](/grafana/lukso-dashboard-eur.json)
- [LUKSO Dashboard USD V8](/grafana/lukso-dashboard-usd.json)

#### Grafana 9 (current)

These are the current Grafana board that have all alerts set up the right way by default. They only work for Grafana Version 9 onwards, as there are new types and structures regarding notifications and alerts. Dont worry, the frontend still looks the same.

- [LUKSO Dashboard EUR V9](/grafana/lukso-grafana-9-eur.json)
- [LUKSO Dashboard USD V9](/grafana/lukso-grafana-9-usd.json)

> Make sure the file matches with the [JSON Exporter](./03-json-exporter.md) External Data Configuration file. You could also specify your dashboard by adjusting the contents and jobs.

1. Copy the raw contents of the file you want
2. Return to the Grafana starting page
3. Click the plus icon on the top right
4. Click on `Import dashboard`
5. Paste the raw contents to the `Import via panel json` text box
6. Click the `Load` button
7. Click the `Import` button

You now have your dashboard up and running.

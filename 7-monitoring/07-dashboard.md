## 7.7 Dashboard Setup

The next section will configure the Grafana Dashboard.

### 7.7.1 Get Node IP Address

If you opened the port as stated within the [Core Tools](./01-core-tools.md) section of the guide, you will now have access to the web interface.

Fetch your node's IP address so you can use it on your personal machine as it is described within the [Address Check](/4-router-config/01-address-check.md) section of the guide:

```sh
ip route show default
```

The output will look like this:

```sh
default via <GATEWAY_IP_ADDRESS> dev eno1 proto dhcp src <NODE_IP_ADDRESS> metric <ROUTING_WEIGHT>
```

Alternatively you can also send an request to a commonly used and stable server IP, for instance Google. You will get back an response with your source IP address that you can filter using the text-processing tool `awk`, used for pattern scanning and processing.

```sh
ip route get 8.8.8.8 | awk '{print $7}'
```

Log out of your node and continue using your personal machine's webbrowser.

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

Set a new secure and long password when prompted by Grafana. This is important as this page might be accessed through the external internet in later steps so you can access it from everywhere.

### 7.7.3 Add Prometheus Data Source

Now we have to add the running Prometheus service to the Grafana Dashboard so we can utilize all the great metrics we collected over from all the Prometheus jobs we've set up.

1. On the left-hand menu, hover over the gear menu
2. Click on the `Data Sources` popup
3. Click the `Add Data Source` button
4. Hover over the Prometheus card on screen
5. Click the `Select` button
6. Enter `http://127.0.0.1:9090/` as URL
7. Click `Save & Test` before continuing with the setup

### 7.7.4 Import Dashboard

Chose a dashboard preset you want to load for the LUKSO mainnet and testnet. Within this guide there are two main templates:

- [LUKSO Dashboard EUR](/grafana/lukso-dashboard-eur.json)
- [LUKSO Dashboard USD](/grafana/lukso-dashboard-eur.json)

> Make sure the file matches with the [JSON Exporter](./03-json-exporter.md) External Data Configuration file. You could also specify your own dashboard by adjusting the contents and jobs.

1. Copy the raw contents of the file you want
2. Return to the Grafana page within your web browser
3. Click the plus icon on the top right
4. Click on `Import`
5. Paste in the raw contents to the `Import via panel json` text box
6. Click the `Load` button
7. Click the `Import` button

You should now have your Dashboard set up and running.

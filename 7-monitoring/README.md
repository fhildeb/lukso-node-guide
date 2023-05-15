# 7. Node Monitoring

This section of the blockchain node guide provides a comprehensive overview of the monitoring process. It features the use of various tools like Node Exporter, JSON Exporter, Blackbox Exporter, Prometheus, Promtool, and Grafana for tasks such as hardware monitoring, web scraping, network checks, real-time monitoring, and data visualization.

1. [Core Tools and Open Ports](./01-core-tools.md)
2. [Hardware Monitoring: Node Exporter](./02-node-exporter.md)
3. [Web Scraping: JSON Exporter](./03-json-exporter.md)
4. [Network Checks: Blackbox Exporter](./04-blackbox-exporter.md)
5. [Prometheus and Promtool Monitoring](./05-prometheus.md)
6. [Using Grafana Dashboards](./06-grafana.md)

Personal TODO:

### Grafana

#### Configure Dashboard

Login to grafana by navigating to webrowser `http://192.168.86.29:3000`. Replace `192.168.86.29` with IP of your node machine. This is same IP used to ssh.

Default credentials are username and password `admin`. Set a new secure (long) password when prompted by grafana.

##### Data Source

1. On the left-hand menu, hover over the gear menu and click on `Data Sources`
2. Then click on the Add Data Source button
3. Hover over the Prometheus card on screen, then click on the Select button
4. Enter http://127.0.0.1:9090/ into the URL field, then click Save & Test

##### Install Dashboard

1. Hover over the plus symbol icon in the left-hand menu, then click on Import
2. Copy and paste [the dashboard](/grafana/dashboard.json) into the `Import via panel json` text box on the screen
3. Then click the Load button
4. Then click the Import button

##### Enable Alerts

1. On the left-hand menu, hover over the alarm menue and click on `Notification channels`
2. Click on `New channel`
3. Select `Type` and [configure](https://grafana.com/docs/grafana/latest/alerting/old-alerting/notifications/)

On lukso dashboard:

1. Scroll down on a dashboard to `Alerts` section
2. Select each alert and click `Edit`
3. In `Alert` tab, select notifications `send to`
4. Save and repeat for each alert

---
sidebar_label: "9.3 Image Rendering"
sidebar_position: 3
---

# 9.3 Image Rendering

## 8.2 Enable Image Alerts

### 8.2.1 Install Grafana Image Renderer

If you want pictures or graphs added to your regular notifications, you can install the Grafana Image Renderer. It can be installed via the built-in Grafana CLI:

```sh
sudo grafana-cli plugins install grafana-image-renderer
```

Afterward, restart Grafana for the dependency to show up:

```sh
sudo systemctl restart grafana-server
```

Check the status of the Grafana Server:

```sh
# Check status
systemctl status grafana-server
```

The output should look similar to this:

```text
● grafana-server.service - Grafana instance
     Loaded: loaded (/lib/systemd/system/grafana-server.service; enabled; vendo>
     Active: active (running) since [DATE] UTC; [TIME] ago
       Docs: http://docs.grafana.org
   Main PID: 28472 (grafana)
      Tasks: 30 (limit: 38043)
     Memory: 150.4M
        CPU: 6min 59.027s
     CGroup: /system.slice/grafana-server.service
             ├─28472 /usr/share/grafana/bin/grafana server --config=/etc/grafan>
             └─28490 /var/lib/grafana/plugins/grafana-image-renderer/plugin_sta>

[DATE] [TIME] [USER] grafana-server[28472]: logger=context userId=1 orgI>...
...
```

> **WARNING**: The following section is still Work in Progress for Grafana 9, as windows and settings have changed in terms of names, behavior, and placement.

### 8.2.2 Apply Notification Settings

After Grafana is up and running again, go to the Grafana webpage.

1. Click on the notification icon on the left menu bar.
2. Move to the `notification channels` on the second tab.
3. Open your node's notification channel.
4. Activate image rendering by enabling `Include Image`.
5. Click the `Save` button.

From now on, all notifications you've set up will automatically send graphs.

### 8.2.3 Enable Continuous Notifications

Within the notification dashboard of the node, you can also activate `send reminders`. Alert reminders are sent after notification rules are evaluated and a certain amount of time has passed.

By setting it to 1h, you will get a notification every hour if a critical error or status has not changed. Continuous notification behavior is helpful if you want regular node status reports.

#### 8.2.4 Permanent Alerts

After enabling it on the notification dashboard, you could head over to your node's dashboard and clone or create a new notification. For it to show permanent notifications at a constant rate, you can set a metric so high that it is never supposed to be reached. For instance: If you want hourly updates on the participation rate, you can select the alert for under 100% participation. In this case, you would get a graph of the network participation once an hour.

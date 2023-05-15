# Node Telegram Notifications

TODO:

## Setting up the Telegram Bot

Set up the telegram bot as described within the [Luksoverse Notification Guide by Rob](https://docs.luksoverse.io/docs/the-guide/monitoring/#56---enable-alerts). It also features descriptions on how to embed the bot within your Grafana server.

## Enable Image Alerts

If you want pictures or graphs added to your regular notifications, you can install the Grafana Image Renderer. It can be installed via the built-in Grafana CLI and the Grafana Server just needs a restart for it to show up.

```bash
# Install image renderer
grafana-cli plugins install grafana-image-renderer

# Restart Grafana
systemctl restart grafana-server

# Check status
systemctl status grafana-server
```

After Grafana is up and running again, go to the Grafana webpage, click on the notification icon on the left menu bar and move to the `notification channels` on the second tab in the middle of the page.

1. Open the notification channel of your LUKSO node
2. Activate image rendering by enabling `Include Image`
3. Save the options

All notifications you've set up will automatically send graphs along the way.

## Enable Constant Notifications

Within the notification dashboard of the node, you can also activate `send reminders`. Alert reminders are sent after notification rules are evaluated and a certain amount of time has passed.

By setting it to 1h, you will get a notification every hour if a critical error or status has still not changed. This is helpful if you want constant notifications of the node status.

### Permanent Alerts

After enabling it on the notification dashboard, you could head over to your node's dashboard and clone or create a new notification. For it to show permanent notifications at a constant rate, you can set a metric so high that is never supposed to be reached. For instance: If you want hourly updates on the participation rate, you can set the alert for under 100% participation. In this case, you would get a graph of the network participation once an hour.

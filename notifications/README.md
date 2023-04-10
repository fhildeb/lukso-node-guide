# Node Telegram Notifications

## Setting up the Telegram Bot

Set up the telegram bot as described within the [Luksoverse Notification Guide by Rob](https://docs.luksoverse.io/docs/the-guide/monitoring/#56---enable-alerts). It also features descriptions on how to embed the bot within your Grafana server.

## Add Image Rendering

Back on your node, install the Grafana Image Renderer and restart Grafana afterwards.

```bash
grafana-cli plugins install grafana-image-renderer

# Check status
sudo systemctl status grafana-server
sudo systemctl restart grafana-server
```

## Enable Image Rendering

1. Go to Notifications on the left menu bar
2. Click `notification channels` on the second tab in the middle of the page
3. Open the LUKSO notification channel
4. Enable `Include Image`
5. Save Options

## Enable Constant Notifications

Within the notification dashboard, you can enable `send reminders` after a certain time. Alert reminders are sent after rules are evaluated. By setting it to 1h, you will get a notification every hour if a critical error or status has still not changed. This is helpful if you want constant notifications of what the node status is.

After setting it up and saving, you can head over to your dashboard and clone or create a new notification. For it to show up constantly, you can set a metric that is never supposed to be reached. If you want hourly updates on the participation rate, you can set the alert to under 100%. Then, you will get a graph of the network participation once an hour using the reminder functionality.

## 8.1 Enable Alerts

Grafana can send alerts through various channels, such as Discord, Telegram, or Email when unregular behavior in metrics or reading from Prometheus is recognized. The following will guide will configure Grafana notifications for Telegram.

> It is convenient to temporarily open a text editor to store information needed for these steps.

### 8.1.1 Create Telegram Bot

> You need a [Telegram](https://telegram.org/) account in order to continue.

1. Open the web-based or Desktop version of Telegram.
2. Click on this link https://t.me/botfather and allow the BotFather application to open Telegram.
3. A BotFather channel will open.
4. Type `/newbot` in the message line
5. Send off the message
6. Choose a full name for your bot.
7. Choose a user name for your bot. The name must end with `bot`
8. A message will appear with information about your bot.
9. Highlight and copy the API token, then paste it into your text editor.

### 8.1.2 Create a Group

1. Open the Telegram menu.
2. Set up a new group.
3. Choose a name for the group.
4. Add your bot to the group by typing the exact _username_
5. Select the user when it appears in the list and click `create`
6. Send a message `/my_id` to trigger the API refresh
7. Copy `https://api.telegram.org/bot<your-bot-api-token>/getUpdates` to a text document.
8. Replace `<your-bot-api-token>` with your token ID of the bot

### 8.1.3 Fetching the Chat ID

1. Copy the link you just edited into a web browser.
2. Look for text that says `{"id"}:`
3. Copy and paste the `id` into your notes.

> Ensure your Chat ID is fully copied. It might have a `-` in front.

### 8.1.4 Add Telegram Contact Points

1. Return to Grafana
2. Login using your credentials
3. On the left-hand menu, click `Alerting`
4. Click the `Contact Points` on the left side
5. Click `Add contact point`
6. Click on `Add channel`
7. Fill in the following information:

   - `Name`: Your Notification Channel Name
   - `Integration:` Telegram
   - `BOT API Token:` Your copied BOT API Token
   - `Chat ID:` The copied Chat ID

8. Click `Test` within the Integration Panel.
9. Wait until you see a new message in Telegram.
10. Click `Save contact point`.

### 8.1.5 Update Notification Policies

1. On the left-hand menu, click `Alerting`
2. Click the `Notification policies` on the left side
3. On the right of the default notification, click the 3-dot-menu and chose `Edit`
4. Change `Default contact point` to Telegram's Contact Point
5. Click `Update default policy`

### 8.1.6 Add Notifications to Metrics

1. Click the Granfana Icon to get to the landing page.
2. Click the LUKSO Dashboard.
3. Scroll down to the dashboard's `Alerts` section.
4. Select each alert and click `Edit` on the 3-dot-menu.
5. Within the `Alert` tab, select `Create alert rule from this panel` if you do not already see a alert panel on the page that you can click on. Do not worry if you need to create it first, as this is the default behavior since you will have to create folders and groups first.
6. Click `Preview` to print out the graph to evaluate metric numbers.
7. Adjust the Graph to be a `Time series` if the metric shows an outdated warning.
8. Adjust the `Threshold` section to your likings on when the alert should happen.
9. Within the `Alert evaluation behavior` section, add a `node-alerts` folder where all the alert data will be stored. If it is already existing, select it from the panel. You can change the name of the folder of your likings, it is just to group alert's data. Its recommended to always choose the same name for one network, node or validator, so you do not mix up various targets and dashboards.
10. Within the `Evaluation group` selection, add a `node-group`. If it is already existing, select it from the panel. You can change the name of the group of your likings, it is just to group alert's data. Its recommended to always choose the same name for one network, node or validator, so you do not mix up various targets and dashboards.
11. Scroll up and click `Save`
12. Repeat this for every Alert on the Dashboard.

> The node will now notify you if some process is down.

### 8.1.7 Metrics Presets

![Grafana Alert Board](/img/grafana-alerts-1.png)

Here are some example metrics that are included in the default dashboard. You can check the picures and validate if everything is configured the same way as in the guide.

#### Process Down

![Process Down Metric](/img/grafana-alerts-2.png)

```text
up{job="consensus-client-job"}
```

#### Below 40 Peers

![Below 40 Peers Metric](/img/grafana-alerts-3.png)

```text
p2p_peer_count{state="Connected",job="consensus-client-job"}
```

#### Process Restarted

![Process Restarted Metric](/img/grafana-alerts-4.png)

```text
(time()-process_start_time_seconds{job="consensus-client-job"})/3600
```

#### 50 Slots Behind

![50 Slots Behind Metric](/img/grafana-alerts-5.png)

```text
beacon_clock_time_slot-beacon_head_slot
```

#### Hourly Earning at Zero

![Hourly Earning at Zero Metric](/img/grafana-alerts-6.png)

```text
sum(validator_balance) - sum(validator_balance offset 1h) - count(validator_balance > 16)*32 + count(validator_balance offset 1h > 0)*32
```

#### Less Than 2GB Free Memory

![Less Than 2GB Free Memory Metric](/img/grafana-alerts-7.png)

```text
(node_memory_MemFree_bytes{job="node-exporter-job"} or node_memory_MemFree{job="node-exporter-job"}) + (node_memory_Cached_bytes{job="node-exporter-job"} or node_memory_Cached{job="node-exporter-job"})
```

#### CPU Usage above 40%

![CPU Usage above 40% Metric](/img/grafana-alerts-8.png)

```text
sum(irate(node_cpu_seconds_total{mode="user",job="node-exporter-job"}[5m])) or sum(irate(node_cpu{mode="user",job="node-exporter-job"}[5m]))
```

#### Disk Usage above 60%

![Disk Usage above 60% Metric](/img/grafana-alerts-9.png)

```text
(sum(node_filesystem_size_bytes{job="node-exporter-job"})-sum(node_filesystem_avail_bytes{job="node-exporter-job"}))/sum(node_filesystem_size_bytes{job="node-exporter-job"})
```

#### CPU Temperature above 55 °C

![CPU Temperature above 55 °C Metric](/img/grafana-alerts-10.png)

```text
node_hwmon_temp_celsius{chip="platform_coretemp_0",job="node-exporter-job",sensor="temp1"}
```

#### Google Ping above 10ms

![Google Ping above 10ms Metric](/img/grafana-alerts-11.png)

```text
probe_duration_seconds{job="google-ping-job"}
```

#### Participation Rate below 80%

![Participation Rate below 80% Metric](/img/grafana-alerts-12.png)

```text
beacon_prev_epoch_target_gwei/beacon_prev_epoch_active_gwei*100
```

### 8.1.8 Configuring Notfication Intervals

1. Head over to the `Alerting` section on the left menu.
2. Click on `Notification policies`.
3. Click the 3-dot-menu on the default notification channel.
4. Choose `Edit` within the popup.
5. Expand the `Timing Options` field

The window should look similar to this one, to send one notification every 5 minutes and refresh existing errors every 10 minutes. Grafana 9 will also send you and `resolved` message if the alarm is not present anymore.

![Grafana Alert Interval](/img/grafana-alerts-13.png)

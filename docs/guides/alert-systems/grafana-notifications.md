---
sidebar_label: "9.2 Grafana Notifications"
sidebar_position: 2
description: "Set up Grafana alerts to monitor your LUKSO node in real-time. Learn how to create custom metrics, configure thresholds, and receive Telegram, email, or Discord notifications for validator performance and uptime."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 9.2 Grafana Notifications

Grafana Notifications allow you to monitor the health of your node and its components in real-time. By configuring alerts for critical metrics, you can proactively resolve issues before they impact performance or security. Once a notification channel like [Telegram](/docs/guides/alert-systems/telegram-bot.md), Discord or E-Mail has been set up, you will be able to configure custom rules on when the [Grafana Dashboard](/docs/guides/monitoring/dashboard-configuration.md) sends messages based on gathered metrics.

:::tip

This guide uses the default Grafana 📝 [**Templates**](/templates) to configure notification behaviour.

:::

:::info

The following steps are performed on your 💻 **personal computer**.

:::

## 1. Add Notifications

To be notified once some process is down or something is off, you will have to create notifications for every metric.

1. Click the Granfana Icon to get to the **Landing Page** and select the **LUKSO Dashboard** from the list.
2. Scroll down to the dashboard's **Alerts** section, select an alert, and click **Edit** on the **3-Dot-Menu** on the right side.
3. Within the **Alert** tab, select **Create Alert Rule from this Panel** to open up a new window.
4. Click **Preview** to print out the graph and adjust the **Threshold** section to your likings on when the alert should happen.
5. In case the **Reduce** section is showing **NaN**, **Replace Non-numeric Values** with a custom number above the alert range.
6. For metrics that rely on the network, its recommended to set a **NaN** value, so it triggers when the network is down.
7. Within the **Alert Evaluation Behavior** section, add a **node-alerts** folder where all the alert data will be stored.
8. Within the **Evaluation Group** selection, add a **node-group** or select it from the panel.
9. Its recommended to always choose the same alert folder and group for one node, so you do not mix up any targets.
10. Scroll up and click **Save** to enable this alert for the specific metric.

:::info

The steps need to be repeated for every Alert on the Grafana Dashboard you want to receive notifications for.

:::

## 2. Set Metrics Presets

This section outlines every alert setup from the default dashboard. You can check the picures and validate your configurations.

:::tip

Below metric presets are based on default Grafana 📝 [**Templates**](/templates). If you used different service job names within the [Prometheus Dataset Configuration](/docs/guides/monitoring/prometheus.md#3-dataset-configuration), you will have to adjust the job names to match your Prometheus installation.

:::

![Grafana Alert Board](/img/guides/alert-systems/grafana-alerts-1.png)

**Alert: Consensus Process Down**

```text
1: Process up
0: Process down
```

![Consensus Process Down Metric](/img/guides/alert-systems/grafana-alerts-2.png)

<Tabs groupId="client">
<TabItem value="lighthouse-prysm-teku" label="Lighthouse, Prysm, Teku">

```text
up{job="consensus-client-job"}
```

</TabItem><TabItem value="nimbus" label="Nimbus-Eth2">

```text
up{job="beacon-client-job"}
```

</TabItem> 
</Tabs>

**Alert: Validator Process Down**

```text
1: Process up
0: Process down
```

![Validator Process Down Metric](/img/guides/alert-systems/grafana-alerts-3.png)

<Tabs groupId="client">
<TabItem value="lighthouse-prysm-teku" label="Lighthouse, Prysm, Teku">

```text
up{job="validator-client-job"}
```

</TabItem>
</Tabs>

:::warning

The **Validator Proccess Down Alert** does not exist for **Nimbus-Eth2**, as it uses a single **Beacon Proccess**.

:::

**Alert: Consensus Process Restarted**

```text
1:   Process up
0:   Process down
NaN: Not available (likely down --> 0)
```

![Consensus Process Restarted Metric](/img/guides/alert-systems/grafana-alerts-4.png)

<Tabs groupId="client">
<TabItem value="lighthouse-prysm-teku" label="Lighthouse, Prysm, Teku">

```text
(time()-process_start_time_seconds{job="consensus-client-job"})/3600
```

</TabItem><TabItem value="nimbus" label="Nimbus-Eth2">

```text
(time()-process_start_time_seconds{job="beacon-client-job"})/3600
```

</TabItem> 
</Tabs>

**Alert: Validator Process Restarted**

```text
1:   Process up
0:   Process down
NaN: Not available (likely down --> 0)
```

![Validator Process Restarted Metric](/img/guides/alert-systems/grafana-alerts-5.png)

<Tabs groupId="client">
<TabItem value="lighthouse-prysm-teku" label="Lighthouse, Prysm, Teku">

```text
(time()-process_start_time_seconds{job="validator-client-job"})/3600
```

</TabItem>
</Tabs>

:::warning

The **Validator Proccess Restarted Alert** does not exist for **Nimbus-Eth2**, as it uses a single **Beacon Proccess**.

:::

**Alert: Below 40 Peers**

```text
above 30: Ideal healthy connections
below 30: Resyncing or weak connections
NaN:      Not available (no connections --> 0)
```

![Below 40 Peers Metric](/img/guides/alert-systems/grafana-alerts-6.png)

<Tabs groupId="client">
<TabItem value="lighthouse-prysm" label="Lighthouse & Prysm">

```text
p2p_peer_count{state="Connected",job="consensus-client-job"}
```

</TabItem><TabItem value="teku" label="Teku">

```text
libp2p_peers{job="consensus-client-job"}
```

</TabItem><TabItem value="nimbus" label="Nimbus-Eth2">

```text
connected_libp2p_peers{job="beacon-client-job"}
```

</TabItem> 
</Tabs>

**Alert: Participation Rate below 80%**

```text
above 80: Ideal healthy network
below 80: Unstable network
NaN:      2nd data feed (ignore metric --> 100)
```

![Participation Rate below 80% Metric](/img/guides/alert-systems/grafana-alerts-7.png)

<Tabs groupId="client">
<TabItem value="lighthouse-prysm-teku" label="Lighthouse, Prysm, Teku">

```text
(beacon_prev_epoch_target_gwei{job="consensus-client-job"} / beacon_prev_epoch_active_gwei{job="consensus-client-job"}) *100
```

</TabItem><TabItem value="teku-nimbus" label="Nimbus-Eth2">

```text
(beacon_prev_epoch_target_gwei{job="beacon-client-job"} / beacon_prev_epoch_active_gwei{job="beacon-client-job"}) *100
```

</TabItem> 
</Tabs>

**Alert: 50 Slots Behind**

```text
below 50: Ideal syncing speed
above 50: Unstable syncing
NaN:      Not available (likely unstable --> 51)
```

![50 Slots Behind Metric](/img/guides/alert-systems/grafana-alerts-8.png)

<Tabs groupId="client">
<TabItem value="prysm-teku" label="Prysm & Teku">

```text
beacon_clock_time_slot{job="consensus-client-job"} - beacon_head_slot{job="consensus-client-job"}
```

</TabItem><TabItem value="lighthouse" label="Lighthouse">

```text
slotclock_present_slot{job="consensus-client-job"} - beacon_head_slot{job="consensus-client-job"}
```

</TabItem><TabItem value="nimbus" label="Nimbus-Eth2">

```text
beacon_clock_time_slot{job="beacon-client-job"} - beacon_head_slot{job="beacon-client-job"}
```

</TabItem> 
</Tabs>

**Alert: No Hourly Earnings**

```text
above 0,0001: Earning rewards
below 0,0001: Syncing or negative rewards
NaN:          Not available (likely negative rewards --> 0)
```

![No Hourly Earnings Metric](/img/guides/alert-systems/grafana-alerts-9.png)

<Tabs groupId="client">
<TabItem value="prysm" label="Prysm">

```text
sum(validator_balance{job="validator-client-job"}) - sum(validator_balance{job="validator-client-job"} offset 1h != 0) - (32 * count(validator_balance{job="validator-client-job"} > 16)) + (32 * count(validator_balance{job="validator-client-job"} offset 1h > 16))
```

</TabItem><TabItem value="lighthouse" label="Lighthouse">

```text
((sum(validator_monitor_balance_gwei{job="validator-client-job"}) - sum(validator_monitor_balance_gwei{job="validator-client-job"} offset 1h != 0)) / 1e9) - (32 * count(validator_monitor_status{job="validator-client-job",status="active_ongoing"})) + (32 * count(validator_monitor_status{job="validator-client-job",status="active_ongoing"} offset 1h))
```

</TabItem><TabItem value="nimbus" label="Nimbus-Eth2">

```text
((sum(validator_monitor_balance_gwei{job="beacon-client-job"}) - sum(validator_monitor_balance_gwei{job="beacon-client-job"} offset 1h != 0)) / 1e9) - 32 * count(validator_monitor_status{job="beacon-client-job",status="active_ongoing"}) + 32 * count(validator_monitor_status{job="beacon-client-job",status="active_ongoing"} offset 1h)
```

</TabItem> 
</Tabs>

:::warning

The **Hourly Earnings Alert** does not exist for **Teku**, as it's client does not expose any **Validator Balance Metrics**.

:::

**Alert: Less than 2GB Free Memory**

```text
above 2000000000: More than 2GB remaining
below 2000000000: Less than 2GB remaining
```

![Less than 2GB Free Memory Metric](/img/guides/alert-systems/grafana-alerts-10.png)

```text
(node_memory_MemFree_bytes{job="node-exporter-job"} or node_memory_MemFree{job="node-exporter-job"}) + (node_memory_Cached_bytes{job="node-exporter-job"} or node_memory_Cached{job="node-exporter-job"})
```

**Alert: CPU Usage above 40%**

```text
above 4: More than 40% of computation resources used
below 4: Less than 40% of computation resources used
```

![CPU Usage above 40% Metric](/img/guides/alert-systems/grafana-alerts-11.png)

```text
sum(irate(node_cpu_seconds_total{mode="user",job="node-exporter-job"}[5m])) or sum(irate(node_cpu{mode="user",job="node-exporter-job"}[5m]))
```

**Alert: Disk Usage above 60%**

```text
above 0,6: Disk more than 60% occupied by tasks
below 0,6: Disk less than 60% occupied by tasks
```

![Disk Usage above 60% Metric](/img/guides/alert-systems/grafana-alerts-12.png)

```text
(sum(node_filesystem_size_bytes{job="node-exporter-job"})-sum(node_filesystem_avail_bytes{job="node-exporter-job"}))/sum(node_filesystem_size_bytes{job="node-exporter-job"})
```

**Alert: CPU Temperature above 75 °C**

```text
above 75: Processor is running hot
below 75: Processor is running normally
```

![CPU Temperature above 75 °C Metric](/img/guides/alert-systems/grafana-alerts-13.png)

```text
node_hwmon_temp_celsius{chip="platform_coretemp_0",job="node-exporter-job",sensor="temp1"}
```

**Alert: Google Ping above 30ms**

```text
above 0,03: Connection takes longer than 30ms, not ideal
below 0,03: Connection takes less than 30ms, everything alright
```

![Google Ping above 30ms Metric](/img/guides/alert-systems/grafana-alerts-14.png)

```text
probe_duration_seconds{job="google-ping-job"}
```

## 3. Configure Intervals

Once an alert is triggered, you can define how frequently the message will be sent out to your notification channel.

1. Navigate to the **Alerting** section on the left menu and click on the **Notification Policies** heading.
2. Select the **3-Dot-Menu** on the default notification channel and choose **Edit** within the popup.
3. Expand the **Timing Options** field to a duration or message frequency of your liking.

![Grafana Alert Interval](/img/guides/alert-systems/grafana-alerts-15.png)

:::info

Besides intervals, Grafana will also send a **Resolved** message once the issue is not present anymore.

:::

## 4. Continuous Notifications

Within the Grafana Dashboard, you can also enable _Alert Reminders_ that send notifications after a certain period of time. Setting it to one hour will send a notification every hour if a critical error or status has not changed yet.

## 5. Permanent Alerts

For a metric to send out permanent notifications, you can clone or create a new alert rule for a metric and define a rule that it is never supposed to be reached, so it permanently triggers. If you want hourly updates on the participation rate, you could select the alert for under 100% participation. In this case, you would constantly get notified about the network participation.

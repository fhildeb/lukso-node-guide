---
sidebar_label: "9.2 Grafana Notifications"
sidebar_position: 2
---

# 9.2 Grafana Notifications

:::danger

This page is currently under maintenance reworked and contains outdated content.

:::

## 1. Add Notifications to Metrics

In order to make sure that the node notifies you if some process is down, follow these steps. If something is unclear, you can have a look at the picture of each alert down below.

> Make sure to get the latest dashboard of this guide, before continuing.

1. Click the Granfana Icon to get to the landing page.
2. Click the LUKSO Dashboard.
3. Scroll down to the dashboard's `Alerts` section.
4. Select each alert and click `Edit` on the 3-dot-menu.
5. Within the `Alert` tab, select `Create alert rule from this panel` if you do not already see a alert panel on the page that you can click on. Do not worry if you need to create it first, as this is the default behavior since you will have to create folders and groups first.
6. Click `Preview` to print out the graph to evaluate metric numbers.
7. Adjust the `Threshold` section to your likings on when the alert should happen.
8. In case the `Reduce` section is showing multiple lines and one of them is `NaN`, set `Replace Non-numeric Values` with a custom number above the alert range. For single line metrics that rely on clients or the network, its recommended to set a `NaN` number within the alert range, meaning that an alert is sent when the process or network is currently down.
9. Within the `Alert evaluation behavior` section, add a `node-alerts` folder where all the alert data will be stored. If it is already existing, select it from the panel. You can change the name of the folder of your likings, it is just to group alert's data. Its recommended to always choose the same name for one network, node or validator, so you do not mix up various targets and dashboards.
10. Within the `Evaluation group` selection, add a `node-group`. If it is already existing, select it from the panel. You can change the name of the group of your likings, it is just to group alert's data. Its recommended to always choose the same name for one network, node or validator, so you do not mix up various targets and dashboards.
11. Scroll up and click `Save`
12. Repeat this for every Alert on the Dashboard.

## 2. Set Metrics Presets

![Grafana Alert Board](/img/guides/alert-systems/grafana-alerts-1.png)

Here are some example metrics that are included in the default dashboard. You can check the picures and validate if everything is configured the same way as in the guide.

#### Consensus Process Down

```text
1: Process up
0: Process down
```

![Consensus Process Down Metric](/img/guides/alert-systems/grafana-alerts-2.png)

```text
up{job="consensus-client-job"}
```

#### Validator Process Down

```text
1: Process up
0: Process down
```

![Validator Process Down Metric](/img/guides/alert-systems/grafana-alerts-3.png)

```text
up{job="validator-client-job"}
```

#### Consensus Process Restarted

```text
1:   Process up
0:   Process down
NaN: Not available (likely down --> 0)
```

![Consensus Process Restarted Metric](/img/guides/alert-systems/grafana-alerts-4.png)

```text
(time()-process_start_time_seconds{job="consensus-client-job"})/3600
```

#### Validator Process Restarted

```text
1:   Process up
0:   Process down
NaN: Not available (likely down --> 0)
```

![Validator Process Restarted Metric](/img/guides/alert-systems/grafana-alerts-5.png)

```text
(time()-process_start_time_seconds{job="validator-client-job"})/3600
```

#### Below 40 Peers

```text
above 30: Ideal healthy connections
below 30: Resyncing or weak connections
NaN:      Not available (no connections --> 0)
```

![Below 40 Peers Metric](/img/guides/alert-systems/grafana-alerts-6.png)

```text
p2p_peer_count{state="Connected",job="consensus-client-job"}
```

#### Participation Rate below 80%

```text
above 80: Ideal healthy network
below 80: Unstable network
NaN:      2nd data feed (ignore metric --> 100)
```

![Participation Rate below 80% Metric](/img/guides/alert-systems/grafana-alerts-7.png)

```text
beacon_prev_epoch_target_gwei / beacon_prev_epoch_active_gwei * 100
```

#### 50 Slots Behind

```text
below 50: Ideal syncing speed
above 50: Unstable syncing
NaN:      Not available (likely unstable --> 51)
```

![50 Slots Behind Metric](/img/guides/alert-systems/grafana-alerts-8.png)

```text
beacon_clock_time_slot-beacon_head_slot
```

#### No Hourly Earnings

```text
above 0,0001: Earning rewards
below 0,0001: Syncing or negative rewards
NaN:          Not available (likely negative rewards --> 0)
```

![No Hourly Earnings Metric](/img/guides/alert-systems/grafana-alerts-9.png)

```text
sum(validator_balance) - sum(validator_balance offset 1h) - count(validator_balance > 16)*32 + count(validator_balance offset 1h > 0)*32
```

#### Less than 2GB Free Memory

```text
above 2000000000: More than 2GB remaining
below 2000000000: Less than 2GB remaining
```

![Less than 2GB Free Memory Metric](/img/guides/alert-systems/grafana-alerts-10.png)

```text
(node_memory_MemFree_bytes{job="node-exporter-job"} or node_memory_MemFree{job="node-exporter-job"}) + (node_memory_Cached_bytes{job="node-exporter-job"} or node_memory_Cached{job="node-exporter-job"})
```

#### CPU Usage above 40%

```text
above 4: More than 40% of computation resources used
below 4: Less than 40% of computation resources used
```

![CPU Usage above 40% Metric](/img/guides/alert-systems/grafana-alerts-11.png)

```text
sum(irate(node_cpu_seconds_total{mode="user",job="node-exporter-job"}[5m])) or sum(irate(node_cpu{mode="user",job="node-exporter-job"}[5m]))
```

#### Disk Usage above 60%

```text
above 0,6: Disk more than 60% occupied by tasks
below 0,6: Disk less than 60% occupied by tasks
```

![Disk Usage above 60% Metric](/img/guides/alert-systems/grafana-alerts-12.png)

```text
(sum(node_filesystem_size_bytes{job="node-exporter-job"})-sum(node_filesystem_avail_bytes{job="node-exporter-job"}))/sum(node_filesystem_size_bytes{job="node-exporter-job"})
```

#### CPU Temperature above 75 °C

```text
above 75: Processor is running hot
below 75: Processor is running normally
```

![CPU Temperature above 75 °C Metric](/img/guides/alert-systems/grafana-alerts-13.png)

```text
node_hwmon_temp_celsius{chip="platform_coretemp_0",job="node-exporter-job",sensor="temp1"}
```

#### Google Ping above 30ms

```text
above 0,03: Connection takes longer than 30ms, not ideal
below 0,03: Connection takes less than 30ms, everything alright
```

![Google Ping above 30ms Metric](/img/guides/alert-systems/grafana-alerts-14.png)

```text
probe_duration_seconds{job="google-ping-job"}
```

## 1. Configuring Notfication Intervals

1. Head over to the `Alerting` section on the left menu.
2. Click on `Notification policies`.
3. Click the 3-dot-menu on the default notification channel.
4. Choose `Edit` within the popup.
5. Expand the `Timing Options` field

The window should look similar to this one, to send one notification every 5 minutes and refresh existing errors every 10 minutes. Grafana 9 will also send you and `resolved` message if the alarm is not present anymore.

![Grafana Alert Interval](/img/guides/alert-systems/grafana-alerts-15.png)

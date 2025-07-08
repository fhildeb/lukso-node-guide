---
sidebar_label: "9.4 Custom Messages"
sidebar_position: 4
description: Learn how to create clean and actionable alert messages in Grafana using annotations and contact point templates.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 9.4 Custom Messages

Grafana's default alert messages often include excessive technical details and raw values that make it difficult to quickly assess the situation or determine next steps. This guide walks you through how to customize and simplify those messages using annotations and templates, helping you to get actionable alerts across any Grafana version.

<Tabs groupId="message">
  <TabItem value="firing" label="Default Firing Message" default>

```text
**Firing**

Value: B=45.07955651176187, C=1
Labels:
 - alertname = Participation Rate below 80%
 - grafana_folder = node-alerts
 - instance = 127.0.0.1:8080
 - job = consensus-client-job
Annotations:
Source: http://localhost:3000/alerting/grafana/e10d1256-082f-4ca3-a936-aceea7759d78/view?orgId=1
Silence: http://localhost:3000/alerting/silence/new?alertmanager=grafana&matcher=alertname%3DParticipation+Rate+below+80%25&matcher=grafana_folder%3Dnode-alerts&matcher=instance%3D127.0.0.1%3A8080&matcher=job%3Dconsensus-client-job
Dashboard: http://localhost:3000/d/dashboard-id?orgId=1
Panel: http://localhost:3000/d/dashboard-id?orgId=1&viewPanel=120
```

</TabItem> <TabItem value="resolved" label="Default Resolved Message">

```text
**Resolved**

Value: B=85.07955651176187, C=1
Labels:
 - alertname = Participation Rate below 80%
 - grafana_folder = node-alerts
 - instance = 127.0.0.1:8080
 - job = consensus-client-job
Annotations:
Source: http://localhost:3000/alerting/grafana/e10d1256-082f-4ca3-a936-aceea7759d78/view?orgId=1
Silence: http://localhost:3000/alerting/silence/new?alertmanager=grafana&matcher=alertname%3DParticipation+Rate+below+80%25&matcher=grafana_folder%3Dnode-alerts&matcher=instance%3D127.0.0.1%3A8080&matcher=job%3Dconsensus-client-job
Dashboard: http://localhost:3000/d/dashboard-id?orgId=1
Panel: http://localhost:3000/d/dashboard-id?orgId=1&viewPanel=120
```

</TabItem>
</Tabs>

## Add Message Annotations

First, we have to add custom or additional context to the alert rule, that can later be displayed within our custom message.

![Grafana Alert Board](/img/guides/alert-systems/grafana-alerts-1.png)

:::tip

You can further customize the summary and description annotations beyond the default values in the following steps.

:::

1. Navigate to the **Alert Rules** from the top right menu of Grafana.
2. Edit the Alert Rule by clicking the **Edit Icon** on the right side of the list.
3. Copy the Name and scroll down the **Annotations** to **Configure the Notification Message**.
4. Choose the **Summary** annotation and input the previously copied **Alert Rule Name**.
5. Choose the **Description** annotation and input `{{ $values.B.Value }}` to reference the triggering value.
6. Safe and Exit the Alert Rule and repeat the process for all the remaining rules.

:::info

If you modified the default alert rules that were set up within the [**Grafana Notifications**](/docs/guides/alert-systems/grafana-notifications.md), you can exchange the referenced value with `{{ $values.C.Value }}` or `{{ $values.D.Value }}` depending on the applied rules at the top of the page.

:::

## Edit Contact Point Message

Once your alert rules are filled, you have to customize how the messages are sent via contact points. In Grafana, contact points aggregate the alert rules and manage how it's data is delivered through your notification setup. Using contact points, you have the chance to write fully customized messages and texts depending on what data is abailable or which rule is triggered.

1. Navigate to the **Contact Points** from the top right menu of Grafana.
2. Edit your [**Telegram Contact Point**](/docs/guides/alert-systems/telegram-bot.md) by clicking the **Edit Icon** on the right side of the list.
3. Within the **Integration Section**, extend the **Optional Telegram Settings**.
4. On the **Message** heading, click **Edit Message** to customize your text.
5. Click _Enter Custom Message_ and paste the following preset, then hit safe
6. On the **Contact Point Page**, click **Safe Contact Point**.

```text
{{ range .Alerts }}
LUKSO Alert Rule is: {{ .Status }}
Summary: {{ .Annotations.summary }}
Value: {{ .Annotations.description }}
{{ end }}
```

:::info

If you want to test messages, you can use the **Test Icon** on the **Contact Point Page** to send example notifications. To test the **Alert Rules** in production, you can modify a metric so it is triggered Immediately and sends off a message.

:::

Your updated Telegram Messages will now look like the following:

<Tabs groupId="message">
  <TabItem value="firing" label="New Firing Message" default>

```text
LUKSO Alert Rule is firing
Summary: Disk Usage above 60%
Value: 0.7462574211663442
```

</TabItem> <TabItem value="resolved" label="New Resolved Message">

```text
LUKSO Alert Rule is resolved
Summary: Disk Usage above 60%
Value: 0.2462574211663442
```

</TabItem>
</Tabs>

:::tip

Further message templates and customization options can be found on the [**Grafana Contact Points Documentation**](https://grafana.com/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/).

:::

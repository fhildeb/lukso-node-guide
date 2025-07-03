---
sidebar_label: "9.1 Telegram Bot"
sidebar_position: 1
---

# 9.1 Telegram Bot

Once the [Grafana Dashboard](/docs/guides/monitoring/dashboard-configuration.md) is configured, your node can send alerts through various channels, such as Discord, Telegram, or Email. The alert system can be used to notify you during unregular behavior from metrics, or when certain services cant be reached anymore.

:::tip

It is convenient to temporarily open a text editor to store information needed for these steps.

:::

:::info

The following steps are performed on your 💻 **personal computer**.

:::

## 1. Create Telegram Bot

1. Open the web-based or Desktop version of [Telegram](https://telegram.org/apps).
2. Register or login to your [Telegram](https://telegram.org/) account.
3. Open the Botfather chat using the [t.me/botfather](https://t.me/botfather) link.
4. A new BotFather channel will be opened.
5. Type and send `/newbot` in the message line.
6. You will be promted to choose a full name for your future bot.
7. A message will appear with information about your bot.
8. Highlight and copy the API token and username.
9. Paste the information into your notes.

## 2. Create Group Chat

1. Open the Telegram menu and set up a new group.
2. Choose a name for the group of you and your bot.
3. Add your bot to the group by typing the exact username.
4. Create the group once the username was selected.
5. Type and send `/my_id` to trigger the API refresh.

## 3. Fetch the Chat Number

1. Copy `https://api.telegram.org/bot<your-api-token>/getUpdates` to a text document.
2. Replace `<your-api-token>` with your API token.
3. Copy the link and access it from a web browser and look for the `{"id"}:` element.
4. Copy and paste the `id` into your notes. It might have a `-` symbol in front.

## 4. Add Contact Points

1. Return to Grafana and login using your credentials.
2. On the left-hand menu, click **Alerting** and select the **Contact Points** heading.
3. Click **Add contact point** and fill in a name for your notification channel.
4. Select the **Telegram Integration** and add the API Token and your chat ID.
5. Click **Test** within the Integration Panel.
6. Wait until you see a new message in Telegram.
7. Click **Save contact point**.

## 5. Update Notification Policies

1. Visit the **Grafana Landing Page**, click **Alerting** on the left-hand menu, and select **Notification Policies**.
2. On the right side of the **Default Notification**, click the **3-Dot-Menu** and choose **Edit**.
3. Change the **Default Contact Point** to the Telegram's Contact Point and click **Update Default Policy**

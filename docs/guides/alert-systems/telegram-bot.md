---
sidebar_label: "9.1 Telegram Bot"
sidebar_position: 1
---

# 9.1 Telegram Bot

:::danger

This page is currently under maintenance reworked and contains outdated content.

:::

Grafana can send alerts through various channels, such as Discord, Telegram, or Email when unregular behavior in metrics or reading from Prometheus is recognized. The following will guide will configure Grafana notifications for Telegram.

> It is convenient to temporarily open a text editor to store information needed for these steps.

## 1. Create Telegram Bot

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

## 2. Create a Group

1. Open the Telegram menu.
2. Set up a new group.
3. Choose a name for the group.
4. Add your bot to the group by typing the exact _username_
5. Select the user when it appears in the list and click `create`
6. Send a message `/my_id` to trigger the API refresh
7. Copy `https://api.telegram.org/bot<your-bot-api-token>/getUpdates` to a text document.
8. Replace `<your-bot-api-token>` with your token ID of the bot

## 3. Fetching the Chat ID

1. Copy the link you just edited into a web browser.
2. Look for text that says `{"id"}:`
3. Copy and paste the `id` into your notes.

> Ensure your Chat ID is fully copied. It might have a `-` in front.

## 4. Add Telegram Contact Points

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

## 5. Update Notification Policies

1. On the left-hand menu, click `Alerting`
2. Click the `Notification policies` on the left side
3. On the right of the default notification, click the 3-dot-menu and chose `Edit`
4. Change `Default contact point` to Telegram's Contact Point
5. Click `Update default policy`

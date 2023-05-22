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
6. Send at least one random text message to the newly created group.
7. Copy `https://api.telegram.org/bot<your-bot-api-token>/getUpdates` to a text document.
8. Replace `<your-bot-api-token>` with your token ID of the bot

### 8.1.3 Fetching the Chat ID

1. Copy the link you just edited into a web browser.
2. Look for text that says `{"id"}:`
3. Copy and paste the `id` into your notes.

### 8.1.4 Add Telegram to Grafana

1. Return to Grafana
2. Login using your credentials
3. On the left-hand menu, click the alarm icon
4. Click the `Notification channels` tab at the top
5. Click on `Add channel`
6. Fill in the following information:

   - `Name`: Your Notification Channel Name
   - `Type:` Telegram
   - `BOT API Token:` Your copied BOT API Token
   - `Chat ID:` The copied Chat ID

7. Click `send test`.
8. Wait until you see a new message in Telegram.
9. Click `Save`.

### 8.1.5 Add Notifications to Metrics

1. Click the Granfana Icon to get to the landing page.
2. Click the LUKSO Dashboard.
3. Scroll down to the dashboard's `Alerts` section.
4. Select each alert and click `Edit`.
5. Within the `Alert` tab, select `Notifications`.
6. Click `send to` and choose your notification channel.
7. Click the back arrow on the top left of the Grafana screen.
8. Repeat the above steps for each alert.
9. When finished, click on `apply`.
10. Click `save changes` in the top right corner.
11. Specify a message for the update.
12. Click on `save`.

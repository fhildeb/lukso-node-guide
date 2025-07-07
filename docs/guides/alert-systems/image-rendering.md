---
sidebar_label: "9.3 Image Rendering"
sidebar_position: 3
description: "Enable image rendering in Grafana to receive visual graph alerts for your LUKSO node. This guide covers plugin installation, configuration, and troubleshooting on your server."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 9.3 Image Rendering

Usually, regular notifications through Grafana can be quite hard to read and understand. However, instead of receiving text-based [Grafana Notifications](/docs/guides/alert-systems/grafana-notifications.md) through your alert channels, you can enable Grafana to render a picture of the metric, just as it is shown when logging in to the Grafana dashboard directly.

:::info

The following steps are performed on your 📟 **node server**.

:::

## Install Image Renderer

To add the Image Rendering tool to your Grafana server, you have to install it's package.

**1.1 Check Grafana Version**: Verify which Grafana Version you have installed before breaking support.

```sh
grafana-server -v
```

**1.2 Install Render Plugin**: Use the built-in Grafana-CLI to install the suited image renderer for your Grafana installation.

<Tabs groupId="grafana">
  <TabItem value="latest" label="Latest Grafana Version" default>

```sh
sudo grafana-cli plugins install grafana-image-renderer
```

</TabItem> <TabItem value="9.5.2" label="Grafana Version 9.5.2">

```sh
sudo grafana-cli plugins install grafana-image-renderer 3.7.1
```

</TabItem>
</Tabs>

**1.3 Enable Image Capturing**: Add image captures to the global Grafana cofiguration file using your preferred text editor.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
vim /etc/grafana/grafana.ini
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
nano /etc/grafana/grafana.ini
```

</TabItem>
</Tabs>

Then search for the following text section:

```text
#################################### Unified Alerting ####################

[unified_alerting]
```

**1.4 Set Image Capturing**: Underneath the Unified Alerting section, add the screenshot settings and safe the file.

```text
[unified_alerting.screenshots]
capture = true
```

The final section will look like this:

```text
#################################### Unified Alerting ####################

[unified_alerting.screenshots]
capture = true

[unified_alerting]
```

**1.5 Install Dependencies**: Install all necessary packages for the image rendering software.

<Tabs groupId="os">
  <TabItem value="ubuntu" label="Ubuntu" default>

```sh
sudo apt install -y libx11-6 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrender1 libxtst6 libglib2.0-0 libnss3 libcups2  libdbus-1-3 libxss1 libxrandr2 libgtk-3-0 libasound2 libxcb-dri3-0 libgbm1 libxshmfence1
```

</TabItem> <TabItem value="debian" label="Debian">

```sh
sudo apt install -y libxdamage1 libxext6 libxi6 libxtst6 libnss3 libcups2 libxss1 libxrandr2 libasound2 libatk1.0-0 libatk-bridge2.0-0 libpangocairo-1.0-0 libpango-1.0-0 libcairo2 libatspi2.0-0 libgtk3.0-cil libgdk3.0-cil libx11-xcb-dev libgbm1 libxshmfence1
```

</TabItem>
</Tabs>

**1.6 Grant Permissions**: Grant the Grafana service user all necessary rights to read and execute plugins.

```sh
sudo chown -R grafana-server-worker:grafana-server-worker /var/lib/grafana/plugins
```

**1.7 Refresh Grafana**: Restart your Grafana server for the dependency to show up.

```sh
sudo systemctl restart grafana-server
```

**1.8 Verify Grafana Status**: Check if the Grafana Server restarted correctly.

```sh
systemctl status grafana-server
```

The output should look similar to this:

```text
● grafana-server.service - Grafana instance
     Loaded: loaded (/lib/systemd/system/grafana-server.service; enabled; vendo>
     Active: active (running) since [DATE]; [TIME] ago
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

:::tip

From now on, all notifications will automatically send graphs once the alert is triggered.

:::

## Revert Setup

If something went wrong, you can disable image rendering or remove the plugin all together.

**1. Disable Image Capturing**: Open the Grafana configuration file and remove or comment out the screenshot settings.

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
vim /etc/grafana/grafana.ini
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
nano /etc/grafana/grafana.ini
```

</TabItem>
</Tabs>

Locate and remove or comment out the following section:

```ini
[unified_alerting.screenshots]
capture = true
```

**2. Remove the Render Plugin**: Uninstall the image renderer plugin using the Grafana CLI.

```sh
sudo grafana-cli plugins uninstall grafana-image-renderer
```

**3. Clean Up Plugin Directory**: Manually ensure all images and cache are removed from the plugin directory.

```sh
sudo rm -rf /var/lib/grafana/plugins/grafana-image-renderer
```

**4. Revert File Permissions**: Reset ownership of the plugin folder if it was changed previously.

```sh
sudo chown -R root:root /var/lib/grafana/plugins
```

**5. Restart Grafana**: Restart Grafana to apply the changes.

```sh
sudo systemctl restart grafana-server
```

**6. Verify Grafana Status**: Ensure Grafana is running properly after reverting the changes.

```sh
systemctl status grafana-server
```

The output should look similar to this:

```text
● grafana-server.service - Grafana instance
     Loaded: loaded (/lib/systemd/system/grafana-server.service; enabled; vendo>
     Active: active (running) since [DATE]; [TIME] ago
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

:::tip

Grafana will now stop rendering images in alert notifications and revert back to text-based alerts.

:::

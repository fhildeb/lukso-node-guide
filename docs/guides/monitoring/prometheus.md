---
sidebar_label: "8.6 Prometheus"
sidebar_position: 6
---

# 8.6 Prometheus

## 7.5 Prometheus Setup

Now that all exporters are installed and running, we can set up the main application.

### 7.5.1 Creating a New User

As explained and done [previously](#), we will create a new user to run the Prometheus service specifically. Running services as a system user with minimal privileges is a typical security best practice.

<!--TODO: ./02-node-exporter.md-->

- `--system`: This flag indicates that a system user should be created. System users are used to run services and daemons rather than for people to log in with.
- `--group`: This flag instructs the user tool to create a new group with the same name as the user.
- `--no-create-home`: By default, the user tool will create a home directory for each new user. This flag prevents that from happening, as we do not need different user directories if ye do not set the user up with a login. The option is typically used for users that are only meant to run a specific service and don't need a home directory. In this case, I'm naming the user `node-exporter-worker` to differentiate the service, often using the exact name of the program written in underscores and the user account related to it. Feel free to come up with your name, but remember that you must change future commands.

```sh
sudo adduser --system prometheus-worker --group --no-create-home
```

If you want to confirm that the user has been created, you can search for it within the password file `/etc/passwd`, that houses all essential information for each user account. Using `grep`, a powerful command-line tool for global expression search within files or text, we can check if the user exists within the file.

```sh
grep "prometheus-worker" /etc/passwd
```

The output should look similar to this:

```text
prometheus-worker:x:117:123::/home/prometheus-worker:/usr/sbin/nologin
```

### 7.5.2 Installing Prometeus

Before downloading or installing anything, make sure you are in the home directory so everything is in one place:

```sh
cd
```

We can then continue to download the current version of Prometheus using the previously installed `wget` tool. In this case, we're downloading the service directly from GitHub. Check the official [Prometheus Download Page](https://prometheus.io/download/) and the latest LTS version. Make sure to update your version if there is a newer release.

```sh
wget https://github.com/prometheus/prometheus/releases/download/v2.37.8/prometheus-2.37.8.linux-amd64.tar.gz
```

The output should look similar to this:

```text
[DATE] [TIME] (12.6 MB/s) - ‘prometheus-2.37.8.linux-amd64.tar.gz’ saved [83345655/83345655]
```

#### Extract the Archive

After downloading it, we can extract the tape archive using the Ubuntu tool. We're going to extract (`x`) and compress (`z`) the tape archive into its previous packaged files (`f`) using verbose mode (`v`) to list all files being processed during the extraction and compression.

```sh
tar xzfv prometheus-2.37.8.linux-amd64.tar.gz
```

The output should look similar to this:

```text
prometheus-2.37.8.linux-amd64/
prometheus-2.37.8.linux-amd64/console_libraries/
prometheus-2.37.8.linux-amd64/console_libraries/menu.lib
prometheus-2.37.8.linux-amd64/console_libraries/prom.lib
prometheus-2.37.8.linux-amd64/prometheus.yml
prometheus-2.37.8.linux-amd64/consoles/
prometheus-2.37.8.linux-amd64/consoles/node-disk.html
prometheus-2.37.8.linux-amd64/consoles/index.html.example
prometheus-2.37.8.linux-amd64/consoles/node.html
prometheus-2.37.8.linux-amd64/consoles/prometheus-overview.html
prometheus-2.37.8.linux-amd64/consoles/node-overview.html
prometheus-2.37.8.linux-amd64/consoles/node-cpu.html
prometheus-2.37.8.linux-amd64/consoles/prometheus.html
prometheus-2.37.8.linux-amd64/promtool
prometheus-2.37.8.linux-amd64/NOTICE
prometheus-2.37.8.linux-amd64/prometheus
prometheus-2.37.8.linux-amd64/LICENSE
```

#### Copy the Service Binaries into the System's Path

After extraction, we can copy the exporter binaries to the system's path so they appear as installed dependencies and can be used appropriately and linked within services.

First, move into the Prometheus folder:

```sh
cd prometheus-2.37.8.linux-amd64
```

You will see Promtool and Prometheus showing up as executable programs:

- **Prometheus**: The main component of the Prometheus system. A time-series database server collects and stores metrics from monitored targets at specified intervals. It retrieves these metrics via HTTP requests on specified endpoints. Prometheus includes a flexible query language called PromQL to leverage its dimensionality. It also consists of a web interface for executing queries and visualizing results.
- **Promtool**: This is the command-line tool used for various tasks related to Prometheus, such as checking the syntax of your Prometheus configuration, validating rule files, simulating alert rule evaluation, and debugging PromQL expressions. It's a practical tool for any Prometheus operator as it helps ensure that configuration and rule files are syntactically correct and work as expected. It does not collect or store metrics; it's more of a helper tool used in conjunction with the central Prometheus server.

Both need to be copied into the system's path. Let's start with the Prometheus application itself:

```sh
sudo cp prometheus /usr/local/bin/
```

Then continue with copying the CLI tool:

```sh
sudo cp promtool /usr/local/bin/
```

### 7.5.3 Cleaning up Install Files

Before we clean up any files, make sure to move them back into the home directory:

```sh
cd
```

After we have copied the executable file into the system's program path and given it the appropriate user rights, we can remove the extracted folders.

```sh
rm -rf prometheus-2.37.8.linux-amd64
```

The same applies to the tape archive, which we have previously downloaded:

```sh
rm prometheus-2.37.8.linux-amd64.tar.gz
```

### 7.5.4 Configuring External Datasets

After installation, we want to create a separate configuration file for the Prometheus server to collect all the exporters' information. It will tell Prometheus where to scrape data from, how often to scrape it, and how to handle the scraped data.

Here is a brief description of the needed folders:

- `/etc/prometheus/console_libraries`: This directory is typically used to store library files shared between different console templates. Console libraries are snippets of reusable code used in multiple console files to avoid duplication.
- `/etc/prometheus/consoles`: This directory holds console templates. Prometheus's built-in web UI templates allow you to create HTML pages displaying the results of PromQL expressions.
- `/etc/prometheus/files_sd`:This directory is for file-based service discovery configuration files. Prometheus uses these to dynamically discover targets for scraping. These files are in JSON or YAML format and list the targets for Prometheus to scrape metrics from.
- `/etc/prometheus/rules`: This directory is where you store rules files. Rules files contain the definitions for alerting rules and recording rules. Alerting rules specify conditions under which Prometheus should trigger an alert, and recording rules precompute frequently used or expensive PromQL expressions and save their result as a new set of time series.
- `/etc/prometheus/rules.d`: This directory organizes rules files for individual services, keeping them separate from general rules in the primary directory. Splitting is helpful in large setups where you have many rules related to different services or components and want to keep them in separate files for better management.
- `/var/lib/prometheus`: This directory typically stores the Prometheus time-series database files. Prometheus creates and manages these files while it's running to hold all the samples it collects from the targets it scrapes.

For this configuration, we will check that all needed Prometheus folders are there, so no error will appear while running it. If they should already exist, we leave them as they are, if not, we will create empty folders. The logic can be quickly done using the parent `-p` flag, as already described before within the [SSH Config](#) section of the guide.

<!--TODO: /5-access-connection/02-ssh-config.md-->

```sh
sudo mkdir -p /etc/prometheus/console_libraries /etc/prometheus/consoles /etc/prometheus/files_sd /etc/prometheus/rules /etc/prometheus/rules.d /var/lib/prometheus
```

Afterward, we can create a new server configuration file for Prometheus to define how Prometheus will function and what services it will monitor.

```sh
sudo vim /etc/prometheus/prometheus.yaml
```

Here is a breakdown of the various parts we will add to the configuration:

#### Global Parameters

These settings apply to the Prometheus server itself.

- **scrape_interval**: This is the frequency with which Prometheus will collect data from your targets. A typical average value that has proven to be a balance not to spam requests but to keep everything updated to work well with metrics is `15 seconds`.
- **evaluation_interval**: This is the frequency with which Prometheus will evaluate rules. It's usually the same as the scrape interval. I've set it to `15 seconds` as well.

#### Scrape Config Parameters

This section is a list of jobs that Prometheus will monitor. Each job can have its separate settings.

- **job_name**: This is the name of the job as it will appear in Prometheus.
- **scrape_interval**: This is the frequency with which Prometheus will collect data from this job. The global `scrape_interval` will be used if this is not set.
- **metrics_path**: This specifies the endpoint to hit when scraping metrics. It defaults to `/metrics` if not set.
- **params**: This is used to pass URL parameters to the scrape request. It will mainly be used in our network probing services with ICMP.
- **static_configs**: This is a list of targets for the job. Each target is a `host:port` pair from which Prometheus will scrape metrics. We will target API URLs in some services to fetch data responses.
- **relabel_configs**: This allows us to modify the target labels before scraping. If we want to ping services for Prometheus, we're using this to set the `__address__` label to the address of the Blackbox exporter and the instance label to the IP we're pinging.

#### Prometheus Jobs

Let's walk through each job we want to set up for Prometheus. Please note that the ports are configured for use within Geth and Prysm. If you are using other clients, make sure to adjust some properties.

- **prometheus-job**: This job is for scraping metrics from the Prometheus server itself. It will scrape every `5` seconds from the address `127.0.0.1:9090`, which is the default address and port for a locally running Prometheus server as described within the [Monitoring Port](#) section of the guide.
- **consensus-client-job**: This job scrapes metrics from the local consensus node at the address `127.0.0.1:8080`. The scrape interval is set to `5` seconds.
- **node-exporter-job**: The Node Exporter is a Prometheus exporter for hardware and OS metrics. This job scrapes metrics from the Node Exporter service running locally at `127.0.0.1:9100` every `5` seconds.
- **validator-client-job**: This job is set to scrape metrics from the validator client running locally at `127.0.0.1:8081` every `5` seconds.
- **google-ping-job**: This job uses the Blackbox Exporter to probe the Google DNS server at '8.8.8.8' using `ICMP` echo requests, also called pings. The metrics will be available at the `/probe` endpoint on the Blackbox Exporter, which runs locally at `127.0.0.1:9115`. The relabeling configurations are used to label these targets for Prometheus properly.
- **cloudflare-ping-job**: This job uses the Blackbox Exporter to probe the Cloudflare's DNS server at `1.1.1.1` using `ICMP` echo requests, also called pings. The metrics will be available at the `/probe` endpoint on the Blackbox Exporter, which runs locally at `127.0.0.1:9115`. The relabeling configurations are used to properly label these targets for Prometheus.
- **json-exporter-job**: This job is for scraping metrics from the JSON Exporter running locally at `127.0.0.1:7979`. This service converts JSON data into a format that Prometheus can scrape.
- **json**: This job is set to scrape metrics LYX price information from the GoinGecko API using the JSON Exporter. The metrics will be available at the `/probe` endpoint on the JSON Exporter, which is running locally at `127.0.0.1:7979`. The relabeling configurations are used to tag these targets for Prometheus properly.

<!--TODO: ./01-core-tools.md-->

The configuration file looks like the following. It's recommended to leave the job names like that so we can easily associate them with the corresponding services underneath.

```text
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9090']
  - job_name: 'consensus-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:8080']
  - job_name: 'node-exporter-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:9100']
  - job_name: 'validator-client-job'
    scrape_interval: 5s
    static_configs:
      - targets: ['127.0.0.1:8081']
  - job_name: 'google-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 8.8.8.8
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'cloudflare-ping-job'
    metrics_path: /probe
    params:
      module: [icmp]
    static_configs:
      - targets:
        - 1.1.1.1
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  # The blackbox exporter's real hostname:port.
  - job_name: 'json-exporter-job'
    static_configs:
    - targets:
      - 127.0.0.1:7979
  - job_name: 'json'
    metrics_path: /probe
    static_configs:
    - targets:
      - https://api.coingecko.com/api/v3/simple/price?ids=lukso-token&vs_currencies=eur
    relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      replacement: 127.0.0.1:7979
```

> Be cautious: When creating new rules or modifying existing ones, following the correct syntax and structure are essential to ensure that the Prometheus server functions appropriately.

If you want the LYX price showing up in a different currency than `EUR`, please change the `vs_currencies` property of the target URL for the `json`. For USD, it would look like the following:

```text
  - job_name: 'json'
    metrics_path: /probe
    static_configs:
    - targets:
      - https://api.coingecko.com/api/v3/simple/price?ids=lukso-token&vs_currencies=usd
    relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - source_labels: [__param_target]
      target_label: instance
    - target_label: __address__
      replacement: 127.0.0.1:7979
```

Those properties will, later on, be used within the Grafana Dashboard to fetch the token prices and build metrics based on our validator sevice.

### 7.5.5 Set Prometheus Permissions

Now we can change the owner of the software applications to admin access. Owner changes are commonly done for security reasons. Giving root ownership to these binary files prevents non-root users or exporter workers from modifying or replacing these essential executables, which could lead to unauthorized or unexpected behavior.

As previously explained in the [Node Exporter](#) section of the guide, we can set both the user and group to the specified service user.

<!--TODO: ./02-node-exporter.md-->

```sh
sudo chown -R prometheus-worker:prometheus-worker /usr/local/bin/prometheus
```

The same applies to the CLI tool:

```sh
sudo chown -R prometheus-worker:prometheus-worker /usr/local/bin/promtool
```

We can also change the owner for the configuration folder:

```sh
sudo chown -R prometheus-worker:prometheus-worker /etc/prometheus
```

Last, we change the owner of the database files within `/var/lib/prometheus` created and managed by Prometheus while it's running.

```sh
sudo chown -R prometheus-worker:prometheus-worker /var/lib/prometheus
```

Not only do we need to change the owner this time, but we also need to change the access mode of the executable. We must allow the owner to read, write, and execute the file while the group and all other services can only read from it.

We can use the change mode tool `chmod` as we already did within the [Node Exporter](#) section of the guide.

<!--TODO: ./02-node-exporter.md-->

```sh
sudo chmod 755 /usr/local/bin/prometheus
```

We do the same for the CLI tool again:

```sh
sudo chmod 755 /usr/local/bin/promtool
```

Afterward, we can change it for the database folder:

```sh
sudo chmod 755 /var/lib/prometheus
```

### 7.5.6 Configuring the Service

After installation and job configuration, we want to define how the Prometheus service should run. Within Ubuntu, the `/etc/systemd/system/` directory is where system service unit files are stored and used to configure services to start automatically at boot.

Here, we can create a file called `prometheus.service`. A service file is generally used to define how daemon processes should be started. In our case, we create the file with the exact name of the Prometheus service stored within the system directory to modify Prometheus' startup process. We can use Vim on various other files as we did before.

```sh
sudo vim /etc/systemd/system/prometheus.service
```

The configuration file is split between multiple sections: `[Unit]`, `[Service]`, and `[Install]`. The unit contains generic options that are not dependent on the type of service and provide documentation. The service and install section is where we will house our configuration properties:

- **Description**: Provides a concise but meaningful explanation of the service used in the configuration
- **Documentation**: Provides a URL where more information about the program can be found
- **Wants**: Minor requirement for the startup to proceed safely. In our case, it indicates that the service should want an internet connection but continues even if it can not be established.
- **After**: Ensures that the service is started after a specific service, in this case, that the network has been set up, as we will need a network connection for this exporter to succeed.
- **User**: Specifies under which user the service will run. In this case, it will be `prometheus-worker`.
- **Group**: Specifies under which user group the service will run. In this case, it will be `prometheus-worker`.
- **Type**: This option configures the process startup type for this service unit. The `simple` value means the exec command configured will be the main process of the service.
- **ExecStart**: Specifies the command to run when the service starts. In this case, it's `/usr/local/bin/prometheus` as program folder of Prometheus. In addition, there are several other options passed to the startup. It will load the configuration from `/etc/prometheus/prometheus.yaml`, it will store the database within `/var/lib/prometheus/`, it will set the data storing expiring date to one month, it will set the directory containing the web console template files to `/etc/prometheus/consoles`, and last but not least, it will specify the folder of the console library files at `/etc/prometheus/console_libraries`.
- **ExecReload**: Specifies the command to execute when the systemd service is reloaded. In our case, the `kill` command is used to send a signal (HUP) to the main process of the service, indicated by the main process ID. It will cause the process to restart and re-read its configuration files. Therefore, this will apply changes without fully stopping the service.
- **Restart**: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached. The `always` value means the service will be restarted regardless of whether it exited cleanly or not.
- **RestartSec**: This option configures the time to sleep before restarting a service. The value `5` means the service will wait for 5 seconds before it restarts. It is a typical default value and a balance between trying to restart the service quickly after a failure and not restarting it so rapidly that you could exacerbate problems.
- **SyslogIdentifier**: Sets the program name used when messages are logged to the system log.
- **StandardOutput**: Logfile where the output from Prometheus will be logged.
- **StandardError**: Logfile where errors from Prometheus will be logged.
- **ProtectSystem**: Protection rules to specify where the service can write files to the disk. If set to `full` it will limit the areas of the file system that the exporter can write outside of his regular application folder. The protection type works best as we are just using it for logging.
- **NoNewPrivileges**: Prevent the Prometheus service and its children from gaining new service privileges independently.
- **PrivateTmp**: Set to allow the service to generate a private `/tmp` directory that other processes can't access
- **WantedBy**: This option creates a small dependency and starts the service at boot time. If we input `multi-user.target`, we can specify that the service will start when the system is set up for multiple users. In our case, every Exporter service will have its user fitting the description.

#### Prometheus Logging

By default, the service will write journal logs into the `/var/log/journal/` folder using the `journal` service. But you can also configure it to use system logs written into the `/var/log/syslog` folder by the `syslog` process. Here is a quick rundown:

- `journal`: The logs are structured and include metadata about each log entry, making them easier to filter and analyze but more challenging to read our bugfix. The service includes default rate limiting and log rotation, which can help keep log sizes small. It also stores logs in a binary format, which can be more space-efficient and faster to process than text-based logs
- `syslog`: System logs are text-based logs, which are easier to read, bugfix, and process with traditional command-line tools. It also has a network protocol to send logs to remote servers if needed.

#### Process Ownership

Make sure you change the `User` and `Group` properties if you've previously changed the name, as it will fall back to `root` and could cause security risks. Our final configuration file will look like this:

```text
[Unit]
Description=Prometheus
Documentation=https://github.com/prometheus/prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus-worker
Group=prometheus-worker
Type=simple
ExecStart=/usr/local/bin/prometheus                               \
    --config.file /etc/prometheus/prometheus.yaml                 \
    --storage.tsdb.path /var/lib/prometheus/                      \
    --storage.tsdb.retention.time=31d                             \
    --web.console.templates=/etc/prometheus/consoles              \
    --web.console.libraries=/etc/prometheus/console_libraries
ExecReload=/bin/kill -HUP $MAINPIDRestart=always
RestartSec=5
SyslogIdentifier=prometheus
StandardOutput=journal
StandardError=journal
ProtectSystem=full
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

> Be cautious: When creating new rules or modifying existing ones, following the correct syntax and structure are essential to ensure that the Prometheus functions appropriately and provides the desired level of security. Verify that you do not use spaces between properties and their values.

### 7.5.7 Start the Prometheus Service

First we need to reload the system manager configuration. It is used when making changes to service configuration files or creating new service files, ensuring that the system's daemon is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterward, we can start the Prometheus service using the system control command:

```sh
sudo systemctl start prometheus
```

To enable the Prometheus service to start when the system boots, we can use the system control to create a symbolic link as we did before.

```sh
sudo systemctl enable prometheus
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/multi-user.target.wants/prometheus.service → /etc/systemd/system/prometheus.service.
```

We can fetch the current status from the system control to check if the Prometheus service is running and configured correctly. It will display whether it is active, enabled, or disabled and show any recent log entries.

```sh
sudo systemctl status prometheus
```

The output should look similar to this:

```text
● prometheus.service - Prometheus
     Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
     Active: active (running) since [DATE] UTC; [TIME] ago
       Docs: https://github.com/prometheus/prometheus
   Main PID: 29468 (prometheus)
      Tasks: 17 (limit: 38043)
     Memory: 27.4M
        CPU: 293ms
     CGroup: /system.slice/prometheus.service
             └─29468 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yaml --storage.ts>

[DATE] [TIME] [USER] prometheus[29468]: ts=2023-05-18T09:43:54.539Z caller=head.go:536 level=info > ...
...
```

### 7.5.8 Maintenance

Proper maintenance ensures that all the components are working as intended, can be updated on the fly, and that software can be kept up-to-date and secure. It's also essential to identify and fix errors quickly.

#### Logging

If `journal` is your logging tool, you can access the full logs with the journal control tool.

- `-f`: Logging in follow mode displays the most recent journal entries and then updates as new entries are added in real-time.
- `-u`: In unit mode, it filters the log to show only entries for the specified system's service, this time `prometheus`.

```sh
sudo journalctl -f -u prometheus
```

#### Restarting

If you made any changes to configuration files, reload the system daemon:

```sh
sudo systemctl daemon-reload
```

Then, restart the service using the system control:

```sh
sudo systemctl restart prometheus
```

#### Stopping

You can stop the service using the system control:

```sh
sudo systemctl stop prometheus
```

### 7.5.9 Optional User Removal

If you ever want to remove the user or something went wrong, do the following steps:

Change the owner of Prometheus back to root:

```sh
sudo chown -R root:root /usr/local/bin/prometheus
```

The same applies to the CLI tool:

```sh
sudo chown -R root:root /usr/local/bin/promtool
```

We can also change the owner for the configuration folder:

```sh
sudo chown -R root:root /etc/prometheus
```

Last but not least, we change the owner of the database files:

```sh
sudo chown -R root:root /var/lib/prometheus
```

Remove the user and all the files, so there are no orphaned data blobs on your system:

```sh
sudo deluser --remove-all-files prometheus-worker
```

```sh
sudo delgroup prometheus-worker
```

Afterward, you can redo the Prometheus guide and either set up a new user or remove the `User` and `Group` properties from the configuration in `7.5.6`. By default, the process will run as `root`. Also, make sure to go through every step in `7.5.7` once again.

### 7.5.10 Optional Software Removal

If you want to remove the Prometheus and Promtool software, stop the running service:

```sh
sudo systemctl stop prometheus
```

Disable the service:

```sh
sudo systemctl disable prometheus
```

Remove the service file:

```sh
sudo rm /etc/systemd/system/prometheus.service
```

Reload the system service daemon to get the service file change:

```sh
sudo systemctl daemon-reload
```

Then continue deleting the configuration folders.

```sh
sudo rm -rf /etc/prometheus
```

Remove the Prometheus database:

```sh
sudo rm -rf /var/lib/prometheus/
```

Remove the Promtool executable:

```sh
sudo rm -rf /usr/local/bin/promtool
```

In the last step, remove the unlisted Prometheus executable itself:

```sh
sudo rm -rf /usr/local/bin/prometheus
```

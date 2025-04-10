---
sidebar_label: "8.3 Node Exporter"
sidebar_position: 3
---

# 8.3 Node Exporter

## 7.2 Node Exporter Setup

We will start the monitoring by setting up the three Node Exporter services before we manage the core Prometheus connection to them. Everything will be set in place and loaded when we configure the Dashboard later.

Setting up sub-tools first has the following benefits:

- **Problem Encapsulation**: Installing exporters first allows you to ensure that the necessary metrics are being exposed by the services you want to monitor. By installing and configuring exporters beforehand, you can verify that the metrics are accessible and correctly exposed. Separated installation helps troubleshoot potential issues with the exporters or the services themselves.
- **No Idle Rotation Problems**: With the exporters already installed and configured, Prometheus can immediately start scraping the endpoints and collecting metrics. Having data endpoints running ensures that you have data available for monitoring as soon as Prometheus is up, excluding errors where configurations need to be reloaded and updated.

> The Node Exporter measures various machine resources such as memory, disk I/O, CPU usage, and network statistics. Metrics give you a broad overview of your machine's performance and health, allowing you to monitor how your node affects your system's resources and catch any potential issues (like memory leaks or high CPU usage) before they cause problems. Running Node Exporter on every node of your network provides you with valuable insights and helps ensure the smooth operation of your blockchain applications.

### 7.2.1 Creating a New User

When setting up a Prometheus Node Exporter, we will create a new system user specifically to run the Node Exporter service. Running services as a system user with minimal privileges is a typical security best practice. It limits the potential damage if the service is somehow compromised. For example, the Node Exporter user won't be able to write to most directories on the system or execute commands as other users. We will use the system's user creation tool:

- `--system`: This flag indicates that a system user should be created. System users are used to run services and daemons rather than for people to log in with.
- `--group`: This flag instructs the user tool to create a new group with the same name as the user.
- `--no-create-home`: By default, the user tool will create a home directory for each new user. This flag prevents that from happening, as we do not need different user directories if ye do not set the user up with a login. The option is typically used for users that are only meant to run a specific service and don't need a home directory. In this case, I'm naming the user `node-exporter-worker` to differentiate the service between the user, often using the exact name of the program. Feel free to come up with your name, but remember that you must change future commands.

```sh
sudo adduser --system node-exporter-worker --group --no-create-home
```

Once we configure the exporter, the node will run the service as this user by specifying the user in our system daemon service file.

If you want to confirm that the user has been created, you can search for it within the password file `/etc/passwd`, that houses all essential information for each user account. Using `grep`,
a powerful command-line tool fror global expression search within files or text, we can check if the user exists within the file.

```sh
grep "node-exporter-worker" /etc/passwd
```

The output should look similar to this:

```text
node-exporter-worker:x:114:120::/home/node-exporter-worker:/usr/sbin/nologin
```

### 7.2.2 Installing the Node Exporter

When it comes to the Installation of the Node Exporter, we first have to get the latest version from the official [Prometheus Webpage](https://prometheus.io/download/#node_exporter). As of `May 2023`, the only listed version is `1.5.0`.

#### Download Github Package

Before downloading anything, make sure you are in the home directory so everything is in one place:

```sh
cd
```

We can then continue downloading this version using the previously installed `wget` tool. In this case, we're downloading the service directly from GitHub. Make sure to update your software version if there is a newer release.

```sh
wget https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-amd64.tar.gz
```

The output should look similar to this:

```text
...
[DATE] [TIME] (12.3 MB/s) - ‘node_exporter-1.5.0.linux-amd64.tar.gz’ saved [10181045/10181045]
```

#### Extract the Archive

After downloading it, we can extract the tape archive using Ubuntu's archiving tool. We're going to extract (`x`) and compress (`z`) the tape archive into its previous packaged files (`f`) using verbose mode (`v`) to list all files being processed during the extraction and compression.

```sh
tar xzfv node_exporter-1.5.0.linux-amd64.tar.gz
```

The output should look like this:

```text
node_exporter-1.5.0.linux-amd64/
node_exporter-1.5.0.linux-amd64/LICENSE
node_exporter-1.5.0.linux-amd64/NOTICE
node_exporter-1.5.0.linux-amd64/node_exporter
```

#### Copy the Service Binaries into the System's Path

After extraction, we can copy the exporter binaries to the system's path so they appear as installed dependencies and can be used appropriately and linked within services.

```sh
sudo cp node_exporter-1.5.0.linux-amd64/node_exporter /usr/local/bin/
```

#### Set Node Exporter Permissions

Now we can change the node Exporter service's owner to the one we created especially for this purpose.

The change owner tool `chown` on Ubuntu will take the following arguments:

- **[owner]**: Specifies the new owner of the file.
- **:[group]**: Specifies the group of the file.
- **path**: The file or directory whose ownership will be changed.

In our case, we are setting the user and group owners to the specified user `node-exporter-worker`.

```sh
sudo chown node-exporter-worker:node-exporter-worker /usr/local/bin/node_exporter
```

Not only do we need to change the owner this time, but we also need to ensure the correct access mode of the executable. We must allow the owner to read, write, and execute the file while the group and all other services can only read from it.

We can use the change mode tool `chmod` from Ubuntu. The permissions you can input are represented in octal, and each digit is the sum of its component bits:

- 4 stands for "read",
- 2 stands for "write", and
- 1 stands for "execute".

We can add the values together in order to combine functionality. The order in which those access rules are written down for a file is `user`, `group`, and `others`. Because we set the user before, the user `node-exporter-worker` will have full access rights.
In our case, the outcome will be `7 (user), 5 (group), 5 (others)`:

```sh
sudo chmod 755 /usr/local/bin/node_exporter
```

#### Cleaning up Install Files

After we have copied the executable file into the system's program path and given it the appropriate user rights, we can remove the extracted folder.

```sh
rm -rf node_exporter-1.5.0.linux-amd64
```

The same applies to the tape archive, which we have previously downloaded:

```sh
rm node_exporter-1.5.0.linux-amd64.tar.gz
```

### 7.2.3 Configuring the Service

After installation, we want to define how the Node Exporter service should be run. Within Ubuntu, the `/etc/systemd/system/` directory is where system service unit files are stored and used to configure services to start automatically at boot.

Here, we can create a file called `node_exporter.service`. A service file is generally used to define how daemon processes should be started. In our case, we create the file with the exact name of the Node Exporter service stored within the system directory to modify the Node Exporters startup process. We can use Vim on various other files as we did before.

```sh
sudo vim /etc/systemd/system/node_exporter.service
```

The configuration file is split between multiple sections: `[Unit]`, `[Service]`, and `[Install]`. The unit section contains generic options that are not dependent on the type of service and provide documentation. The service and install section is where we will house our configuration properties:

- **Description**: Provides a concise but meaningful explanation of the service used in the configuration
- **Documentation**: Provides a URL where more information to the program can be found
- **After**: Ensures that the service is started after the network has been set up.
- **User**: Specifies under which user the service will run. In this case, it will be `node-exporter-worker`.
- **Group**: Specifies under which user group the service will run. In this case, it will be `node-exporter-worker`.
- **Type**: This option configures the process startup type for this service unit. The `simple` value means the exec command configured will be the main process of the service.
- **ExecStart**: Specifies the command to run when the service starts. In this case, it's `/usr/local/bin/node_exporter` as the program folder of the node Exporter.
- **Restart**: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached. The `always` value means the service will be restarted regardless of whether it exited cleanly or not.
- **RestartSec**: This option configures the time to sleep before restarting a service. The value `5` means the service will wait for 5 seconds before it restarts. It is a typical default value and a balance between trying to restart the service quickly after a failure and not restarting it so rapidly that you could exacerbate problems.
- **SyslogIdentifier**: Sets the program name used when messages are logged to the system log.
- **StandardOutput**: Logfile where the output from the Node Exporter will be logged.
- **StandardError**: Logfile where errors from the Node Exporter will be logged.
- **ProtectSystem**: Protection rules to specify where the service can write files to the disk. If set to `full` it will limit the areas of the file system that the exporter can write outside of his regular application folder. It's ideal for us, as we use it for logging.
- **NoNewPrivileges**: Prevent the Node Exporter service and its children from gaining new service privileges independently.
- **PrivateTmp**: Set to allow the service to generate a private `/tmp` directory that other processes can't access.
- **WantedBy**: This option creates a small dependency and starts the service at boot time. If we input `multi-user.target`, we can specify that the service will start when the system is set up for multiple users. In our case, every Exporter service will have its user, fitting the description.

#### Node Exporter Logging

By default, the service will write journal logs into the `/var/log/journal/` folder using the `journal` service. But you can also configure it to use system logs written into the `/var/log/syslog` folder by the `syslog` process. Here is a quick rundown:

- `journal`: The logs are structured and include metadata about each log entry, making them easier to filter and analyze but more challenging to read our bugfix. The service includes default rate limiting and log rotation, which can help keep log sizes small. It also stores logs in a binary format, which can be more space-efficient and faster to process than text-based logs
- `syslog`: System logs are text-based logs, which are easier to read, bugfix, and process with traditional command-line tools. It also has a network protocol, so it could send logs to remote servers if thats something you need.

#### Process Ownership

Make sure you change the `User` and `Group` properties if you've previously changed the name, as it will fall back to `root` and could cause security risks. The final configuration should look like the following:

```text
[Unit]
Description=Node Exporter
Documentation=https://github.com/prometheus/node_exporter

[Service]
User=node-exporter-worker
Group=node-exporter-worker
Type=simple
ExecStart=/usr/local/bin/node_exporter
Restart=always
RestartSec=5
SyslogIdentifier=node_exporter
StandardOutput=journal
StandardError=journal
ProtectSystem=full
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

> Be cautious: When creating new rules or modifying existing ones, following the correct syntax and structure are essential to ensure that the Node Exporter functions appropriately and provides the desired level of security. Please verify that you do not use spaces between properties and their values.

### 7.2.4 Start the Node Exporter Service

First, we need to reload the system manager configuration. It is used when making changes to service configuration files or creating new service files, ensuring that systemd is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterwards, we can start the Node Exporter service using the system control command:

```sh
sudo systemctl start node_exporter
```

To enable the Node Exporter service to start when the system boots, we can use the system control to create a symbolic link as we did before.

```sh
sudo systemctl enable node_exporter
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/multi-user.target.wants/node_exporter.service → /etc/systemd/system/node_exporter.service.
```

We can fetch the current status from the system control to check if the Node Exporter service is running and configured correctly. It will display whether it is active, enabled, or disabled and show any recent log entries.

```sh
sudo systemctl status node_exporter
```

The output should look similar to this:

```text
● node_exporter.service - Node Exporter
     Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; >
     Active: active (running) since [DATE] UTC; [TIME] ago
       Docs: https://github.com/prometheus/node_exporter
   Main PID: 22812 (node_exporter)
      Tasks: 5 (limit: 38043)
     Memory: 2.8M
        CPU: 10ms
     CGroup: /system.slice/node_exporter.service
             └─22812 /usr/local/bin/node_exporter

[DATE] [USER] node_exporter[22812]: ts=2023-05-18T07:51:17.> ...
...
```

### 7.2.5 Maintenance

Proper maintenance ensures that all the components are working as intended, can be updated on the fly, and that software can be kept up-to-date and secure. It's also essential to identify and fix errors quickly.

#### Logging

If `journal` is your logging tool, you can access the full logs with the journal control tool.

- `-f`: Logging in follow mode displays the most recent journal entries and then updates in real-time as new entries are added.
- `-u`: In unit mode, it filters the log to show only entries for the specified system's service, this time `node_exporter`.

```sh
sudo journalctl -f -u node_exporter
```

#### Restarting

If you made any changes to configuration files, reload the system daemon:

```sh
sudo systemctl daemon-reload
```

Then, restart the service using the system control:

```sh
sudo systemctl restart node_exporter
```

#### Stopping

You can stop the service using the system control:

```sh
sudo systemctl stop node_exporter
```

### 7.2.6 Optional User Removal

If you ever want to remove the user or something went wrong, do the following steps:

Change the owner back to root:

```sh
sudo chown root:root /usr/local/bin/node_exporter
```

Remove the user and all the files, so there are no orphaned data blobs on your system:

```sh
sudo deluser --remove-all-files node-exporter-worker
```

```sh
sudo delgroup node-exporter-worker
```

Afterward, you can redo the Node Exporter guide and either set up a new user or remove the `User` property from the configuration in `7.2.3`. By default, the process will run as `root`. Also, go through every step in `7.2.4` once again.

### 7.2.6 Optional Software Removal

If you want to remove the Node Exporter tool, stop the running service:

```sh
sudo systemctl stop node_exporter
```

Disable the service:

```sh
sudo systemctl disable node_exporter
```

Remove the service file:

```sh
sudo rm /etc/systemd/system/node_exporter.service
```

Reload the system service daemon to get the service file change:

```sh
sudo systemctl daemon-reload
```

In the last step, remove the unlisted executable itself:

```sh
sudo rm -rf /usr/local/bin/node_exporter
```

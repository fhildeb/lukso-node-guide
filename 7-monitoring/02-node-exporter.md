## 7.2 Node Exporter Setup

We will start the monitoring by setting up the three node exporter services before we manage the core Prometheus connection to them. Here, everything will be set in place and load when we configure the Dashboard later on.

This has the following benefits:

- **Problem Encapsulation**: Installing exporters first, allows you to ensure that the necessary metrics are being exposed by the services you want to monitor. By installing and configuring exporters beforehand, you can verify that the metrics are accessible and correctly exposed. This helps in troubleshooting any potential issues with the exporters or the services themselves.
- **No Idle Rotation Problems**: With the exporters already installed and configured, Prometheus can immediately start scraping the endpoints and collecting metrics. This ensures that you have data available for monitoring as soon as Prometheus is up and running, which excludes errors where configurations would need to be reloaded and updated.

### 7.2.1 Creating a new User

In the context of setting up a Prometheus Node Exporter, we will create a system user specifically to run the Node Exporter service. Running services as a system user with minimal privileges is a common security best practice. It limits the potential damage if the service is somehow compromised. For example, the node exporter user won't be able to write to most directories on the system or execute commands as other users. We will use the system's own user creation tool:

- `--system`: This flag indicates that a system user should be created. System users are used to run services and daemons, rather than for people to log in with.
- `--group`: This flag instructs the user tool to to create a new group with the same name as the user.
- `--no-create-home`: By default, the user tool will create a home directory for each new user. This flag prevents that from happening, as we do not need different user directories if ye do not set the user up with an login. The option is typically used for users that are only meant to run a specific service and don't need a home directory. In this case, I'm naming the user `node-exporter-worker` so we can differenciate the service, that is often using the exact name of the program written in underscores, and the user account related to it. Feel free to come up with your own name, but bare in mind that you will have to change future commands.

```sh
sudo adduser --system node-exporter-worker --group --no-create-home
```

Once we configured the exporter, the node will run the service as this user, by specifying the user in our system deamon service file.

If you want to confirm that the user has been created, you can search for it within the password file `/etc/passwd`, that houses all essential information for each user account. Using `grep`,
a powerful command-line tool fror global expression search within files or text, we can check if the user exists within the file.

```sh
grep "node-exporter-worker" /etc/passwd
```

### 7.2.2 Installing the Node Exporter

> If you need an explanation of what the Node Exporter does, please have a look at the [Core Tools](./01-core-tools.md) section.

When it comes to the Installation of the Node Explorer, we first have to get the latest version from the official [Prometheus Webpage](https://prometheus.io/download/#node_exporter). As of `May 2023`, the only listed version is `1.5.0`.

#### Download Github Package

Before downloading anything, make sure you are in the home directory so everything is in one place:

```sh
cd
```

We can then continue to download this version using the previous installed `wget` tool. In this case, we're downloading the service directly from GitHub. Make sure to update your version if there is a newer release.

```sh
wget https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-amd64.tar.gz
```

#### Extract the Archive

After it has been downloaded, we can extract the tape archive using the related Ubuntu tool. We're going to extract (`x`) and compress (`z`) the archive into its previous packaged files (`f`) using verbose mode (`v`) to list all files being processed during the extraction and compression.

```sh
tar xzfv node_exporter-1.5.0.linux-amd64.tar.gz
```

#### Copy the Service Binaries into the System's Path

After extraction we can copy the exporter binaries to the system's path so they show up as installed dependencies and can be properly used and linked within services.

```sh
sudo cp node_exporter-1.5.0.linux-amd64/node_exporter /usr/local/bin/
```

#### Set Node Explorer Permissionsets

Now we can change the owner of the node explorer service to the one that we created especially for this purpose:

```sh
sudo chown node-exporter-worker:node-exporter-worker /usr/local/bin/node_exporter
```

#### Cleaning up Install Files

After we copied the binary executable file into the system's program path and gave it the appropriate user rights, we can remove the extracted folder.

```sh
rm -rf node_exporter-1.0.1.linux-amd64
```

The same applies to the tape archive, which we have previously downloaded:

```sh
rm node_exporter-1.0.1.linux-amd64.tar.gz
```

### 7.2.3 Configuring the Service

After installation, we want to define how the node exporter service should be run. Within Ubuntu, the `/etc/systemd/system/` directory is where system service unit files are stored and used to configure services to start automatically at boot.

Here, we can create a file called `node_exporter.service`. A service file is generally used to define how a deamon processes should be started. In our case, we create the file with the exact name of the node explorer service that also stored within the system directory, in order to modify the node explorers startup process. We can use Vim, as we did before on various other files.

```sh
sudo vim /etc/systemd/system/node_exporter.service
```

The configuration file is split between multiple sections: `[Unit]`, `[Service]`, and `[Install]`. The unit contains generic options that are not dependent on the type of service and provide documentation. The service and install section is where we will house our configuration properties:

- **Description**: Provides a concise but meaningful explanation of the service used in the configuration
- **Documentation**: Provides a URL where more information to the program can be found
- **After**: Ensures that the service is started after the network has been set up.
- **User**: Specifies under which user the service will run. In this case, it will be `node-exporter-worker`.
- **Type**: This option configures the process start-up type for this service unit. The `simple` value means the exec command configured will be the main process of the service.
- **ExecStart**: Specifies the command to run when the service starts. In this case, it's `/usr/local/bin/node_exporter` as program folder of the node explorer.
- **Restart**: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached. The `always` value means the service will be restarted regardless of whether it exited cleanly or not.
- **RestartSec**: This option configures the time to sleep before restarting a service. The value `5` means the service will wait for 5 seconds before it restarts. It is a common default value and a balance between trying to restart the service quickly after a failure and not restarting it so rapidly that you could exacerbate problems.
- **StandardOutput**: Logfile where output from the node explorer will be logged.
- **StandardError**: Logfile where errors from the node explorer will be logged.
- **SyslogIdentifier**: Sets the program name used when messages are logged to the system log.
- **ProtectSystem**: Protection rules to specify where the service can write files to the disk. If set to `full` it will limit the areas of the file system that the explorer can write outside of his regular application folder. This works best as we are just using it for logging.
- **NoNewPrivileges**: Prevent the node exporter service and its children from gaining new service privileges on its own.
- **PrivateTmp**: Set to allow the service to generate a private `/tmp` directory that other processes can't access.
- **WantedBy**: This option creates a small dependency and makes the service get started at boot time. If we input `multi-user.target` we can specify that the service will start when the system is set up for multiple users. In our case, every explorer service will have its own user, kinda fitting the description.

#### Logging

By default, the service will write journal logs into the `/var/log/journal/` folder using the `journald` service. But you can also configure it to use system logs that are written into the `/var/log/syslog` folder by the `syslog` process. Here is a quick rundown:

- `journald`: The logs are structured and include metadata about each log entry, which can make them easier to filter and analyze, but harder to read our bugfix. The service includes rate limiting and log rotation by default, which can help keep log sizes small. It also stores logs in a binary format, which can be more space-efficient and faster to process than text-based logs
- `syslog`: System logs are text-based logs, which is easier to read, bugfix, and process with traditional command-line tools. It also has a network protocol, so it could send logs to remote servers, if thats something you need.

I will keep the default journald for now. Therefore, the content of the node exporter service configuration should look like the one below. Make sure that you change the `User` property if you've previously changed the name. Feel free to make any adjustments that better suite your environment.

```text
[Unit]
Description=Node Exporter
Documentation=https://github.com/prometheus/node_exporter
After=network.target

[Service]
User=node-exporter-worker
Type=simple
ExecStart=/usr/local/bin/node_exporter
Restart=always
RestartSec=5
StandardOutput=journald
StandardError=journald
SyslogIdentifier=node_exporter
ProtectSystem=full
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

> Be cautious: When creating new rules or modifying existing ones, it's essential to follow the correct syntax and structure to ensure that the Node Explorer functions properly and provides the desired level of security. Verify that you do not use spaces between properties and their values.

### 7.2.4 Start the Node Explorer Service

First we need to reload the system manager configuration. It is used when making changes to service configuration files or create new service files, ensuring that systemd is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterwards we can start the Node Exporter service using the system control command:

```sh
sudo systemctl start node_exporter
```

To enable the Node Exporter service to start automatically when the system boots we can use the system control to creates a symbolic link as we did before.

```sh
sudo systemctl enable node_exporter
```

To check if the Node Exporter service is running and configured properly, we can fetch the current status from the system control. It will display whether it is active, enabled, or disabled, and show any recent log entries.

```sh
sudo systemctl status node_exporter
```

The output should look similar to this:

```text
TODO:
```

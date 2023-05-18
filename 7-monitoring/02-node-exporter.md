## 7.2 Node Exporter Setup

We will start the monitoring by setting up the three Node Exporter services before we manage the core Prometheus connection to them. Here, everything will be set in place and load when we configure the Dashboard later on.

This has the following benefits:

- **Problem Encapsulation**: Installing exporters first, allows you to ensure that the necessary metrics are being exposed by the services you want to monitor. By installing and configuring exporters beforehand, you can verify that the metrics are accessible and correctly exposed. This helps in troubleshooting any potential issues with the exporters or the services themselves.
- **No Idle Rotation Problems**: With the exporters already installed and configured, Prometheus can immediately start scraping the endpoints and collecting metrics. This ensures that you have data available for monitoring as soon as Prometheus is up and running, which excludes errors where configurations would need to be reloaded and updated.

> The Node Exporter allows you to measure various machine resources such as memory, disk I/O, CPU usage, network statistics, and more. This is crucial because these metrics give you a broad overview of your machine's performance and health, allowing you to monitor how your node is affecting your system's resources and catch any potential issues (like memory leaks or high CPU usage) before they cause problems. Running Node Exporter on every node of your network provides you with valuable insights and helps ensure the smooth operation of your blockchain applications.

### 7.2.1 Creating a new User

In the context of setting up a Prometheus Node Exporter, we will create a system user specifically to run the Node Exporter service. Running services as a system user with minimal privileges is a common security best practice. It limits the potential damage if the service is somehow compromised. For example, the Node Exporter user won't be able to write to most directories on the system or execute commands as other users. We will use the system's own user creation tool:

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

We can then continue to download this version using the previous installed `wget` tool. In this case, we're downloading the service directly from GitHub. Make sure to update your version if there is a newer release.

```sh
wget https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-amd64.tar.gz
```

The output should look similar to this:

```text
...
[DATE] [TIME] (12.3 MB/s) - ‘node_exporter-1.5.0.linux-amd64.tar.gz’ saved [10181045/10181045]
```

#### Extract the Archive

After it has been downloaded, we can extract the tape archive using the related Ubuntu tool. We're going to extract (`x`) and compress (`z`) the archive into its previous packaged files (`f`) using verbose mode (`v`) to list all files being processed during the extraction and compression.

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

After extraction we can copy the exporter binaries to the system's path so they show up as installed dependencies and can be properly used and linked within services.

```sh
sudo cp node_exporter-1.5.0.linux-amd64/node_exporter /usr/local/bin/
```

#### Set Node Exporter Permissionsets

Now we can change the owner of the node Exporter service to the one that we created especially for this purpose.

The change owner tool `chown` on Ubuntu will take the following arguments:

- **[owner]**: Specifies the new owner of the file.
- **:[group]**: Specifies the group of the file.
- **path**: The file or directory whose ownership will be changed.

In our case, we are setting both the user owner and the group owner to the specified user `node-exporter-worker`.

```sh
sudo chown node-exporter-worker:node-exporter-worker /usr/local/bin/node_exporter
```

#### Cleaning up Install Files

After we copied the executable file into the system's program path and gave it the appropriate user rights, we can remove the extracted folder.

```sh
rm -rf node_exporter-1.5.0.linux-amd64
```

The same applies to the tape archive, which we have previously downloaded:

```sh
rm node_exporter-1.5.0.linux-amd64.tar.gz
```

### 7.2.3 Configuring the Service

After installation, we want to define how the Node Exporter service should be run. Within Ubuntu, the `/etc/systemd/system/` directory is where system service unit files are stored and used to configure services to start automatically at boot.

Here, we can create a file called `node_exporter.service`. A service file is generally used to define how a deamon processes should be started. In our case, we create the file with the exact name of the Node Exporter service that also stored within the system directory, in order to modify the node Exporters startup process. We can use Vim, as we did before on various other files.

```sh
sudo vim /etc/systemd/system/node_exporter.service
```

The configuration file is split between multiple sections: `[Unit]`, `[Service]`, and `[Install]`. The unit contains generic options that are not dependent on the type of service and provide documentation. The service and install section is where we will house our configuration properties:

- **Description**: Provides a concise but meaningful explanation of the service used in the configuration
- **Documentation**: Provides a URL where more information to the program can be found
- **After**: Ensures that the service is started after the network has been set up.
- **User**: Specifies under which user the service will run. In this case, it will be `node-exporter-worker`.
- **Type**: This option configures the process start-up type for this service unit. The `simple` value means the exec command configured will be the main process of the service.
- **ExecStart**: Specifies the command to run when the service starts. In this case, it's `/usr/local/bin/node_exporter` as program folder of the node Exporter.
- **Restart**: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached. The `always` value means the service will be restarted regardless of whether it exited cleanly or not.
- **RestartSec**: This option configures the time to sleep before restarting a service. The value `5` means the service will wait for 5 seconds before it restarts. It is a common default value and a balance between trying to restart the service quickly after a failure and not restarting it so rapidly that you could exacerbate problems.
- **SyslogIdentifier**: Sets the program name used when messages are logged to the system log.
- **WantedBy**: This option creates a small dependency and makes the service get started at boot time. If we input `multi-user.target` we can specify that the service will start when the system is set up for multiple users. In our case, every Exporter service will have its own user, kinda fitting the description.

```text
[Unit]
Description=Node Exporter
Documentation=https://github.com/prometheus/node_exporter

[Service]
User=node-exporter-worker
Type=simple
ExecStart=/usr/local/bin/node_exporter
Restart=always
RestartSec=5
SyslogIdentifier=node_exporter

[Install]
WantedBy=multi-user.target
```

> Be cautious: When creating new rules or modifying existing ones, it's essential to follow the correct syntax and structure to ensure that the Node Exporter functions properly and provides the desired level of security. Verify that you do not use spaces between properties and their values.

### 7.2.4 Start the Node Exporter Service

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

```text
Created symlink /etc/systemd/system/multi-user.target.wants/node_exporter.service → /etc/systemd/system/node_exporter.service.
```

To check if the Node Exporter service is running and configured properly, we can fetch the current status from the system control. It will display whether it is active, enabled, or disabled, and show any recent log entries.

```sh
sudo systemctl status node_exporter
```

The output should look similar to this:

```text
● node_exporter.service - Node Exporter
     Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; >
     Active: active (running) since Thu 2023-05-18 07:51:17 UTC; 1min 21s>
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

### 7.2.5 Optional User Removal

If you ever want to remove the user or something went wrong do the following steps:

Change the owner back to root:

```sh
sudo chown root:root /usr/local/bin/node_exporter
```

Remove the user and all the files, so there are no orphant data blobs on your system:

```sh
sudo deluser --remove-all-files node-exporter-worker
```

```sh
sudo delgroup node-exporter-worker
```

Afterwards, you can redo the Node Exporter guide and either set up a new user or remove the `User` property from the configuration in `7.2.3`. By default, the process will run as `root`. Also make sure to go through every step in `7.2.4` once again.

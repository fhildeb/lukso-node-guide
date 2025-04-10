---
sidebar_label: "8.7 Grafana"
sidebar_position: 7
---

# 8.7 Grafana

## 7.6 Grafana Dashboard

As the final step within the monitoring, we will set up a Grafana Dashboard to gather all metrics in one place.

### 7.6.1 Creating a New User

As explained and done [previously](#), we will create a new user to run the Grafana service specifically. Running services as a system user with minimal privileges is a common security best practice.

<!--TODO: ./02-node-exporter.md-->

- `--system`: This flag indicates that a system user should be created. System users are used to run services and daemons rather than for people to log in with.
- `--group`: This flag instructs the user tool to create a new group with the same name as the user.
- `--no-create-home`: By default, the user tool will create a home directory for each new user. This flag prevents that from happening, as we do not need different user directories if ye do not set the user up with a login. The option is typically used for users that are only meant to run a specific service and don't need a home directory. In this case, I'm naming the user `grafana-exporter-worker` to differentiate the service, often using the exact name of the program written in underscores and the user account related to it. Feel free to create your own name, but remember that you must change future commands.

```sh
sudo adduser --system grafana-server-worker --group --no-create-home
```

If you want to confirm that the user has been created, you can search for it within the password file `/etc/passwd`, that houses all essential information for each user account. Using `grep`, a powerful command-line tool for global expression search within files or text, we can check if the user exists within the file.

```sh
grep "grafana-server-worker" /etc/passwd
```

The output should look similar to this:

```text
grafana-server-worker:x:117:123::/home/grafana-server-worker:/usr/sbin/nologin
```

### 7.6.2 Installation

Before downloading or installing anything, make sure you are in the home directory so everything is in one place:

```sh
cd
```

First, we should download the GPG key for the Grafana repository and adds it to the list of trusted keys in apt to ensure that the packages you download from the Grafana repository are authentic. We will add the key to the system's shared keyring folder. We use `curl` for getting or sending data using URL syntax and `gpg` to encrypt the key.

- `-fsS`: The `f` option tells curl to fail silently on server errors and hides regular progress outputs with `s`. It is mainly done to enable scripts better to better deal with failed attempts as we are using a pipe.
- `-S`: The `S` option is used with the silent mode and will show an error message if it fails to cancel the pipe action.
- `-L`: If the server reports that the requested page has moved to a different location, this option will make curl redo the request on the newly updated URL location of the key.
- `pipe` The `|` specifies a pipe that takes the output from the first command and uses it as input to the second command.
- `--dearmor`: Converts the ASCII armored key from the left side of the pipe into a binary format GPG can use for the package list.
- `-o`: Specifies where the output will be saved. In this case, it's writing to the trusted package list `/etc/apt/trusted.gpg.d`

```sh
curl -fsSL https://packages.grafana.com/gpg.key|sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/grafana.gpg
```

You can verify the added key with the `gpg` command.

- `--no-default-keyring`: Tells GPG not to use the default keyring. By default, gpg uses the keyring stored in `~/.gnupg/pubring.gpg` for GNU Packages of Ubuntu.
- `--keyring`: This specifies the keyring file to use. Instead of using the default keyring, gpg will use the specified file. In our case, it's `/usr/share/keyrings/grafana-archive-keyring.gpg`.
- `--list-keys`: List the public keys in the specified keyring.

Continue using this:

```sh
gpg --no-default-keyring --keyring /etc/apt/trusted.gpg.d/grafana.gpg --list-keys
```

You will find the entry of the `Grafana Labs` key similar to this one:

```text
/etc/apt/trusted.gpg.d/grafana.gpg
----------------------------------
pub   rsa3072 2023-01-06 [SC] [expires: DATE]
      0E22EB88E39E12277A7760AE9E439B102CF3C0C6
uid           [ unknown] Grafana Labs <engineering@grafana.com>
sub   rsa3072 2023-01-06 [E] [expires: DATE]
```

We can then add the Grafana repository to your list of repositories, allowing apt to install packages using the previously installed `software-properties-common` service that comes with the tool `add-apt-repository`. It's the standard way to add additional repositories to your sources in Ubuntu and many other Debian-based systems.

```sh
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
```

Press `Enter` to continue fetching the packages. Afterward, we can update the package list and download the official [Grafana](https://grafana.com/) software. It will check the GPG key underneath.

```sh
sudo apt update
```

Now we can download the latest supported Grafana build:

```sh
# Check for all available versions
apt list -a grafana

# Install Version 9.5.2
sudo apt install grafana=9.5.2

# If you have a own Grafana board, you can also install the latest version
# sudo apt install grafana

# Put Grafana Updates on hold so its not updated automatically
sudo apt-mark hold grafana
```

Whenever you update your Ubuntu packages using APT, it will automatically fetch the latest Grafana updates.

### 7.6.3 Set Grafana Permissionsets

Now we can change the owner of the software applications. Ownership changes are commonly done for security reasons. Giving root ownership to these binary files prevents non-root users or exporter workers from modifying or replacing these important executables, which could lead to unauthorized or unexpected behavior.

As previously explained in the [Node Exporter](#) section of the guide, we can set both the user and group to the specified service user.

<!--TODO: ./02-node-exporter.md-->

```sh
sudo chown -R grafana-server-worker:grafana-server-worker /usr/sbin/grafana
```

The same applies to the server itself:

```sh
sudo chown -R grafana-server-worker:grafana-server-worker /usr/sbin/grafana-server
```

We do the same for all configuration folders that need to be loaded.

```sh
sudo chown -R grafana-server-worker:grafana-server-worker /etc/grafana
```

Another permission is needed for the database:

```sh
sudo chown -R grafana-server-worker:grafana-server-worker /var/lib/grafana
```

The same applies to the log files that are generated:

```sh
sudo chown -R grafana-server-worker:grafana-server-worker /var/log/grafana
```

Not only do we need to change the owner this time, but we also need to change the access mode of the executable. We must allow the owner to read, write, and execute the file while the group and all other services can only read from it.

We can use the change mode tool `chmod` as we already did within the [Node Exporter](#) section of the guide.

<!--TODO: ./02-node-exporter.md-->

```sh
sudo chmod 755 /usr/sbin/grafana
```

We do the same for the server again.

```sh
sudo chmod 755 /usr/sbin/grafana-server
```

The Grafana database also needs privileges:

```sh
sudo chmod 755 /var/lib/grafana
```

### 7.6.4 Configuring the Service

Within Ubuntu, the `/etc/systemd/system/` directory is where system service unit files are stored and used to configure services to start automatically at boot. A service file is generally used to define how daemon processes should be started. In our case, we create the file with the exact name of the Prometheus service stored within the system directory to modify Prometheus' startup process.

**Grafana's configuration data is already set within** `grafana-server.service` **after installation. However, we will add and edit some properties.**

```sh
sudo vim /lib/systemd/system/grafana-server.service
```

The configuration file is split between multiple sections: `[Unit]`, `[Service]`, and `[Install]`. The unit section contains generic options that are not dependent on the type of service and provide documentation. The service and install section is where we will house our configuration properties:

- **Description**: Provides a concise but meaningful explanation of the service used in the configuration
- **Documentation**: Provides a URL where more information about the program can be found
- **Wants**: Minor requirement for the startup to proceed safely. In our case, it indicates that the service should want an internet connection but continues even if it can not be established.
- **After**: Ensures that the service is started after the network has been set up.
- **EnvironmentFile**: Specifies a file containing the service's environment variables. The environment variables are set before the service is started.
- **User**: Specifies under which user the service will run. In this case, it will be `prometheus-worker`.
- **Group**: - **User**: Specifies under which usergroup the service will run. In this case, it will be `prometheus-worker`.
- **Type**: This option configures the process startup type for this service unit. The `simple` value means the exec command configured will be the main process of the service.
- **Restart**: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached. The `on-failure` value means the service will be restarted if the server instance crashes.
- **WorkingDirectory**: Sets the working directory for the executed process.
- **RuntimeDirectory**: Sets the runtime directory for the service, which is created before the service starts and removed when the service stops.
- **RuntimeDirectoryMode**: This sets the file mode permissions for the runtime directory specified by `RuntimeDirectory`.
- **ExecStart**: Specifies the command to run when the service starts. In this case, it's `/usr/local/bin/prometheus` as the program folder of Prometheus. In addition, there are several other options passed to the startup. It will load the configuration from `/etc/prometheus/prometheus.yaml`, it will store the database within `/var/lib/prometheus/`, it will set the data storing expiring date to one month, it will set the directory containing the web console template files to `/etc/prometheus/consoles`, and last but not least, it will specify the folder of the console library files at `/etc/prometheus/console_libraries`.
- **LimitNOFILE**: This setting controls the maximum number of file descriptors the service can open.
- **TimeoutStopSec**: This setting specifies the maximum time the service should stop before being forcibly terminated by SIGKILL.
- **LockPersonality**: If set, the service's kernel personality setting, which determines the ABI used for system calls, will be locked to prevent changes.
- **MemoryDenyWriteExecute**: This setting determines whether the service can create memory mappings that are both writable and executable. Disabling this can prevent certain types of exploits.
- **NoNewPrivileges**: Prevent the Prometheus service and its children from gaining new service privileges independently.
- **PrivateDevices**: If this is set, the service will not have access to any physical devices. The option increases the security of the service by preventing it from directly interacting with hardware or device drivers.
- **PrivateTmp**: Set to allow the service to generate a private `/tmp` directory that other processes can't access.
- **ProtectClock**: The service cannot change the system clock if enabled.
- **ProtectControlGroups**: If set, the service cannot modify the control group filesystem, preventing it from altering process resource limits and accounting settings.
- **ProtectHome**: If enabled, the service is prevented from accessing the user's home directories.
- **ProtectHostname**: The service cannot change the system's hostname if enabled.
- **ProtectKernelLogs**: If enabled, the service cannot access or control the kernel log ring buffer, preventing it from reading sensitive kernel log entries or flooding the log.
- **ProtectKernelModules**: If enabled, the service cannot load or unload kernel modules, preventing it from altering the system's hardware capabilities.
- **ProtectKernelTunables**: If enabled, the service cannot modify kernel variables, restricting its ability to alter the system's behavior.
- **ProtectProc**: This setting restricts the visibility of other processes in `/proc`. The 'invisible' setting will hide all processes that the service's user doesn't own.
- **ProtectSystem**: Protection rules to specify where the service can write files to the disk. If set to `full` it will limit the areas of the file system that the Exporter can write outside of his regular application folder. This protection type works best as we are just using it for logging.
- **RemoveIPC**: When enabled, Systemd will remove all SysV and POSIX IPC objects the user owns when the user fully logs out.
- **RestrictAddressFamilies**: This setting restricts the socket address families the service can use.
- **RestrictNamespaces**: If set, this limits the types of Linux namespaces the process can access. The option can be used to restrict the parts of the system the service can see.
- **RestrictRealtime**: If set, the service cannot acquire real-time scheduling, which could be used to monopolize the CPU.
- **RestrictSUIDSGID**: If enabled, the service cannot create or use SUID/SGID files, which can prevent privilege escalation exploits.
- **SystemCallArchitectures**: This restricts the system calls the service can execute to a specific architecture.
- **UMask**: This sets the default file creation permissions for the service.
- **WantedBy**: This option creates a small dependency and starts the service at boot time. If we input `multi-user.target`, we can specify that the service will begin when the system is set up for multiple users. In our case, every exporter service will have its user, kinda fitting the description.
- **RestartSec**: This option configures the time to sleep before restarting a service. The value `5` means the service will wait for 5 seconds before it continues. It is a typical default value and a balance between trying to restart the service quickly after a failure and not renewing it so rapidly that you could exacerbate problems.
- **SyslogIdentifier**: Sets the program name used when messages are logged to the system log.
- **PrivateUsers**: This setting controls whether to run the service in its own user namespace. If set, all users and groups will be mapped to `nobody` or `nogroup`, except for root. As Grafana is exposed, this should be activated.

#### Grafana Logging

By default, the service will write journal logs into the `/var/log/journal/` folder using the `journal` service. But you can also configure it to use system logs written into the `/var/log/syslog` folder by the `syslog` process. Here is a quick rundown:

- `journal`: The logs are structured and include metadata about each log entry, making them easier to filter and analyze but harder to read our bugfix. The service includes default rate limiting and log rotation, which can help keep log sizes small. It also stores logs in a binary format, which can be more space-efficient and faster to process than text-based logs
- `syslog`: System logs are text-based logs, which are easier to read, bugfix, and process with traditional command-line tools. It also has a network protocol, so it could send logs to remote servers if thats something you need.

#### Process Ownership

Make sure you change the `User` and `Group` properties if you've previously changed the name, as it will fall back to `root` and could cause security risks.

We can modify the configuration file by setting the `RestartSec`, `SyslogIdentifier`, and `PrivateUsers` properties at the end of the `[SERVICE]` section.

> Please note that you do not have to copy and paste the file. Just edit User and Group, and add the 3 properties to the bottom of the Service section.

Our final configuration file will look like this:

```text
[Unit]
Description=Grafana instance
Documentation=http://docs.grafana.org
Wants=network-online.target
After=network-online.target
After=postgresql.service mariadb.service mysql.service influxdb.service

[Service]
EnvironmentFile=/etc/default/grafana-server
User=grafana-server-worker
Group=grafana-server-worker
Type=simple
Restart=on-failure
WorkingDirectory=/usr/share/grafana
RuntimeDirectory=grafana
RuntimeDirectoryMode=0750
ExecStart=/usr/share/grafana/bin/grafana server                                     \
                            --config=${CONF_FILE}                                   \
                            --pidfile=${PID_FILE_DIR}/grafana-server.pid            \
                            --packaging=deb                                         \
                            cfg:default.paths.logs=${LOG_DIR}                       \
                            cfg:default.paths.data=${DATA_DIR}                      \
                            cfg:default.paths.plugins=${PLUGINS_DIR}                \
                            cfg:default.paths.provisioning=${PROVISIONING_CFG_DIR}

LimitNOFILE=10000
TimeoutStopSec=20
CapabilityBoundingSet=
DeviceAllow=
LockPersonality=true
MemoryDenyWriteExecute=false
NoNewPrivileges=true
PrivateDevices=true
PrivateTmp=true
ProtectClock=true
ProtectControlGroups=true
ProtectHome=true
ProtectHostname=true
ProtectKernelLogs=true
ProtectKernelModules=true
ProtectKernelTunables=true
ProtectProc=invisible
ProtectSystem=full
RemoveIPC=true
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
RestrictNamespaces=true
RestrictRealtime=true
RestrictSUIDSGID=true
SystemCallArchitectures=native
UMask=0027
RestartSec=5
SyslogIdentifier=grafana-server
PrivateUsers=true

[Install]
WantedBy=multi-user.target
```

> Be cautious: When creating new rules or modifying existing ones, it's essential to follow the correct syntax and structure to ensure that the Prometheus functions properly and provides the desired level of security. Verify that you do not use spaces between properties and their values.

### 7.6.5 Start the Grafana Service

First, we need to reload the system manager configuration. It is used when making changes to service configuration files or creating new service files, ensuring that the system's daemon is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterwards, we can start the Grafana Server using the system control command:

```sh
sudo systemctl start grafana-server
```

To enable the Grafana Server to start when the system boots, we can use the system control to create a symbolic link as we did before.

```sh
sudo systemctl enable grafana-server
```

The output should look similar to this:

```text
Synchronizing state of grafana-server.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install enable grafana-server
Created symlink /etc/systemd/system/multi-user.target.wants/grafana-server.service → /lib/systemd/system/grafana-server.service.
```

We can fetch the current status from the system control to check if Grafana Server is running and configured correctly. It will display whether it is active, enabled, or disabled and show any recent log entries.

```sh
sudo systemctl status grafana-server
```

The output should look similar to this:

```text
● grafana-server.service - Grafana instance
     Loaded: loaded (/lib/systemd/system/grafana-server.service; enabled; vendo>
     Active: active (running) since [DATE] UTC; [TIME] ago
       Docs: http://docs.grafana.org
   Main PID: 84000 (grafana)
      Tasks: 17 (limit: 38043)
     Memory: 65.7M
        CPU: 3.855s
     CGroup: /system.slice/grafana-server.service
             └─84000 /usr/share/grafana/bin/grafana server --config=/etc/grafan>

[DATE] [TIME] [USER] grafana[84000]: logger=modules t=2023-05-18T15:09:2>...
...
```

### 7.6.6 Maintenance

Proper maintenance ensures that all the components are working as intended, can be updated on the fly, and that software can be kept up-to-date and secure. It's also essential to identify and fix errors quickly.

#### Logging

If `journal` is your logging tool, you can access the full logs with the journal control tool.

- `-f`: Logging in follow mode displays the most recent journal entries and then updates in real-time as new entries are added.
- `-u`: In unit mode, it filters the log to show only entries for the specified system's service, this time `grafana-server`.

```sh
sudo journalctl -f -u grafana-server
```

#### Restarting

If you made any changes to configuration files, reload the system daemon:

```sh
sudo systemctl daemon-reload
```

Then, restart the service using the system control:

```sh
sudo systemctl restart grafana-server
```

#### Stopping

You can stop the service using the system control:

```sh
sudo systemctl stop grafana-server
```

### 7.6.7 Adjusting the Time Zone

In some cases, there are issues when having different timezones set on your system and your personal computer when accessing Grafana. On the other hand, metrics might also show the wrong timestamps. You can check if the wanted timezone is correct by typing:

```sh
timedatectl
```

In case there is an offset, you can set a new timezone. This will automatically take effect for all applications and log files created on your node machine. Make sure you check online which timezone you are in and whats the correct naming.

```sh
sudo timedatectl set-timezone <your-time-zone>

# Example for Berlin Time
sudo timedatectl set-timezone Europe/Berlin
```

### 7.6.8 Optional User Removal

If you ever want to remove the user or something went wrong, do the following steps:

Change the owner of Grafana back to root:

```sh
sudo chown -R root:root /usr/sbin/grafana
```

The same applies to the server itself:

```sh
sudo chown -R root:root /usr/sbin/grafana-server
```

We do the same for all configuration folders that need to be loaded.

```sh
sudo chown -R root:root /etc/grafana
```

Another permission is needed for the database:

```sh
sudo chown -R root:root /var/lib/grafana
```

The same applies to the log files that are generated:

```sh
sudo chown -R root:root /var/log/grafana
```

Remove the user and all the files so there are no orphaned data blobs on your system:

```sh
sudo deluser --remove-all-files grafana-server-worker
```

```sh
sudo delgroup grafana-server-worker
```

Afterward, you can redo the Grafana guide and either set up a new user or remove the `User` and `Group` properties from the configuration in `7.6.4`. By default, the process will run as `root`. Also, go through every step in `7.6.5` once again.

### 7.6.9 Optional Software Removal

If you want to remove the Grafana software, stop the running service:

```sh
sudo systemctl stop grafana-server
```

Disable the service:

```sh
sudo systemctl disable grafana-server
```

Remove the service file:

```sh
sudo rm /lib/systemd/system/grafana-server.service
```

Reload the system service daemon to get the service file change:

```sh
sudo systemctl daemon-reload
```

Then continue deleting the configuration folders:

```sh
sudo rm -rf /etc/grafana
```

Remove the Grafana database:

```sh
sudo rm -rf /var/lib/grafana
```

Remove the server's log folder:

```sh
sudo rm -rf /var/log/grafana
```

Remove the Promtool executable:

```sh
sudo rm -rf /usr/sbin/grafana-server
```

In the last step, remove the unlisted Prometheus executable itself:

```sh
sudo rm -rf /usr/sbin/grafana
```

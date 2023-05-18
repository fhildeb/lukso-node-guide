## 7.6 Grafana Dashboard

As the final step within the monitoring, we will set up a Grafana Dashboard to have all gathered

### 7.6.1 Creating a new User

Like explained and done [previously](./02-node-exporter.md), we will create a new user to specifically to run the JSON Exporter service. Running services as a system user with minimal privileges is a common security best practice.

- `--system`: This flag indicates that a system user should be created. System users are used to run services and daemons, rather than for people to log in with.
- `--group`: This flag instructs the user tool to to create a new group with the same name as the user.
- `--no-create-home`: By default, the user tool will create a home directory for each new user. This flag prevents that from happening, as we do not need different user directories if ye do not set the user up with an login. The option is typically used for users that are only meant to run a specific service and don't need a home directory. In this case, I'm naming the user `node-exporter-worker` so we can differenciate the service, that is often using the exact name of the program written in underscores, and the user account related to it. Feel free to come up with your own name, but bare in mind that you will have to change future commands.

```sh
sudo adduser --system grafana-server-worker --group --no-create-home
```

If you want to confirm that the user has been created, you can search for it within the password file `/etc/passwd`, that houses all essential information for each user account. Using `grep`, a powerful command-line tool fror global expression search within files or text, we can check if the user exists within the file.

```sh
grep "grafana-server-worker" /etc/passwd
```

The output should look similar to this:

```text
grafana-server-worker:x:118:124::/home/grafana-server-worker:/usr/sbin/nologin
```

### 7.6.2 Installation

Before downloading or installing anything, make sure you are in the home directory so everything is in one place:

```sh
cd
```

First we should download the GPG key for the Grafana repository and adds it to the list of trusted keys in apt to ensure that the packages you download from the Grafana repository are authentic. We will add the key to the system's shared keyring folder. We use `curl` for getting or sending data using URL syntax and `gpg` to encrypt the key.

- `-fsS`: The `f` option tells curl to fail silently on server errors as well as hide regular progress outputs with `s`. It is mainly done to better enable scripts etc to better deal with failed attempts as we are using a pipe.
- `-S`: The `S` option is used with the silent mode and will show an error message if it fails to cancel the pipe action.
- `-L`: If the server reports that the requested page has moved to a different location, this option will make curl redo the request on the new updated URL location of the key.
- `pipe` The `|` specifies a pipe that takes the output from the first command and uses it as input to the second command.
- `--dearmor`: Converts the ASCII armored key from the left side of the pipe into a binary format GPG can use for the package list.
- `-o`: Specifies where the output will be saved. In this case, it's writing to the trusted package list `/etc/apt/trusted.gpg.d`

```sh
curl -fsSL https://packages.grafana.com/gpg.key|sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/grafana.gpg
```

You can verify the added key with the `gpg` command.

- `--no-default-keyring`: Tells GPG not to use the default keyring. By default, gpg uses the keyring stored in `~/.gnupg/pubring.gpg` used for GNU Packages of Ubuntu.
- `--keyring`: This specifies the keyring file to use. Instead of using the default keyring, gpg will use the specified file. In our case, it's `/usr/share/keyrings/grafana-archive-keyring.gpg`.
- `--list-keys`: List the public keys in the specified keyring.

Continue using this:

```sh
gpg --no-default-keyring --keyring /etc/apt/trusted.gpg.d/grafana.gpg --list-keys
```

You will find the enty of the `Grafana Labs` key similar to this one:

```text
/etc/apt/trusted.gpg.d/grafana.gpg
----------------------------------
pub   rsa3072 2023-01-06 [SC] [expires: DATE]
      0E22EB88E39E12277A7760AE9E439B102CF3C0C6
uid           [ unknown] Grafana Labs <engineering@grafana.com>
sub   rsa3072 2023-01-06 [E] [expires: DATE]
```

We can then add the Grafana repository to your list of repositories, allowing apt to install packages from it using the previous installed `software-properties-common` service that comes with the tool `add-apt-repository`. Its the standard way to add additional repositories to your sources in Ubuntu and many other Debian-based systems.

```sh
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
```

Press `Enter` to continue with fetching the packages. Afterwards, we can update the package list and download the official [Grafana](https://grafana.com/) software. It will check the GPG key underneath.

```sh
sudo apt update
```

Now we can download the latest Grafana build:

```sh
sudo apt install grafana
```

Whenever you update your ubuntu packages using APT, it will automatically fetch the latest Grafana updates.

### 7.6.3 Configuring the Service

After installation, we want to define how the Prometheus service should be run itself. Within Ubuntu, the `/etc/systemd/system/` directory is where system service unit files are stored and used to configure services to start automatically at boot.

Here, we can create a file called `grafana-server.service`. A service file is generally used to define how a deamon processes should be started. In our case, we create the file with the exact name of the Prometheus service that also stored within the system directory, in order to modify Prometheus' startup process. We can use Vim, as we did before on various other files.

```sh
sudo vim /lib/systemd/system/grafana-server.service
```

The configuration file is split between multiple sections: `[Unit]`, `[Service]`, and `[Install]`. The unit contains generic options that are not dependent on the type of service and provide documentation. The service and install section is where we will house our configuration properties:

- **Description**: Provides a concise but meaningful explanation of the service used in the configuration
- **Documentation**: Provides a URL where more information to the program can be found
- **Wants**: Minor requirement for the startup to safely proceed. In our case it indicates that the service should want an internet connection, but continues even if it can not be established.
- **After**: Ensures that the service is started after the network has been set up.
- **User**: Specifies under which user the service will run. In this case, it will be `prometheus-worker`.
- **Group**: - **User**: Specifies under which usergroup the service will run. In this case, it will be `prometheus-worker`.
- **Type**: This option configures the process start-up type for this service unit. The `simple` value means the exec command configured will be the main process of the service.
- **EnvironmentFile**: Specifies a file that contains environment variables for the service. The environment variables are set before the service is started.
- **ExecStart**: Specifies the command to run when the service starts. In this case, it's `/usr/local/bin/prometheus` as program folder of Prometheus. In addition, there are several other options passed to the startup. It will load the configuration from `/etc/prometheus/prometheus.yaml`, it will store the database within `/var/lib/prometheus/`, it will set the data storing expiring date to one month, it will set the directory containing the web console template files to `/etc/prometheus/consoles`, and last but not least, it will specify the folder of the console library files at `/etc/prometheus/console_libraries`.
- **Restart**: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached. The `on-failure` value means the service will be restarted in case the server instance crashed.
- **RestartSec**: This option configures the time to sleep before restarting a service. The value `5` means the service will wait for 5 seconds before it restarts. It is a common default value and a balance between trying to restart the service quickly after a failure and not restarting it so rapidly that you could exacerbate problems.
- **WorkingDirectory**: Sets the working directory for the executed process.
- **RuntimeDirectory**: Sets the runtime directory for the service, which is created before the service starts and removed when the service stops.
- **RuntimeDirectoryMode**: This sets the file mode permissions for the runtime directory specified by `RuntimeDirectory`.
- **StandardOutput**: Logfile where output from the Blackbox Exporter will be logged.
- **StandardError**: Logfile where errors from the service will be logged.
- **SyslogIdentifier**: Sets the program name used when messages are logged to the system log.
- **ProtectSystem**: Protection rules to specify where the service can write files to the disk. If set to `full` it will limit the areas of the file system that the Exporter can write outside of his regular application folder. This works best as we are just using it for logging.
- **ProtectControlGroups**: If set, the service cannot modify the control group filesystem, preventing it from altering process resource limits and accounting settings.
- **ProtectHome**: If enabled, the service is prevented from accessing the user's home directories.
- **ProtectClock**: If enabled, the service is not allowed to change the system clock.
- **ProtectHostname**: If enabled, the service is not allowed to change the system's hostname.
- **ProtectKernelLogs**: If enabled, the service is not allowed to access or control the kernel log ring buffer, preventing it from reading sensitive kernel log entries or flooding the log.
- **ProtectKernelModules**: If enabled, the service cannot load or unload kernel modules, preventing it from altering the system's hardware capabilities.
- **ProtectKernelTunables**: If enabled, the service cannot modify kernel tunables or variables, restricting its ability to alter the system's behavior.
- **ProtectProc**: This setting restricts the visibility of other processes in `/proc`. The 'invisible' setting will hide all processes that aren't owned by the service's user.
- **NoNewPrivileges**: Prevent the Prometheus service and its children from gaining new service privileges on its own.
- **PrivateTmp**: Set to allow the service to generate a private `/tmp` directory that other processes can't access.
- **PrivateUsers**: This setting controls whether to run the service in its own user namespace. If set, all users and groups will be mapped to `nobody` or `nogroup`, except for root.
- **PrivateDevices**: If this is set, the service will not have access to any physical devices. This increases the security of the service by preventing it from directly interacting with hardware or device drivers.
- **LimitNOFILE**: This setting controls the maximum number of file descriptors that can be opened by the service.
- **TimeoutStopSec**: This setting specifies the maximum amount of time the service should take to stop before being forcibly terminated by SIGKILL.
- **LockPersonality**: If set, the service's kernel personality setting, which determines the ABI used for system calls, will be locked to prevent changes.
- **MemoryDenyWriteExecute**: This setting determines whether the service can create memory mappings that are both writable and executable. Disabling this can prevent certain types of exploits.
- **RemoveIPC**: When this is enabled, Systemd will remove all SysV and POSIX IPC objects owned by the user when the user fully logs out.
- **RestrictAddressFamilies**: This setting restricts the set of socket address families that the service can use.
- **RestrictNamespaces**: If set, this limits the types of Linux namespaces the process can access. This can be used to restrict the parts of the system the service can see.
- **RestrictRealtime**: If set, the service is not allowed to acquire realtime scheduling, which could be used to monopolize the CPU.
- **RestrictSUIDSGID**: If enabled, the service cannot create or use SUID/SGID files, which can prevent privilege escalation exploits.
- **SystemCallArchitectures**: This restricts the system calls the service can execute to a specific architecture.
- **UMask**: This sets the default file creation permissions for the service.
- **Alias**: This provides an alias for the service, allowing it to be referred to by another name.
- **WantedBy**: This option creates a small dependency and makes the service get started at boot time. If we input `multi-user.target` we can specify that the service will start when the system is set up for multiple users. In our case, every Exporter service will have its own user, kinda fitting the description.

#### Logging

By default, the service will write journal logs into the `/var/log/journal/` folder using the `journald` service. But you can also configure it to use system logs that are written into the `/var/log/syslog` folder by the `syslog` process. Here is a quick rundown:

- `journald`: The logs are structured and include metadata about each log entry, which can make them easier to filter and analyze, but harder to read our bugfix. The service includes rate limiting and log rotation by default, which can help keep log sizes small. It also stores logs in a binary format, which can be more space-efficient and faster to process than text-based logs
- `syslog`: System logs are text-based logs, which is easier to read, bugfix, and process with traditional command-line tools. It also has a network protocol, so it could send logs to remote servers, if thats something you need.

I will keep the default journald for now. Therefore, the content of the Prometheus service configuration should look like the one below. Make sure that you change the `User` property if you've previously changed the name. Feel free to make any adjustments that better suite your environment.

```text
[Unit]
Description=Grafana
Documentation=http://docs.grafana.org
Wants=network-online.target
After=network-online.target
After=postgresql.service mariadb.service mysql.service

[Service]
User=grafana-worker
Group=grafana-worker
Type=simple
EnvironmentFile=/etc/default/grafana-server
ExecStart=/usr/sbin/grafana-server \
                            --config=${CONF_FILE} \
                            --pidfile=${PID_FILE_DIR}/grafana-server.pid \
                            --packaging=deb \
                            cfg:default.paths.logs=${LOG_DIR} \
                            cfg:default.paths.data=${DATA_DIR} \
                            cfg:default.paths.plugins=${PLUGINS_DIR} \
                            cfg:default.paths.provisioning=${PROVISIONING_CFG_DIR}
Restart=on-failure
RestartSec=5
WorkingDirectory=/usr/share/grafana
RuntimeDirectory=grafana
RuntimeDirectoryMode=0750
StandardOutput=journald
StandardError=journald
SyslogIdentifier=grafana-server
ProtectSystem=full
ProtectClock=true
ProtectControlGroups=true
ProtectHome=true
ProtectHostname=true
ProtectKernelLogs=true
ProtectKernelModules=true
ProtectKernelTunables=true
ProtectProc=invisible
NoNewPrivileges=true
PrivateDevices=true
PrivateTmp=true
PrivateUsers=true
LimitNOFILE=10000
TimeoutStopSec=20
LockPersonality=true
MemoryDenyWriteExecute=false
RemoveIPC=true
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
RestrictNamespaces=true
RestrictRealtime=true
RestrictSUIDSGID=true
SystemCallArchitectures=native
UMask=0027

[Install]
Alias=grafana.service
WantedBy=multi-user.target
```

> Be cautious: When creating new rules or modifying existing ones, it's essential to follow the correct syntax and structure to ensure that the Prometheus functions properly and provides the desired level of security. Verify that you do not use spaces between properties and their values.

### 7.6.3 Applying Permissions

After the setup has been done, we can add the specific user of the Grafana Server to get access to all the needed folders. The `-R` flag within the change owner tool command will change the ownership of all files and subfolders recursively.

#### Grafana's database folder

```sh
sudo chown -R grafana-worker:grafana-worker /var/lib/grafana
```

#### Grafana's log folder

```sh
sudo chown -R grafana-worker:grafana-worker /var/log/grafana
```

#### Grafana's configuration folder

```sh
sudo chown -R grafana-worker:grafana-worker /etc/grafana
```

### 7.6.4 Start the Grafana Service

First we need to reload the system manager configuration. It is used when making changes to service configuration files or create new service files, ensuring that systemd is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterwards we can start the Grafana Server using the system control command:

```sh
sudo systemctl start grafana-server
```

To enable the Grafana Server to start automatically when the system boots we can use the system control to creates a symbolic link as we did before.

```sh
sudo systemctl enable grafana-server
```

To check if the Grafana Serveris running and configured properly, we can fetch the current status from the system control. It will display whether it is active, enabled, or disabled, and show any recent log entries.

```sh
sudo systemctl status grafana-server
```

The output should look similar to this:

```text
TODO:
```

### 7.6.5 Dashboard Setup

If you opened the port as stated within the [Core Tools](./01-core-tools.md) section of the guide, you will now have access to the web interface.

Fetch your node's IP address so you can use it on your personal machine as it is described within the [Address Check](/4-router-config/01-address-check.md) section of the guide:

```sh
ip route show default
```

The output will look like this:

```sh
default via <GATEWAY_IP_ADDRESS> dev eno1 proto dhcp src <NODE_IP_ADDRESS> metric <ROUTING_WEIGHT>
```

Alternatively you can also send an request to a commonly used and stable server IP, for instance Google. You will get back an response with your source IP address that you can filter using the text-processing tool `awk`, used for pattern scanning and processing.

```sh
ip route get 8.8.8.8 | awk '{print $7}'
```

Log out of your node and continue using your personal machine's webbrowser.

```sh
exit
```

#### Web Interface

Open your browser at the following address. Make sure to use the node IP you gathered in the previous step.

```text
http://<static-node-ip>:3000
```

The default credentials will be the following:

```text
DEFAULT CREDENTIALS
-------------------
username: admin
password: admin
```

Set a new secure and long password when prompted by Grafana. This is important as this page might be accessed through the external internet in later steps so you can access it from everywhere.

### 7.6.6 Add Prometheus Data Source

Now we have to add the running Prometheus service to the Grafana Dashboard so we can utilize all the great metrics we collected over from all the Prometheus jobs we've set up.

1. On the left-hand menu, hover over the gear menu
2. Click on the `Data Sources` popup
3. Click the `Add Data Source` button
4. Hover over the Prometheus card on screen
5. Click the `Select` button
6. Enter `http://127.0.0.1:9090/` as URL
7. Click `Save & Test` before continuing with the setup

### 7.6.7 Import Dashboard

Chose a dashboard preset you want to load for the LUKSO mainnet and testnet. Within this guide there are two main templates:

- [LUKSO Dashboard EUR](/grafana/lukso-dashboard-eur.json)
- [LUKSO Dashboard USD](/grafana/lukso-dashboard-eur.json)

> Make sure the file matches with the [JSON Exporter](./03-json-exporter.md) External Data Configuration file. You could also specify your own dashboard by adjusting the contents and jobs.

1. Copy the raw contents of the file you want
2. Return to the Grafana page within your web browser
3. Click the plus icon on the top right
4. Click on `Import`
5. Paste in the raw contents to the `Import via panel json` text box
6. Click the `Load` button
7. Click the `Import` button

You should now have your Dashboard set up and running.

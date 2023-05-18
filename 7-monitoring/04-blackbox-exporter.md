## 7.4 Blackbox Exporter Setup

After installing the Node and JSON Exporters, we will move on with the last exporter service for Prometheus: the Blackbox Exporter, as it's common practice to install the exporters before the main service, as [explained before](./02-node-exporter.md).

> The Blackbox Exporter probes endpoints over a series of protocols such as HTTP, HTTPS, DNS, TCP, and ICMP, and provides detailed metrics on the results. In our case, it's used to monitor the ping time between the node machine and two DNS servers. This information can be crucial in diagnosing network-related issues. If the ping time is too long or the connection fails altogether, it could indicate network problems affecting your node's performance or its ability to stay in sync with the rest of the blockchain network.

### 7.4.1 Creating a new User

Like explained and done [previously](./02-node-exporter.md), we will create a new user to specifically to run the Blackbox Exporter service. Running services as a system user with minimal privileges is a common security best practice.

- `--system`: This flag indicates that a system user should be created. System users are used to run services and daemons, rather than for people to log in with.
- `--group`: This flag instructs the user tool to to create a new group with the same name as the user.
- `--no-create-home`: By default, the user tool will create a home directory for each new user. This flag prevents that from happening, as we do not need different user directories if ye do not set the user up with an login. The option is typically used for users that are only meant to run a specific service and don't need a home directory. In this case, I'm naming the user `node-exporter-worker` so we can differenciate the service, that is often using the exact name of the program written in underscores, and the user account related to it. Feel free to come up with your own name, but bare in mind that you will have to change future commands.

```sh
sudo adduser --system blackbox-exporter-worker --group --no-create-home
```

Once we configured the exporter, the node will run the service as this user, by specifying the user in our system deamon service file.

If you want to confirm that the user has been created, you can search for it within the password file `/etc/passwd`, that houses all essential information for each user account. Using `grep`, a powerful command-line tool fror global expression search within files or text, we can check if the user exists within the file.

```sh
grep "blackbox-exporter-worker" /etc/passwd
```

The output should look similar to this:

```text
blackbox-exporter-worker:x:116:122::/home blackbox-exporter-worker:/usr/sbin/nologin
```

### 7.4.2 Installing the Blackbox Exporter

When it comes to the Installation of the Blackbox Exporter, we first have to get the latest version from the official [Prometheus Webpage](https://prometheus.io/download/#blackbox_exporter). As of `May 2023`, the only listed version is `0.23.0`.

#### Download Github Package

Before downloading anything, make sure you are in the home directory so everything is in one place:

```sh
cd
```

We can then continue to download this version using the previous installed `wget` tool. In this case, we're downloading the service directly from GitHub. Make sure to update your version if there is a newer release.

```sh
wget wget https://github.com/prometheus/blackbox_exporter/releases/download/v0.23.0/blackbox_exporter-0.23.0.linux-amd64.tar.gz
```

The output should look similar to this:

```text
[DATE] [TIME] (12.5 MB/s) - ‘blackbox_exporter-0.23.0.linux-amd64.tar.gz’ saved [10831812/10831812]

FINISHED --[DATE] [TIME]--
Total wall clock time: 1.4s
Downloaded: 1 files, 10M in 0.8s (12.5 MB/s)
```

#### Extract the Archive

After it has been downloaded, we can extract the tape archive using the related Ubuntu tool. We're going to extract (`x`) and compress (`z`) the archive into its previous packaged files (`f`) using verbose mode (`v`) to list all files being processed during the extraction and compression.

```sh
tar xzfv blackbox_exporter-0.23.0.linux-amd64.tar.gz
```

The output should look similar to this:

```text
blackbox_exporter-0.23.0.linux-amd64/
blackbox_exporter-0.23.0.linux-amd64/blackbox.yml
blackbox_exporter-0.23.0.linux-amd64/LICENSE
blackbox_exporter-0.23.0.linux-amd64/NOTICE
blackbox_exporter-0.23.0.linux-amd64/blackbox_exporter
```

#### Copy the Service Binaries into the System's Path

After extraction we can copy the exporter binaries to the system's path so they show up as installed dependencies and can be properly used and linked within services.

```sh
sudo cp blackbox_exporter-0.23.0.linux-amd64/blackbox_exporter /usr/local/bin/
```

#### Set Blackbox Exporter Permissionsets

Now we can change the owner of the Blackbox Exporter service to the one that we created especially for this purpose:

Like previously explained in the [Node Exporter](./02-node-exporter.md) section of the guide, we can set both, the user and group to the specified user of the service.

```sh
sudo chown blackbox-exporter-worker:blackbox-exporter-worker /usr/local/bin/blackbox_exporter
```

Not only do we need to change the owner this time, but we also need to change the access mode of the executable. We need to allow the owner to read, write, and execute the file, while the group and all other services can only read from it.

We can use the change mode tool `chmod` from Ubuntu. The permissions you can input are represented in octal, and each digit is the sum of its component bits:

- 4 stands for "read",
- 2 stands for "write", and
- 1 stands for "execute".

We can add the values together in order to combine functionality. The oder in which those access rules are written down for a file are `user`, `group`, and `others`. Because we set the user before, the user `blackbox-exporter-worker` will have full access rights.
In our case the outcome will be `7 (user), 5 (group), 5 (others)`:

```sh
sudo chmod 755 /usr/local/bin/blackbox_exporter
```

#### Cleaning up Install Files

After we copied the executable file into the system's program path and gave it the appropriate user rights, we can remove the extracted folders.

```sh
rm -rf blackbox_exporter-0.23.0.linux-amd64
```

The same applies to the tape archive, which we have previously downloaded:

```sh
rm blackbox_exporter-0.23.0.linux-amd64.tar.gz
```

### 7.4.3 Extend Network Capabilities

Because the Blackbox Exporter will monitor the ping time between the node machine and DNS servers. This information can be crucial in diagnosing network-related issues. However, it will ping those lots of times, and service do have strict capabilities set by default

We need to allow Blackbox Exporter to create raw network sockets, which are require for probing the network and providing metrics it's behavior and connectivity.

There is the capability settings tool `setcap` on Ubuntu, which helps us doing this. It will take the following operators:

- **cap_new_raw**: The first operator specifies the capability you're setting. In our case `cap_net_raw` is the network capability that allows the program to use network sockets in a way that could bypass the system's normal security checks.
- **+ep**: We can extend the capability of an operator using a plus sign. In our case we're adding `e` and `p`. By setting it to effective using `e` it means that the capability is turned on immediately. We also permit using `p` this new capability can be used directly.
- **path**: Afterwards we need to specify the path to the executable of the service itself.

In our case, the final command looks like this:

```sh
sudo setcap cap_net_raw+ep /usr/local/bin/blackbox_exporter
```

### 7.4.4 Configuring External Datasets

After installation, we want to create a separate configuration file to defines a module that performs network probes. This can be used to monitor network connectivity by sending "ping" requests and waiting for replies.

We will create our own folder for the applciation's configuration files within `/etc/blackbox_exporter/`.

```sh
sudo mkdir /etc/blackbox_exporter/
```

Now we can create a new config file within this folder:

```sh
sudo vim /etc/blackbox_exporter/blackbox.yaml
```

#### Probing Configuration

Within the file, we can set our network configuration with the following properties:

- **modules**: The main configuration section for defining different types of probes. Each module defines a specific type of probe that the Blackbox Exporter can perform.
- **icmp**: The name of the module being defined. In this case, it's set up to perform an `ICMP` probe. ICMP stands for Internet Control Message Protocol, and it's used primarily for network diagnostic and control purposes. The most common use of ICMP is the "ping" command, which sends an ICMP echo request to a specified network host and waits for a response.
- **prober**: Specifies the type of probe to be performed. In this case, it's set to icmp, which means this module will perform ICMP probes.
- **timeout**: Specifies how long the prober should wait for a response before giving up. In our case, it's set to `10s`, meaning the prober will wait for 10 seconds.
- **icmp**: Contains additional configuration settings specific to ICMP probes.
- **preferred_ip_protocol**: This field specifies the IP protocol that the ICMP prober should prefer to use when making its requests. In this case, it's set to `IPv4`, which means the prober will prefer to use Internet Protocol version 4.

#### Ping and ICMP

The configuration defines a module named "icmp" that performs ICMP probes using IPv4 and waits up to 10 seconds for a response. The Blackbox Exporter can take this configuration to set up ping requests and waiting for replies. Ping in this case, is a computer network diagnostic tool used to test whether a particular host is reachable across an IP network. It will measure round-trip time for packets sent from the origin host to a destination computer and back.

```text
modules:
  icmp:
    prober: icmp
    timeout: 10s
    icmp:
      preferred_ip_protocol: ipv4
```

> Be cautious: When creating new rules or modifying existing ones, it's essential to follow the correct syntax and structure to ensure that the JSON Exporter functions properly and provides the desired level of security. Verify that you always use 2 spaces for each indentation and that the hyphen.

Those properties will later on be used within the Grafana Dashboard to fetch the token prices and build metrics based on our validator service.

Save and exit the file. As a final step, we give the exporter worker permissions to the configuration folder and the config file:

```sh
sudo chown -R blackbox-exporter-worker:blackbox-exporter-worker /etc/blackbox_exporter/
```

We can now continue the service configuration and link our external metrics there.

### 7.4.5 Configuring the Service

After installation, we want to define how the Blackbox Exporter service should be run. Within Ubuntu, the `/etc/systemd/system/` directory is where system service unit files are stored and used to configure services to start automatically at boot.

Here, we can create a file called `blackbox_exporter.service`. A service file is generally used to define how a deamon processes should be started. In our case, we create the file with the exact name of the Blackbox Exporter service that also stored within the system directory, in order to modify the Blackbox Exporter's startup process. We can use Vim, as we did before on various other files.

```sh
sudo vim /etc/systemd/system/blackbox_exporter.service
```

The configuration file is split between multiple sections: `[Unit]`, `[Service]`, and `[Install]`. The unit contains generic options that are not dependent on the type of service and provide documentation. The service and install section is where we will house our configuration properties:

- **Description**: Provides a concise but meaningful explanation of the service used in the configuration
- **Documentation**: Provides a URL where more information to the program can be found
- **User**: Specifies under which user the service will run. In this case, it will be `blackbox-exporter-worker`.
- **Type**: This option configures the process start-up type for this service unit. The `simple` value means the exec command configured will be the main process of the service.
- **ExecStart**: Specifies the command to run when the service starts. In this case, it's `/usr/local/bin/blackbox_exporter` as program folder of the Blackbox Exporter. It will also load the configuration file on startup
- **Restart**: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached. The `always` value means the service will be restarted regardless of whether it exited cleanly or not.
- **RestartSec**: This option configures the time to sleep before restarting a service. The value `5` means the service will wait for 5 seconds before it restarts. It is a common default value and a balance between trying to restart the service quickly after a failure and not restarting it so rapidly that you could exacerbate problems.
- **SyslogIdentifier**: Sets the program name used when messages are logged to the system log.
- **WantedBy**: This option creates a small dependency and makes the service get started at boot time. If we input `multi-user.target` we can specify that the service will start when the system is set up for multiple users. In our case, every Exporter service will have its own user, kinda fitting the description.

```text
[Unit]
Description=Blackbox Exporter
Documentation=https://github.com/prometheus/blackbox_exporter

[Service]
User=blackbox-exporter-worker
Type=simple
ExecStart=/usr/local/bin/blackbox_exporter --config.file /etc/blackbox_exporter/blackbox.yaml
Restart=always
RestartSec=5
SyslogIdentifier=blackbox_exporter

[Install]
WantedBy=multi-user.target
```

> Be cautious: When creating new rules or modifying existing ones, it's essential to follow the correct syntax and structure to ensure that the Blackbox Exporter functions properly and provides the desired level of security. Verify that you do not use spaces between properties and their values.

### 7.4.6 Start the Blackbox Exporter Service

First we need to reload the system manager configuration. It is used when making changes to service configuration files or create new service files, ensuring that systemd is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterwards we can start the Blackbox Exporter service using the system control command:

```sh
sudo systemctl start blackbox_exporter
```

To enable the Blackbox Exporter service to start automatically when the system boots we can use the system control to creates a symbolic link as we did before.

```sh
sudo systemctl enable blackbox_exporter
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/multi-user.target.wants/blackbox_exporter.service → /etc/systemd/system/blackbox_exporter.service.
```

To check if the Blackbox Exporter service is running and configured properly, we can fetch the current status from the system control. It will display whether it is active, enabled, or disabled, and show any recent log entries.

```sh
sudo systemctl status blackbox_exporter
```

The output should look similar to this:

```text
● blackbox_exporter.service - Blackbox Exporter
     Loaded: loaded (/etc/systemd/system/blackbox_exporter.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2023-05-18 09:11:09 UTC; 46s ago
       Docs: https://github.com/prometheus/blackbox_exporter
   Main PID: 27272 (blackbox_export)
      Tasks: 7 (limit: 38043)
     Memory: 2.4M
        CPU: 8ms
     CGroup: /system.slice/blackbox_exporter.service
             └─27272 /usr/local/bin/blackbox_exporter --config.file /etc/blackbox_exporter/blackbox.>

May 18 09:11:09 turtle-node systemd[1]: Started Blackbox Exporter.
May 18 09:11:09 turtle-node blackbox_exporter[27272]: ts=2023-05-18T09:11:09.531Z caller=main.go:78 >
```

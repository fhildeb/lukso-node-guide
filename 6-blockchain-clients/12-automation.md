## 6.12 Service Automation

> **THIS PAGE IS WORK IN PROGRESS. DO NOT USE IN PRODUCTION AS IT IS TESTED PROPERLY.**

By default, the blockchain clients are not automatically starting whenever there has been a power outage on your system. However, this means additional manual work by logging into the node again after a power outage.

As the CLI maintains all blockchain clients, we can add a script run every time on boot. However, managing individual services is not possible within this setup, as it requires the professional configuration of each client. Here, Grafana Alerts are helping out, as they will inform if a validator can not connect to the execution client anymore or if the validator is not reachable.

### 6.12.1 Preparations

As we need our validator wallet's password every time during startup, automation would mean that we have to write it into a file. It is not a significant security issue, as only the specific node user would have access to read. Still, you must understand the added risk in exchange for convenience if someone gets access to your node's root password and authentication key. Therefore, we will add a separate user to run the node and exclusively be able to read from the password file.

Move into the working directory of your node:

```sh
# Move to home path
cd

# Move into your working directory
cd <your-node-folder>
```

Stop the node before you continue:

```sh
lukso stop
```

### 6.12.2 Setting a New User

We will create a new system user specifically to run the node and its validator service. Running services as a system user with minimal privileges is a typical security best practice, as he would not be allowed to write outside of his client's folders. It limits the potential damage if the software is somehow compromised, and hides the related folders for all other services. The node's user won't be able to write to directorieson the system or execute commands as other users. We will use the system's user creation tool:

- `--system`: This flag indicates that a system user should be created. System users are used to run services and daemons rather than for people to log in with.
- `--group`: This flag instructs the user tool to create a new group with the same name as the user.
- `--no-create-home`: By default, the user tool will create a home directory for each new user. This flag prevents that from happening, as we do not need different user directories if ye do not set the user up with a login. The option is typically used for users that are only meant to run a specific service and don't need a home directory. In this case, I'm naming the user `validator-node-worker` to differentiate the service between the user, often using the exact name of the program. Feel free to come up with your name, but remember that you must change future commands.

```sh
sudo adduser --system validator-node-worker --group --no-create-home
```

### 6.12.3 Checking the New User

If you want to confirm that the user has been created, you can search for it within the password file `/etc/passwd`, that houses all essential information for each user account. Using `grep`,
a powerful command-line tool fror global expression search within files or text, we can check if the user exists within the file.

```sh
grep "validator-node-worker" /etc/passwd
```

The output should look similar to this:

```text
validator-node-worker:x:120:126::/home/validator-node-worker:/usr/sbin/nologin
```

### 6.12.4 Adding the Password File

We will need to create two new files: one for the password and one for the service automation. Start by creating the password file:

Make sure you're in the config folder of the node's working directory:

```sh
# Move to home directory
cd

# Open config folder
cd <your-node-folder>
```

Create a new directory to store the file in. This is just so it does not directly appear within the root directory for everyone to see:

```sh
# Create the folder
sudo mkdir static

# Move into it
cd static
```

It is definitely recommended to define a generic name, so not everyone immedientelly can tell there is a password behind.

```sh
vim ./<your-generic-filename>

# Example
vim ./client_dependencies
```

Write your password into this file and save it. Afterward we will have to give permissions to this file, so the specified user can access it during startup.

Afterward, we can give access to the whole working directory of the node, so the processes can read all the config files. Make sure to adjust the `<user-name>`, `lukso-working-directory`, and `<your-generic-password-file>` properties to your actual names.

```sh
sudo chown -R validator-node-worker:validator-node-worker /home/<user-name>/<lukso-working-directory>
```

Same goes for the read access so only the owner of the validator client can read the file, groups and others can not see anything.

```sh
sudo chmod 400 /home/<user-name>/<your-node-folder>/static/<your-generic-password-file>
```

### 6.12.5 Configuring the Service

Afterwards, we need to configure the system's service file for the validator application itself.

```sh
sudo vim /etc/systemd/system/validator.service
```

- **Description**: Provides a concise but meaningful explanation of the service used in the configuration
- **Documentation**: Provides a URL where more information about the program can be found
- **After**: Ensures that the service is started after a specific service, in this case, that the network has been set up, as we will need a network connection for this exporter to succeed.
- **User**: Specifies under which user the service will run. In this case, it will be `validator-node-worker`.
- **Group**: Specifies under which user group the service will run. In this case, it will be `validator-node-worker`.
- **Type**: Configures the process startup type for this service unit. The `oneshot` value means that our service configuration is starting up the clients but not maintaining them after boot or shutdown. The problem is, that there are multiple blockchain clients we have to start simultainiously, so we can not detect if one single one of them fails or exits, as all the configuration is done using the CLI files. If you want full control and maintanance, you would have to set up each client manually.
- **RemainAfterExit**: Instructs the system to consider the service as remaining active even when all its processes exited. This is meaningful for oneshot services, where this option helps to indicate that the service, although its process has exited, should still be considered active.
- **WorkingDirectory**: This directive specifies the working directory for the executed processes. In our case, it will be our node's working directory as all config files are fetched from there.
- **ExecStart**: Specifies the command to run when the service starts. In this case, it's `/usr/local/bin/lukso` as the program folder of the LUKSO CLI. We will also start with the needed flags.
- **SyslogIdentifier**: Sets the program name used when messages are logged to the system log.
- **StandardOutput**: Logfile where the output from the LUKSO CLI will be logged.
- **StandardError**: Logfile where errors from the LUKSO CLI will be logged.
- **WantedBy**: This option creates a small dependency and starts the service at boot time. If we input `multi-user.target`, we can specify that the service will start when the system is set up for multiple users. In our case, every Exporter service will have its user fitting the description.

#### JSON Exporter Logging

By default, the service will write journal logs into the `/var/log/journal/` folder using the `journal` service. But you can also configure it to use system logs written into the `/var/log/syslog` folder by the `syslog` process. Here is a quick rundown:

- `journal`: The logs are structured and include metadata about each log entry, making them easier to filter and analyze but more challenging to read our bugfix. The service includes default rate limiting and log rotation, which can help keep log sizes small. It also stores logs in a binary format, which can be more space-efficient and faster to process than text-based logs
- `syslog`: System logs are text-based logs, which are easier to read, bugfix, and process with traditional command-line tools. It also has a network protocol, so it could send logs to remote servers if thats something you need.

#### Property Modifications

Make sure you change the `User` and `Group` properties if you've previously changed the name, as it will fall back to `root` and could cause security risks. You also have to change the following properties:

- `<user-name>`: Your systems user name that you use to log into your node.
- `<lukso-working-directory>`: This will be your working directory of your node where you did `lukso init` in. Its needed for all config files, the wallet, and the chaindata.
- `<your-generic-password-file>`: The name of your password file
- `<your-fee-recipient-address>`: Your EOA address to receive recipient fees.

> Be cautious: When creating new rules or modifying existing ones, following the correct syntax and structure are essential to ensure that the JSON Exporter functions appropriately and provides the desired level of security. Please verify that you do not use spaces between properties and their values.

Our final configuration file for mainnet will look like this:

```text
[Unit]
Description=LUKSO Validator Node
Documentation=https://github.com/lukso-network/tools-lukso-cli
Wants=network-online.target
After=network-online.target

[Service]
User=validator-node-worker
Group=validator-node-worker
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/<user-name>/<lukso-working-directory>
ExecStart=/usr/local/bin/lukso start                                          \
        --validator                                                           \
        --genesis-json ./configs/mainnet/shared/genesis_42.json               \
        --genesis-ssz ./configs/mainnet/shared/genesis_42.ssz                 \
        --validator-wallet-password ./static/<your-generic-password-file>     \
        --transaction-fee-recipient "<your-fee-recipient-address>"
ExecStop=/usr/local/bin/lukso stop
SyslogIdentifier=validator
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

If you want to configure this script for testnet, you have to use a different `ExecStart` configuration:

```text
ExecStart=/usr/local/bin/lukso start                                       \
        --validator                                                        \
        --validator-wallet-password ./static/<your-generic-password-file>  \
        --transaction-fee-recipient "<your-fee-recipient-address>"         \
        --testnet
```

#### Restarting the Service

First, we need to reload the system manager configuration. It is used when making changes to service configuration files or creating new service files, ensuring that systemd is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterwards, we can start the Node Exporter service using the system control command:

```sh
sudo systemctl start validator
```

To enable the validator client to start when the system boots, we can use the system control to create a symbolic link as we did before.

```sh
sudo systemctl enable validator
```

```text
TODO:
```

We can fetch the current status from the system control to check if the Node Exporter service is running and configured correctly. It will display whether it is active, enabled, or disabled and show any recent log entries.

```sh
sudo systemctl status validator
```

The output should look similar to this:

```text
TODO:
```

### 6.9.10 Maintenance

Proper maintenance ensures that all the components are working as intended, can be updated on the fly, and that software can be kept up-to-date and secure. It's also essential to identify and fix errors quickly.

#### Logging

If `journal` is your logging tool, you can access the full logs with the journal control tool.

- `-f`: Logging in follow mode displays the most recent journal entries and then updates in real-time as new entries are added.
- `-u`: In unit mode, it filters the log to show only entries for the specified system's service, this time `validator`.

```sh
sudo journalctl -f -u validator
```

#### Restarting

If you made any changes to configuration files, reload the system daemon:

```sh
sudo systemctl daemon-reload
```

Then, restart the service using the system control:

```sh
sudo systemctl restart validator
```

#### Stopping

You can stop the service using the system control:

```sh
sudo systemctl stop validator
```

### 6.9.12 Optional User Removal

TODO:

### 6.9.13 Optional Software Removal

TODO:
## 6.12 Service Automation

By default, the blockchain clients are not automatically starting whenever there has been a power outage on your system. However, this means additional manual work by logging into the node again after a power outage.

As the CLI maintains all blockchain clients, we can add a script run every time on boot. However, managing individual services is not possible within this setup, as it requires the professional configuration of each client. Here, Grafana Alerts are helping out, as they will inform if a validator can not connect to the execution client anymore or if the validator is not reachable.

> **Version Disclaimer**: Automation is only possible from `LUKSO CLI Version 0.6.1` onwards. Make sure you have the latest version installed using the `lukso version` command.

If you have an outdated version, install the latest one:

```sh
curl https://install.lukso.network | sh
```

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
- `--no-create-home`: By default, the user tool will create a home directory for each new user. This flag prevents that from happening, as we do not need different user directories if ye do not set the user up with a login. The option is typically used for users that are only meant to run a specific service and don't need a home directory. In this case, I'm naming the user `lukso-validator-worker` to differentiate the service between the user, often using the exact name of the program. Feel free to come up with your name, but remember that you must change future commands.

```sh
sudo adduser --system lukso-validator-worker --group --no-create-home
```

### 6.12.3 Checking the New User

If you want to confirm that the user has been created, you can search for it within the password file `/etc/passwd`, that houses all essential information for each user account. Using `grep`,
a powerful command-line tool fror global expression search within files or text, we can check if the user exists within the file.

```sh
grep "lukso-validator-worker" /etc/passwd
```

The output should look similar to this:

```text
lukso-validator-worker:x:120:126::/home/lukso-validator-worker:/usr/sbin/nologin
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

It is definitely recommended to define a generic name, so not everyone immedientelly can tell there is a password behind, even if they somehow got access.

```sh
vim ./<your-generic-filename>

# Example
vim ./client_dependencies
```

Write your password into this file and save it. Afterward we will have to give permissions to this file, so the specified user can access it during startup.

### 6.12.5 Change User Access Rights

Afterward, we can give access to the whole working directory of the node, so the processes can read all the config files. Make sure to adjust the `<user-name>`, `lukso-working-directory`, and `<your-generic-password-file>` properties to your actual names. The user name is the regular one you log in with.

```sh
sudo chown -R lukso-validator-worker:lukso-validator-worker /home/<user-name>/<lukso-working-directory>
```

Next we also want to change the ownership of the LUKSO CLI:

```sh
sudo chown lukso-validator-worker:lukso-validator-worker /usr/local/bin/lukso
```

In order to still be able to access our logs and working directory as regular user, we need to change the permissions:

```sh
sudo chmod -R 755 /home/<user-name>/<your-node-folder>
```

The same goes for the read access of the password file, so only the owner of the validator client can read it. Groups and others won't see anything.

```sh
sudo chmod 400 /home/<user-name>/<your-node-folder>/static/<your-generic-password-file>
```

Now we only have to check that the service can access the node directorie's path. If the process can not access parent directories, it wont be able to even see the folders he became owner of.

```sh
namei -l /home/<user-name>/<your-node-folder>
```

The output will look like the following:

```text
f: /home/<user-name>/<your-node-folder>
drwxr-xr-x root                    root                    /
drwxr-xr-x root                    root                    home
drwxr-x--- <user-name>             <user-name>             <user-name>
drwxr-xr-x lukso-validator-worker  lukso-validator-worker  <your-node-folder>
```

You can see, that the lukso-validator-worker is owner of the node folder and can access `/home`. However, only the regular node user can enter `/home/<user-name>`! We need to change it, so our new user can enter the node folder that sits within `/home/<user-name>`.

```sh
sudo chmod 755 /home/<user-name>
```

The output will look like the following:

```text
f: /home/<user-name>/<your-node-folder>
drwxr-xr-x root                    root                    /
drwxr-xr-x root                    root                    home
drwxr-xr-x <user-name>             <user-name>             <user-name>
drwxr-xr-x lukso-validator-worker  lukso-validator-worker  <your-node-folder>
```

Now we're good to go to configure the actual service.

### 6.12.6 Configuring the Service

Afterwards, we need to configure the system's service file for the validator application itself.

```sh
sudo vim /etc/systemd/system/lukso-validator.service
```

- **Description**: Provides a concise but meaningful explanation of the service used in the configuration
- **Documentation**: Provides a URL where more information about the program can be found
- **After**: Ensures that the service is started after a specific service, in this case, that the network has been set up, as we will need a network connection for this exporter to succeed.
- **User**: Specifies under which user the service will run. In this case, it will be `lukso-validator-worker`.
- **Group**: Specifies under which user group the service will run. In this case, it will be `lukso-validator-worker`.
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

Our final configuration file for mainnet will look like the one below:

```text
[Unit]
Description=LUKSO Validator Service
Documentation=https://github.com/lukso-network/tools-lukso-cli
Wants=network-online.target
After=network-online.target

[Service]
User=lukso-validator-worker
Group=lukso-validator-worker
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
SyslogIdentifier=lukso-validator
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

### 6.12.7 Restarting the Service

First, we need to reload the system manager configuration. It is used when making changes to service configuration files or creating new service files, ensuring that systemd is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterwards, we can start the Node Exporter service using the system control command:

```sh
sudo systemctl start lukso-validator
```

To enable the validator client to start when the system boots, we can use the system control to create a symbolic link as we did before.

```sh
sudo systemctl enable lukso-validator
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/multi-user.target.wants/validator.service → /etc/systemd/system/validator.service.
```

We can fetch the current status from the system control to check if the Node Exporter service is running and configured correctly. It will display whether it is active, enabled, or disabled and show any recent log entries.

```sh
sudo systemctl status lukso-validator
```

The output should look similar to this:

```text
● validator.service - LUKSO Validator Node
     Loaded: loaded (/etc/systemd/system/validator.service; enabled; vendor preset: enabled)
     Active: active (exited) since [DATE] UTC; [TIME] ago
       Docs: https://github.com/lukso-network/tools-lukso-cli
   Main PID: 9096 (code=exited, status=0/SUCCESS)
      Tasks: 26 (limit: 4694)
     Memory: 1.1G
     CGroup: /system.slice/validator.service
             [PID] geth --config=./configs/testnet/geth/geth.toml
             ├─[PID] prysm --log-file=./testnet-logs/prysm_2023-06-06_14-43-01.log --accept-terms-of-use --config-file=./configs/testn>
             └─[PID] validator --accept-terms-of-use --config-file=./configs/testnet/prysm/validator.yaml --log-file=./testnet-logs/va>

[DATE] [TIME] [USER] validator[9096]: time="2023-06-06T14:43:13Z" level=info msg="✅  Validator started! Use 'luk>
[DATE] [TIME] [USER] validator[9096]: time="2023-06-06T14:43:13Z" level=info msg="🎉  Clients have been started. >
...
[DATE] [TIME] [USER] systemd[1]: Finished LUKSO Validator Node.
```

You can still check the status of the node, however, you always have to use the superuser permission to do so:

Navigate into your home directory

```sh
cd
```

Move into your working directory of your node. Make sure to change `<your-working-directory>` within your command.

```sh
cd <your-working-directory>
```

> **Permission Disclaimer**: As we are having a separate user to run the service, we now need to execute all `lukso` commands using super user permission. If you are not using super user permission, `lukso status` will show all processes as stopped even if they are running! The same goes for `lukso logs`, as it will show that there are no logs found, even if the process is generating them in the background.

```sh
sudo lukso status
```

The output should look similar to this:

```sh
INFO[0000] PID 9409 - Execution (geth): Running 🟢
INFO[0000] PID 9419 - Consensus (prysm): Running 🟢
INFO[0000] PID 9426 - Validator (validator): Running 🟢
```

### 6.12.8 Maintenance

Proper maintenance ensures that all the components are working as intended, can be updated on the fly, and that software can be kept up-to-date and secure. It's also essential to identify and fix errors quickly.

#### Logging

If `journal` is your logging tool, you can access the full logs with the journal control tool.

- `-f`: Logging in follow mode displays the most recent journal entries and then updates in real-time as new entries are added.
- `-u`: In unit mode, it filters the log to show only entries for the specified system's service, this time `validator`.

```sh
sudo journalctl -f -u lukso-validator
```

#### Restarting

If you made any changes to configuration files, reload the system daemon:

```sh
sudo systemctl daemon-reload
```

Then, restart the service using the system control:

```sh
sudo systemctl restart lukso-validator
```

#### Stopping

You can stop the service using the system control. Make sure to always use the

```sh
sudo systemctl stop lukso-validator
```

### 6.12.9 Optional User Removal

If you ever want to remove the user or something went wrong, do the following steps:

Change the owner back to your regular node user. Make sure to update the `<your-node-user>` and `<your-working-directory>` properties within the command.

```sh
sudo chown -R <your-node-user>:<your-node-user> /home/<your-node-user>/<your-working-directory>
```

Next, you can revert the ownership of the LUKSO CLI back to as it was before:

```sh
sudo chown root:root /usr/local/bin/lukso
```

After, you can restrict the home directory to your user again:

```sh
sudo chmod 750 /home/<user-name>
```

Remove the user and all the files, so there are no orphaned data blobs on your system:

```sh
sudo deluser --remove-all-files lukso-validator-worker
```

```sh
sudo delgroup lukso-validator-worker
```

### 6.12.10 Optional Service Removal

If you want to remove the automation tool, stop the service:

```sh
sudo systemctl stop lukso-validator
```

Disable the service:

```sh
sudo systemctl disable lukso-validator
```

Remove the service file:

```sh
sudo rm /etc/systemd/system/lukso-validator.service
```

Now, remove password file and its folder. You may need to adjust the names in case you stored the password file in a different position.

```sh
rm -rf <node-working-directory>/static
```

Reload the system service daemon to get the service file change:

```sh
sudo systemctl daemon-reload
```

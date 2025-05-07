---
sidebar_label: "7.4 Dynamic DNS"
sidebar_position: 4
---

# 7.4 Dynamic DNS

### 6.11.3 Configure Dynamic DNS

Ideally, you want to have a stable node over a long period. Right now, as I described within the IP address section, the public IP would need adjustment every time it changes. Here is where a Dynamic DNS setup comes into play.

<!--TODO: info box with short explanation what dynamic dns and a dns record is-->

#### Installing NOIP

There are lots of service providers you can choose from. Some of them provide paid services for advanced features. But since we only need a simple record, I went with [NO-IP](https://www.noip.com/). At the point of writing this guide, there are 2 models:

- `free`: You must confirm your Dynamic DNS hostname every month to keep it. You will receive emails with a link to extend the hostname before expiration. Your record will be reset if you do not confirm the link in the mail.
- `paid`: You get your hostname forever

I'm ok with clicking a button from an email once a month. It's a straightforward service.

First, you must register on their page with an email and password. You can also set a hostname already. Choose a name with a `ddns.net` and complete the registration by confirming your email.

To build the no-ip package on our node, we must install a developer library called `build-essential`. It contains references to all the software packages needed to compile and create binary packages, which includes development tools for the programming language C.

Update your package list first:

```sh
sudo apt update
```

Afterward, we can install the package:

```sh
sudo apt install build-essential
```

Get the newest build from NO-IP. Do not use beta tools that may be advertised as the current version and sick to stable software releases. As of May 2023, `Version 2.1.9-1` is the latest stable release.

Move into the source directory:

```sh
cd /usr/local/src/
```

```sh
sudo wget http://www.noip.com/client/linux/noip-duc-linux.tar.gz
```

The output should be similar to this:

```sh
[DATE] [TIME] (11.8 MB/s) - ‘noip-duc-linux.tar.gz’ saved [2529997/2529997]
```

After downloading it, we can extract the tape archive using the Ubuntu tool. We will extract (`x`) the tape archive into its previous packaged files (`f`).

```sh
sudo tar xf noip-duc-linux.tar.gz
```

Move into the folder of the extracted tape archive.

```sh
cd noip-2.1.9-1/
```

#### Configuring NOIP

Build the application using the `make` command. You will then be prompted to log in with your No-IP account username and password.

```sh
sudo make install
```

Choose your default Ethernet connection, usually `eno1`. Also, choose an update interval of `5`, which will update your DNS registry every 5 Minutes, so you never lose peer connections. 5 is the highest frequency you can edit. The final output will look like this:

```text
New configuration file '/tmp/no-ip2.conf' created.
```

To configure the client globally, we must run the built executable with the `-C` flag again. It is needed for our service to find the right config file after automatic startups.

```sh
sudo make install -C
```

The application will create a default config file within the user directory. The final output will look like this:

```text
New configuration file '/usr/local/etc/no-ip2.conf' created.
```

> Be careful. One of the questions might be, “Do you wish to update ALL hosts” if you are already using NO-IP with other devices. If answered incorrectly, this could effect hostnames in your account that are pointing at different locations.

Now that the client is installed and configured, you can launch it. Execute this command to launch the client in the background:

```sh
sudo /usr/local/bin/noip2
```

Stop the process again, as we want to enable it on startup. If it is running, we can not configure it as it is running as a forked daemon.

```sh
sudo pkill noip2
```

#### Allow NOIP on Startup

For the program to be started at boot, we will create a system service file for it:

```sh
sudo vim /etc/systemd/system/noip2.service
```

We will set the following properties:

- **Description**: Provides a concise but meaningful explanation of the service used in the configuration
- **Type**: This option configures the process startup type for this service unit. The noip2 software runs as a daemon that forks itself after starting up. The `forking` value tells the system to expect the primary process to return immediately but instead watch the process spawned by noip2.
- **ExecStart**: Specifies the command to run when the service starts. In this case, it's `/usr/local/bin/noip2` as the program folder of NO-IP.
- **Restart**: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached. The `always` value means the service will be restarted regardless of whether it exited cleanly or not.
- **WantedBy**: This option creates a small dependency and starts the service at boot time. If we input `multi-user.target`, we can specify that the software will start when the system is set up for multiple users.

That is the content of the service file:

```text
[Unit]
Description=No-ip.com Dynamic DNS
After=network.target
After=syslog.target
Wants=network-online.target
After=network-online.target

[Install]
WantedBy=multi-user.target
Alias=noip.service

[Service]
ExecStart=/usr/local/bin/noip2
Restart=always
Type=forking
```

#### Starting NOIP as a Service

First, we need to reload the system manager configuration. It is used when making changes to service configuration files or creating new service files, ensuring that the system daemon is aware of the changes like before.

```sh
sudo systemctl daemon-reload
```

Afterward, we can start the noip2 service using the system control command:

```sh
sudo systemctl start noip2
```

To enable the noip2 service to start when the system boots, we can use the system control to create a symbolic link as we did before.

```sh
sudo systemctl enable noip2
```

The output should look similar to this:

```text
Created symlink /etc/systemd/system/noip.service → /etc/systemd/system/noip2.service.
Created symlink /etc/systemd/system/multi-user.target.wants/noip2.service → /etc/systemd/system/noip2.service.
```

We can fetch the current status from the system control to check if the noip2 service is running and configured correctly. It will display whether it is active, enabled, or disabled and show any recent log entries.

```sh
sudo systemctl status noip2
```

The output should look similar to this:

```text
● noip2.service - No-ip.com Dynamic DNS
     Loaded: loaded (/etc/systemd/system/noip2.service; enabled; vendor preset: enabled)
     Active: active (running) since [DATE] UTC; [TIME] ago
   Main PID: 4387 (noip2)
      Tasks: 1 (limit: 38043)
     Memory: 228.0K
        CPU: 6ms
     CGroup: /system.slice/noip2.service
             └─4387 /usr/local/bin/noip2

[DATE] [TIME] [USER] systemd[1]:  Starting No-ip.com Dynamic DNS
[DATE] [TIME] [USER] noip2[4387]: v2.1.9 daemon started with NAT enabled
[DATE] [TIME] [USER] systemd[1]:  Started No-ip.com Dynamic DNS.
[DATE] [TIME] [USER] noip2[4387]: [DYN_DNS_NAME] was already set to [PUBLIC_IP].
...
```

#### Complete NOIP Setup

Make sure to complete the setup by logging into your NOIP account again. Please set 2FA, a username, and a security question to protect against malicious actors. In the `My Services` section, copy your hostname, as we need it in the next step.

#### Set Dynamic DNS Hostname in Config

Now that everything is configured in the right way, we can set the hostname into the config file of the consensus client.

Navigate into your node's working directory:

```sh
cd <your-node-directory>
```

Stop your currently running clients:

```sh
lukso stop
```

The output should be the following:

```text
# INFO[0000] PID ----- - Execution (geth): Stopped 🔘
# INFO[0000] PID ----- - Consensus (prysm): Stopped 🔘
# INFO[0000] PID ----- - Validator (validator): Stopped 🔘
```

Open your Prysm configuration file:

```sh
### Prysm Mainnet Configuration
vim /configs/mainnet/prysm/prysm.yaml

### Prsym Testnet Configuration
vim /configs/testnet/prysm/prysm.yaml
```

Now add the following line, including your hostname of the Dynamic DNS:

```text
p2p-host-dns: '<your-hostname-address>'
```

Comment the old ip property out by putting a hash in front of it:

```text
#p2p-host-ip: '<your-host-ip>'
```

Restart the client again:

```sh
# Restart Mainnet Validator
lukso start --validator --transaction-fee-recipient "0x1234..."

# Restart Testnet Validator
lukso start --validator --transaction-fee-recipient "0x1234..." --testnet
```

After setting your public address, wait some minutes to recheck your peer count. You should see it rise. After some hours, you should have a stable connection.

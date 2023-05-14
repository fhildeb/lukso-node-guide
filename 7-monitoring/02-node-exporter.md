## 7.2 Node Exporter Setup

We will start the monitoring by setting up the three node exporter services before we manage the core Prometheus connection to them. Here, everything will be set in place and load when we configure the Dashboard later on.

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

After it has been downloaded, we can extract the tape archive using the related Ubuntu tool. We're going to extract (`e`) and compress (`z`) it into its packaged files (`f`) using verbose mode (`v`).

```sh
tar xzvf node_exporter-1.5.0.linux-amd64.tar.gz
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

### 7.2.4

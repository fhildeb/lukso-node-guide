## 7.6 Grafana Dashboard

As the final step within the monitoring, we will set up a Grafana Dashboard to have all gathered

### 7.6.1 Installation

Before downloading or installing anything, make sure you are in the home directory so everything is in one place:

```sh
cd
```

First we should download the GPG key for the Grafana repository and adds it to the list of trusted keys in apt to ensure that the packages you download from the Grafana repository are authentic.

- `-q`: The flag specifies that the output of the command does not show any status and progress as we want to add the exact hey using the `apt-key` afterwards
- `-O`: The output flag assures that the fetched key is output to the terminal
- `|`: The pipe is used to use the output of the first command as an input for the second command, affectively adding the key to the trusted software keys using the `apt-key add` command.

```sh
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

We can then add the Grafana repository to your list of repositories, allowing apt to install packages from it using the previous installed `software-properties-common` service that comes with the tool `add-apt-repository`. Its the standard way to add additional repositories to your sources in Ubuntu and many other Debian-based systems.

```sh
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
```

Afterwards, we can update the package list and download the official [Grafana](https://grafana.com/) software. It will check the GPG key underneath.

```sh
sudo apt update
```

Now we can download the latest Grafana build:

```sh
sudo apt install grafana-enterprise
```

Whenever you update your ubuntu packages using APT, it will automatically fetch the latest Grafana updates.

### 7.6.2 Service Configuration

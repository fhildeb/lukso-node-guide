# Validator Key Gen: Device Setup

Validator nodes play a crucial role in the blockchain network, participating in the consensus mechanism to validate transactions and create new blocks. As such, the security of these validator nodes and the keys associated with them is of utmost importance. Generating your validator keys on a clean, offline device that has never touched the internet during setup is an ideal practice. Here's why:

- **Mitigation of Cyber Threats**: By generating validator keys on a clean, offline device, you reduce exposure to potential online threats, including malware, hacking, and other forms of cyberattacks. With no internet connection, the chances of a hacker accessing your keys are essentially zero.
- **Control Over Key Generation**: Generating keys offline ensures that you have complete control over the entire process. The private keys are not exposed to any third-party services, minimizing the risk of unauthorized access or leakage. This also counts for the clean install, so no other program or service is able to copy clipboards and store them somewhere until the network connection is restored.
- **Elimination of Potential Spyware**: A clean device implies a system free of any potential spyware, adware, or other malicious software that could compromise your keys. This is crucial, as such threats could potentially record your keystrokes or screen, which could expose your private keys.
- **Protection against Remote Attacks**: An offline device is inherently immune to remote attacks. Hackers cannot penetrate a device that is not connected to a network.
- **Enhanced Privacy**: Offline generation of keys ensures that no traces of your keys are left online, providing maximum privacy.

**Therefore, please make sure you have a machine that can be flashed or used as a key-generation device. In case you only have your node, please do the key generation process on your node first, flash the system again, and continue with setting up the node's operating system.**

## Download and Preparation

> I will use Ubuntu as its the quickest and easiest setup for an offline machine using USB.

Download the latest official Ubuntu version from `ubuntu.com/download/desktop`. You need a USB device with at least 4GB that you can use to install the firmware on the storage disk. Ideally, the operating system is the latest LTS build so there are no errors with dependencies that could not load for the key gen services.

1. Download [Ubuntu 22.04.2 LTS](https://ubuntu.com/download/desktop)
2. Create a Bootable USB Drive with the ISO file
   - Windows: [Rufus Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-overview)
   - Linux: [Disk Creator Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-ubuntu#1-overview)
   - MacOS: [Etcher Guide for Ubuntu](https://ubuntu.com/tutorials/create-a-usb-stick-on-macos#1-overview)
3. Disconnect the USB drive
4. Connect the USB drive it to your machine

> Having an up-to-date system is especially important if you want to use the Deposit CLI tool.

## System Installation

After getting the boot device ready, we can coninue with the installation.

**Make sure to never connect to the internet. Do not connect an Ethernet Cable.**

### Enter BIOS

> Connect your machine to power and attach a keyboard and monitor.

1. Connect your Bootbable USB device to the node
2. Turn on the node using the power button
3. Press `F2` on your keyboard during boot to enter the BIOS setup

### Change Boot Order

1. Go to `Boot` -> `Boot Priority`
2. Set `Boot Option #1` to your USB device
3. Set `Boot Option #2` to your internal SSD

### Operating System Startup

Now that we configured the BIOS correctly, we can exit and start up the node from the defined boot device.

1. Press `F10` to save changes and exit BIOS
2. Wait for the stick to boot up
3. Choose `Try or Install Ubuntu Server`

## Ubuntu Installation

![Try or Install Ubuntu Server](/img/validator_install_1.png)

#### Setup Process

![Initial Setup Screen](/img/validator_install_2.png)

1. **System Language**: Choose your operating system's language.
2. **Keyboard Configuration**: Specify your keyboard layout and language.
3. **Updates and Software**: Choose `Minimal Installation` to reduce installation time and program scope, to reduce potential bugs or leaks. Remove the tick from `Download updates while installing Ubuntu` as it wont work on a offline device. Also make sure that there is no tick at `Install third-party software for graphics and Wi-Fi hardware and additional media formats`. We dont need all those things as the system is never gonna be used as regular pc for this installation. As this device will be flashed right after, we do not need encryption.
4. **Installation Type**: Choose `Erase disk and install Ubuntu`. The storage of the machine will be formatted, which will erase the previous data. When promted with a pop-up click on `Continue`.
5. **Time Zones**: Choose any timezone you like, this will be the default time that will be configured on the clock.
6. **Login Data**: Define a name, username and password.

> Finish the setup and remove the bootable USB stick when promted for it.

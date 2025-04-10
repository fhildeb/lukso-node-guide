---
sidebar_label: "2.5 BIOS Setup"
sidebar_position: 4
---

# 2.5 BIOS Setup

## 1.2 BIOS Setup

Understanding and adjusting the BIOS settings can significantly reduce your node's energy consumption. The correct OS can enhance speed and processing.

**Please note that your BIOS might have another layout or settings regarding performance and energy consumption. Settings differences are entirely normal and change with the CPU you have installed on your device.**

### 1.2.1 Enter BIOS

> Connect your machine to power and attach a keyboard and monitor.

1. Connect your Bootbable USB device to the node
2. Turn on the node using the power button
3. Press `F2` on your keyboard during boot to enter the BIOS setup

### 1.2.2 Power Settings

> Ensure that NUC auto starts after power failure.

1. Go to `Power` -> `Secondary Power Settings`
2. Set `After Power Failure` to `Power One`
3. Set `Wake on LAN from S4/S5` to `Power On - Normal Boot`

### 1.2.3 CPU Settings

> Adjust Cooling for fanless housing. Skip this step if your machine uses fans for cooling.

1. Go to `Cooling`
2. Set `Fan Control Mode` to `Fanless`
3. Go to `Performance` -> `Processor`
4. Set `Hyper-Threading` to `Enabled`
5. Enable `Intel Turbo Boost Technlogy`
6. Set `Active Processor Cores` to `All`
7. Enable `Real-Time Performance Tuning`

> Adjust performance for the server's energy efficiency

1. Go to `Power`
2. Enable `Max Performance Enabled`
3. Set `Intel Dynamic Power Technology` to `Energy Efficient Performance`
4. Set `Package Power Limit 1 (Sustained)` to `25`
5. Set `Package Power Limit 2 (Burst Mode)` to `25`
6. Set `Package Power Time Window (Tau)` to `0`

### 1.2.4 LED Settings

> Turn off status LED signatures for server use. This step is totally optional.

1. Go to `Power` -> `Secondary Power Settings`
2. Set `S0 Indicator Brightness (%)` to `0`
3. Set `Modern Standby Indicator Brightness (%)` to `0`
4. Set `RGB LED` -> `Brightness (%)` to `0`
5. Set `HDD LED` -> `Brightness (%)` to `0`

### 1.2.5 Boot Order

1. Go to `Boot` -> `Boot Priority`
2. Set `Boot Option #1` to your USB device
3. Set `Boot Option #2` to your internal SSD

### 1.2.6 Operating System Startup

Now that we have configured the BIOS correctly, we can exit and start the node from the defined boot device.

1. Press `F10` to save changes and exit BIOS
2. Wait for the stick to boot up
3. Choose `Try or Install Ubuntu Server`
4. Let the installation setup run through

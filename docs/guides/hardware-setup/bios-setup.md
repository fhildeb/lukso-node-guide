---
sidebar_label: "2.5 BIOS Setup"
sidebar_position: 5
---

# 2.5 BIOS Setup

Proper BIOS configuration is critical for optimizing your node's energy consumption, processing speed, and overall stability. Adjusting the settings can ensure that your operating system runs smoothly and that your hardware performs at its best. Entering the settings allows you to configure essential hardware configurations, ensuring that your node boots in a controlled and optimized environment.

:::note

BIOS layouts and settings may vary depending on the CPU and motherboard. Please refer to your device’s documentation.

:::

## 1. Enter BIOS

:::info

Connect your machine to power and attach a keyboard and monitor. This ensures that you can interact with the BIOS setup.

:::

1. Connect your bootable USB device to the node.
2. Turn on the node using the power button.
3. Press `F2` on your keyboard during boot to enter the BIOS setup.

## 2. Power Settings

:::info

Auto-starts enable your node to restart after a power interruption, reducing downtime and maintaining network participation.

:::

1. Navigate to `Power` -> `Secondary Power Settings`.
2. Set **After Power Failure** to `Power On`.
3. Set **Wake on LAN from S4/S5** to `Power On - Normal Boot`.

## 3. CPU Settings

:::info

These settings optimize cooling and performance. If your node uses fans for cooling, you may skip the cooling adjustments.

:::

1. Go to `Cooling` and set **Fan Control Mode** to `Fanless` (for fanless housing).
2. Navigate to `Performance` -> `Processor`:
   - Set **Hyper-Threading** to `Enabled`.
   - Enable **Intel Turbo Boost Technology**.
   - Set **Active Processor Cores** to `All`.
   - Enable **Real-Time Performance Tuning**.

:::info

For energy efficiency and optimal performance in a server environment, adjust further power options:

:::

3. Go to `Power`:
   - Enable **Max Performance Enabled**.
   - Set **Intel Dynamic Power Technology** to `Energy Efficient Performance`.
   - Set **Package Power Limit 1 (Sustained)** to `25`.
   - Set **Package Power Limit 2 (Burst Mode)** to `25`.
   - Set **Package Power Time Window (Tau)** to `0`.

## 4. LED Settings

:::tip

For server installations, you might not require illuminated status indicators.

:::

1. Go to `Power` -> `Secondary Power Settings`.
2. Set **S0 Indicator Brightness (%)** to `0`.
3. Set **Modern Standby Indicator Brightness (%)** to `0`.
4. In `RGB LED`, set **Brightness (%)** to `0`.
5. In `HDD LED`, set **Brightness (%)** to `0`.

## 5. Boot Order

:::info

Establishing the correct boot order ensures that your node boots from the correct device after it's USB installation.

:::

1. Go to `Boot` -> `Boot Priority`.
2. Set **Boot Option #1** to your USB device.
3. Set **Boot Option #2** to your internal SSD.

## 6. Operating System Startup

Once the BIOS settings are correctly configured, you can proceed with the operating system installation. Saving and exiting the BIOS applies your configuration changes, and booting the installation media initiates the operating system setup process.

1. Press `F10` to save changes and exit the BIOS.
2. Wait for the system to boot from the USB stick.
3. Choose `Try or Install Ubuntu Server`.
4. Allow the installation setup to run through.

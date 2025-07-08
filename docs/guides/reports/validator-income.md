---
sidebar_label: "13.1 Validator Income"
sidebar_position: 1
description: A guide for LUKSO homestakers on generating tax-ready validator income reports using the Validator Income Reporter tool and CoinMarketCap API.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 13.1 Validator Income

Generating accurate income reports can be challenging for LUKSO homestakers. Unlike staking providers, who often supply structured annual summaries, self-hosted validators must track their own consensus rewards and tips. Operators often point to a single withdrawal address. However, this method lacks clarity not supported by most tax systems, as the balance does not distinguish between earned staking income, withdrawals, or regular wallet transactions. While Portfolion Managers like [Rotki](https://rotki.com/) aim to help, they often only support bigger chains, making it hard for smaller networks to obtain reliable data.

The [Validator Income Reporter](https://github.com/fhildeb/validator-income-reporter) is a command-line tool specifically designed to help LUKSO validators generate yearly staking income reports as CSV and PDF files. It uses the [CoinMarketCap API](https://coinmarketcap.com/api/documentation/v1/) to calculate historical fiat value, based on real-time price data for the given year and evaluates all withdrawals and mining rewards for a given address. Additional check ensure that normal transfers or trading activity is excluded.

![Income Reporter Preview](/img/guides/reports/income-reporter.png)

:::tip Features

- 🪙 Collects daily income data from an ETH1 address for any given year
- 💸 Calculates FIAT revenue based on daily historical coin prices
- 📊 Exports collected metrics into a yearly CSV and PDF file

:::

:::info

CoinMarketCap typically offers a free Hobbyist API tier for one month every year, sufficient for annual report generation.

:::

:::warning Tax Disclaimer

The tool's outputs should not be considered a substitute for professional advice from a qualified tax advisor, accountant, or lawyer. Users are advised to consult with appropriate professionals before making any decisions based on the data provided by the tool. The developers of this tool shall not be held responsible for any legal or tax-related consequences resulting from using the tool or its outputs, as they make no guarantees or warranties regarding the data's completeness, reliability, or accuracy.

:::

:::info

The following steps are performed on your 💻 **personal computer**.

:::

## 1. Install Dependencies

To run the reporting tool, you must install [Python3](https://www.python.org/) on your system.

<Tabs groupId="os">
  <TabItem value="windows" label="Windows" default>

```sh
winget install Python.Python.3
```

</TabItem> <TabItem value="mac" label="Mac">

```sh
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python
brew install python
```

</TabItem>
<TabItem value="linux" label="Linux">

```sh
# Update Package Manager
sudo apt update

# Install Python and necessary Tools
sudo apt install python3 python3-pip python3-venv
```

</TabItem>
</Tabs>

## 2. Download and Setup

First, clone the repository and set up a Python virtual environment to keep dependencies isolated.

```sh
# Clone the Repository
git clone https://github.com/fhildeb/validator-income-reporter.git

# Move into Directory
cd validator-income-reporter

# Create a Virtual Python Environment
python3 -m venv income-reporter-tool

# Install Necessary Dependencies
pip3 install requests install pandas fpdf
```

## 3. Configuration

**3.1 API Preparation**: To fetch historical fiat prices, the tool requires you to provide a [CoinMarketCap](https://coinmarketcap.com/api/) API key.

1. Create or log into your [**CoinmarketCap Account**](https://coinmarketcap.com/api/) and open the dashboard.
2. Add your Credentials to apply for a **Hobbist Tier** to fetch historical data.
3. Copy your **CoinmarketCap API** key to your notes for later reference.

**3.2 Create Config File**: Create your personal configuration file based on the default template.

```bash
cp config-sample.py config.py
```

**3.3 Adjust Config File**: Configure your report settings using the provided template.

1. Open the **config.py** file using a text or code editor.
2. Edit the **COINMARKETCAP_API_KEY** to house your copied API key.
3. Set your **ETH1_ADDRESS** and **YEAR** to define your withdrawal address and period.
4. Choose the **COINMARKETCAP_FIAT_ID** based on your native currency.
5. Edit the **COINMARKETCAP_CRYPTO_ID** and chose **LYXe** for pre-2024 or **LYX** for post-2024 reports.
6. Define the **COIN_NAME** and **FIAT_CURRENCY** based on your preferences.
7. Specify the **REPORT_TITLE** to customize your printed PDF.

:::tip

An complete documentation can be found within the [Default Configuration File](https://github.com/fhildeb/validator-income-reporter/blob/main/config-sample.py) of the Repository.

:::

:::info

Great and free examples for code editors are 🦎 [**Notepad++**](https://notepad-plus-plus.org/) or 🔹 [**Visual Studio Code**](https://code.visualstudio.com/).

:::

## 4. Generate Report

Once the software has been installed and configured, you can run the report script.

<Tabs groupId="os">
  <TabItem value="windows" label="Windows" default>

```bash
# Activate the Virtual Python Environment
source income-reporter-tool\Scripts\activate

# Run Income Reporter Script
python3 income_reporter.py
```

</TabItem> <TabItem value="mac-linux" label="Mac and Linux">

```bash
# Activate the Virtual Python Environment
source income-reporter-tool/bin/activate

# Run Income Reporter Script
python3 income_reporter.py
```

</TabItem>
</Tabs>

:::info

The script's run-time will depend on the number of validators. If you have 10 validator keys and generate a report that is one year in the past, the script will need around 18 minutes. Every additional validator will approximately add 90 seconds.

:::

## 5. Exit Report Tool

After the tool finished sucessfully, you will see the generated CSV and PDF files within the folder. They are both called income report and include the year and your address within the file name. After the files have been generated, the virtual environment can be deactivated.

```bash
# Deactivate the Virtual Python Environment
deactivate
```

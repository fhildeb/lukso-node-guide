---
sidebar_label: "Staking Deposits"
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Staking Deposits

Staking is the process of locking up tokens to activate validator responsibilities in a Proof-of-Stake blockchain. Validators play a crucial role in securing the LUKSO network, proposing blocks, and participating in consensus. The process requires careful key management, node setup, and regular monitoring, but results in staking rewards for honest participation.

:::tip

Further details about staking in general can be found on the [**Proof of Stake**](/docs/theory/blockchain-knowledge/proof-of-stake.md) and [**Tokenomics**](/docs/theory/blockchain-knowledge/tokenomics.md) pages.

:::

## Validator Operation

Each validator requires a **fixed stake of 32 LYX** on mainnet or **32 LYXt** on testnet. While both mainnet and testnet mirror the same blockchain protocol and apply equal updates, their validator deposit processes differ in access, value, and purpose. While the mainnet is a fully public permissionless blockchain, the testnet uses a curated list of long-term operators to ensure stable validation and reliable testing for developers.

| Category                              | LUKSO Mainnet                                                  | LUKSO Testnet                                                                                |
| ------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| <nobr> **Access** </nobr>             | - Open and permissionless                                      | - Requires whitelisting by the core team                                                     |
| <nobr> **Stake Coin** </nobr>         | - LYX with real monetary value                                 | - LYXt with no monetary value                                                                |
| <nobr> **Purpose** </nobr>            | - Secure the public network <br /> - Earn staking rewards      | - Environment for protocol deployment <br /> - Developer platform for smart contract testing |
| <nobr> **Validator Deposits** </nobr> | [Mainnet Launchpad](https://deposit.mainnet.lukso.network/en/) | [Testnet Launchpad](https://deposit.testnet.lukso.network/en/)                               |

:::tip Whitelisting

If you want to apply as testnet validator, send an email to `testnet-validators@lukso.network` containing a wallet address, a detailed infrastructure description of your service or business, and the validator use case and network involvement.

:::

## Deposit Instructions

Setting up a validator involves multiple careful steps. Below is an overview of the entire deposit journey on both networks:

<Tabs>
<TabItem value="mainnet" label="Mainnet">

1. _Acquire LYX and transfer to a regular browser wallet_
2. [**Device Setup**](/docs/guides/validator-setup/precautions.md): _Configure a secure and offline device_
3. [**Key Generation**](/docs/guides/validator-setup/wagyu-key-generation.md): _Generate validator keys and deposit data on an offline device_
4. [**Hardware Setup**](/docs/guides/hardware-setup/): _Configure your homestaking node or server_
5. [**Client Setup**](/docs/guides/client-setup/): _Set up your node with execution, consensus, and validator clients_
6. [**Validator Configuration**](/docs/guides/client-setup/validator-configuration.md): _Transfer generated keys to your staking node_
7. [**Validator Configuration**](/docs/guides/client-setup/validator-configuration.md) _Import validator keys into your node's consensus client_
8. [**Validator Configuration**](/docs/guides/client-setup/validator-configuration.md): _Start the staking node in idle mode until deposit is confirmed_
9. [**Deposit Stake**](/docs/guides/validator-setup/launchpad-walkthrough.md): _Deposit 32 LYX to each validator using the Mainnet Launchpad_
10. _Wait for the validator to activate_

</TabItem>

<TabItem value="testnet" label="Testnet">

1. _Apply for validator keys through email and attach your browser wallet address_
2. _Wait upon whitelisted deposits and receipt of LYXt from the LUKSO team_
3. [**Device Setup**](/docs/guides/validator-setup/precautions.md): _Configure a secure and offline device_
4. [**Key Generation**](/docs/guides/validator-setup/wagyu-key-generation.md): _Generate validator keys and deposit data on an offline device_
5. [**Hardware Setup**](/docs/guides/hardware-setup/): _Configure your homestaking node or server_
6. [**Client Setup**](/docs/guides/client-setup/): _Set up your node with execution, consensus, and validator clients_
7. [**Validator Configuration**](/docs/guides/client-setup/validator-configuration.md): _Transfer generated keys to your staking node_
8. [**Validator Configuration**](/docs/guides/client-setup/validator-configuration.md) _Import validator keys into your node's consensus client_
9. [**Validator Configuration**](/docs/guides/client-setup/validator-configuration.md): _Start the staking node in idle mode until deposit is confirmed_
10. [**Deposit Stake**](/docs/guides/validator-setup/launchpad-walkthrough.md): _Deposit 32 LYX to each validator using the Testnet Launchpad_
11. _Wait for the validator to activate_

</TabItem>
</Tabs>

:::info Activation Delay

After the deposit, validators may need to wait several hours to be activated. Only a few validators are activated per epoch.

:::

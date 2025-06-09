---
sidebar_label: "12.1 Adding Withdrawals"
sidebar_position: 1
---

# 12.1 Adding Withdrawals

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In case you did not attach a [withdrawal address](/docs/theory/node-operation/validator-credentials.md) while [generating your validator keys](/docs/guides/validator-setup/precautions.md), the earnings of your validator will not be paid out to any address and you won't be able to access your staked funds while [exiting your validators](/docs/guides/withdrawals/exit-validators.md) from the network.

The following guide will teach you how to update your plain BLS Validator Key to reference an ETH1 Address, so your validator keys are able to withdraw staked funds and earnings. If an ETH1 Address is referenced to the BLS Key, the validator's stake can be exited to any wallet. Once enabled, all validator earnings above the 32 LYX or LYXt threshold will be periodically withdrawn to your ETH1 Address every few days.

| **Name**                          | **Description**                                                                                                                                           | <nobr> **Network Layer** </nobr> |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| <nobr> **BLS Keys** </nobr>       | BLS Keys are the backbone of the digital signature type to secure the EVM blockchain. Every validator uses them to sign blocks and stake on the network.  | <nobr> _Consensus Layer_ </nobr> |
| <nobr> **ETH1 Addresses** </nobr> | ETH1 Addresses are the traditional Ethereum addresses from Externally Owned Accounts, Wallets, or Smart Contracts which can receive funds on the network. | <nobr> _Execution Layer_ </nobr> |

:::info

- The update is only necessary for [**CLI Key Generation**](/docs/guides/validator-setup/cli-key-generation.md) users that did not attach the _eth1_withdrawal_address_ flag.
- The [**Wagyu Key Generation**](/docs/guides/validator-setup/wagyu-key-generation.md) automatically asks for the mandatory withdrawal address during the setup.

:::

:::tip

Further details about withdrawals can be found on the [**Tokenomics**](/docs/theory/blockchain-knowledge/tokenomics.md) and [**Validator Credentials**](/docs/theory/node-operation/validator-credentials.md) pages.

:::

:::note Additional Sources

As LUKSO is an EVM-based blockchain, the withdrawal update is similar to Ethereum. For questions, please refer to:

- [Prysm Withdrawal Guide](https://docs.prylabs.network/docs/wallet/withdraw-validator)
- [Lighthouse Exit Description](https://lighthouse-book.sigmaprime.io/voluntary-exit.html#withdrawal-of-exited-funds)
- [Teku Credential Updates](https://docs.teku.consensys.io/how-to/update-withdrawal-keys)
- [Nimbus-Eth2 Withdrawal Changes](https://nimbus.guide/withdrawals.html)
- [Official ETH2 Book Withdrawal Explanation](https://eth2book.info/capella/part2/deposits-withdrawals/withdrawal-processing/)
- [Official Ethereum Withdrawal FAQ](https://notes.ethereum.org/@launchpad/withdrawals-faq)

:::

## 1. Check Withdrawal Status

If you've never updated your validator withdrawals after the initial deposit, you can check the _deposit_data.json_ file of the validator locally. To check if your withdrawals are executed on the network, you can check them using the consensus explorer.

<Tabs>
  <TabItem value="local-deposit-check" label="Local Deposit File Check">

**1.1 Deposit Lookup**: Open the deposit _json_ file and copy the _pubkey_ element of the validator key.

**1.2 Withdrawal Index**: Search for the _withdrawal_credentials_ properties for every key

    - If the hexadecimal number starts with _01_, withdrawals are **already enabled**
    - If the hexadecimal number starts with _00_, withdrawals **can be set** using this guide

</TabItem>
<TabItem value="consensus-explorer-check" label="Consensus Explorer Check">

**1.1 Deposit Lookup**: Open the deposit _json_ file and copy the _pubkey_ element of the validator key.

**1.2 Consensus Index**: Search for your validator by searching for the public key in the consensus explorer.

    - [LUKSO Mainnet Consensus Explorer](https://explorer.consensus.mainnet.lukso.network/)
    - [LUKSO Testnet Consensus Explorer](https://explorer.consensus.testnet.lukso.network/)

**1.3 Withdrawal Entries**: View the validator’s details and open the withdrawals section

    - If you see withdrawals, the withdrawal credentials **are working correctly**
    - If the withdrawal section is greyed out, you **can enable them** using this guide

  </TabItem>
</Tabs>

## 2. Prepare Validator Indices

To update your withdrawals, you have to specify the on-chain indices for each of the deposited validator keys. You can get them directly from the node machine or manually check your public keys on the consensus explorer.

<Tabs>
  <TabItem value="index-from-explorer" label="Get Index Numbers from Explorer">

**2.1 Open the Deposit File**: Within the validator's deposit _json_ file, copy the _pubkey_ element of a validator key.

**2.2 Validator Lookup**: Search for your validator by entering its public key into the search bar of the consensus explorer.

- [LUKSO Mainnet Consensus Explorer](https://explorer.consensus.mainnet.lukso.network/)
- [LUKSO Testnet Consensus Explorer](https://explorer.consensus.testnet.lukso.network/)

**2.3 Copy the Index**: Search for the validator index number within the top heading, like _8910_ or _236189_.

:::info

The steps **2.1** to **2.3** need to be repeated for every validator key that is used for staking.

:::

  </TabItem>
  <TabItem value="index-from-node" label="Get Index Numbers from Node">

**2.1 Node Login**: Log into your node’s terminal using SSH.

**2.2 Enter Log Folder**: Move into the logging folder of the node’s working directory.

```sh
cd <lukso-working-directory>/<network-type>-logs/
```

**2.3 Search Logs**: Search and print out all validator indices of the active validator.

```sh
cat <latest-validator-logs.log> | grep -o 'index=[0-9]* ' | awk -F'=' '{printf "%s,", $2}' | sed 's/,$//' | tr -d ' '
```

:::info

The following properties need to be exchanged:

- `<lukso-working-directory>` with the actual folder name
- `<network-type>` with `mainnet` or `testnet`
- `<latest-validator-logs.log>` with the **latest** validator log file

:::

  </TabItem>
</Tabs>
 
:::tip

Copy all the validator indices so they can be used to generate the withdrawal credential later on.

:::

## 3. KeyGen CLI Download

:::warning

The LUKSO KeyGen CLI should only be used on a secure offline device.

:::

1. Download the latest version of the [LUKSO KeyGen CLI](https://github.com/lukso-network/tools-key-gen-cli/releases)
2. Transfer the archive to a secure device.
3. Extract the archive to receive the executable binary file
4. Open the terminal and move into the generated folder

## 4. Execute the BLS Change

Start the BLS to Execution process from the LUKSO KeyGen CLI.

```sh
./lukso-key-gen generate-bls-to-execution-change
```

:::info

You will need the following information:

- The **Validator Seed Phrase** from the initial key generation process
- The **Validator Indices** from the keys within the blockchain network
- The old **Withdrawal Credentials** for each deposit key in the deposit file
- The new ETH1 **Withdrawal Address** to receive funds

:::

:::tip

If you want different withdrawal credentials for different keys, the _BLS to Execution Change_ be repeated multiple times.

:::

1. Select your language
2. Select the network which your validators are running on
3. Enter your [Validator Seed Phrase](/docs/theory/node-operation/validator-credentials.md) that you’ve used to generate your initial BSL keys
4. Enter the index position of the keys you want to create withdrawal credentials for
5. Enter all your validator indices to enable withdrawals for, separated with whitespaces or commas
6. Enter a list of the old BLS withdrawal credentials of your validator keys, separated with whitespaces or commas
7. Enter the ETH1 address that all earnings will be withdrawn to
8. The [LUKSO KeyGen CLI](https://github.com/lukso-network/tools-key-gen-cli/releases) will generate a _bls_to_execution_change.json_ file.

:::info

During **Step 4** you must define an index position.

    - To generate the withdrawal update from the `1st` key, set the index position to `0`
    - To generate the withdrawal update for the `11th` key onwards, set the index position to `10`

During **Step 6** and **Step 7** you will have to input hexadecimal values.

    - Ensure to add `0x` in front of the copied withdrawal credential
    - Verify that your EOA withdrawal address has the `0x` prefix

:::

:::warning Error Handling

The [LUKSO KeyGen CLI](https://github.com/lukso-network/tools-key-gen-cli) might show errors about _inputs no being hexadecimal_ or _invalid checksum values_. If the _JSON_ File was generated, such warnings can be ignored. However, please verify you inputs by regenerating the file and comparing the output.

:::

## 5. Credential Broadcast

The withdrawal credential can be shared directly from your node or the public consensus explorer.

<Tabs>
  <TabItem value="broadcast-from-node" label="Broadcast Message from Node" default>

**5.1 Copy File Contents**: Print and copy the contents of the _bls_to_execution_change.json_ file.

```sh
cat bls_to_execution_change.json
```

**5.2 Generate Terminal Command**: Paste the contents into the local broadcast command.

```sh
POST -H "Content-type: application/json" -d  '<file-content>'
```

**5.3 Broadcast Credential**: Log into your node’s terminal and execute the command to publish the withdrawal credential.

:::warning

Each consensus client with validator support uses a different internal consensus port, opened by the LUKSO CLI.

:::

<Tabs groupId="consensus">
  <TabItem value="prysm" label="Prysm" default>

```sh
curl -X POST -H "Content-type: application/json" -d '<file-content>'
http://localhost:3500/eth/v1/beacon/pool/bls_to_execution_changes
```

</TabItem> <TabItem value="teku" label="Teku">

```sh
curl -X POST -H "Content-type: application/json" -d '<file-content>'
http://localhost:5051/eth/v1/beacon/pool/bls_to_execution_changes
```

</TabItem><TabItem value="lighthouse" label="Lighthouse">

```sh
curl -X POST -H "Content-type: application/json" -d '<file-content>'
http://localhost:5052/eth/v1/beacon/pool/bls_to_execution_changes
```

</TabItem>
</Tabs>

:::info

Exchange `<file-content>` with the actual content of the _bls_to_execution_change.json_ file.

:::

<details>
    <summary>Show Example Broadcast Messages</summary>

<Tabs groupId="consensus">
  <TabItem value="prysm" label="Prysm" default>

```sh
curl -X POST -H “Content-type: application/json” -d '[{"message": {"validator_index": "7", "from_bls_pubkey": "0x89a6dc1e83570b99cfb2557f01c852ab2bf00957367d0c35a5aa0e3101c9aad33645064e5da8a1efcd5cd501eb123ad0", "to_execution_address": "0x3daee8cd2e3c18dafe13332de33972ac5cf558f3"}, "signature": "0x80e4c40a543ffb99b6fc4b66e0d37726c1739830d27c229091bf8e792ffb98cac0971274bdc815dcba1042e33a4087d809113a0293614f8533f911cb6726c2efb03cf46470bff3ecf00ed962964262470f502208f6cd50e93f56e1b71ee61fa7", "metadata": {"network_name": "lukso", "genesis_validators_root": "0xd7cc24d150c617450dfa8176ef45a01dadb885a75a1a4c32d4a6828f8f088760", "deposit_cli_version": "2.5.6"}}]' http://localhost:3500/eth/v1/beacon/pool/bls_to_execution_changes
```

</TabItem> <TabItem value="teku" label="Teku">

```sh
curl -X POST -H “Content-type: application/json” -d '[{"message": {"validator_index": "7", "from_bls_pubkey": "0x89a6dc1e83570b99cfb2557f01c852ab2bf00957367d0c35a5aa0e3101c9aad33645064e5da8a1efcd5cd501eb123ad0", "to_execution_address": "0x3daee8cd2e3c18dafe13332de33972ac5cf558f3"}, "signature": "0x80e4c40a543ffb99b6fc4b66e0d37726c1739830d27c229091bf8e792ffb98cac0971274bdc815dcba1042e33a4087d809113a0293614f8533f911cb6726c2efb03cf46470bff3ecf00ed962964262470f502208f6cd50e93f56e1b71ee61fa7", "metadata": {"network_name": "lukso", "genesis_validators_root": "0xd7cc24d150c617450dfa8176ef45a01dadb885a75a1a4c32d4a6828f8f088760", "deposit_cli_version": "2.5.6"}}]' http://localhost:5051/eth/v1/beacon/pool/bls_to_execution_changes
```

</TabItem><TabItem value="lighthouse" label="Lighthouse">

```sh
curl -X POST -H “Content-type: application/json” -d '[{"message": {"validator_index": "7", "from_bls_pubkey": "0x89a6dc1e83570b99cfb2557f01c852ab2bf00957367d0c35a5aa0e3101c9aad33645064e5da8a1efcd5cd501eb123ad0", "to_execution_address": "0x3daee8cd2e3c18dafe13332de33972ac5cf558f3"}, "signature": "0x80e4c40a543ffb99b6fc4b66e0d37726c1739830d27c229091bf8e792ffb98cac0971274bdc815dcba1042e33a4087d809113a0293614f8533f911cb6726c2efb03cf46470bff3ecf00ed962964262470f502208f6cd50e93f56e1b71ee61fa7", "metadata": {"network_name": "lukso", "genesis_validators_root": "0xd7cc24d150c617450dfa8176ef45a01dadb885a75a1a4c32d4a6828f8f088760", "deposit_cli_version": "2.5.6"}}]' http://localhost:5052/eth/v1/beacon/pool/bls_to_execution_changes
```

</TabItem>
</Tabs>

</details>

</TabItem> <TabItem value="broadcast-from-explorer" label="Broadcast Message from Explorer">

**5.1. Open Consensus Explorer**: Open the broadcast tool of the consensus explorer.

- [LUKSO Mainnet Consensus Explorer Broadcast Tool](https://explorer.consensus.mainnet.lukso.network/tools/broadcast)
- [LUKSO Testnet Consensus Explorer Broadcast Tool](https://explorer.consensus.testnet.lukso.network/tools/broadcast)

**5.2 Upload Credential**: Upload the _bls_to_execution_change.json_ file to the server.

**5.3 Broadcast Credential**: Click _Submit & Broadcast_ to publish the withdrawal credential.

  </TabItem>
</Tabs>

## 6. Check Update Progress

:::tip

A maximum of 16 validator updates can be included per block. It might take several hours until the withdrawal went live.

:::

**6.1 Open Consensus Explorer**: Open the validator withdrawal page.

    - [LUKSO Mainnet Validator Withdrawals](https://explorer.consensus.mainnet.lukso.network/validators/withdrawals)
    - [LUKSO Testnet Validator Withdrawals](https://explorer.consensus.testnet.lukso.network/validators/withdrawals)

**6.2 Search Address Changes**: Scroll down to the list of recent _Address Changes_ that happend on the network.

**6.3 Verify Index Numbers**: Your Validator indices should show up as soon as the update went live.

:::info

If the withdrawal update hasn't shown up after several hours, consider resubmitting the file or using the terminal command.

:::

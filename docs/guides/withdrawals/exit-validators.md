---
sidebar_label: "12.2 Exit Validators"
sidebar_position: 1
description: "Learn how to exit LUKSO validators and withdraw your staked LYX or LYXt across DAppNode, CLI, Docker, or custom setups using client-specific instructions."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 12.2 Exit Validators

If you no longer want to be part of the blockchain and decide to take the node offline, you can withdraw your stake. To fully exit the validator keys, you must have a withdrawal address set, to which the staking income is transfered over. Depending on your node setup, there are multiple ways to withdraw your funds.

| Setup                                                                                                                                                                                        | Difficulty                 | Description                                                                                                            | Links                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <nobr> 🎨 [**DAppNode**](https://dappnode.com) </nobr>                                                                                                                                       | <nobr> 🟢 Simple </nobr>   | Exit the validators directly from the central [StakingBrain](https://github.com/dappnode/StakingBrain) User Interface. | <nobr> **→** [Exit Dappnode Validators](https://discourse.dappnode.io/t/how-to-exit-your-validator-from-the-ui/1745) </nobr>                                                                                                                                                                                                                           |
| <nobr> 👾 [**LUKSO CLI**](https://github.com/lukso-network/tools-lukso-cli) </nobr>                                                                                                          | <nobr> 🟢 Simple </nobr>   | Exit the validators using the unified _lukso validator exit_ command.                                                  | <nobr> **→** [Lukso Validator Exit](https://github.com/lukso-network/tools-lukso-cli?tab=readme-ov-file#validator-exit) </nobr>                                                                                                                                                                                                                        |
| <nobr> 🐳 [**Docker**](https://github.com/lukso-network/network-docker-containers) / 🗂️ [**Custom**](https://docs.lukso.tech/networks/mainnet/running-a-node#-with-your-own-clients) </nobr> | <nobr> 🔵 Advanced </nobr> | Exit the validators through the consensus client's wallet directly.                                                    | <nobr> **→** [Prysm Validator Exit Documentation](https://docs.prylabs.network/docs/wallet/exiting-a-validator)</nobr> <br /> <nobr> **→** [Lighthouse Withdrawal Guide](https://lighthouse-book.sigmaprime.io/voluntary-exit.html) </nobr> <br /> <nobr> **→** [Exit Teku Validators](https://docs.teku.consensys.io/how-to/voluntarily-exit) </nobr> |

:::warning

If you want to check or set the **required withdrawal address**, refer to the [**Adding Withdrawals**](/docs/guides/withdrawals/adding-withdrawals.md) guide before continuing.

:::

## 1. LUKSO CLI Withdrawal

Ensure you have the latest [LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli) and [supported clients](/docs/guides/maintenance/client-updates.md) installed to guarantee compatibility. After your validator node is updated and synchronized with the network, start the exit process using the following command.

<Tabs>
  <TabItem value="prysm" label="Prysm or Teku" default>

```sh
# Start Mainnet Exit
sudo lukso validator exit

# Start Testnet Exit
sudo lukso validator exit --testnet
```

</TabItem> <TabItem value="lighthouse" label="Lighthouse">

```sh
# Start Mainnet Exit
sudo lukso validator exit --keystore "./mainnet-keystore/keystore-xxx.json"

# Start Testnet Exit
sudo lukso validator exit --testnet --keystore "./testnet-keystore/keystore-xxx.json"

```

</TabItem>
</Tabs>

The exit setup will be different depending on your consensus client. Within [Prysm](https://docs.prylabs.network/docs/getting-started) or [Teku](https://consensys.io/teku), you can either select all or a specific number of validators by navigating the terminal interface and selecting the public keys. For [Lighthouse](https://lighthouse-book.sigmaprime.io/intro.html), you can only exit one validator at the time.

:::note

You can use `Ctrl+C` to stop the exit process at any time.

:::

:::tip

If you want to exit specific validators, you can learn how to receive the validator indices on the [Adding Withdrawals](/docs/guides/withdrawals/adding-withdrawals.md#2-prepare-validator-indices) page.

:::

:::info

After the command was completed, the _validator exit credential_ is submitted to the blockchain without interruption.

:::

## 2. Check Withdrawal Status

:::tip

A maximum of 16 validator updates can be included per block. It might take several hours until the exit went live.

:::

**2.1 Open Consensus Explorer**: Open the Validator withdrawal page of the consensus explorer.

- [LUKSO Mainnet Validator withdrawals](https://explorer.consensus.mainnet.lukso.network/validators/withdrawals)
- [LUKSO Testnet Validator withdrawals](https://explorer.consensus.testnet.lukso.network/validators/withdrawals)

**2.2 Search Validator**: Input your validator's public key or index as described on the [Adding Withdrawals](/docs/guides/withdrawals/adding-withdrawals.md) page.

**2.3 Fetch Exit Time**: If the exit has been successfully submitted, the page will show an estimated exit time.

:::info

If the estemated exit time hasn't shown up after several hours, consider repeating the exit command in the terminal.

:::

:::warning

Ensure your node stays running until withdrawals were received to gain rewards without being penalized.

:::

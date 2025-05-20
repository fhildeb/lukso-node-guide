---
sidebar_label: "Blockchain Launch"
sidebar_position: 1
---

# Blockchain Launch

Before creating its blockchain as an independent network, LUKSO conducted a [Reversible Initial Coin Offering](https://medium.com/lukso/re-launching-the-reversible-ico-5289989ce7ed) in 2020, which provided for tokenization of the LYX token on the Ethereum platform. The token's primary purpose was to invest in the project and start the upcoming blockchain distributedly. Over time, changes were introduced into the network's [genesis supply](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6) of LYX, and additional LYXe was burned respectively.

:::tip Token Contract

LYXe is based on the [ERC-777](https://eips.ethereum.org/EIPS/eip-777) standardization and can be viewed on [Etherscan](https://etherscan.io/token/0xA8b919680258d369114910511cc87595aec0be6D).

:::

## Genesis Deposits

On the 19th of April, 2023, LUKSO launched the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) as an entry portal for the creation of a unique blockchain. All users who held as little as 32 LYXe were allowed to lock up their LYXe in this deposit contract and become genesis validators. Participants pre-reserved their validator spots in the genesis files, which allowed them to start a staking node.

The deposit contract remained open for about three weeks, whereupon it was manually triggered by the team on the 3rd of May 2023, as part of the launch of the [LUKSO Testnet](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc). Following a predefined delay of one week, final deposits were received on the 10th of May 2023. About 223 separate wallets took part in deposits for more than 10,000 validators, totaling more than 330,000 LYXe, an approximately 3.5 million-dollar equivalent at that time. Community participants and builders carried out all these deposits, as the LUKSO team did not actively distribute stake.

:::tip

Further details about [Proof of Stake](/docs/theory/blockchain-knowledge/proof-of-stake.md), [Tokenomics](/docs/theory/blockchain-knowledge/tokenomics.md), and [Peer Networks](/docs/theory/blockchain-knowledge/peer-networks.md) can be found in the [**🧠 Theory**](/docs/theory/preparations/node-specifications.md) section.

:::

:::info

Further insights about the mainnet’s genesis validators can be gathered from the [Dune Analytics Dashboard](https://dune.com/hmc/lukso-genesis-validators) by [Hugo Masclet](https://x.com/HugoApps).

:::

## Genesis Deposit Contract

Instead of using protocol-level checks while validators deposit on the live blockchain, the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) was required to call the external [LYXe Token Contract](https://etherscan.io/token/0xA8b919680258d369114910511cc87595aec0be6D) to confirm deposits were valid before creating files necessary to start an independent blockchain.

In comparison to live EVM networks, where users can stake smaller amounts of coins until the validator deposit key has reached a total of 32 coins, transactions to the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) required a fixed amount of 32 LYXe to prepare ready-to-use genesis files without pending validators. In addition, the contract also verified that the public key wasn't registered already to prevent duplicate deposits.

![Genesis Contract](/img/theory/node-operation/genesis-contract.png)

The manual freeze option allowed for an accurate recording of valid deposits to a certain point in time. Moreover, an additional one-week freeze covering 46,523 blocks was used to ensure that more validators joined once the minimum number of [4,096 validators](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc) was reached. The deposit function within the [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) not only served to accept LYXe for every validator key, but also to record votes related to the network's initial supply of LYX. Every supply vote is retrievable on the Ethereum blockchain, making it publicly verifiable at any time.

## Validator Differentiation

Genesis validators were given an exclusive and honored position during the chain launch, while regular validators were part of the network upon LYXe migration.

| Type                         | Genesis Validators                                                                                                                                               | Regular Validators                                                                                           |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| <nobr> **Purpose** </nobr>   | Starting the Blockchain                                                                                                                                          | Securing the Blockchain                                                                                      |
| <nobr> **Audience** </nobr>  | Core Community Members                                                                                                                                           | Retail Investors and Builders                                                                                |
| <nobr> **Contract** </nobr>  | Genesis Deposit Contract                                                                                                                                         | Deposit Contract                                                                                             |
| <nobr> **Currency** </nobr>  | LYXe on Ethereum Mainnet                                                                                                                                         | LYX on LUKSO Mainnet                                                                                         |
| <nobr> **Timeframe** </nobr> | 19th of April 2023 - 10th of May 2023                                                                                                                            | 4th of July 2023 and onwards                                                                                 |
| <nobr> **Benefits** </nobr>  | - Became part of the genesis state <br /> - Received LYX before it was tradable <br /> - Had initial APRs of up to 32% <br /> - Had no validator activation time | - Can utilize instant withdrawals <br /> - Have low deposit fees <br /> - Receive instantly tradable revenue |
| <nobr> **Drawbacks** </nobr> | - Needed high amounts of ETH for deposits <br /> <nobr> - Could not withdraw within the first 3 months </nobr>                                                   | - Receive Average staking APRs around 5-12% <br /> - Must wait for validator activation                      |

## Network Launch

The Proof-of-Stake creation was carefully coordinated with all genesis validators who deposited LYX into the deposit contract before block [17,227,300](https://etherscan.io/block/17,227,300) of the Ethereum blockchain. After the contract was frozen, LUKSO's team confirmed all deposits and created the corresponding genesis files for every one of the [supply options](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6) that were initially put forth. More than 70% of the votes significantly registered overwhelming support for a 42,000,000 LYX supply.

About two weeks thereafter, the genesis and config files were released for public verification, including the genesis token supply, the genesis validators' keys, and the launch date. Before the launch on the 23rd of May 2023, operators could [start preparing their nodes](https://medium.com/lukso/genesis-validators-start-your-clients-fe01db8f3fba), making sure the software was running, the imported validators were showing, and the nodes were able to connect.

On the 23rd of May, 2023, the LUKSO Mainnet went live. Following this launch, the LUKSO team announced a [Discovery Month](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc) to allow for network stabilization before continuing the [LYXe Migration](https://medium.com/lukso/the-lyxe-migration-process-374053e5ddf5) and introducing [Universal Profiles](https://medium.com/lukso/the-lyxe-migration-process-374053e5ddf5). The network showed some fragility in the first few weeks, with participation rates varying between 78% and 85%. After larger stakeholders fixed node setup issues, the network ran stably. A little more than two months later, the [LYXe Migration](https://migrate.lukso.network/) was successfully concluded, and [LYX became tradable](https://https://www.kucoin.com/announcement/en-kucoin-has-completed-the-token-swap-of-lyxe-to-lyx-20230721). In addition, regular validators could then register through the [LUKSO Launchpad](https://deposit.mainnet.lukso.network/en/) using the blockchain's native coin, resulting in the addition of many new nodes and a handful of staking providers.

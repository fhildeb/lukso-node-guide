---
sidebar_label: "Tokenomics"
sidebar_position: 2
description: "Learn how LUKSO’s tokenomics work—covering staking rewards, fees, penalties, withdrawals, and the semi-deflationary supply mechanics in Proof of Stake."
---

# Tokenomics

Tokenomics describes the supply schedule, reward mechanics, and economic incentives that keep a Proof of Stake network healthy.

1. **Consensus Rewards**: Validators receive new LYX or LYXt that are minted for timely proposals and attestations.
2. **Execution Fees**: Validators receive priority fees and tips from end‑users on top of the [burnt base fee](/docs/theory/blockchain-knowledge/proof-of-stake.md#gas-and-fees).
3. **Penalties and Slashing**: The validator's stake may be deducted for downtime or malicious voting behaviour.

:::tip

Staking returns are typically expressed as **Annual Percentage Rate**, assuming permanent validator uptime.

:::

:::info APR May 2025

- The [LUKSO Mainnet](https://deposit.mainnet.lukso.network) has an APR of around **7%**
- The [LUKSO Testnet](https://deposit.testnet.lukso.network) has an APR of around **42%**

:::

## APR Calculation

Returns only include the deterministic and major values of the consensus mechanism.

| Component                                 | Included | Notes                                                                               |
| ----------------------------------------- | -------- | ----------------------------------------------------------------------------------- |
| <nobr> **Consensus Rewards** </nobr>      | ✅ Yes   | Set by the protocol and scaled with active stake on the network.                    |
| <nobr> **Priority Fees and Tips** </nobr> | ❌ No    | Directly paid to the proposer to boost returns during highly network utilization.   |
| <nobr> **MEV Commission** </nobr>         | ❌ No    | Indirectly paid to block proposer and searchers for manipulating transaction order. |
| <nobr> **Slasher Income** </nobr>         | ❌ No    | Directly paid to the proposer broadcasting a proof of network misbehaviour.         |

:::tip

Further details about slashing and MEV can be found within the [**Slasher Service**](/docs/theory/node-operation/slasher-service.md) and [**Proof of Stake**](/docs/theory/blockchain-knowledge/proof-of-stake.md) pages.

:::

## Earnings and Withdrawals

Validators manage two on‑chain addresses to receive withdrawals and returns.

| Address Type                             | Description                                                                                                                        | Mutability                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Withdrawal Address** </nobr>    | Receives auto‑pushed consensus rewards through block proposals and in case of an exit, the remaining LYX or LYXt of the validator. | The address can be set during the [validator key generation](/docs/guides/validator-setup/cli-key-generation.md) or [withdrawal update](/docs/guides/withdrawals/adding-withdrawals.md) and is **immutable** after stake has been [deposited](/docs/guides/validator-setup/launchpad-walkthrough.md) as defined by [EIP‑4895](https://eips.ethereum.org/EIPS/eip-4895). |
| <nobr> **Recipient Fee Address** </nobr> | Collects the priority fees, tips, and MEV commission earned by the proposing validator.                                            | The address is **mutable** and can be updated during every start of the validator node.                                                                                                                                                                                                                                                                                 |

:::tip

Both addresses can be equal, in case stakers want to manage earnings and funds with one single account.

:::

:::info

Changing the withdrawal address requires [exiting the validator](/docs/guides/withdrawals/exit-validators.md) and [redepositing the stake](/docs/guides/validator-setup/precautions.md) to a new validator key.

:::

:::warning Wallet Compatability

Both addresses are ordinary _Externally Owned Accounts_ that can be generated from regular EOA wallets within the browser, apps, or on hardware wallets. Ensure your wallet supports **LUKSO** or has the capability of adding **Custom EVM Networks**. Otherwise you may be unable to access rewards or must export the private key into another wallet before acessing the funds.

:::

## Withdrawal Cadence

A maximum of **16 consensus payouts** to the withdrawal address can be processed per block.

| Network                                                       | Active Validators | Daily Blocks | Payout Interval |
| ------------------------------------------------------------- | ----------------- | ------------ | --------------- |
| [LUKSO Mainnet](https://dora.explorer.mainnet.lukso.network/) | ~140.000          | ~7.200       |  29 Hours       |
| [LUKSO Testnet](https://dora.explorer.testnet.lukso.network/) | ~4.000            | ~7.200       |  50 Minutes     |

## Semi‑Deflationary Supply

Since the [London Update](https://ethereum.org/en/history/#london), EVM-based networks feature a transaction base fee that is burned during every block proposal. As outlined by [EIP‑1559](https://eips.ethereum.org/EIPS/eip-1559), the update actively **decreases the circulating supply** of the blockchain's native coin. If demand pushes the occupied block space above 50 percent, the base fee rises by up to 12.5 percent. The total of burned funds can frequently exceed newly minted consensus rewards, giving the network **semi‑deflationary dynamics**.

:::info Economic Consequences

- Sustained high activity will produce negative issuance periods for LYX and LYXt
- Lighter traffic periods will results in smaller and decreasing amounts of burned funds

:::

:::tip Load Balancing

As burned funds scale with demand while issuance scales with stake, the ultra‑sound effect grows when the network is busy.

:::

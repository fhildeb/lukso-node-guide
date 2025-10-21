---
sidebar_label: "Proof of Stake"
sidebar_position: 1
description: "Understand Proof of Stake on LUKSO—how validators earn rewards, maintain consensus, and secure the network through staking, attestations, and finality."
---

# Proof of Stake

Proof of Stake is the consensus algorithm that secures modern EVM‑based networks such as **Ethereum** and **LUKSO**. Validators stake coins, propose blocks of gathered transactions, and vote on the chain’s head via block attestations. The more cryptocurrency a person puts at risk, the higher the chances of being selected. Honest behaviour is rewarded through transaction fees. Faults or attacks are punished by removing a slice of the stake through panalizing or slashing the validators.

## Consensus Effects

Unlike Proof of Work on Bitcoin or previous generations of Ethereum, requiring miners to solve complex mathematical problems to add new blocks to the blockchain, Proof of Stake relies on the amount of cryptocurrency a person is willing to risk as collateral.

:::tip Advantages

- **Energy Efficiency**: Staking cuts power use by more than 99 % in comparison to Proof of Work.
- **Economical Security**: Attacking the chain requires buying and risking large amounts of the native coin.
- **Deterministic Rewards**: Performance maps directly to APR; there is no luck factor like block‑finding races.
- **Strict Uptime**: Validators target ≥ 98 % online time to avoid leaks within randomized epochs.

:::

:::warning Disadvantages

- **Early Centralisation Risk**: Stake often concentrates among a few early adopters and diversity must grows over time.
- **Additional Stake Vectors**: As forking is cheap, protocols need slashing and finality rules to prevent riskless attestations.
- **Operational Complexity**: Running two client layers and maintaining keys client and operational overhead.

:::

## Roles and Services

Running a validator can be thought of as providing infrastructure in exchange for protocol‑level rewards. To participate you deposit the network’s native token of 32 - 2048 LYX or LYXt into a one‑way validator key and spin up the following software. Stake can only be [withdrawn](/docs/theory/node-operation/validator-credentials.md) once the [validator exists](/docs/guides/withdrawals/exit-validators.md) the network.

| Layer                 | Network Role                                                                       |
| --------------------- | ---------------------------------------------------------------------------------- |
| **Execution Client**  | Processes transactions and maintains the EVM state database.                       |
| **Consensus Client**  | Follows the beacon chain, selects proposers, aggregates attestations.              |
| **Validator Process** | Signs block proposals & attestations using your private keys.                      |
| **Slasher Service**   | Detects and reports double‑signing or surround‑votes to maximise network security. |

## Network Lifecycle

The order of steps below summarises what happens every slot and epoch.

| #   | Stage                                  | Description                                                                                  |
| --- | -------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1   | <nobr> **Providing Stake** </nobr>     | Coins are locked and each validator key joins the active set of stakers.                     |
| 2   | <nobr> **Proposing Blocks** </nobr>    | One validator is pseudo‑randomly chosen each slot to build and submit a block.               |
| 3   | <nobr> **Attesting Blocks** </nobr>    | All other active validators vote on the head block and chain state.                          |
| 4   | <nobr> **Reaching Finality** </nobr>   | Once two thirds of total stake attests over two consecutive epochs, blocks become immutable. |
| 5   | <nobr> **Applying Incentives** </nobr> | Proposals and attestations earn funds while downtime or malicious acts reduce balance.       |

:::tip

Further details can be found on the [**Tokenomics**](/docs/theory/blockchain-knowledge/tokenomics.md) or [**Shashing and Panelties**](/docs/theory/blockchain-knowledge/slashing-and-panelties.md) pages.

:::

## Participation Rate

In Proof of Stake consensus, at least two-thirds of the total active validator stake must be online and actively participating for the chain to finalize blocks. If participation drops below this threshold, the network may fail to reach finality, causing stalls and potentially requiring manual intervention.

Network stalls can occur due to:

- A large number of validators going offline at the same time.
- Network partitions or infrastructure issues.
- Improper client configurations, bugs, or version mismatches.

:::tip

Keeping participation high ensures stable finality and robust network health. Redundant infrastructure is critical for minimizing correlated failures. Further information about network resilience can be found on the [**Client Diversity**](/docs/theory/blockchain-knowledge/client-diversity.md) page.

:::

## Node Operations

Each operation in the EVM requires a certain amount of gas, which is paid for in the blockchain's coin. The cost of gas is a crucial part of Ethereum's incentive structure, discouraging spam on the network and incentivizing miners to confirm transactions.

:::info Network Redundancy

Every full node runs its own Ethereum Virtual Machine, short EVM. Once a new block arrives, each execution client of the network's nodes **re‑executes every transaction** in isolation to verify the proposer’s work, keeping the network trustless.

:::

## Gas and Fees

With each transaction, users attach a max fee they are willing to pay. Since the [London Update](https://eips.ethereum.org/EIPS/eip-1559), EVM-based networks has a predictable fee system. The protocol burns a **base fee**, which increases or decreases based on the network's current activity. Another **priority fee** is collected by the block proposer.

| Fee component                   | Recipient                                | Purpose                                        |
| ------------------------------- | ---------------------------------------- | ---------------------------------------------- |
| <nobr> **Base Fee** </nobr>     | Burnt through protocol                   | Elastic pricing to prevent spam                |
| <nobr> **Priority Fee** </nobr> | Gathered by block proposer               | Incentivises inclusion                         |
| <nobr> **MEV / Tips** </nobr>   | Gathered by block proposer and searchers | Optional extra payment for economic advantages |

:::warning Transaction Failures

If a transaction runs out of gas it reverts. However, the spent gas is still charged because the node had to do the work.

:::

:::tip MEV

The Maximal Extractable Value is the extra profit obtainable by re‑ordering, inserting, or censoring transactions.
On Proof-of-Stake chains, MEV is captured by proposers via off‑chain relays or direct bundlers, while the protocol itself stays agnostic.

:::

## Epochs and Slots

An epoch in PoS is a fixed period during which slots occur. It is a larger time frame that helps to organize the work of validators who propose and attest to blocks. An epoch is comprised of 32 slots, which means an epoch lasts for about 6.4 minutes, given that each slot is about 12 seconds.

| Function                                | Details                                                                                                                                                                                                                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Validator Shuffling** </nobr>  | At the start of each epoch, a random selection process determines which validators are active and assigns them to slots. This is done to ensure that the system remains decentralized and that no single validator can predict far in advance when they will be selected. |
| <nobr> **Reward Settlement** </nobr>    | At the end of each epoch, rewards and penalties are calculated for validators. Validators that correctly proposed and attested to blocks receive rewards, while those who behaved maliciously or were offline are penalized.                                              |
| <nobr> **Finality Checkpoints** </nobr> | The first block of an epoch is considered a checkpoint, refering to the point at which a block cannot be economically changed or removed from the blockchain.                                                                                                             |

:::tip Checkpoints and Finality

A checkpoint becomes **finalised** once more than two thirds of the **total active validator stake** has attested to it. Reverting that finality would require an attacker to build a conflicting chain and get more than one third of the entire network’s stake to sign slashable votes to slash the other remaining validators.

:::

A slot is a single 12‑second window where a randomly chosen validator has the right to propose a new block to the blockchain. Non‑proposers vote on head and block validity through attestations.

- **Missed Proposals**: If the proposer is offline the _slot is skipped_.
- **Justified Blocks**: A block that gains more than two thirds of attestations _is considered as valid_.
- **Finalized Blocks**: Once the justified checkpoint finalizes the previous one, _it is marked as final_.

## Computation

Each network sets its own computational limits for their peer nodes.

| Item                                  | **LUKSO**          | **Ethereum**       | Notes                                                                                    |
| ------------------------------------- | ------------------ | ------------------ | ---------------------------------------------------------------------------------------- |
| <nobr>**Block Gas Limit**</nobr>      | ~42 million gas    | ~30 million gas    | defined by the [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) |
| <nobr>**Base Fee Volatility**</nobr>  | ± 12.5 % per block | ± 12.5 % per block | defined by the [EIP‑1559 Standardization](https://eips.ethereum.org/EIPS/eip-1559)       |
| <nobr>**Max Transaction Size**</nobr> | 128 kB             | 128 kB             | prevents frequent block bloating                                                         |
| <nobr>**Average Gas Price**</nobr>    | 0.1 – 0.8 gwei     | 15 – 40 gwei       | fluctuates with network demand                                                           |

:::info Block Size

The **block gas limit** is strict for a single block but **can adjust over time** by a small step‑size of one 1024th. Block proposers can vote gradually, avoiding abrupt jumps that could destabilise the network or overwhelm nodes.

In practice the consensus code enforces an absolute floor of 5.000 gas, and validators almost never coordinate to push in one direction for a significant amount of hours. However, within one day of around 7200 blocks, the limit could still scale by a few percent if every proposer pushes for the same direction.

:::

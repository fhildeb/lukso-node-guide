---
sidebar_label: "Slashing and Penalties"
sidebar_position: 4
---

# Slashing and Penalties

In a Proof of Stake blockchain, validators are monitored under strict scrutiny to maintain the integrity, decentralization, and consistency of the network. When a validator becomes dishonest, it risks punishment in the form of _slashing_ or _penalization_. Although both concepts are used interchangeably, they refer to two different mechanisms.

| Action       | Occurence                                  | Reason             |
| ------------ | ------------------------------------------ | ------------------ |
| **Slashing** | Validators commit provable malicious acts. | Punitive Measure   |
| **Penalty**  | Validator fails to perform their duties.   | Corrective Measure |

## Slashing

If a validator behaves inappropriately on the network, like suggesting two different blocks or distributing two different attestations, the validator is slashed by active participants on the consensus network who run a slasher service. The proof of detected misbehavior is then included in the proposed block and a portion of the slashed amount redistributed to the publisher.

:::tip

More details about slashing abilities and software can be found on the [**Slasher Service**](/docs/theory/node-operation/slasher-service.md) page.

:::

| Offense Type                       | Description                                                       |
| ---------------------------------- | ----------------------------------------------------------------- |
| <nobr> **Double Proposal** </nobr> | Submitting two different blocks for the same slot.                |
| <nobr> **Surround Vote** </nobr>   | Creating an attestation that encloses a previously submitted one. |

:::info

The _surround vote_ occurs when a validator makes an attestation which coincides with a previous one. An example would be to vote on a fresh checkpoint that includes an existing attestation.
This act can compromise the [finality guarantees](/docs/theory/blockchain-knowledge/proof-of-stake.md) of the chain.

:::

When a validator is slashed for performing one of the previous inacceptable behaviours:

- A portion of their staked LYX or LYXt is **burned**, effectively made inaccessible.
- They are **ejected** from the active validator set and lose future reward potential.
- Their offense is publicly **recorded**, ensuring transparency and accountability.

## Penalties

Penalties are leveled against validators who are offline or do not fulfill their commitment obligations without requiring evidence of malicious behavior. These are also known as _inactivity punishments_. Unlike slashing punishments, they are used to slowly reduce a validator's balance unless validators actively participate in consensus activities like block proposing or voting on attestations.

- Penalties **increase** the longer a validator is offline, reducing their balance.
- Multiple offline validators cause penalties to **scale higher** across the network.
- Indirectly, validators **lose potential rewards** while being inactive.

Inactivity penalties decrease as the effective balance of the validator decreases. During every epoch, rewards and penalties for each individual validator [are determined](https://alonmuroch-65570.medium.com/how-long-will-it-take-an-inactive-eth2-validator-to-get-ejected-a6ce8f98fd1c) using the validator's attestations, current block head, inclusion delays, and inactivity leaks.

:::info Inclusion Delay

The inclusion delay is the period between a work's assignment and submission. For blockchain networks, it's the delta between the [slot](/docs/theory/blockchain-knowledge/proof-of-stake.md) that a validator is called to [attest](/docs/theory/blockchain-knowledge/proof-of-stake.md) in, and the slot that includes their attestation on chain.

:::

:::warning

Panelties rely on network-wide participation and values are determined in a network with a participation rate of 98%. If more than 33% of validators are offline and the network stops finalizing blocks, penalties will accelerate significantly.

:::

| Downtime                  | 1 Day        | 1 Week        | 1 Month       | 6 Months       | 2 Years         |
| ------------------------- | ------------ | ------------- | ------------- | -------------- | --------------- |
| **Progressed Epoch**      | ~225 Epochs  | ~1,575 Epochs | ~6,720 Epochs | ~40,320 Epochs | ~161,280 Epochs |
| **Approximate Penalty**   | ~0.01875 LYX | ~0.13125 LYX  | ~0.5625 LYX   | ~3.375 LYX     | ~13.70 LYX      |
| **Stake Loss Percentage** | ~0.06%       | ~0.41%        | ~1.76%        | ~10.55%        | ~42.81%         |
| **Remaining Stake**       | ~31.981 LYX  | ~31.869 LYX   | ~31.438 LYX   | ~28.625 LYX    | ~18.30 LYX      |

:::danger

If the balance falls below 16 LYX or LYXt, the validator is **automatically ejected** from the active validator set of the network.

:::

:::note

On LUKSO, it will approximately take [2 Years and 4 Months](https://explorer.consensus.testnet.lukso.network/validator/903e80371518c7a3e7cb1a4705437f19329f75f0f20f5688ec9bbe38d23870e8e210fdbde332e78f988e67372918dfd7#charts) of downtime until the validator's stake will drop below 50%.

:::

## Termination

A validator may be forcefully exited from the active set under certain conditions, typically when:

- The **balance drops below 50%** due to slashing or penalties.
- It has **been slashed** for a serious offense.

:::info

Once ejected, the validator is immediately placed in an exit queue and gets subtracted from the overall number of validators. A validator is not eligible to receive any reward or participate in the consensus after it exits. To rejoin the validators' group, users have to restart the staking process.

:::

:::tip

A healthy validator should maintain a balance above 32 LYX or LYXt and ensure stable uptimes for good participation rates.
:::

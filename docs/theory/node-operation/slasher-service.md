---
sidebar_label: "Slasher Service"
sidebar_position: 5
---

# Slasher Service

The slashing service is an optional but crucial network service that adds an additional layer of **protocol-level security** to Proof of Stake blockchains. It detects misbehavior by a validator, like double-signing or surround-voting, which then triggers slashing by the consensus protocol. On a broader view, slashing nodes can be considered the network's watchdogs to help enforce honesty and proper punishment for violators.

:::tip

More details about slashable events and validator duties can be found on the [Slashing and Panelties](/docs/theory/blockchain-knowledge/slashing-and-panelties.md) and [Proof of Stake](/docs/theory/blockchain-knowledge/proof-of-stake.md) pages.

:::

## Responsibilities

A slasher **keeps track of** all the validators on the network by **block proposals** per slot and **attestations** to chain head or checkpoints. It cross-verifies those records against each other to detect double proposals or a surrounded votes. Once an offense was found, the slasher service reports evidence to the network so that the misbehaving validator can be sanctioned. However, slashers themselves don't stop or ban validators.

Theoretically, one honest slasher within the network would be sufficient. Once published, any other operator within the network could add the proof to a future block. However, as slasher services are operated on top of nodes, multiple instances should be run geographically spread to ensure resilience during downtime.

:::info

The slashing only affects **individual validators at protocol level** and not the ongoing execution of the node clients. However, in case validators were operated on several nodes simultaniously, its possible that they are slashed all together.

:::

## Slasher Operation

Slashing is **not required** for node operators or validators. While any validator can attach a slashing report to a block and get a small reward, the frequency of misbehaviour paired with the chance of publishing the subsequent block are extremely low for solo stakers or those running only a few validators. As most participants behave correctly, running a slasher service is mostly advisable for:

- Large staking institutions or services
- Advanced staking nodes above 100 keys
- Operators focusing on fraud detection

:::info

In two years of the [LUKSO Mainnet](https://explorer.lukso.network/block/0x0f1192332bf25788a44610f912a3ac38342051707720afff667b4744785bfc79) with around [140.000 active validators](https://explorer.consensus.mainnet.lukso.network/), not a single slashable event was detected.

:::

## Rewards

If a slasher detects misbehaviour and broadcasts a valid slashing proof, it becomes available to be included in the next block. The validator that **publishes this proof** within a block, **earns a small** part of the slashed stake through a **whistleblower reward**. Since validators are selected randomly, one can't guarantee that the detecting node is also the one to publish the proof on-chain. In reality, several nodes will detect a slashable event and compete that one of their validators gets to propose the subsequent block.

:::tip

Slashing rewards are meant to **incentivize correctness**, not serve as a business model. The goal is prevention, not profit.

:::

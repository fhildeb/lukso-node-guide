---
sidebar_label: "Slasher Service"
sidebar_position: 7
---

# Slasher Service

A slasher actively watches for offenses or misbehavior on the network and broadcasts them. This might be due to running the same validators or multiple machines, faking proposals, etc.

Slasher is the name of software that can detect slashable events from validators and report them to the protocol. You can think of a slasher as the network's police. Running a slasher is totally optional. In order to detect slashable messages, the slasher records the attesting and proposing history for every validator on the network, then cross references this history with what has been broadcasted to find slashable messages such as double blocks or surrounding votes.

> Slashing affects the protocol layer, e.g., validators that act maliciously. It does not affect the nodes per se, even if all validators of a node might be affected.

In theory all the network needs is 1 honest, properly functioning slasher to monitor the network because any slashings found are propagated to the entire network for it to be put into a block as soon as possible.

> Due to uptime reasons, there should be multiple backups in different areas and networks. It's generally beneficial for network security if a handful of nodes independently check for slashing conditions.

Running a slasher is not meant to be profitable and whistleblower rewards are purposefully low as slashing happens rarely.

#### Additional Rewards

Running a slasher may offer some profits to your validators given certain conditions. If the slasher detects a slashable condition, it will broadcast it to the network by default. Some lucky validator will then package this slashing evidence into a block and be rewarded for doing so. This validator might be your own one. By running only a one or two digit validator amount, chances are super low and do not keep up with the potential rewards.

> **Note**: If there is no cheating behavior within the network, there is nothing to be slashed. Regular penalties are applied from the consensus.

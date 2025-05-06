---
sidebar_label: "Slashing and Panelties"
sidebar_position: 4
---

# Slashing and Panelties

### 6.2.6 Slashing

In the Proof of Stake consensus context, the slasher functionality is designed to discourage validators from behaving dishonestly or maliciously. If a validator behaves in a way that could compromise the network's integrity—like trying to manipulate the transaction history or proposing conflicting blocks—they can be slashed. When a validator gets slashed, a portion of its staked LYX or LYXt is removed, e,g. burned. Additionally, they are ejected from the validator set, losing their ability to participate in the consensus process and earn further rewards.

The slashing conditions include:

- **Double Proposal**: If a validator proposes two different blocks during the same time slot.
- **Surround Vote**: If a validator makes attestations that surround each other, a later vote contradicts an earlier one in a way that isn't just an update.

Without the slasher, slashed validators that have committed offenses might not be promptly removed from the validator set, which could theoretically affect network operation in certain situations. Running a slasher service can be resource-intensive. The slasher service needs to keep track of a significant amount of historical data to detect slashable offenses, which can require substantial storage space and processing power.

### 6.2.7 Penalties

In Proof of Stake, validators can be penalized for being offline, which is technically different from losing stake due to slashing. Instead, it's considered inactivity leakage or an inactivity penalty. The same penalties for an offline validator are dynamically adjusted based on the total amount of offline validators and their offline duration.

This mechanism aims to incentivize validators to stay online and actively participate in the network's consensus process. Validators are expected to be online to propose and attest to blocks. If a validator is offline, they're not fulfilling their role, and so their balance slowly leaks over time.

The penalties for being offline are much less severe than the penalties for malicious behavior that would result in slashing. The inactivity penalty is proportional to the square of the time the validator has been offline, meaning the penalty accelerates the longer the validator is offline.

It's important to note that these penalties are only applied when the network isn't finalizing blocks from someone that hasn't been online. If the network is finalizing blocks, offline validators don't receive inactivity penalties but miss out on potential rewards.

The design intention is to ensure that validators have a strong incentive to remain online and participate in the consensus process, but without making the penalties so severe that minor issues could result in significant losses. This balance aims to encourage a secure and decentralized network.

#### Penalty Estimation

The exact calculation of these penalties can be complex due to these variables, but here are rough estimates:

```text
For being offline for 5 hours:    0.01 LYX/LYXt penalty
For being offline for 1 day:      0.10 LYX/LYXt penalty
For being offline for 7 days:     1.00 LYX/LYXt penalty
```

Based on the [panalty research](https://alonmuroch-65570.medium.com/how-long-will-it-take-an-inactive-eth2-validator-to-get-ejected-a6ce8f98fd1c), a validator will lose roughly 60% of their staked LYX after 18 days of inactivity, meaning `4096` epochs. It takes around 3 weeks or roughly `4686` epochs for the effective balance to fall to around 16 LYX, which will cause the validator to be ejected from the PoS protocol. An explanation of epochs can be found [below](#6210-epochs).

> Remember, these are rough estimates, and the penalties could differ based on the network conditions. If the network is not finalizing, e.g., over one-third of the network is offline, penalties can ramp up significantly.

### 6.2.8 Network Exits

It will continue validating if your validator's balance goes below 32 ETH due to penalties or slashing events. However, dropping below 32 ETH is undesirable because it indicates that your validator is either underperforming or misbehaving.

Underperforming could be due to being offline frequently or having a poor network connection, causing your validator to miss attestations or block proposals. Misbehaving, on the other hand, could be due to double voting or other slashable offenses.

If your validator's balance falls significantly and remains consistently low, it could eventually be forcefully exited during the next validator registry update. This safeguard keeps the network healthy and ensures that only active and correctly-functioning validators are participating in consensus. The core feature is to ensure the overall health and stability of the network, as validators with very low balances might not have the same incentives to behave correctly.

Forceful exits will happen if your validator balance falls below 16 LYX/LYXt. Once a validator has been exited, it can no longer participate in consensus and earn rewards. When a validator is ejected, it is placed in a queue to be exited from the active set of consensus participants.

### 6.2.9 Participation Rate

In Proof of Stake consensus, at least two-thirds of the validators must be online and actively participating for the chain to finalize blocks. Network stalls can occur for various reasons, such as network partitions or a significant number of other validators offline, or not participating effectively around the same time.

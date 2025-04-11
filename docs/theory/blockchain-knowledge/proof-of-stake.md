---
sidebar_label: "Proof of Stake"
sidebar_position: 1
---

# Proof of Stake

## 6.2 Network Theory

Let's also clear up the blockchain network we will run with this setup and how the compensation works for providing the backend infrastructure. It's essential to know the basics of how we will participate.

### 6.2.1 Proof of Stake

PoS is a consensus mechanism many blockchain networks use to validate and add new transactions. Unlike Proof of Work on Bitcoin, which requires miners to solve complex mathematical problems to add new blocks to the blockchain, PoS relies on the amount of cryptocurrency a person holds and is willing to stake as collateral.

In a PoS blockchain, validators are chosen to create a new block based on their stake in the network. The more cryptocurrency a person holds, the chances of being selected as a validator increase. Once chosen, validators validate transactions and add them to the blockchain. For their service, validators are rewarded with transaction fees and potentially new coins.

One of the main advantages of PoS over PoW is its energy efficiency. While PoW requires massive computational resources and energy consumption, PoS achieves consensus with minimal energy use. The efficiency makes PoS more sustainable and environmentally friendly for blockchain networks.

Another advantage of PoS is the security it provides. Since validators have a significant investment in the network, they are incentivized to act honestly. If a validator tries to manipulate the system or validate fraudulent transactions, they risk losing their stake, making attacks on the network costly and, therefore, less likely.

### 6.2.2 Network Operations

The Ethereum Virtual Machine is a crucial part of the Ethereum ecosystem, and each full node running the Ethereum software has its instance of it. Every full node validates every transaction and smart contract execution independently. The EVM is isolated from the network, filesystem, and other processes of the node's computer system, which makes it a sandboxed environment for smart contract execution.

When a node receives a new block, it executes all transactions in its own EVM to validate the correctness of the transaction results and the final state of the block. Independent computation is a fundamental part of the Ethereum network's decentralized nature: every node independently verifies the validity of every block and every transaction.

### 6.2.3 Computation Measures

Each operation in the EVM requires a certain amount of gas, which is paid for in the blockchain's coin. The cost of gas is a crucial part of Ethereum's incentive structure, deterring spam on the network and incentivizing miners to confirm transactions.

Since the [London Update](https://eips.ethereum.org/EIPS/eip-1559), Ethereum has a predictable fee system with two parts: a base fee and a tip. The base fee is burned and adjusted up or down depending on network congestion. When the network is busy, the base fee increases, and when the network is less active, the base fee decreases. The tip also called the priority fee, is given to the miner as an incentive to include the transaction in the block.

Gas plays a crucial role in the execution of transactions. If a transaction or smart contract operation does not have enough gas, it runs out of gas and fails, but the gas used up to that point is not returned as the computation was finished up to this point.

### 6.2.10 Epochs

An epoch in PoS is a fixed period during which slots occur. It is a larger time frame that helps to organize the work of validators who propose and attest to blocks. An epoch is comprised of 32 slots, which means an epoch lasts for about 6.4 minutes, given that each slot is about 12 seconds.

Epochs provide several key functions:

- **Validator Shuffling**: At the start of each epoch, a random selection process determines which validators are active and assigns them to slots. This is done to ensure that the system remains decentralized and that no single validator can predict far in advance when they will be selected.
- **Rewards and Penalties**: At the end of each epoch, rewards and penalties are calculated for validators. Validators that correctly proposed and attested to blocks receive rewards, while those who behaved maliciously or were offline are penalized.
- **Finality**: An epoch also plays a role in achieving finality. In simple terms, finality refers to the point at which a block cannot be changed or removed from the blockchain. The finality is achieved every epoch.

### 6.2.11 Slots

A slot in PoS, is a time period within an epoch that lasts for about 12 seconds. During a slot, a randomly chosen validator has the right to propose a new block to the blockchain.

The role of a slot includes:

- **Block Proposal**: Each slot represents an opportunity for a validator to propose a new block. If the selected validator is online and behaves correctly, they will propose a block, which other validators will then attest to.
- **Attestations**: During each slot, validators who are not chosen to propose a block are expected to attest to the validity of the proposed block. These attestations are important for determining consensus and helping the network agree on the state of the blockchain.
- **Missed Slots**: If a chosen validator is offline or fails to propose a block during their slot, the slot is skipped, and no new block is added to the chain for that slot.

A **justified** slot is a block that has been voted on and is a candidate for finalization. Essentially, justifying a block is the step before finalizing it. A block is justified when it receives 2/3 of the voting weight from the active validators. Justified blocks can still be overwritten if a conflicting block receives more votes. However, once a justified block is **finalized**, meaning the network has reached consensus of the proposed block, it cannot be changed.

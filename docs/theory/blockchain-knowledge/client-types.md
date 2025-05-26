---
sidebar_label: "Client Types"
sidebar_position: 5
---

# Client Types

With blockchain technology, you should have an understanding of various software clients that operate in conjunction to maintain a decentralized network. The clients execute the transactions, validate decisions, operate wallets, and maintain various databases, forming the basis for EVM blockchain networks.

## General Overview

In order to participate as a peer node in the blockchain network, the minimum requirements for operation include the execution and the consensus clients. For additional staking, users also have to run a process for validators along with these clients.

:::tip Optional Add-ons

Depending on infrastructure goals, an optional [**Slasher Service**](/docs/theory/node-operation/slasher-service.md) or [**MEV Process**](/docs/theory/blockchain-knowledge/proof-of-stake.md#roles-and-services) can be run to gain further profits.

:::

| Client Layer                         | Role and Responsibilities                                                                                                                                                                                                                                  |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> **Execution Client** </nobr>  | Handles EVM execution, transaction validation, state updates, gas accounting, and block propagation, while directly communicating with other execution peers. Aditionally, it also maintains account balances, contract storage, and the transaction pool. |
| <nobr> **Consensus Client** </nobr>  | Connects to the beacon chain, follows fork choice, validates block headers, aggregates attestations, and manages finality while directly communicating with other consensus peers.                                                                         |
| <nobr> **Validator Process** </nobr> | Manages validator keypairs, proposes blocks, signs attestations, and performs [Proof of Stake](/docs/theory/blockchain-knowledge/proof-of-stake.md) duties.                                                                                                |

:::info

Execution and consensus clients connect to separate [**Peer Networks**](/docs/theory/blockchain-knowledge/peer-networks.md) with their own protocols and discovery layers.

:::

## Execution Responsibilities

The execution client, is responsible for all operations related to executing transactions and managing the EVM state:

- Receiving and validating new blocks.
- Managing the transaction memory pool for pending transactions.
- Applying state transitions such as account balance changes and contract updates.
- Storing all on-chain data including, account balances, contract bytecode, contract storage.
- Maintains a frequent section or even the full blockchain history.
- Communicating with the consensus client to execute finalized blocks.

:::tip

The execution client does not determine which block is added next. Instead, it waits for the consensus client to decide on a **canonical block** that will become the head of the chain and only carries it's formation and transaction execution.

:::

:::info

The [Engine API](https://hackmd.io/@danielrachi/engine_api) is used to keep execution and consensus clients aligned on the latest valid blockchain state.

- `eth_newPayload`: Submits a new block from the execution layer to be validated and proposed.
- `forkchoiceUpdated`: Informs the execution client which block is currently considered canonical.

:::

## Consensus Responsibilities

The consensus client is responsible for all consensus-related operations in a Proof of Stake blockchain.

- Syncing the beacon chain and following the correct fork choice rule.
- Aggregating and propagating attestations, sync committee messages, and block proposals.
- Managing the validator registry and shuffling validators between slots and epochs.
- Verifying incoming block headers and ensuring they match the chain rules.
- Providing fork-choice and head updates to the execution client.

:::info

Consensus clients use the 🎲 [**libp2p**](https://libp2p.io/) stack and handle real-time communication with other validator nodes.

:::

## Validator Responsibilities

The validator client is a lightweight process embedded within the consensus client for distinct staking purposes.

- Managing the imported validator keypairs.
- Proposing blocks when selected as the slot leader.
- Attesting to new blocks and voting on chain finality.
- Signing duties with the validator's private keys.
- Monitoring performance and ensuring duties are fulfilled within the slot time.

:::warning

A validator client must be **online and well-connected** to avoid penalties and maximize rewards. While it does not store blockchain state or perform execution, it depends on the consensus client to stay in sync with the rest of the network.

:::

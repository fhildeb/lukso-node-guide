---
sidebar_label: "Client Types"
sidebar_position: 5
---

# Client Types

## 6.3 Client Theory

When engaging with blockchain technologies, it's crucial to understand the different types of software clients involved in the process. The interplay between these clients makes a blockchain network function as intended, and understanding their roles and functionalities can help users troubleshoot issues and optimize their experiences.

> You will have to run all 3 clients to become a validator. However, you can also run the setup without the validator client if you want to participate and store the network without gaining returns.

| Layer                                                                 | What it does                                                                                                                                                 | Why it’s still required for an _archive_ node                                                                                                                                                                                                               |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Execution client**<br />(Geth, Erigon, Nethermind, Besu)            | Executes transactions, maintains the state database. Running in _archive_ mode simply means it keeps **every historical state** instead of pruning old data. | After the Merge, it **no longer speaks directly to peers for fork‑choice or new blocks**. It relies on the consensus client through the Engine API (`eth_newPayload`, `forkchoiceUpdated`) to know which blocks to execute.                                 |
| **Consensus client**<br />(Prysm, Lighthouse, Teku, Nimbus, Lodestar) | Talks to the beacon‑chain network, follows fork choice, verifies validator signatures, finality, etc.                                                        | Even if you don’t run validators, your execution layer still needs a live feed of **new headers and fork‑choice updates**. Without the consensus client, the execution client stalls at the merge transition block (the “terminal total difficulty” block). |

### 6.3.1 Execution Client

The Execution Client, also referred to as blockchain or network client, is the software that directly interacts with the blockchain. It connects to the blockchain network, downloads and verifies blocks, maintains a local copy of the blockchain data, and propagates transactions and blocks.

Underneath, the Execution Client does a lot of heavy lifting: it verifies cryptographic proofs, validates transactions, applies state changes, manages the local database, and provides an interface for querying and spreading the blockchain data from or to other nodes. Regarding the copy of the blockchain data, it maintains account balances, contract bytecode, contract storage, and the transaction pool.

The transaction pool, often called the memory pool, is a set of transactions broadcast to the network but not yet included in a block. The execution client is responsible for managing this pool, deciding which transactions to fit in a proposed block based on criteria such as gas price, and executing these transactions when they are included.

The execution client also communicates with the consensus client to receive updates on the state of the consensus protocol, including finalized blocks and the current state of the validator set.

### 6.3.2 Consensus Client

The consensus client, also referred to as the beacon client or beacon node, is responsible for participating in the consensus protocol of the blockchain. In a Proof of Stake system, this involves proposing own blocks and attesting to the validity of proposed blocks.

Under the hood, the Consensus Client communicates with other validators to agree on the state of the blockchain. It signs messages with the validator's private key as part of the consensus process and reads from and writes to the blockchain through the execution client.

### 6.3.3 Validator Client

The Validator Client is often a part of the Consensus Client software. It manages the validator's keypairs and performs the duties assigned by the consensus protocol: proposing blocks and making attestations.

The validator client only manages the validator's activities, while the consensus client implements the consensus protocol and communicates with the rest of the network.

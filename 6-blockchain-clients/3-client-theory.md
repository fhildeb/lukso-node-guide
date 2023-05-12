# 6.3 Client Theory

When engaging with blockchain technologies, it's crucial to understand the different types of software clients involved in the process. The interplay between these clients is what makes a blockchain network function as intended, and understanding their roles and functionalities can help users troubleshoot issues and optimize their experiences.

> You will have to run all 3 clients in order to become a validator, however you can also run the setup without the validator client if you just want to participate in and store the network itself, without gaining returns.

#### Execution Client

The Execution Client, also referred to as the blockchain client or network client, is the software that directly interacts with the blockchain. It connects to the blockchain network, downloads and verifies blocks, maintains a local copy of the blockchain data, and propagates transactions and blocks.

Underneath, the Execution Client does a lot of heavy lifting: it verifies cryptographic proofs, validates transactions, applies state changes, manages the local database, and provides an interface for querying and spreading the blockchain data from or to other nodes. Regarding the copy of the blockchain data, it maintains account balances, contract code, contract storage, and the transaction pool.

The transaction pool, often called the "mempool," is a set of transactions that have been broadcast to the network but have not yet been included in a block. The execution client is responsible for managing this pool, deciding which transactions to include in a proposed block based on criteria such as gas price, and executing these transactions when they are included in a block.

The execution client also communicates with the consensus client to receive updates on the state of the consensus protocol, including finalized blocks and the current state of the validator set.

#### Consensus Client

The Consensus Client, also referred to as the beacon client or beacon node is responsible for participating in the consensus protocol of the blockchain. In a Proof of Stake system, this involves proposing own blocks and/or attesting to the validity of proposed blocks

Under the hood, the Consensus Client communicates with other validators to reach agreement on the state of the blockchain. It signs messages with the validator's private key as part of the consensus process, and it reads from and writes to the blockchain through the execution client.

#### Validator Client

The Validator Client is often a part of the Consensus Client software. It manages the validator's keypairs and performs the duties assigned by the consensus protocol: proposing blocks and making attestations.

The validator client only manages the validator's activities, while the consensus client implements the consensus protocol and communicates with the rest of the network.

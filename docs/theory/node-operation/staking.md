---
sidebar_label: "Staking"
sidebar_position: 1
---

# Staking

## Deposit Theory

There are a few theoretical things to understand about making deposits and putting your stake at risk. Most of these facts will be LUKSO-specific.

### The Network Start Process

LUKSO started as PoS Blockchain with an initial genesis validator set. These validators deposited on the Ethereum blockchain and locked their LYXe, to start and run their validators on the LUKSO mainnet with equal staking amounts.

> More about the Network, Tokenomics, Withdrawals, and Earnings can be found in the [Network Theory](#) section of this guide.

<!-- TODO: /6-blockchain-clients/02-network-theory.md-->

### Initial Deposits

The [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) was open for about 3 weeks and was frozen on the 9th of May. The PoS consensus was started with all genesis validators that deposited up to block 17,227,300. There was a 46,523 block delay after the LUKSO team triggered the freeze. The genesis deposit contract received 10.336 deposits from 223 unique addresses based on the [Dune Analytics Dashboard](https://dune.com/hmc/lukso-genesis-validators). Each validator had to deposit 32 LYXe.

LUKSO mainnet was started on the 23rd of May of 2023 using the genesis files created from the deposits on Ethereum. All future validator deposits will be made as regular validators.

### Genesis and Regular Validators

Genesis validators were part of the genesis block of the LUKSO mainnet and could already stake to get LYX in the first weeks before the migration of LYXe to LYX was started. They are the core community that took off the blockchain.

After the discovery month of about 4 weeks, LUKSO opened up the migration of LYXe to LYX so that everyone could convert the Ethereum representation of LYX to the native coin. Since then, regular validators can deposit on the LUKSO blockchain directly.

### LUKSO Genesis Deposit Contract

![Genesis Contract](/img/theory/node-operation/genesis-contract.png)

The [LUKSO Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) had to do calls to the external LYXe ERC20-compatible token instead of doing it on the native chain with primary deposits.

Instead of requiring a smaller amount of coins to be transferred to the validator's deposit key until 32 coins are reached, LUKSO's deposit contract required a fixed amount of 32 LYXe. The fixed amount was mandatory to prepare the genesis files for the LUKSO mainnet. Thus, checks were applied if a public key was registered, preventing duplicate deposits.

This freezing involves additional storage and logic but is required to launch with a fixed amount of validators. On top, LUKSO's deposit function stored the votes for the initial coin supply of the mainnet. Every supply vote can still be fetched on the Ethereum blockchain. When the contract was frozen, everything had to be publicly verifiable, as the LYX supply was set to 42 million LYX.

### LUKSO Testnet

The testnet exists parallel to the mainnet with all updates and features.

Only whitelisted addresses can become validators, as it is mainly there to test smart contracts and forks.

Many temporary or changing validators could lead to a significant number of unstable validators and slashes in the long run, which might compromise the integrity of the network. Testnet validators are core members and organizations wanting to run and maintain their LUKSO Testnet node in a stable environment over a long period, as they assure healthy uptimes, stability, and quick response times from clients as demand from developers rises.

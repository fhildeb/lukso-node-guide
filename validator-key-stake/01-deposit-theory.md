## Deposit Theory

There are a few theoratical things that you might have to understand in order to make deposits and put your own stake at risk. Most of these facts will be LUKSO specific.

### The Network Start Process

LUKSO is started as PoS Blockchain with an initial genesis validator set. These validators deposited on the Ethereum blockchain and locked their LYXe in order to start off with the equal funds within the LUKSO blockchain itself.

> More about the Network, Tokenomics, Withdrawals, and Earnings can be found in the [Network Theory](/6-blockchain-clients/02-network-theory.md) section of this guide.

### Initial Deposits

The [Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) was open for about 3 weeks and was frozen on the 9th of May. The PoS consensus was started with all genesis validators that deposited up to block 17,227,300. There was a 46,523 block delay after the freeze was triggered by the LUKSO team. The genesis deposit contract received 10.336 deposits from 223 unique addresses based on the [Dune Analytics Dashboard](https://dune.com/hmc/lukso-genesis-validators). Each validator had to deposit 32 LYXe.

LUKSO mainnet was started on the 23rd May of 2023 using the genesis files created from the deposits on Ethereum. All future deposits will be done as regular validators.

### Genesis and Regular Validators

Genesis validator, were part of the genesis block of the LUKSO mainnet and could already stake to get LYX in the first weeks, before the migration of LYXe to LYX was started. They are the core community that started off the blockchain.

After the discovery month of about 4 weeks, LUKSO opened up the migration of LYXe to LYX, so everyone can convert the Ethereum representation of the coin to the actual blockchain's coin. Since then, regular validators can deposit on the LUKSO blockchain directly.

### LUKSO Genesis Deposit Contract

![Genesis Contract](/img/genesis-contract.png)

The [LUKSO Genesis Deposit Contract](https://etherscan.io/address/0x42000421dd80D1e90E56E87e6eE18D7770b9F8cC#code) had to do calls to the external LYXe ERC20-compatible token instead of doing it on the native chain with primary deposits.

Instead of just requiring a smaller amount of coins that can be transferred to the validator key step by step until 32 coins are reached, LUKSO's deposit contract required a fixed amount of 32 LYXe. This was mandatory to prepare the genesis files for the LUKSO mainnet after the contract was frozen. Thus, checks were applied if a public key is registered, preventing duplicate deposits.

This freezing involved additional storage and logic but is required to launch with a fixed amount of validators. On top, LUKSO's deposit function stored the votes for the initial coin supply of the mainnet. Every vote can still be fetched on the Ethereum blockchain. Everything had to be publicly verifiable as the LYX supply was set in stone to 42 million LYX when the contract closed.

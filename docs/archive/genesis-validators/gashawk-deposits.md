---
sidebar_label: "GasHawk Deposits"
sidebar_position: 5
---

# GasHawk Deposits

Before the LUKSO blockchain was launched as separate network, LUKSO ran a [Reversible Initial Coin Offering](https://medium.com/lukso/re-launching-the-reversible-ico-5289989ce7ed) in 2020 to create an preliminary representation of LYX token on Ethereum. The purpose of the token was to invest in the project but also to start off the later-coming blockchain in a distributed way. As time progressed, the genesis distribution of the network [changed](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6) and additional LYXe was burnt.

:::tip Token Contract

LYXe is based on the [ERC-777](https://eips.ethereum.org/EIPS/eip-777) standardization and can be viewed on [Etherscan](https://etherscan.io/token/0xA8b919680258d369114910511cc87595aec0be6D).

:::

## Validator Backstory

In 2023, LUKSO introduced their [Staking Launchpad](https://deposit.mainnet.lukso.network/) for [Genesis Validators](https://medium.com/lukso/its-happening-the-genesis-validators-are-coming-ce5e07935df6) who had already invested in LYXe. Users could each burn their LYXe through the launchpad to be included in the genesis block of the new network, which held LYX. With each validator key that was funded, users voted for the initial [blockchain supply](https://medium.com/lukso/genesis-validators-deposit-smart-contract-freeze-and-testnet-launch-c5f7b568b1fc).

As the Genesis **deposits on Ethereum were fairly expensive** with 25 to 70 dollar costs for each validator, lots of people used the [GasHawk](https://gashawk.io/) platform. It is an **off-chain buffer system** in which you forward your transaction to an off-chain server instead of using the direct Mainnet RPC channel. The service will buffer the transactions in an attempt to find the sweet spot and conserve gas at a specific moment. GasHawk time metrics are based on the [ERC1559](https://eips.ethereum.org/EIPS/eip-1559) standard that got applied within the [London] update of Ethereum.

![GasHawk Dashboard](/img/guides/validator-setup/gas-hawk.png)

## Transaction Buffering

Transaction buffer systems are tools that **optimize the process of sending transactions** to a blockchain network where the transaction fee can fluctuate significantly based on the congestion of the network. These systems act as middlemen between the user and the blockchain. When a user submits a transaction to a network of off-chain servers, the transaction is not passed directly to the blockchain. Instead, the system **holds the transaction and waits for a suitable time to send** it, usually when the gas prices are more favorable. These delays make it highly probable that the system will offer lower costs for the transaction of the user.

## Security Concerns

Signing a transaction involving a person’s private key creates cryptographically verifiable proof of the person behind the transaction. This proof includes information related to the transaction such as the destination address and how much cryptocurrency is being sent. Once the transaction is signed, its **contents cannot be changed** without the integrity of the signature being breached. The signature is created by hashing the transaction information along with the person’s private key. In the event of any change in the transaction details, the signature would no longer match the transaction.

The off-chain service cannot change its contents once a signed transaction is sent to it. The only action it is capable of taking is ascertaining the best time when the transaction should be sent to the blockchain network in a way that incurs lower fees. In certain situations, the service **might abort forwarding the transaction** and exclude it from the blockchain transaction pool in case it could not find a cheap spot or the user's wallet already sent a regular transaction with a higher nonce, so the previous transaction becomes invalid.

## Relaying Deposits

**1. Connect to GasHawk**: _Sign-in to [GasHawk](https://gashawk.io/#/tx) dashboard using the [MetaMask](https://metamask.io/) wallet and open the main view._

**2. Add the Buffer Endpoint**: _Connect to GasHawk's Ethereum endpoint by adding it's RPC to your wallet._

**3. Adjust the Time Delays**: _Configure your wanted delay time within the settings on the left side._

**4. Enable Nonce Modification**: _Within MetaMask, enable nonce modification to adjust off-chain nonces manually._

**5. Start the Launchpad**: _Change your RPC back to Ethereum Mainnet and go through the [LUKSO Launchpad](https://deposit.mainnet.lukso.network/en/) process._

**5. Change Network**: _On the final deposit page, change the network back to the previously added GasHawk's RPC._

**6. Executing Deposits**: _Separately send each validator key deposit transaction while raising the nonce._

:::tip Off-Chain Queue

Never deposit all keys at once and always remember the nonce within the transaction screen. When timing transactions for later, the account's nonce always has to be increased by one without any gaps to ensure valid execution order. As the RPC is a private endpoint, the nonce within the wallet does not always raise automatically, meaning you might have to adjust it within the transaction window of MetaMask.

:::

:::info Transaction Status

After sending the transaction to the GasHawk endpoint, the launchpad will show the transaction as failed. This status is entirely normal as the launchpad only listens to the Ethereum and no additional services. Your transaction will still be published to the blockchain, just at a later time. Do not re-set the same transaction multiple times.

:::

**7. Reviewing Transactions**: _Head over to the [GasHawk](https://gashawk.io/#/tx) dashboard and wait for the transactions to be executed._

:::info Resending Transactions

In case a transaction failed due to a nonce error, you can _resend_ it directly from GasHawk dashboard.

:::

**8. Verify Deposits**: _Return to the front page of the [LUKSO Launchpad](https://deposit.mainnet.lukso.network/en/) and input your deposit file._

:::tip

If the transactions succeeded, all entries of the deposit file will show with green checkmarks.

:::

![Launchpad Checkmarks](/img/guides/validator-setup/launchpad_12.png)

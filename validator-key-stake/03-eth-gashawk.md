## Genesis Deposits using GasHawk

As genesis deposits on Ethereum were quite expensive, reaching from 25 to 70 dollars per validator deposit, lots of people used the tool [GasHawk](https://gashawk.io/). Its an offchain buffer system where you send your transaction to, instead of using the Mainnet RPC directly. It will then delay these transactions to find the sweetspot and save gas for you based on [ERC1559](https://eips.ethereum.org/EIPS/eip-1559) metrics.

> For now, GasHawk only supports the Ethereum Mainnet.

![GasHawk Dashboard](/img/gas-hawk.png)

### Transaction Buffer Systems

Transaction buffer servers or systems are mechanisms designed to improve the experience of submitting transactions to a blockchain network, where transaction fees can vary significantly due to network congestion.

Buffer systems work by acting as an intermediary between the user and the blockchain. When you send a transaction to a off-chain server system, it doesn't immediately broadcast your transaction to the blockchain. Instead, it holds the transaction and waits for an optimal time to send it, generally when gas prices are lower. This can result in lower transaction costs for the user.

In terms of security, when you sign a transaction with your private key, you're essentially creating a cryptographic proof that you are the sender of the transaction. This proof includes details of the transaction, such as the recipient's address and the amount of cryptocurrency to be sent.

Once a transaction is signed, the contents of the transaction can't be changed without invalidating the signature. This is because the signature is generated from a hash of the transaction data and your private key. If the transaction data were changed, the signature would no longer match the transaction.

So, when you send a signed transaction to a off-chain service, the service can't change the contents of the transaction. All it can do is decide when to broadcast the transaction to the blockchain network, resulting in cheaper fees.

### Relaying Deposits

1. Set up your GasHawk RPC on your wallet, use sign-in with Ethereum to get to your [GasHawk Dashboard](https://gashawk.io/#/tx), and adjust your wanted delay time within the settings on the left side. The dashboard will help handle transactions.
2. Enable nonce modification within your MetaMask or any other wallet you use to be able to manually adjust off-chain nonces.
3. Change your RPC back to Ethereum Mainnet and go through the [LUKSO Launchpad](https://deposit.mainnet.lukso.network/en/) steps as regular. On the final deposit page, change the RPC to GasHawk.
4. Your transaction will be sent to a buffer service, so the launchpad does not recognize transaction queues. Therefore, send each separately instead of using the `deposit all remaining keys` button at the bottom.
5. If you deposit multiple validators, always look at the nonce that is showing up on the transaction screen. Remember the nonce of the previous transaction. It always has to be increased by one without gaps. Sometimes it needs to be updated manually. If your first deposit had a nonce of `5`, the transaction right after will need to have the nonce value of `6`.
6. After sending the transaction to the GasHawk server system, the launchpad will show the transaction as failed with `Error`. This status is entirely normal due to the missing mainnet data, as the transaction will be published at a more suitable time to save you gas.
7. Head over to your [GasHawk dashboard](https://gashawk.io/#/tx). After some minutes, your transactions will show up. If they should fail due to a nonce error, you can resent your transactions from there. Simply click on `resend transaction` and confirm it once again.
8. After the transactions are executed, return to the front page of the LUKSO Launchpad and input your deposit file to check all transactions. They should show green checkmarks.

![Launchpad Checkmarks](/img/launchpad_12.png)

> You just saved yourself gas while becoming a genesis validator.

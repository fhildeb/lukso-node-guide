## Genesis Deposits using GasHawk

As genesis deposits on Ethereum were quite expensive, reaching from 25 to 70 dollars per validator deposit, many people used the tool [GasHawk](https://gashawk.io/). It's an off-chain buffer system where you send your transaction to an off-chain server instead of using the Mainnet RPC connection directly. The service will delay these transactions to find the sweet spot and save gas for you based on [ERC1559](https://eips.ethereum.org/EIPS/eip-1559) metrics.

> For now, GasHawk only supports the Ethereum Mainnet.

![GasHawk Dashboard](/img/gas-hawk.png)

### Transaction Buffer Systems

Transaction buffer systems are mechanisms designed to improve the experience of submitting transactions to a blockchain network, where transaction fees can vary significantly due to network congestion.

Buffer systems act as an intermediary between the user and the blockchain. When you send a transaction to an off-chain server system, it doesn't immediately broadcast your transaction to the blockchain. Instead, it holds the transaction and waits for an optimal time to send it, generally when gas prices are lower. Delays will almost certainly result in lower transaction costs for the user.

### Security

Signing a transaction with your private key creates cryptographic proof that you are the transaction's sender. This proof includes transaction details, such as the recipient's address and the amount of cryptocurrency to be sent. Once a transaction is signed, the contents of the transaction can't be changed without invalidating the signature, as it is generated from a hash of the transaction data and your private key. The signature would no longer match the transaction if the transaction data were changed.

When you send a signed transaction to an off-chain service, the service can't change the contents of the transaction. All it can do is decide when to broadcast the transaction to the blockchain network, resulting in cheaper fees. In the worst case, it could drop the transaction so it won't be sent to the blockchain transaction pool.

### Relaying Deposits

1. Set up your GasHawk RPC on your wallet, use sign-in with Ethereum to get to your [GasHawk Dashboard](https://gashawk.io/#/tx), and adjust your wanted delay time within the settings on the left side. The dashboard will help handle transactions.
2. Enable nonce modification within your MetaMask or any other wallet you use to be able to adjust off-chain nonces manually.
3. Change your RPC back to Ethereum Mainnet and go through the [LUKSO Launchpad](https://deposit.mainnet.lukso.network/en/) steps as regular. On the final deposit page, change the RPC to GasHawk.
4. Your transaction will be sent to a buffer service so the launchpad does not recognize transaction queues. Therefore, send each separately instead of using the `deposit all remaining keys` button at the bottom.
5. If you deposit multiple validators, always look at the nonce that is showing up on the transaction screen. Remember the nonce of the previous transaction. It always has to be increased by one without gaps. Sometimes it needs to be updated manually. If your first deposit had a nonce of `5`, the transaction right after will need to have the nonce value of `6`.
6. After sending the transaction to the GasHawk server system, the launchpad will show the transaction failed with `Error`. This status is entirely normal due to the missing mainnet data, as the transaction will be published at a more suitable time to save you gas.
7. Head over to your [GasHawk dashboard](https://gashawk.io/#/tx). After some minutes, your transactions will show up. If they should fail due to a nonce error, you can resent your transactions from there. Click on `resend transaction` and confirm it once again.
8. After the transactions are executed, return to the front page of the LUKSO Launchpad and input your deposit file to check all transactions. They should show green checkmarks.

![Launchpad Checkmarks](/img/launchpad_12.png)

> You just saved yourself gas while becoming a genesis validator.

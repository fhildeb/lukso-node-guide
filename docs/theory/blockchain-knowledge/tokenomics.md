---
sidebar_label: "Tokenomics"
sidebar_position: 2
---

# Tokenomics

### 6.2.4 Tokenomics

A large portion of the transaction fee is burned, i.e., permanently removed from circulation. This burning mechanism effectively reduces the supply of Ether over time, which can exert upward pressure on the price, assuming demand remains constant or increases, making EVM PoS blockchain coins a semi-deflationary asset.

Therefore, validators only receive the block rewards and tips as fees.

### 6.2.5 Earnings & Withdrawals

Regarding withdrawals and returns, there are specific wallet addresses to maintain: the withdrawal and the recipient address. They could be the same address, but different actions are bound to them:

- **Staking Withdrawal Address**: Staking withdrawals refer to withdrawing earned rewards or the initial staked amount (32 LYX) by validators participating in Proof-of-Stake. These withdrawals become possible after the Shapella upgrade & EIP-4895 are up and running on the according network. These staking withdrawals are automatically pushed to the withdrawal address set during the key generation process and are registered on-chain during the deposit. **This address cannot be changed once the stake is deposited. You need to guarentee that you have control over the withdrawal address.** If you want to update it at any time, you need to exit your validators to receive the funds on the (old) withdrawal address and then set up new validators with a new one.
- **Recipient Fee Address**: The recipient fee address, e.g., transaction or gas fee address, differs from the staking withdrawal. The recipient fee address is associated with the validator when they perform validation duties, such as proposing and attesting to blocks. The recipient fee address is set during the start of the validator client on the node and can be changed upon restart. You need your node's wallet password after importing the validator keys to set or modify. The fees are paid by users who initiate transactions and smart contract executions on the EVM network. Validators collect the fees as an incentive for their work in maintaining the blockchain.

Both addresses are regular Ethereum Addresses (EOAs) that can be generated in wallets like MetaMask or hardware wallets like Ledger. They could even be the same addresses, meaning you will receive both: withdrawals and fees at the same address.

> Please remember that your hardware wallet needs support for importing or using these accounts on regular dApps. Otherwise, you might not be able to manage these funds until the LUKSO network is supported. In the case of Ledger, they can easily be imported into MetaMask, which should do the trick for most of you. Keep in mind to send some minimal supported funds onto this hardware key, so it will show up again if it was restored from the seed alone.

In conclusion, staking withdrawals refer to withdrawing rewards and staked amounts connected to the consensus mechanism. Conversely, the recipient fee address is where validators receive transaction fees for their validation work.

> Typically, everything is included in the APY for staking rewards. But as expected, there are fluctuations for various factors such as network usage, the number of validators, and consensus changes.

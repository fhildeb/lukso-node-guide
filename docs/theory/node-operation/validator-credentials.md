---
sidebar_label: "Validator Credentials"
sidebar_position: 6
---

# Validator Credentials

### 6.9.1 Validator Credentials

When becoming a validator, you must manage passwords, addresses, and keys. Let's clear them up once again before we start the CLI process:

- **Validator Mnemonic Seed**: This is a phrase that is used to generate your _Validator Deposit Keys_ and your _Deposit Data_. The mnemonic seed is a series of words that act as a seed to generate your keys and addresses. It's the most critical piece of information that you need to store securely and privately. If someone else gets access to your mnemonic seed, they could potentially regenerate your validator and gain access to your staked LYX/LYXt. On the other hand, if you lose your mnemonic seed and don't have your keys backed up, you could lose access to your staked LYX/LYXt. The mnemonic seed should be written down and stored in a secure location. Storing multiple copies in different secured locations is often recommended to protect against loss or damage.
- **Validator Key Password**: This password is used to encrypt each individual _Validator Deposit Key_. Every time you import a validator key into your validator client, you'll need to provide this password. It's important to note that each validator key can have its unique password. Separate passwords would mean that if you're importing multiple keys, you may need to provide multiple passwords. Your key passwords should be strong, unique, and securely stored like your wallet password. If you create multiple batches of validator keys, all keys within one folder will have the same password.
- **Validator Deposit Key**: A keystore file encrypts your private key using the _Validator Key Password_. It is generated for each potential deposit you want to make. It can be used to import your validator key into a validator client. It's important to store your keystore files securely, as anyone with access to your keystore file and its password would have access to your validator key. If you lose your keystore file, you can regenerate it using your _Validator Mnemonic Seed_, assuming you have also stored it securely. With it, the client can verify if you deposited the required 32 LYX/LYXe to become an active validator.
- **Deposit Data**: This is a JSON file generated when you set up your validator using your _Validator Mnemonic Seed_. The JSON file includes various essential pieces of information, such as your public key and a signature. This file is used as part of the process to register your validator on the blockchain using transactions.
- **Validator Wallet Password**: This password is used to secure the wallet holding your _Validator Deposit Keys_. The wallet password should be strong, unique, and known only to you. This password will be needed every time you start your validator client.
- **Validator Withdrawal Address**: This is the Ethereum address where your funds will be sent when you stop validating and withdrawing your staked LYX. It's important that you always have control over it as it can not be updated.
- **Validator Recipient Fee Address**: This is the Ethereum address where the transaction fees you earn as a validator will be sent. Depending on your setup, this might be the same as your withdrawal address.

:::tip

For more details about earnings and withdrawals, check the [tokenomics](/docs/theory/blockchain-knowledge/tokenomics.md) page of the the [**🧠 Theory**](/docs/theory/blockchain-knowledge/proof-of-stake.md) section.

:::

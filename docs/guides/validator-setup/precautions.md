---
sidebar_label: "1.1 Precautions"
sidebar_position: 1
---

# 1.1 Precautions

The **Validator Setup** is the first step for anyone aspiring to participate in a blockchain consensus. In this section, we cover the initial processes for securely generating validator keys and the launchpad walkthrough. Before setting up your node, regardless of which [Client Options](#) you choose or whether you are running the software on a dedicated server or at home, it’s crucial to prepare thoroughly.

:::tip

If you're not quite sure about [hardware preparations](/docs/theory/preparations/node-specification.md), [blockchain fundamentals](/docs/theory/blockchain-knowledge/proof-of-stake.md), or the theoretical basics of [node operations](/docs/theory/node-operation/client-options.md), please refer to the [**🧠 Theory**](/docs/theory/preparations/node-specification.md) section first to build a solid foundation.

:::

:::info

In case you dont want to participate in the staking process and just intend to setup a regular node or archive for accessing the blockchain data, you can skip this step and move to the [Hardware Setup](#) or [Client Setup](#) sections.

:::

Validator nodes play a crucial role in the blockchain network, participating in the consensus mechanism to validate transactions and create new blocks. As such, the security of these validator nodes and their associated keys is of utmost importance. Generating your validator keys on a clean, offline device that has never touched the internet during setup is an ideal practice. Here's why:

- **Mitigation of Cyber Threats**: By generating validator keys on a clean, offline device, you reduce exposure to potential online threats, including malware, hacking, and other forms of cyberattacks. With no internet connection, the chances of a hacker accessing your keys are essentially zero.
- **Control Over Key Generation**: Generating keys offline ensures that you have complete control over the entire process. The private keys are not exposed to third-party services, minimizing the risk of unauthorized access or leakage. A clean operating system installation is an excellent method to establish this security, as it prevents other programs or services from copying clipboards or storing data until the network connection is restored.
- **Elimination of Potential Spyware**: A clean device implies a system free of potential spyware, adware, or other malicious software that could compromise your keys. Eliminating this risk is crucial, as such threats might record your keystrokes or screen data and expose your private keys.
- **Protection against Remote Attacks**: An offline device is inherently immune to remote attacks. Hackers cannot penetrate a system that is not connected to a network.
- **Enhanced Privacy**: Offline key generation ensures that no traces of your keys are left online, thereby providing maximum privacy.

:::warning

For the above reasons, please ensure you have a machine that can be flashed or used as a key-generation device. In case you only have your node device, please perform the **key generation** on your node **before** flashing the system and setting up the node's operating system.

:::

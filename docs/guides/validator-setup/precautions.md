---
sidebar_label: "1.1 Precautions"
sidebar_position: 1
---

# 1.1 Precautions

## Validator Key Gen: Device Setup

Validator nodes play a crucial role in the blockchain network, participating in the consensus mechanism to validate transactions and create new blocks. As such, the security of these validator nodes and their associated keys is of utmost importance. Generating your validator keys on a clean, offline device that has never touched the internet during setup is an ideal practice. Here's why:

- **Mitigation of Cyber Threats**: By generating validator keys on a clean, offline device, you reduce exposure to potential online threats, including malware, hacking, and other forms of cyberattacks. With no internet connection, the chances of a hacker accessing your keys are essentially zero.
- **Control Over Key Generation**: Generating keys offline ensures that you have complete control over the entire process. The private keys are not exposed to third-party services, minimizing the risk of unauthorized access or leakage. A clean operating system installation is an excellent variant to establish this security so that no other program or service can copy clipboards and store them somewhere until the network connection is restored.
- **Elimination of Potential Spyware**: A clean device implies a system free of any potential spyware, adware, or other malicious software that could compromise your keys. Eliminating the risk of spyware is crucial, as such threats could potentially record your keystrokes or screen, which could expose your private keys.
- **Protection against Remote Attacks**: An offline device is inherently immune to remote attacks. Hackers cannot penetrate a device that is not connected to a network.
- **Enhanced Privacy**: Offline generation of keys ensures that no traces of your keys are left online, providing maximum privacy.

**Therefore, please ensure you have a machine that can be flashed or used as a key-generation device. In case you only have your node device, please do the generation on your node before you flash the system and continue with setting up the node's operating system.**

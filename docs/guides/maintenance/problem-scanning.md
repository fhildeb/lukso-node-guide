---
sidebar_label: "11.3 Problem Scanning"
sidebar_position: 3
---

# 11.3 Problem Scanning

<!--TODO: input from utils page / exchange with existing content-->

## 6. Check Node Status

There are multiple ways of checking the node's status. The LUKSO CLI already comes with a bunch of them to check which clients are running and to look at the logs. These logs are then not only printed onto the screen but can also be saved as log files:

```sh
# Check the status of all clients
lukso status

# Check the logs of the running mainnet execution client
lukso logs execution

# Check the logs of the running mainnet consensus client
lukso logs consensus

# Check the logs of the running testnet execution client
lukso logs execution -- testnet

# Check the logs of the running testnet consensus client
lukso logs consensus -- testnet
```

#### Log File Search

The logging commands of the LUKSO CLI can also be used to search the logging files for warnings or errors. Checkups should be done regularly to be up to date with any upcoming connection, storage, or runtime issues. We can check if the user exists within the log files using `grep`, a powerful command-line tool for global expression search within files or text.

```sh
# Fetch all execution warnings
lukso logs execution | grep "warning"
# Fetch all validator warnings
lukso logs validator | grep "warning"
# Fetch all consensus warnings
lukso logs consensus | grep "warning"

# Fetch all execution errors
lukso logs execution | grep "error"
# Fetch all validator errors
lukso logs validator | grep "error"
# Fetch all consensus errors
lukso logs consensus | grep "error"
```

> After executing the command, the terminal is waiting for an input to show the log file. You will have to press the ENTER key in order to see the related logs you searched for.

In addition, Geth and Erigon clients provide their own default JSON-RPC interface that is enabled internally. Here, clients are listening for incoming JSON-RPC requests.

#### JSON-RPC

JSON-RPC is a remote procedure call protocol encoded in JSON. It is a lightweight, language-independent data-interchange format that is easy for humans to read and write and for machines to parse and generate. JSON-RPC allows for notifications and multiple calls to be sent to the server, which may be answered out of order.

In the context of blockchain and Ethereum, JSON-RPC is used as a way for applications to interact with the blockchain network. It provides a way to invoke methods on an Ethereum node, allowing applications to do things like querying blockchain data, sending transactions, and interacting with smart contracts.

If you're running an Ethereum node on your computer, it will typically expose a JSON-RPC interface on port 8545. This interface can be used by other applications on your computer or even on the internet, if appropriately configured, to interact with the Ethereum network.

#### Attach Clients

The `attach` command can interact with a running execution instance. Attaching the console to a particular port will open up a JavaScript console where you can execute JavaScript commands and interact with the Ethereum blockchain via your own node.

> **Note**: If you are using another client as Geth, please look at their documentation on configuring the JSON RPC endpoint! For Erigon, it's similar to Geth. However, there might be an error about the address already being used by the client, so you have to configure it first.

```sh
# Geth interface
geth attach http://localhost:8545

# Erigon interface
erigon attach http://localhost:8545
```

If you are listening to the port, you can check the clients:

```sh
# Check current blocknumber
> eth.blocknumber

# Check if the client is still syncing
> eth.syncing

# Output full function set
> eth

# Quick listening to port
> exit
```

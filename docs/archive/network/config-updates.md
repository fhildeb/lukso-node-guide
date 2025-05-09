---
sidebar_label: "Configuration Updates"
sidebar_position: 2
---

# Configuration Updates

> Changes introduced since network launch in May 2023. Last checked on 3rd October 2024

#### Geth Changes

```sh
cd <lukso-working-directory>/configs/<network>
vim geth/geth.toml
```

```text
GasPrice = 1000000000                       --> updated on https://github.com/lukso-network/network-configs/pull/132/files
```

#### Prysm Changes

```sh
cd <lukso-working-directory>/configs/<network>
vim prysm/prysm.yaml
```

```text
p2p-host-ip: '0.0.0.0'                      --> removed on https://github.com/lukso-network/network-configs/pull/112/files
min-sync-peers: 1                           --> updated on https://github.com/lukso-network/network-configs/pull/131/files
minimum-peers-per-subnet: 1                 --> updated on https://github.com/lukso-network/network-configs/pull/131/files
block-batch-limit: 512                      --> removed on https://github.com/lukso-network/network-configs/pull/131/files
block-batch-limit-burst-factor: 10          --> removed on https://github.com/lukso-network/network-configs/pull/131/files
contract-deployment-block: 0                --> added on https://github.com/lukso-network/network-configs/pull/117/files
subscribe-all-subnets: true                 --> removed on https://github.com/lukso-network/network-configs/pull/135/files
p2p-max-peers: 70                           --> added on https://github.com/lukso-network/network-configs/pull/138/files
```

#### Erigon Changes

```sh
cd <lukso-working-directory>/configs/<network>
vim erigon/erigon.toml
```

```text
"externalcl" = true                         --> removed on https://github.com/lukso-network/network-configs/pull/115/files

"snapshots" = false                         --> added on https://github.com/lukso-network/network-configs/pull/115/files
"prune" = "htc"                             --> added on https://github.com/lukso-network/network-configs/pull/115/files
"private.api.addr" = "127.0.0.1:9098"       --> added on https://github.com/lukso-network/network-configs/pull/118/files

"db.size.limit" = "8TB"                     --> added on https://github.com/lukso-network/network-configs/pull/129/files
"maxpeers" = 100                            --> added on https://github.com/lukso-network/network-configs/pull/138/files
```

#### Teku Changes

```sh
cd <lukso-working-directory>/configs/<network>
vim teku/config.yaml
```

```text
MIN_EPOCHS_FOR_BLOCK_REQUESTS: 33024        --> added on https://github.com/lukso-network/network-configs/pull/128/files
MAX_PER_EPOCH_ACTIVATION_CHURN_LIMIT: 8     --> added on https://github.com/lukso-network/network-configs/pull/134/files
DENEB_FORK_EPOCH: 123075                    --> updated on https://github.com/lukso-network/network-configs/pull/142/files
MAX_PER_EPOCH_ACTIVATION_CHURN_LIMIT: 8     --> updated on https://github.com/lukso-network/network-configs/pull/142/files
MAX_REQUEST_BLOCKS_DENEB: 128               --> added on https://github.com/lukso-network/network-configs/pull/142/files
MAX_REQUEST_BLOB_SIDECARS: 768              --> added on https://github.com/lukso-network/network-configs/pull/142/files
MIN_EPOCHS_FOR_BLOB_SIDECARS_REQUESTS: 4096 --> added on https://github.com/lukso-network/network-configs/pull/142/files
BLOB_SIDECAR_SUBNET_COUNT: 6                --> added on https://github.com/lukso-network/network-configs/pull/142/files
```

#### Lighthouse Changes

```sh
cd <lukso-working-directory>/configs/<network>
vim lighthouse/lighthouse.toml
```

```text
http-address = "0.0.0.0"                    --> removed on https://github.com/lukso-network/network-configs/pull/116/files

metrics-address = "0.0.0.0"                 --> removed on https://github.com/lukso-network/network-configs/pull/116/files
metrics-allow-origin = "*"                  --> removed on https://github.com/lukso-network/network-configs/pull/116/files

metrics = true                              --> added on https://github.com/lukso-network/network-configs/pull/116/files
metrics-port=5057                           --> added onhttps://github.com/lukso-network/network-configs/pull/116/files
```

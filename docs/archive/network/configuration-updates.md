---
sidebar_label: "Configuration Updates"
sidebar_position: 2
description: "Track all changes to LUKSO mainnet client configuration files since genesis, including Geth, Prysm, Teku, Lighthouse, Besu, and Erigon updates."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configuration Updates

This page lists changes introduced to the [LUKSO Mainnet Network Configuration Files](https://github.com/lukso-network/network-configs) since [Genesis Launch on 23 May 2023](https://explorer.execution.mainnet.lukso.network/block/1).

:::tip

Client-specific blockchain configurations can be updated on a node setup by:

- 🎨 **[DAppNode](https://dappnode.com/)**: Reinstalling both execution and consensus clients, as their configuration is only fetched during setup.
- 👾 **[LUKSO CLI](https://github.com/lukso-network/tools-lukso-cli)**: Updating files manually, as `lukso update configs` only affects shared, cross-client configurations.
- 🐳 **[Docker](https://github.com/lukso-network/network-docker-containers)**: Updating the client's `docker_compose.yml` files for the container configuration.
- 🗂️ **[Custom](https://docs.lukso.tech/networks/mainnet/running-a-node#-with-your-own-clients)**: Redownloading the network configuration or updating files manually.

:::

:::info

The page was last updated on May 30, 2025.

:::

## Geth File

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>
vim geth/geth.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>
nano geth/geth.toml
```

</TabItem>
</Tabs>

| Date        | Action  | Property                | Commit                                                                  |
| ----------- | ------- | ----------------------- | ----------------------------------------------------------------------- |
| 15 Mar 2024 | updated | `GasPrice = 1000000000` | [#132](https://github.com/lukso-network/network-configs/pull/132/files) |
| 4 Oct 2024  | updated | `GasPrice = 1000000`    | [#143](https://github.com/lukso-network/network-configs/pull/143/files) |

## Besu File

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>
vim besu/besu.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>
nano besu/besu.toml
```

</TabItem>
</Tabs>

| Date       | Action  | Property                 | Commit                                                                  |
| ---------- | ------- | ------------------------ | ----------------------------------------------------------------------- |
| 4 Oct 2024 | updated | `'min-gas-price' = 1000` | [#143](https://github.com/lukso-network/network-configs/pull/143/files) |

## Erigon File

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>
vim erigon/erigon.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>
nano erigon/erigon.toml
```

</TabItem>
</Tabs>

| Date        | Action  | Property                                | Commit                                                                  |
| ----------- | ------- | --------------------------------------- | ----------------------------------------------------------------------- |
| 21 Jun 2023 | removed | `"externalcl" = true`                   | [#115](https://github.com/lukso-network/network-configs/pull/115/files) |
| 21 Jun 2023 | added   | `"snapshots" = false`                   | [#115](https://github.com/lukso-network/network-configs/pull/115/files) |
| 21 Jun 2023 | added   | `"prune" = "htc"`                       | [#115](https://github.com/lukso-network/network-configs/pull/115/files) |
| 5 Jul 2023  | added   | `"private.api.addr" = "127.0.0.1:9098"` | [#118](https://github.com/lukso-network/network-configs/pull/118/files) |
| 27 Dec 2023 | added   | `"db.size.limit" = "8TB"`               | [#129](https://github.com/lukso-network/network-configs/pull/129/files) |
| 17 Jul 2024 | added   | `"maxpeers" = 100`                      | [#138](https://github.com/lukso-network/network-configs/pull/138/files) |

## Lighthouse File

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>
vim lighthouse/lighthouse.toml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>
nano lighthouse/lighthouse.toml
```

</TabItem>
</Tabs>

| Date        | Action  | Property                      | Commit                                                                  |
| ----------- | ------- | ----------------------------- | ----------------------------------------------------------------------- |
| 21 Jun 2023 | removed | `http-address = "0.0.0.0"`    | [#116](https://github.com/lukso-network/network-configs/pull/116/files) |
| 21 Jun 2023 | removed | `metrics-address = "0.0.0.0"` | [#116](https://github.com/lukso-network/network-configs/pull/116/files) |
| 21 Jun 2023 | removed | `metrics-allow-origin = "\*"` | [#116](https://github.com/lukso-network/network-configs/pull/116/files) |
| 21 Jun 2023 | added   | `metrics = true`              | [#116](https://github.com/lukso-network/network-configs/pull/116/files) |
| 21 Jun 2023 | added   | `metrics-port=5057`           | [#116](https://github.com/lukso-network/network-configs/pull/116/files) |

## Prysm File

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>
vim prysm/prysm.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>
nano prysm/prysm.yaml
```

</TabItem>
</Tabs>

| Date        | Action  | Property                             | Commit                                                                  |
| ----------- | ------- | ------------------------------------ | ----------------------------------------------------------------------- |
| 19 Sep 2023 | removed | `p2p-host-ip: '0.0.0.0'`             | [#112](https://github.com/lukso-network/network-configs/pull/112/files) |
| 1 Mar 2024  | updated | `min-sync-peers: 1`                  | [#131](https://github.com/lukso-network/network-configs/pull/131/files) |
| 1 Mar 2024  | updated | `minimum-peers-per-subnet: 1`        | [#131](https://github.com/lukso-network/network-configs/pull/131/files) |
| 1 Mar 2024  | removed | `block-batch-limit: 512`             | [#131](https://github.com/lukso-network/network-configs/pull/131/files) |
| 1 Mar 2024  | removed | `block-batch-limit-burst-factor: 10` | [#131](https://github.com/lukso-network/network-configs/pull/131/files) |
| 3 Jul 2023  | added   | `contract-deployment-block: 0`       | [#117](https://github.com/lukso-network/network-configs/pull/117/files) |
| 30 Aug 2024 | removed | `subscribe-all-subnets: true`        | [#135](https://github.com/lukso-network/network-configs/pull/135/files) |
| 17 Jul 2024 | added   | `p2p-max-peers: 70`                  | [#138](https://github.com/lukso-network/network-configs/pull/138/files) |

## Teku File

<Tabs groupId="editor">
  <TabItem value="vim" label="Vim" default>

```sh
cd <lukso-working-directory>/configs/<network>
vim teku/config.yaml
```

</TabItem> <TabItem value="nano" label="Nano">

```sh
cd <lukso-working-directory>/configs/<network>
nano teku/config.yaml
```

</TabItem>
</Tabs>

| Date        | Action  | Property                                      | Commit                                                                  |
| ----------- | ------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| 22 Sep 2023 | added   | `MIN_EPOCHS_FOR_BLOCK_REQUESTS: 33024`        | [#128](https://github.com/lukso-network/network-configs/pull/128/files) |
| 21 Mar 2024 | added   | `MAX_PER_EPOCH_ACTIVATION_CHURN_LIMIT: 8`     | [#134](https://github.com/lukso-network/network-configs/pull/134/files) |
| 2 Oct 2024  | updated | `DENEB_FORK_EPOCH: 123075`                    | [#142](https://github.com/lukso-network/network-configs/pull/142/files) |
| 2 Oct 2024  | added   | `MAX_PER_EPOCH_ACTIVATION_CHURN_LIMIT: 8`     | [#142](https://github.com/lukso-network/network-configs/pull/142/files) |
| 2 Oct 2024  | added   | `MAX_REQUEST_BLOCKS_DENEB: 128`               | [#142](https://github.com/lukso-network/network-configs/pull/142/files) |
| 2 Oct 2024  | added   | `MAX_REQUEST_BLOB_SIDECARS: 768`              | [#142](https://github.com/lukso-network/network-configs/pull/142/files) |
| 2 Oct 2024  | added   | `MIN_EPOCHS_FOR_BLOB_SIDECARS_REQUESTS: 4096` | [#142](https://github.com/lukso-network/network-configs/pull/142/files) |
| 2 Oct 2024  | added   | `BLOB_SIDECAR_SUBNET_COUNT: 6`                | [#142](https://github.com/lukso-network/network-configs/pull/142/files) |
| 6 Feb 2025  | added   | `MAX_BLOBS_PER_BLOCK: 6`                      | [#146](https://github.com/lukso-network/network-configs/pull/146/files) |

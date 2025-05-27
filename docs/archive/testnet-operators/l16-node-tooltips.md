---
sidebar_label: "L16 Node Tooltips"
sidebar_position: 2
---

# L16 Node Tooltips

This page provides quick access to LUKSO L16 testnet node commands through the Legacy CLI and Docker.

:::danger Historical Guide

This guide is kept for historical reference. The old LUKSO CLI commands may be unavailable by now.

:::

:::info

The following steps are performed on your 📟 **node server**.

:::

## Stop Node Operation

```bash
lukso network stop validator
lukso network stop
```

## Clear Network Config

```bash
lukso network stop validator
lukso network stop
lukso network clear
lukso network init
```

## Update Bootnodes

```bash
lukso network update
lukso network refresh
```

## Restart the Validator

```bash
lukso network start
lukso network start validator
```

## Check Docker Containers

```bash
docker ps -a
```

## Monitor Docker Images

```bash
docker images -a
```

## Log Blockchain Clients

:::tip

Open multiple terminals to track them all at the same time.

:::

```bash
# Execution Client
sudo docker logs lukso-geth -f

# Validator Client
sudo docker logs prysm_validator -f

# Consensus Client
sudo docker logs prysm_beacon -f

# ETH Stats Monitoring Service
sudo docker logs eth2stats-client -f
```

:::info

Use `Control + C` to exit the logs and return to the regular terminal window.

:::

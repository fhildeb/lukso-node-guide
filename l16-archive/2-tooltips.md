# LUKSO CLI Tooltips

## 1. Stopping the Node

```bash
lukso network stop validator
lukso network stop
```

## 2. Clearing and Restarting

```bash
lukso network stop validator
lukso network stop
lukso network clear
lukso network init
```

### Get Latest Network Bootnode

```bash
lukso network update
lukso network refresh
```

### Redo Node Config

```bash
nano node_config.yaml
```

Change your node name to this format, replacing XX with the validator number on your ZIP file: `beta-genesis-validator_XX`

> Use control + X to close the file and save it

### Restart

```bash
lukso network start
lukso network start validator
```

> Wait 10 minutes. Your node should start syncing and validating.

## 3. Docker Checks

### Check Containers

```bash
docker ps -a
```

### Check Images

```bash
docker images -a
```

## 4. Logging

> Open multiple terminals to track them all at the same time

```bash
# Execution Client
sudo docker logs lukso-geth -f

# Validator Client
sudo docker logs prysm_validator -f

# Consensus Client
sudo docker logs prysm_beacon -f

# ETH Stats
sudo docker logs eth2stats-client -f
```

> Use control + c to exit the logs.

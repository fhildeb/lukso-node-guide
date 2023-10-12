# General Tooltips

The following file features small help snippets in case there are any issues with the LUKSO CLI

## Scan for Warnings and Errors

The logging commands of the LUKSO CLI can also be used to search the logging files for warnings or errors.

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

## Downgrade or Change Client Versions

The client version can be changed manually, in case there are some issues with the data folder.

```sh
# Manually overwrite Geth Version
lukso install --geth-tag v1.12

# Manually overwrite Prysm Version
lukso install --prysm-tag v4.0.8

# Manually overwrite Lighthouse Version
lukso install --lighthouse-tag v4.1.0

# Manually overwrite Erigon Version
lukso install ---erigon-tag v2.52.1

# Manually overwrite Teku Version
lukso install ---teku-tag v23.10.0
```

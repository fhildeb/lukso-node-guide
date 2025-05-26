---
sidebar_label: "Disk Management"
sidebar_position: 10
---

# Disk Management

Managing storage is essential when running a blockchain node, particularly for handling large and continuously growing datasets. Using flexible volume management, proper filesystem types, and well-structured partitioning can significantly improve system reliability and future maintenance.

## Logical Volume Manager

LVM is a storage management system that offers flexibility in managing disk space. It allows pooling of several physical disks into a consistent storage pool, known as a volume group, from which logical volumes are created. The system is especially useful for those planning for several nodes, expecting storage growth, and avoiding re-partitioning, as it allows:

- Easy resizing of partitions
- Grouping storage across multiple physical disks
- Clean logical structure for service-specific storage
- Adding new disks without downtime

:::tip Industry Standard

- LVM is the default partitioning method on 🔶 [**Ubuntu**](https://ubuntu.com/download) from version _20.04_ and above.
- 🎨 [**DAppNode**](https://dappnode.com/) machines also ship with LVM pre-enabled.

:::

## Storage Components

Within the Logical Volume Manager there are several terminologies and concepts.

| Name                             | Abbreviation | Description                                                                                                                               |
| -------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr> Physical Volume </nobr>   | PV           | The underlying physical storage disk or partition that is added to a volume group.                                                        |
| <nobr> Logical Volume </nobr>    | LV           | A flexible storage partition carved out of a volume group.                                                                                |
| <nobr> Volume Group </nobr>      | VG           | A collection of physical volumes pooled together into a single logical unit. <br /> **→** _Logical volumes are created from these groups_ |
| <nobr> Physical Extent </nobr>   | PE           | A fixed-size chunk of space used to manage allocation within a volume group. <br /> **→** _Logical volumes are built from these chunks_   |
| <nobr> Logical Extent </nobr>    | LE           | Each logical volume consists of multiple logical extents mapped to physical extents.                                                      |
| <nobr> Allocated Extents </nobr> | —            | All Physical Extents that are currently assigned to one or more logical volumes.                                                          |

:::tip

Logical volumes can span across multiple hardware disks and can be resized dynamically.

:::

## Filesystem Metadata

Each file system keeps track of data by using index nodes and descriptor blocks. When volume or filesystem expansion occurs, new index nodes and descriptor blocks are created as needed to define and manage additional storage space.

| Component             | Purpose                                                                                |
| --------------------- | -------------------------------------------------------------------------------------- |
| **Index Nodes**       | Track metadata like file size, ownership, and timestamps                               |
| **Descriptor Blocks** | Map index nodes to actual physical extends, used during file creation and modification |

:::info

LVM Metadata is stored on each physical volume to hold configuration data about volume groups and logical volumes.

:::

## Volume Sizing

LVM sets a default size for the root logical volume during server installation to leave headroom for future expansions.

- It's safer to grow volumes than shrink them.
- Shrinking involves more steps and risks, including potential data loss.
- This approach allows resizing after performance benchmarking or growth.

:::tip

More advanced instructions for resizing, expanding volumes, or adding disks can be found in the [**Disk Volumes**](/docs/guides/system-setup/disk-volumes.md) guide.

:::

:::info

The 🔸 [**Ubuntu Server**](/docs/guides/system-setup/disk-volumes.md) installation configured LVM with a default logical volume size of `100GB`.
:::

## Disk Encryption

Encrypting the entire disk ensures maximum data protection but introduces complexity for maintenance or restarts.

- Full disk encryption requires manual decryption on every boot.
- Remote connections and unlocking setups are extremely complex and harder to maintain.

:::tip

For most node setups, **full disk encryption** adds a barrier and **is not recommended**.

:::

:::info

The node's wallet and validator keys are encrypted independently. If needed, smaller encrypted partitions can be added after the regular node setup was completed. This might include extended service automation or sensitive data folders.

:::

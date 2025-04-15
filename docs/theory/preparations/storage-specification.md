---
sidebar_label: "Storage Specification"
sidebar_position: 5
---

# Storage Specification

<!--TODO: Chapter SSD vs HDD for blockchain nodes-->

### 1.3.6 Storage Setup

For storage, set the entire disk.

#### Logical Volume Manager

It's generally recommended to enable the LVM group option. A flexible management system allows you to set and resize your storage volumes easily. If you plan to run multiple blockchain nodes or might add another disk later on, LVM can be beneficial. If you need to add more storage space later, you can easily add a new disk to the existing LVM group and expand the logical volumes as needed. A logical combination would mean you do not have to split your data folders across multiple storage devices. Maintenance can be done without downtime, re-sync, or data loss. It also allows for resizing storage volumes, so you can easily resize them on the fly, allowing you to adapt to changing storage requirements of your blockchain node.

> Considering the benefits, LVM is also enabled on new [Dappnode](https://dappnode.com/) machines and has been set as default on Ubuntu since version 20.04.

Some trade-offs when using LVM are the complexity of disk management and a tiny performance dint in performance. The advanced features might not be needed if you have lots of SSD space and want to run everything on the primary physical partition. If you are unsure, activate the option- maybe you run out of storage space at some point and do not want to re-sync or configure data folders of blockchain data.

#### Encryption

Encryption is unnecessary, as you could encrypt a small portion of the disk later if needed. Encrypting the whole disk could become cumbersome for remote access, requiring manual intervention each time the server is restarted. There are ways to automate the unlocking process, such as using a remote key server or network-bound disk encryption. However, these methods can increase complexity and may have security implications.

Your validator keys are safe anyway, as they are encrypted by default. The validator also has its encrypted wallet needed to restart the client with a modified address for the fee recipient. The only risk here is physical access or modification- except for the keys or wallet. These could include log data, configuration files, or other personal data stored on the node. The added complexity is unnecessary if these points are not deemed high-risk.

#### Storage Configuration

On the storage configuration screen, you will see your available physical disks with their physically available storage and mount points. If you enabled LVM before, it automatically created a volume group with a logical volume inside.

The volume group can be seen as a parent container of multiple digital storage partitions, so-called logical volumes. These groups can extend across multiple physical disks.

By default, the logical volume will have the size of `100GB` to allow flexibility of partitions. To change properties, you can select `ubuntu-lv` under `ubuntu-vg (new)` in the `USED DEVICES` section to adjust the logical volume's name, size, and format in a pop-up window.

If you are sure you want to use the whole disk space available, set the `Size` property of the logical volume to the maximum value shown in front of the input field of the logical volumes pop-up window.

> Within the [system setup](/3-system-setup/) section of the guide, there is also a whole chapter about extending the LVM storage of a logical volume later on and how new disks can be added to your system.

#### Partition Naming

The name of the volume group `ubuntu-vg` and logical volumes, e.g., `ubuntu-lv` can be changed. If you do not plan to have different partitions for different blockchain networks, leaving the default names is recommended. Keeping the default naming is highly recommended and helps not create confusion later. It also helps you out when you post logs somewhere- since everyone can associate the default names with the LVM setup.

#### Storage Formats

The same default values rule also applies to the default storage format `ext4`. Storage formats like `ext2`, `ext3`, and `ext4` are all part of the same family of Linux filesystems, but each brings improvements and added features over the previous. The type `ext4` is the most commonly used as it supports files up to 16TB, faster and more efficient disk space allocation, and many other convenience features.

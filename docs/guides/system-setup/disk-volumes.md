---
sidebar_label: "3.2 Disk Volumes"
sidebar_position: 2
---

# 3.2 Disk Volumes

This section explains how to manage and extend your disk volumes using the Logical Volume Manager. By default, during installation, LVM allocates only a conservative 100 GB for the logical volume. The process ensures that the node utilizes the entire disk space without getting interruptions once the storage cap is hit.

:::tip

It is common practice to extend the default allocation to match the physical storage before new hard disks become necessary.

:::

:::warning

This page is only relevant if you set up the recommended logical disk management for your volume.

:::

## 1. Checking the Volume Group

LVM provides a flexible and powerful method for managing your disk storage. This subsection covers the basics of inspecting your volume groups, physical extents, and current disk usage. Before adding or extending any storage volumes, check the current status of your volume group. Use the following command to display details about your volume groups:

```sh
sudo vgdisplay
```

If you have not changed the LVM settings during installation, the output should be similar to:

```text
  --- Volume group ---
  VG Name               ubuntu-vg
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  2
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                1
  Open LV               1
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               [VOLUME_GROUP_SIZE]
  PE Size               4.00 MiB
  Total PE              [TOTAL_PE]
  Alloc PE / Size       [ALLOCATED_PE] / 100.00 GiB
  Free  PE / Size       [FREE_PE] / [FREE_DISK_SPACE]
  VG UUID               [VOLUME_GROUP_UNIVERSALLY_UNIQUE_IDENTIFIER]
```

:::tip

If you are uncertain about storage or logical volumes, further information can be found on the [**Disk Management**](/docs/theory/node-operation/disk-management.md) page within the 🧠 [**Theory**](/docs/theory/preparations/node-specifications.md) section to ensure you have the fundamental knowledge.

:::

When a physical disk is added to an LVM group, it is divided into physical extents, which are uniform chunks of disk space, typically several megabytes each. The critical properties to monitor are:

- Total Physical Extents: The overall number of PEs allocated or available.
- Allocated PE / Size: How much space is currently used by the logical volume.
- Free PE / Size: The remaining unallocated space that is available for extension.

Check the amount of free disk space left on the physical volume. If you did not already extend the disk size during the installation, there should be plenty of storage left that we can add to the logical volume of the group.

:::info

If you have customized your installation, the name of the volume group may differ. Even if you extended your logical volume during installation, checking the volume group gives you useful insight into the available free physical extents.

If you already extended your logical volume to the maximum available capacity during installation, the `Free PE / Size` property will show `0 / 0`, meaning no more unreserved storage is left on the volume group for any partition to utilize.

:::

## 2. Checking Mounted Volumes

Additionally, you can check how the logical volume is mounted and used by running.

:::tip

You can use the disk filesystem command `df` using the `-h` flag to print the outcomes in a human-readable format.

:::

```sh
df -h
```

A typical output might look like:

```sh
Filesystem                         Size  Used Avail Use% Mounted on
tmpfs                              3.2G  1.6M  3.2G   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv  1.8T   11G  100G  11% /
tmpfs                               16G     0   16G   0% /dev/shm
tmpfs                              5.0M     0  5.0M   0% /run/lock
/dev/nvme0n1p2                     2.0G  131M  1.7G   8% /boot
/dev/nvme0n1p1                     1.1G  6.1M  1.1G   1% /boot/efi
tmpfs                              3.2G  4.0K  3.2G   1% /run/user/1000
```

:::info

Check the size of your volume group that is `Mounted On` the root `/` directory. If you did not extend your logical volume, the size of it will show as `100G`. The Ubuntu installation itself therefore takes up around `11%` of the volume.

:::

## 3. Adding a New Disk

If you have a second storage device that you want to add to your node, you can extend your volume group across multiple physical disks. Before proceeding, shut down your node properly using:

```sh
sudo shutdown now
```

Then, install the new disk into the appropriate frame.

:::tip

Further information about adding a hard drive to your node can be found in the [**Component Assambly**](/docs/guides/hardware-setup/component-assembly.md) page.

:::

Once your node is powered up, we have to determine the identifier of the new device. We can use the list block command tool to display information about all block device files, which specify storage devices such as hard drives, SSDs, and optical drives.

```sh
lsblk
```

The output should look similar if you have an NVM SSD and a 2.5" HDD, but sizes might differ to your build.

```text
NAME                      MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
loop0                       7:0    0  63.3M  1 loop /snap/core20/1822
loop1                       7:1    0  63.3M  1 loop /snap/core20/1879
loop2                       7:2    0 111.9M  1 loop /snap/lxd/24322
loop3                       7:3    0  49.8M  1 loop /snap/snapd/18357
loop4                       7:4    0  53.2M  1 loop /snap/snapd/19122
nvme0n1                   259:0    0   1.8T  0 disk
├─nvme0n1p1               259:1    0     1G  0 part /boot/efi
├─nvme0n1p2               259:2    0     2G  0 part /boot
└─nvme0n1p3               259:3    0   1.8T  0 part
  └─ubuntu--vg-ubuntu--lv 253:0    0   1.8T  0 lvm  /
sda                         8:0    0   7.8T  0 disk
```

:::info

- `nvme0n1` is the disk identifier of the SSD used as the primary storage
- `sda` is the disk identifier of the HDD used as additional storage

:::

**3.1 Initializing the disk**: _Use the LVM tool to create a new physical volume._

```sh
sudo pvcreate /dev/<disk-identifier>
```

**3.2 Extend the Volume Group**: _Add the new disk to your existing volume group._

:::info

We can extend the existing volume group to include this new physical volume on top of the initial SSD's space. Therefore, we can use the volume group extension tool. We will have to input the volume group's name and the path to the newly added physical volume that we want to add.

:::

```sh
sudo vgextend <volume-group-name> /dev/<disk-identifier>
```

**3.3 Verify the Extension**: _Check the updated volume group size and details._

```sh
sudo vgdisplay
```

The output and volume group name should look similar to this:

```text
  --- Volume group ---
  VG Name               ubuntu-vg
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  2
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                1
  Open LV               1
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               [VOLUME_GROUP_SIZE]
  PE Size               4.00 MiB
  Total PE              [TOTAL_PE]
  Alloc PE / Size       [ALLOCATED_PE] / [LOGICAL_VOLUME_SIZE]
  Free  PE / Size       [FREE_PE] / [FREE_DISK_SPACE]
  VG UUID               [VOLUME_GROUP_UNIVERSALLY_UNIQUE_IDENTIFIER]
```

:::info

The `Free PE / Size` should now reflect the additional capacity from the new disk.

:::

The capacity now has to be added to our logical volume to use in on our node.

## 4. Checking Logical Volumes

Before adding space to our logical volume, we have to check the properties of the logical volumes available on the device.

```sh
sudo lvdisplay
```

If you never changed the LVM settings during installation, the output and volume group name should look similar to this:

```text
  --- Logical volume ---
  LV Path                /dev/ubuntu-vg/ubuntu-lv
  LV Name                ubuntu-lv
  VG Name                ubuntu-vg
  LV UUID                [LOGICAL_VOLUME_UNIVERSALLY_UNIQUE_IDENTIFIER]
  LV Write Access        read/write
  LV Creation host, time ubuntu-server, [CREATION_DATE] +0000
  LV Status              available
  # open                 1
  LV Size                <100.00 GiB
  Current LE             [NUMBER_OF_LOGICAL_EXTENTS]
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:0
```

:::info

Remember that the `LV Path`, `LV Name`, and `VG Name` properties might differ if you have been given a custom name during installation. If you previously extended your volume, the `LV Size` will match your initial physical disk size.

:::

## 5. Extending a Logical Volume

LVM itself comes with its own toolkit to increase the size of a logical volume.

:::note Toolkit Parameters

- `-l`: specifies the **size** that should be given to the logical volume **in extents**. We can use `+100%FREE` to tell the extension tool to use all the free Physical Extents in the volume group. It will then effectively extend the logical volume to use the remaining free space in the volume group. Use a lower amount to expand a volume group by a lower percentage.
- `-L`: specifies the **size** that should be given to the logical volume **in gigabytes**. We can use `+100G` to tell the extension tool to add 100 GB to the volume group. It will then effectively extend the logical volume to use the remaining free space in the volume group. You can change the number for different amounts or extend smaller amounts using `M` for megabytes and `T` for terabytes.
- `path`: defines the logical volume you want to extend on the volume group.

:::

:::info

Update the `<logical-volume-path>` with the `LV Path` property from the previous `lvdisplay` command.

:::

If you did not extend the storage before but want to use the full disk capacity, you can use the following command:

```sh
sudo lvextend -l +100%FREE <logical-volume-path>
```

The output should look like the following:

```sh
  Size of logical volume <volume-group-name>/<logical-volume-name> changed from [INITIAL_STORAGE_SPACE] GiB ([ALLOCATED_PE] extents) to [FINAL_STORAGE_SPACE] ([TOTAL_PE] extents).
  Logical volume <volume-group-name>/<logical-volume-name> successfully resized.
```

After running this command, the file system on the logical volume needs to be resized to take advantage of the newly added space.

## 6. Resizing a Volume Group

LVM itself has a utility for resizing file systems. We can pass the device file representing the logical volume we want to resize.

```sh
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```

:::info

When `resize2fs` command will add the available space on the previously extended devices without a defined size.

:::

The output should look like the following:

```sh
resize2fs 1.46.5 ([DATE])
Filesystem at /dev/mapper/ubuntu--vg-ubuntu--lv is mounted on /; on-line resizing required
old_desc_blocks = [DESC_BLOCKS], new_desc_blocks = [NEW_DESC_BLOCKS]
The filesystem on /dev/mapper/ubuntu--vg-ubuntu--lv is now [TOTAL_BLOCKS] ([BLOCK_NUMBER]) blocks long.
```

:::tip

Further details about blocks and resizing can be found on the [**Disk Management**](/docs/theory/node-operation/disk-management.md) page of the 🧠 [**Theory Section**](/docs/theory/preparations/node-specifications.md) section.

:::

## 6. Verifying Storage Space

After the extension, verify that the volume group and logical volume have been updated correctly:

```sh
sudo vgdisplay
```

The output should be something like this:

```text
  --- Volume group ---
  VG Name               ubuntu-vg
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  3
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                1
  Open LV               1
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               [VOLUME_GROUP_SIZE]
  PE Size               4.00 MiB
  Total PE              [TOTAL_PE]
  Alloc PE / Size       [ALLOCATED_PE] / [FULL_DISK_SPACE]
  Free  PE / Size       0 / 0
  VG UUID               [UNIVERSALLY_UNIQUE_IDENTIFIER]
```

:::info
During the checkup, ensure that:

- The group covers the whole disk space: `[VOLUME_GROUP_SIZE]` equals `[FULL_DISK_SPACE]`
- All physical extends got added to the volumes: `[ALLOCATED_PE]` equals `[TOTAL_PE]`
- All physical extends are registered: `Free PE / Size` is `0 / 0`

:::

You can also recheck the disk usage:

```sh
df -h
```

```text
Filesystem                         Size  Used Avail Use% Mounted on
tmpfs                              3.2G  1.6M  3.2G   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv  1.8T   11G  1.8T   1% /
tmpfs                               16G     0   16G   0% /dev/shm
tmpfs                              5.0M     0  5.0M   0% /run/lock
/dev/nvme0n1p2                     2.0G  131M  1.7G   8% /boot
/dev/nvme0n1p1                     1.1G  6.1M  1.1G   1% /boot/efi
tmpfs                              3.2G  4.0K  3.2G   1% /run/user/1000
```

:::info

- The storage `Mounted On` the `/` root directory should have increased
- The percentage of `Use` should have decreased relative to the increased size

:::

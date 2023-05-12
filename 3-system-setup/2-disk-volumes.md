## 3.2 Manage Storage Volumes

As described in the previous guide of the system installation, the LVM is a flexible and powerful storage management system. It delivers great functionality, however initially only allocates `100GB` of storage for the logical volume by default.

The default allocation ensures that there is ample storage for basic system functionality without consuming the entire available storage capacity. This approach provides users with the flexibility to extend the storage volumes as needed, based on their specific requirements and the growth of their data.

One of the main reasons for this conservative allocation is that it is much easier to extend storage volumes than it is to shrink them. Shrinking volumes can be a more complicated and time-consuming process, often requiring unmounting and remounting of the filesystems and a greater risk of data loss. By starting with a smaller allocation, LVM allows you to manage your storage more efficiently.

> As we use the server as the main node machine, we want to extend the capacity of `100 GB` to the full size of the physical storage, before even the physical storage space is no longer sufficient and new hard disks have to be added.

**Before we add or extend any storage volumes, we have to check the volume group's status.**

If you already set your logical volume to the maximum capacity during the install, it is still recommended to have a look at the following section, to know the basics about LVM when you want to add a new storage device.

### 3.2.1 Checking the volume group

By using the volume group and logical volume display commands we can track information about the existing volume groups of LVM and their logical volumes that exist on these groups. It provides details on the properties, such as the VG name, total size, free size, and the number of physical volumes and logical volumes that it contains.

```sh
sudo vgdisplay
```

If you never changed the LVM settings during installation, the output and volume group name should look similar to this:

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

Keep in mind that the `VG Name` property might be different if you gave a custom name during the install. If you did not create a second one during the installation, there should only be one volume group for now.

#### Physical Extents

When a physical volume is added to a volume group, the disk space in the physical volume is divided into Physical Extents. The size of the physical extend is determined when the volume group is created and all extents within a group are the same size.

They are portions of disk space on a physical volume, usually several megabytes.

- `Total Physical Extents`: Total Number of Physical Extents that are allocated or free across all volumes.
- `Alloc Physical Extents / Size`: displays how much space has been allocated by the logical volume.
- `Free Physical Extents / Size`: displays how much free space units are left on the physical volume. If it is already zero, there is no more physical free disk space left.

Check the amount of free disk space that is still left on the physical volume. If you did not already extend the size of the disk during the install, there should be plenty of space left that we can add to the logical volume of the group.

**If you extended your logical volume to the maximum available capacity during the install process, the** `Free PE / Size` **property will show** `0 / 0` **meaning there is no more unreserved storage left on the volume group for any partition to utilize.**

#### Checking disk usage

In order to check your disk usage on the logical volume, you can use the disk filesystem command. The `-h` flag will print the outcomes in a human-readable format.

```sh
df -h
```

The outcome should look similar to the following. Keep in mind sizes can be differnet on your end. Check the size of your volume group thats mounted on `/`. If you did not extend your logical volume size yet, the size of it will show as `100G`. The node install takes up about `11GB` for now.

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

**If your storage is becoming to get full or you want to allocate more space of your main disk, you can either add a new disk or extend the main logical volume in the next steps.**

### 3.2.2 Adding a new disk to the group

In case you have a second storage device, like a 2.5" HHD that you want to add to your node, you can do this by extending the logical volume and the volume group itself across multiple physical devices. Have a look into the [hardware build](/1-hardware-build/) section for more information about adding the HHD to your file.

If you add more storage after the node was running, make sure to stop all running blockchain processes and to shut down the node properly using the `sudo shutdown now` command. Then open the case and connect your new storage sitting on the corresponding frame.

First, we have to get the identifier of your newly added device. We can use the list block command tool. It displays information about all block devices, which are special files representing storage devices that handle data as blocks, such as hard drives, SSDs, and optical drives.

```sh
lsblk
```

In case you have a NVM SSD and an 2.5" HDD, the output should look similar to this. Keep in mind that the numbers of storage will be different. You can add any type of storage you like.

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

For the above example:

- `nvme0n1` is the disk identifier of the SSD used as the main storage
- `sda` is the disk identifier of the HDD used as additional storage

#### Initializing the disk

To initialize the new disk so that it can be used as a physical volume, we can use the LVM tool to create pysical volumes:

```sh
sudo pvcreate /dev/<disk-identifier>
```

#### Creating a multi-device volume group

Afterward, we can extend our existing volume group to include this new physical volume on top of the initial SSD's space. Therefore, we can use the volume group extension tool. We will have to input the volume group's name and the path to the newly added physical volume that we want to add.

```sh
sudo vgextend <volume-group-name> /dev/<disk-identifier>
```

Next, we can check the volume group again to verify if the group grew in storage size:

```sh
sudo vgdisplay
```

If you never changed the LVM settings during installation, the output and volume group name should look similar to this:

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

**After extending the group to also use the space on the newly added physical volume, the** `Free PE / Size` **property should have pleny of free extents again that we can add to our logical volume so we can use the space on our node.**

### 3.2.3 Checking the logical volumes

Before we add space to our logical volume we have to check the properties of the logical volumes that are available on the device.

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

Keep in mind that the `LV Path`, `LV Name`, and `VG Name` properties might be different if you gave a custom name during the install. If you did not create a second one during the installation, there should only be one logical volume for now.

**If you extended your logical volume to the maximum available capacity on the main storage device during the install process, the** `LV Size` **property will be similar to the size of your first physical disk.**

### 3.2.4 Extending a logical volume

LVM itself comes with its own toolkit on Unix-like operating systems such used to increase the size of a logical volume. We can pass the following arguments:

- `-l`: the flag specifies the size that should be given to the logical volume in extents. We can use the `+100%FREE` parameter to tell the extension tool to use all of the free Physical Extents in the volume group. It will then effectively extend the logical volume to use all of the remaining free space in the volume group. If you want to extend a volume group by a lower percentage, use a lower amount.
- `-L`: the flag specifies the size that should be given to the logical volume in gigabytes. We can use the `+50G` parameter to tell the extension tool to add 50 GB to the volume group. It will then effectively extend the logical volume to use all of the remaining free space in the volume group. If you want to extend a volume group to by a different ammount, change the number in front of the `G`. If you want to extend smaller or bigger amounts, you can use `M` for megabytes and `T` for terabytes.
- `path`: the parameter defines the logical volume that you want to extend on the volume group. Make sure to update the `<logical-volume-path>` with the `LV Path` property from the previous `lvdisplay` command.

**If you did not extend the storage to the physically available space during install but want to configure it now, you can use the following command. This can not only be done for the main storage device, but also for the newly added logical volume of the secondary storage disk.**

```sh
sudo lvextend -l +100%FREE <logical-volume-path>
```

The output should look like the following:

```sh
  Size of logical volume <volume-group-name>/<logical-volume-name> changed from [INITIAL_STORAGE_SPACE] GiB ([ALLOCATED_PE] extents) to [FINAL_STORAGE_SPACE] ([TOTAL_PE] extents).
  Logical volume <volume-group-name>/<logical-volume-name> successfully resized.
```

**After running this command, the file system on the logical volume needs to be resized to take advantage of the newly added space.**

### 3.2.5 Resizing a volume group

LVM itself comes with its own utility that allows you to resize Linux file systems. It can be used to increase or decrease the size of an existing file system. We can pass the device file representing the logical volume we want to resize.

```sh
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```

> When `resize2fs` command is called without specifying a new size, it will default to resizing the file system to take up all available space on the device we extended before.

The output should look like the following:

```sh
resize2fs 1.46.5 ([DATE])
Filesystem at /dev/mapper/ubuntu--vg-ubuntu--lv is mounted on /; on-line resizing required
old_desc_blocks = [DESC_BLOCKS], new_desc_blocks = [NEW_DESC_BLOCKS]
The filesystem on /dev/mapper/ubuntu--vg-ubuntu--lv is now [TOTAL_BLOCKS] ([BLOCK_NUMBER]) blocks long.
```

#### Descriptor Blocks Usage

File systems, have two key components: index nodes and descriptor blocks.

- **Index Nodes** are data structures within a filesystem that contain information about a file or directory, such as its size, owner, and access rights. Every file or directory has an associated inode, which essentially serves as a table of contents for the file's data.
- **Descriptor Blocks** are part of the filesystem's metadata. They contain information about where the actual file data is located on the disk and keep track of arrangement information, such as the number of free index nodes, when new files are created.

In the context of the resizing, new descriptor blocks have been created in order to map the file metadata to the actual physical counterpart.

### 3.2.6 Verifying the added storage space

After extending and resizing the volumes, we need to make sure that everything was executed properly. Run the volume group display in order to check the current setup:

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

During the checkup, look out for the following values:

- `[VOLUME_GROUP_SIZE]` should be equal to `[FULL_DISK_SPACE]`
- `[ALLOCATED_PE]` should be equal to `[TOTAL_PE]`
- `Free PE / Size` should be `0 / 0`

We can also check the disk usage again:

```sh
df -h
```

The storage mounted on `/` should've increased. The usage in percent should have been decreased depending on how much storage you added. Keep in mind your numbers will be different:

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

**If the logical storage volumes are extended correctly, we can continue configuring our software updates.**

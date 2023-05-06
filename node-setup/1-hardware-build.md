# 1. Hardware and Build Process

## 1.1 Hardware Setup

![Node Parts]()

> I chose an expensive and professional setup because I plan to use the slasher functionality and run multiple networks from one node, partly via docker images on top of the LUKSO CLI. Please understand that this is not mandatory. The minimum requirements to run a LUKSO node can be read in the network section of the [official documentation](https://docs.lukso.tech/networks/).

- Ubuntu 22.04.2 Server
- Barebone Intel NUC 10 (NUC10i7FNHN)
  - **Processor**: Intel Core i7-10710U (4.7 GHz, 6 Cores, 12 Threads)
  - **Housing**: Akasa Turing FX for Intel NUC 10 (A-NUC52-M1B)
  - **RAM**: Crucial 32GB DDR4 Kit (2x16GB, 2666MHz, CT2K16G4SFRA266)
  - **Storage**: Samsung 970 EVO Plus M.2 NVMe SSD 2TB (PCIe 3.0, 3.500 MB/s Read, 3.300 MB/s Write, MZ-V7S2T0BW)

I spent around 1100 €. The current prices should be below that at best. I assembled the node myself because I wanted to run a fanless machine. The bespoke housing improves the temperatures and reduces noise. It also eliminates the maintenance of moving parts.

Note that you also need thermal paste and screwdrivers and might want to add WiFi antennas immediately if the machine is planned to serve as a home server. It's only about 10 €, but you will save yourself a ton of work re-assembling the whole setup as they sit right behind the motherboard. The antennas can then be unscrewed from their attached base and do not bother your server setup.

The memory may not be sufficient for future-proof use of the node over several years or by several chains. Here, the freezer functionality of Geth comes into play to split the network data on different disks. I plan to expand my storage and add a 4 TB 2.5" HDD to fit the housing. Therefore, make sure to keep all the accessories and frames.

I set up my machine on a small home rack and connected my node to an 8-port switch connected to my router. Not being directly connected to the router not only allows more slots but also allows me to place and connect servers and PCs in separate rooms.

### Optional Parts

- **Switch**: TP-Link 8-Port Gigabit Network Switch (TL-SG108, RJ-45, IGMP-Snooping, unmanaged, fanless)
- **Additional Storage**: Seagate Barracuda 4 TB HDD (2.5", 128 MB Cache, SATA 6 Gb/s)
- **Network Setup**: Several RJ-45 Network cables

## 1.2 Build Process

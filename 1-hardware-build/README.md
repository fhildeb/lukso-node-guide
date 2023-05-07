# 1. Hardware and Build Process

This section of the guide is about building your blockchain node from scratch. Building a custom node can be an exciting and rewarding experience, as it allows you to take an active part in the world of decentralized networks while tailoring the hardware to your specific needs. In this guide, I will walk you through my entire process, from selecting the components to assembling and configuring the node for optimal performance.

## 1.1 Hardware Setup

![Node Parts](/img/build_01.png)

I chose an expensive and professional setup because I plan to use the slasher functionality and run multiple networks from one node, partly via docker images on top of the LUKSO CLI. Please understand that this is not mandatory. The minimum requirements to run a LUKSO node can be read in the network section of the [official documentation](https://docs.lukso.tech/networks/).

- **Operating System**: Ubuntu 22.04.2 Server
- **Motherboard**: Barebone Intel NUC 10 (NUC10i7FNHN)
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

> **NOTE:** Before you start building, ground yourself. Grounding can be done, for example, by reaching for the heater.

Remove the screws from the bottom of the NUC and open the case.

![](/img/build_02.png)

Unscrew the motherboard from the case.

![](/img/build_03.png)

Remove the cables from the motherboard, responsible for grounding and optional antennas. Use a narrow wrench for better lever effect.

![](/img/build_04.png)

Be careful with moving the motherboard out of the case. You dont want to destroy tiny cables or bend data slots.

![](/img/build_05.png)

Now that removed the motherboard securely, put the old housing to the side.

![](/img/build_06.png)

Turn the motherboard to access the fan and its frame.

![](/img/build_07.png)

Remove the screws that are holding the fan in place for cooling the processor.

![](/img/build_08.png)

Carefully unplug the thin 4-pin fan cables.

![](/img/build_09.png)

The screws used for the fan also held the old cooler in place.

![](/img/build_10.png)

Remove the processor cooler by gently pulling it upwards and place it upside down on the table so that you don't smear the heat conductive paste.

![](/img/build_11.png)

Wipe off the heat conductive paste.

![](/img/build_12.png)

Grab the new fanless housing, also acting as cooling block.

![](/img/build_13.png)

Unscrew the back panel for the motherboards connection possibilities.

![](/img/build_14.png)

Put the parts aside and turn the case around.

![](/img/build_15.png)

Remove the screws holding the bottom panel in place.

![](/img/build_16.png)

Get back to the motherboard and clean it with an appropriate alcoholic cloth.

![](/img/build_17.png)

Apply fresh thermal paste again and spread it as well as possible. Use only a very thin layer, otherwise it will be pressed out the sides and stain the motherboard when it is screwed down.

![](/img/build_18.png)

In the next step, the motherboard must be screwed into the housing. Clean the cooling counterpart to the processor.

![](/img/build_19.png)

Search for the appropriate screws and spacers.

![](/img/build_20.png)

Insert the motherboard slowly and accurately from above. No thermal paste should be smeared, but should be placed exactly on the intended surface.

![](/img/build_21.png)

Screw in the motherboard. Always tighten the screws for the motherboard in opposite directions and in small increments. the motherboard should be pressed down evenly from all sides.

![](/img/build_22.png)

Unpack the bars for memory storage.

![](/img/build_23.png)

Click them one on top of the other into the holder provided.

![](/img/build_24.png)

If you want to optionally pre-equip for WiFi as mentioned above, now is the time. Get the connection cables.

![](/img/build_25.png)
press one at a time into the edge provided in front of it. be careful and make sure they are seated properly, as they tend to pop out.

![](/img/build_26.png)

In the next step, the hard disk is inserted above the antenna connection.

![](/img/build_27.png)

Click it in diagonally from above and screw it tight at the rear end.

> If you have another large hard drive that connects with a hard drive label, get the appropriate frame and mount the 2.5" hard drive on it.
>
> In the next step, connect the hard drive with a cable and connect it to the center of the mainboard. There is only one of these hard drive connectors, so there should be no confusion.
>
> After attaching the cable, screw the frame to the top of the case so that the hard drive is facing down.

![](/img/build_28.png)

Hold the motherboard against the back of the case and check if it fits properly. If you have antenna connectors, screw them to the back panel.

![](/img/build_29.png)

Make sure the panel is seated directly with the motherboard connectors and nothing is pressed down on the inside. If it is, the motherboard must be slightly readjusted again, as the fittings have a millimeter of clearance.

![](/img/build_30.png)

When everything fits correctly, screw in the back panel of the motherboard.

![](/img/build_31.png)

The next step is to install the hard disk cooler.

![](/img/build_32.png)

Remove the protective foil and place the heat-conducting rubber mass on the hard disk.

> The sticker of the hard disk does not need to be removed, as it is made of thermally conductive film and adhesive. If you remove it, you will lose your warranty.

![](/img/build_33.png)

Clean the metal piece with an alcohol wipe and reapply thermal paste to the strip that will be directly connected to the housing. Also, try to clean the inner housing part where the cooler will be placed with a cotton swap and alcohol.

![](/img/build_34.png)

Insert the cooler slowly from the top without smearing heat-conducting paste. Be careful, because the rubber mass sticks and it is difficult to move once it sticks.

![](/img/build_35.png)

Screw on the last side of the housing without bending the cable.

> If you have a second hard drive, make sure the frame sits evenly without touching the lid.

![](/img/build_36.png)

Depending on whether you want to place the case upright or lying down, you can now install covers and stands.

![](/img/build_37.png)

I decided to use the upright placement because it saves me space to the sides in my server shelf.

> If you have a professional server rack, the horizontal position is probably more suitable, since you can add more levels and switch frames above and below.

![](/img/build_38.png)

This is how the finished node looks when the antennas are also attached. however, these are not used in regular server use, as there should always be a wired internet connection.

So you can leave them unscrewed and keep them until you decide to transform your node into a home server or desktop device some day.

![](/img/build_39.png)

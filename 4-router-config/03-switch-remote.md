## 4.3 Switch to Remote Connection

If everything was alright, you can shutdown your node server and place it in your actual server rack or shelf.

```sh
sudo shutdown now
```

Now we can start disconnecting the monitor, keyboard, power and network cables from the back of your node. Afterwards, move your server to its final location and reconnect it to the power supply and a network cable.

Because of our previous settings, it will restart automatically if power cable is connected. The boot process should be completed within 30-60 seconds and we will be able to reach it via the static IP if we're within the same network.

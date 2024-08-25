# WiFi Demo

To use the WiFi demo, you need a host with two WiFi interfaces. One of
those interfaces needs to support "AP" and one needs "AP" and "monitor".
The software requirements can be installed with the provided Ansible
scripts.

The demo then creates two WiFi networks named "Nimbus Gast" which are
used for the demo.

By default all devices except the ones in `files/wifi/allow_list` are
blocked. To temporarily enable a device connect to the encrypted "Nimbus
Gast" network with the password "ELITEDEMO" and accept the terms and
conditions.

## Raspberry Pi

The internal WiFi module of the Raspberry Pi only supports "AP".
Therefore an additional WiFi adapter which supports "AP" and "monitor"
is needed.

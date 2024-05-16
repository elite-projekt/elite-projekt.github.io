# Add a demo

## Requirements

1.  First of all you should make a concept of the demo you want to add.
    Create diagrams to visualize the components and see the
    dependencies. If possible, everything should run within Docker. For
    native actions (like opening applications) you can use the NativeApp
    controller of your demo.
2.  To add a new demo to the ecosystem you need to have a fully set up
    workstation as described in the [Setup of a Workstation
    guide](/todo)
3.  All code that is used by the NativeApp needs to be Python 3.9
    compatible! We use setuptools to build our application which
    requires python \>3.9.


## Add a new demo to the demonstrations environment

1.  Clone the demonstrations repository
2.  Create a new folder with your demo ID in `demos`
3.  Create your demo in
    `demos/<your demo ID>/native/<your demo ID>_controller.py`. This has
    to contain a class which inherits from
    `DemoController` and a function `get_controller` which returns an
    instance of your controller.
4.  Populate your `<demo ID>/demo.json` (see below)
5.  If you use any text please use
    `Locale` and save your `po` files in
    `<demo ID>/locales/<locale>/LC_MESSAGES/base.po`.
6.  After you successfully created and tested your Docker container. You
    need to make adjustments to your `docker-compose.yml`.
7.  In case you have to interact with the native host you can describe
    your procedures in the NativeApp files. Have a look on the existing
    demos for small guidance.
8.  Now you can install and run the NativeApp as described in [NativeApp
    (Section Developing/Testing
    Locally)](/todo). The
    NativeApp will run and wait for commands of the plattform.

### demo.json file

This file provides additional information about your demo and is picked
up by the CI to build your containers.

``` json
{
  "categories": [
    "phishing",
    "email",
    "badusb"
  ],
  "hardware": [
    "usb-stick",
    "wifi-stick",
    "smartphone"
  ],
  "level": "beginner | intermediate | expert",
  "time": <time in minutes>,
  "isAvailable": true | false,
  "container":
  [
    {
      "name": "<name of your container>",
      "dockerfile": "<relative path of your dockerfile>"
    },
    {
      "name": "<name of your second container>",
      "dockerfile": "<relative path of your dockerfile>"
    }
  ]
}
```

## Further Information

### Dependencies for NativeApp

If your demo has specific dependencies for the native app part, not the
part which is in the docker container of your demo, you need to add it
to the `install_requires` of the `setup.cfg` file.

### Hosts Entries

If your demo needs entries in the hosts file (for custom DNS) use the
admin component to set them during runtime.

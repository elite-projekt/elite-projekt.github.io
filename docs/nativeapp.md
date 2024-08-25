# Native App

The NativeApp component encapsulates all operations that need native
access to the workstation. It must be installed on every workstation. It
is required to run the whole time during usage.

## What it covers

NativeApp:

-   Starts python flask server
-   Starts/Stops demos on respective HTTP calls from portal
-   Contains all requirements within itself

NativeApp Installer:

-   Creates program folder and copies all dependencies into their
    respective sub folders
-   Writes hosts file under `C:\windows\system32\drivers\etc\hosts`
    (legacy)
-   Sets exception for Windows-Defender on directory
-   Changes permissions on directory
-   Places link into autostart

## Technologies

The implementation uses a flask app that utilizes
[python-on-whales](https://pypi.org/project/python-on-whales/) to access
the docker daemon running on the workstation. The orchestration uses
`python_on_whales` to start the docker stack via the provided
`docker-compose.yml` files.

## Install NativeApp using the Powershell installer

1.  Download the latest release zip (any of the source archives) from
    the demonstrations repository: [![latest
    Release](https://code.fbi.h-da.de/elite-projekt/demonstrations/-/badges/release.svg)](https://code.fbi.h-da.de/elite-projekt/demonstrations/-/releases)
2.  Extract the file
3.  Run the installer by with double-click on
    `nativeapp/installer/nativeapp_installer.bat`
4.  Docker will start automatically within an extra shell if setup
    correctly
5.  Accept the UAC prompt

### Issues

An exception prompt of may appear. Just accept by goint to *more
information* and *execute anyway*. If anything fails in most cases it is
sufficient to close the Powershell window and run the installation
again.

### Uninstall

If an installation is present the old one has to be uninstalled first.
Every Python.exe process and the nativeapp process should be terminated
within the taskmanager to make sure the old version of the nativeapp can
be uninstalled. Otherwise the Folder can't be delelted. Therefore the
`nativeapp_installer.bat` has to be run again and a prompt will appear
if you really want to uninstall the native app. This will remove the
instalaltion folder, the exception for windows defender, the autostart
entry and the hosts entry.

## Usage

If installed via `` `nativeapp_installer.bat ``
-`nativeapp_install_helper.ps1` combination, the application should
start on login and will be working in the path where it has been
installed (in `C:\\Program Files (x86)\\hda\\nativeapp`).

If started manually, the NativeApp should be run with the `-p` parameter
passing the directory where the `.env` reside:

``` powershell
# with path param
nativeapp -p "C:\your directory\to\the\demonstrations\repo\rootdir"
# with debug param
nativeapp -d
# for help
nativeapp -h
```

## Configuration (env file)

There is a `.env` file in the `demonstrations` root folder or
`C:\Program Files (x86)\hda\nativeapp\.env` after successfull
installation. This file is also read by the NativeApp during runtime to
know where it finds the docker containers for the demos. The variables
can be adjusted depending on how the deployment is structured.

``` env
REGISTRY_URL='registry.code.fbi.h-da.de'
GROUP_NAME='projekt-elite'
PASSWORD_REPO='password:master'
PHISHING_REPO='phishing:master'
(...)
```

### Using non-master container images

By default the stack files for docker-compose use the containers of the
demos that were pushed on the `master` branch. If you want to test or
use the containers (demos) that you just developed, run the
`build_images.sh` script.

## Development Guide

### Requirements

To develop on the NativeApp or related demos following requirements need
to be fulfilled:

-   [Python \>3.9](https://www.python.org/downloads/)
-   [pip](https://pip.pypa.io/en/stable/installation/)
-   Docker must be installed to test the containers. This is described
    on the wiki page [Setup of Workstation](setup/client_setup.html).
-   the development dependencies are installed via the
    `requirements.txt` in`native/nativeapp` with the command
    `pip install -r requirements.txt`.

### Debugging and testing locally

For debugging and testing you can run the NativeApp locally. Make sure
to run the following commands within the root directory of the
`demonstrations` repository in a shell. If there are problems, try to
delete all Cached Files like Folders like *.venv*, *.egg*, and *dist*.

``` powershell
# create virtual env, enable it and install requirements (initial setup, only needed once)
python -m venv .venv
./.venv/Scripts/activate
pip install -r native/nativeapp/requirements.txt

# build and install python package
pip install -I .

# run NativeApp in debug mode (run from root directory)
nativeapp -p . -d
```

#### Testing the NativeApp without the teaching platform

If you want to test your demos without using the teaching platform you
can use the `demo_control.py` script. By default it connects to
`http://localhost:5000` which can be changed with the `--host`
parameter. You might need to install the `requests` package using pip:
`pip install requests`.

``` bash
# start the phishing demo
python ./demo_control.py phishing start
# stop the phishing demo stop
python ./demo_control.py phishing stop
# start the password demo on a port 4040
python ./demo_control.py --host http://localhost:4040 password start
```

#### Testing the demos (compose stacks) without the NativeApp

In case you want to test the docker-compose stacks of your demo without
the NativeApp run following command from the root directory where the
`.env` file is in order to use it with the variables for REGISTRY_URL,
GROUP_NAME, REPO etc.

``` powershell
docker-compose --env-file .env -f <path to docker-compose.yml> up
```

### Logging

> These logging messages will not be displayed in the window displayed
> through the `nativeapp.exe`, `print` statements should be avoided in
> the final release!

To provide a lean and clean logging functionality, the python `logging`
module is used. The configuration is done in
`native/nativeapp/src/app.py` and the initial logger-object is created
here.

For a module to use the logging capabilities, it must:

-   import the logging module
-   utilize the logging functionality with `logging.info(msg)` whereas
    the `info` is a substitute for the loglevel (choose: debug, info,
    warning, critical, error)

``` python
import logging
...
logging.info('This is an example message: {}'.format(someInfoMsg))
```

Current loglevel set in `app.py` is debug and the file can be found in
`C:\Program Files (x86)\hda\nativeapp\nativeapp.log` or the path passed
via the `-p` parameter when starting the app.

There is currently **NO** CLI-parameter that allows a change in the
loglevel, if needed it can be added in the `app.py` nativeapp
sourcecode.

**Other types of logging:**

It is possible to debug with `Flask` inside your browser - but this
should only be done while developing and not after the program is packed
and bundled. (Starting the server in debug mode via `debug=true`)

### Container Orchestration (Compose Files)

All demos can use any number of containers. Each demo must be specified
by a [Compose File](https://docs.docker.com/compose/compose-file/) file
which describes which images need to be run and how they are configured.

### NativeApp API Endpoints

The postman collection within the root directory of the demonstrations
repo includes some endpoints: (`/Demonstration.postman_collection.json`)
You can find a Documentation of the whole Native API in [API
Documentation](https://code.fbi.h-da.de/groups/elite-projekt/-/wikis/Demonstrations/Native%20API%20Documentation)

## Native API

### 1. Start Password Demo - Secure Mode

Starts password Demo in secure mode on local Client.

Example return:

| {
| "message": "Successfully started the Demo.",
| "success": true
| }

**Endpoint:**

``` bash
Method: POST
Type: RAW
URL: http://localhost:5000/orchestration/start/demo/password
```

**Body:**

``` js
{"secureMode":true, "language": "en"}
```

### 7. Status Password Demo

Returns actual status of the password demonstration.

Ether

{ "password_webserver": "running"}

or

{ "password_webserver": "not found"}

**Endpoint:**

``` bash
Method: GET
Type: 
URL: http://localhost:5000/orchestration/status/demo/password
```

### 13. Stop Password Demo

Stops password Demonstration on local Client

Example return:

{ "message": "Stopped all remaining Demos.", "success": **true**}

**Endpoint:**

``` bash
Method: POST
Type: RAW
URL: http://localhost:5000/orchestration/stop/demo/password
```

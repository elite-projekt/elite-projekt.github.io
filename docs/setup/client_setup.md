# Client Setup

All setup steps in this guide need to be done on a Windows workstation
to have a compatible client for the ELITE platform.

The client specification is as follows:

:   -   Windows as OS (most common and insecure OS in our target
        audience)
    -   All prerequisites stated in *Initial OS setup* are installed
    -   The *NativeApp* component is installed and running
    -   Each demo can require further software (like an e-mail client)
        which must then be installed natively on the host machine. These
        should be covered in the *Initial OS setup* steps below.

## Initial OS setup

Download the zip of the `build-release-zip` stage (in the future on the
release page as well). Unzip it and run the `nativeapp_dependencies.bat`
file. Your PC will download and install all dependencies, and restart
automatically. After the reboot the rest of the installation runs. After
that you can continue with the installation of the "Native App".

The password for WSL will be `elite`.

<details>

<summary>

   Alternative manual Setup

</summary>

After the installation of a fresh Windows 10 instance we need to install
some basic tools and configure the OS to allow us to use the platform.
You can either install and setup everything manually or use powershell
commands for (almost) everything.

You need to run following command in the powershell. It is split into
multiple stages per reboot.

**Stage 1: Update Windows and install WSL**

Run PowerShell as administrator

``` powershell
# PowerShell as administrator
Set-ExecutionPolicy Bypass -scope Process -Force
Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force
Install-Module PSWindowsUpdate -Force
Get-WindowsUpdate -AcceptAll -Install -IgnoreReboot
wsl --install -d Ubuntu-20.04
Restart-Computer
```

**Stage 2: Install dependencies**

Run PowerShell as administrator

``` powershell
# Install chocolatey package manager
Set-ExecutionPolicy Bypass -scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
# install dependencies via chocolatey
choco install python firefox thunderbird -y

wsl --user root bash -c "apt update && apt install -y docker.io && mkdir -p /root/.docker/cli-plugins && curl -SL https://github.com/docker/compose/releases/download/v2.4.1/docker-compose-linux-x86_64 -o /root/.docker/cli-plugins/docker-compose && chmod +x /root/.docker/cli-plugins/docker-compose"

Restart-Computer
```

</details>

## Installation of Native Access Component

Run the `installer.bat` of the archive and follow the instructions.
Windows defender will complain, but you can just ignore the message.

**Troubleshooting** - There have been issues with 3rd party antivirus
programs - Windows Defender not affected (see [Native App
-Issues](../issues.html)), it's recommended to use defender. - Problem:
"Error:"This installation package could not be opened. Contact the
application vendor to verify that this is a valid Windows Installer
package." - Solution: If opened within the WSL environment you need to
copy it into the local filesystem and run it from there.

## Execution of Native Access Component

Will be launched on every login of the user automatically. If you wan't
to start it manually you have to go to the installation folder
`C:\Program Files(x86)\hda\nativeapp` and run
`./venv/Scripts/nativeapp -p .`. This client handles start/stop of
docker containers for demos and provides functionalities that can't be
covered through docker containers alone.

## Pulling the latest docker images

The native app installer is pulling automatically the newest images. If
an error appears you have to download manually.

To locally build the containers run the `build_images.sh` script in a
Linux environment (this includes WSL).

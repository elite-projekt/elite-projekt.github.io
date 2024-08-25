# Teaching platform setup

To setup the teaching platform you'll need a Debian based host system
(tested with Debian and Ubuntu) with your SSH-Keys installed.
Additionally you'll need `ansible` on your local machine.

First clone the ansible repo

    git clone git@code.fbi.h-da.de:elite-projekt/ansible-teaching.git

Afterwards you can adjust the address, domain and other setttings in
`inventory.cfg`. Then change the `host` variable in `h_da.yml` to point
to the server you want to configure.

Now just install the ansible dependencies run the ansible playbook

    ansible-galaxy install -r requirements.yml
    ansible-playbook h_da.yml -i inventory.cfg

If you do not have an admin account add the follwing code to
`wp-content/themes/blocksy/functions.php`, adjust the values and restart
the platform.

``` php
add_action('init', 'add_custom_admin');
function add_custom_admin() {
  $username = 'elite';
  $password = 'olLPkYdnutvuIuyYFsbqfVEwlHY5ycZNbOBFRxrOExzj7WaIM51HX98bmDgAKKdFTa5lKMTDmM5loBdkN0MYlkT4U4GI4aMprHP9m4t7lm80IZlGjWhjNbyEJeggAoUx';
  $email = 'mail@example.com';

  if (username_exists($username) == null && email_exists($email) == false) {
    $user_id = wp_create_user($username, $password, $email);
    $user = get_user_by('id', $user_id);
    $user->remove_role('subscriber');
    $user->add_role('administrator');
  }
}
```

Now the platform should be running.

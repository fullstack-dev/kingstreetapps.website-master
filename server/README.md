== To access your instance ==

1. Open an SSH client.
2. Change directory into this directory: `cd ~/some/path/server`.
3. Make sure your key is not publicly viewable for SSH to work. Use this command if needed: `chmod 400 kingstreet.pem`.
4. Connect to your instance using its Public DNS: `ssh -i "kingstreet.pem" centos@ec2-34-219-72-219.us-west-2.compute.amazonaws.com`.

== Instance installation ==

Installed using the following instructions:
https://www.howtoforge.com/tutorial/centos-lamp-server-apache-mysql-php/

Note: If you get this message `firewall-cmd: command not found` then you need to install `firewalld`, see:
https://www.tecmint.com/fix-firewall-cmd-command-not-found-error/

== Custom configuration ==

1. Customise MySQL
  - After MySQL installation you need to upgrade the max packet size:
  - Run: `vi /etc/my.cnf.d/server.cnf` to open the MariaDB config file.
  - Add the line `max_allowed_packet=500M` under the `[mysqld]` section in this config, save and close.
  - Run: `systemctl restart mariadb.service` to restart MySQL.
  - Run: `systemctl restart httpd.service` to restart Apache.
  - Open the `mysql` client, run: `mysql -u root -p` and then run `SHOW VARIABLES LIKE 'max_allowed_packet';` to check that the packet has been updated.

2. Customise PHP
  - Run `vi /etc/php.ini` to open the PHP config file
  - Find all the following config properties and set to these values:
    ```
    error_reporting = E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT
    log_errors = On
    display_errors = 0
    max_input_vars = 10000
    max_execution_time = 60
    upload_max_filesize = 128M
    post_max_size = 128M
    ```
  - Run: `systemctl restart httpd.service` to restart Apache.

== Bespoke Apache configuration ==

1. Adding virtual hosts
  - Add the following config for the main `www.kingstreetapps.com` domain record in `/etc/httpd/conf.d/kingstreetapps.com.conf` NOTE: Make sure you create the corresponding domain directory in `/var/www/vhosts/kingstreetapps.com`:
    ```
    <VirtualHost *:80>
      ServerName kingstreetapps.com
      ServerAlias www.kingstreetapps.com
      DocumentRoot /var/www/vhosts/kingstreetapps.com
      <Directory /var/www/vhosts/kingstreetapps.com>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
      </Directory>

      CustomLog /var/log/httpd/kingstreetapps.com-access.log combined
      ErrorLog /var/log/httpd/kingstreetapps.com-error.log

      # Possible values include: debug, info, notice, warn, error, crit,
      # alert, emerg.
      LogLevel warn
    </VirtualHost>
    ```
  - Add the following config for the `staging.kingstreetapps.com` domain record in `/etc/httpd/conf.d/staging.kingstreetapps.com.conf` NOTE: Make sure you create the corresponding domain directory in `/var/www/vhosts/staging.kingstreetapps.com`:
    ```
    <VirtualHost *:80>
      ServerName kingstreetapps.com
      ServerAlias staging.kingstreetapps.com
      DocumentRoot /var/www/vhosts/staging.kingstreetapps.com
      <Directory /var/www/vhosts/staging.kingstreetapps.com>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
      </Directory>

      CustomLog /var/log/httpd/staging.kingstreetapps.com-access.log combined
      ErrorLog /var/log/httpd/staging.kingstreetapps.com-error.log

      # Possible values include: debug, info, notice, warn, error, crit,
      # alert, emerg.
      LogLevel warn
    </VirtualHost>
    ```

  - Add the following line to your httpd config in `/etc/httpd/conf/httpd.conf`
    ```
    #Listen 12.34.56.78:80
    #Listen 80
    Include /etc/httpd/ports.conf
    ```

  - Create the file `/etc/httpd/ports.conf` and add the following config for opening ports:
    ```
    # Listen to ports
    Listen 80
    NameVirtualHost <!--PUBLIC IP HERE-->:80
    NameVirtualHost <!--PRIVATE IP HERE-->:80
    NameVirtualHost *:80
    ```

  - Run: `systemctl restart httpd.service` to restart Apache.

== Front end deployment instructions ==

1. `cd ~/Development/kingstreetapps.website`
2. `git checkout master && git pull;`
3. `npm install; npm run build`
4. `tar cvf public.tar public`
5. `cd server; scp -ri "kingstreet.pem" ../public.tar centos@ec2-34-219-72-219.us-west-2.compute.amazonaws.com:/home/centos; rm -rf ../public.tar`
6. `ssh -i "kingstreet.pem" centos@ec2-34-219-72-219.us-west-2.compute.amazonaws.com`
7. `sudo mv -f public.tar /var/www/vhosts; cd /var/www/vhosts; sudo tar xvf public.tar; sudo cp -r public/* staging.kingstreetapps.com/; sudo rm -rf public.tar; sudo rm -rf public; sudo chown -R apache:apache staging.kingstreetapps.com`

Or, for production alter step #7 to: `sudo mv -f public.tar /var/www/vhosts; cd /var/www/vhosts; sudo tar xvf public.tar; sudo cp -r public/* kingstreetapps.com/; sudo rm -rf public.tar; sudo rm -rf public; sudo chown -R apache:apache kingstreetapps.com`

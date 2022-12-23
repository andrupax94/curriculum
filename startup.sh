cp /home/site/ext/composer.phar /usr/local/bin/composer
cp /home/site/wwwroot/default /etc/nginx/sites-available/default
service nginx restart
cd /home/site/wwwroot && cp -n .env.example .env 
php artisan key:generate
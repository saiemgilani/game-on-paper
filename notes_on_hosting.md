# Some Notes on Hosting for Reference

### 1) Logging in as Root
```shell
ssh root@your_server_ip
```
### 2) Create a new user with admin privileges
```shell
adduser dev
```
- Set a password
```shell
usermod -aG sudo dev
```
### 3) Basic Firewall
```
#get the list of available applications
ufw app list
ufw allow OpenSSH
ufw enable
ufw status
```
### 4) Give SSH keys to new user
```shell
rsync --archive --chown=dev:dev ~/.ssh /home/dev

```
_if you ever rebuild your droplet and it changes fingerprint, you can remove the key relationship using the following command_
>```shell
>ssh-keygen -R "you server hostname or ip"
>```
_then proceed to re-attempt logging in to the server_

### 5) Log in as dev user
ssh dev@your.server.ip
### 6) Update and upgrade your packages
sudo apt update
sudo apt upgrade
### 7) Install Nginx
sudo apt install nginx
sudo ln -s /etc/nginx/sites-available/thegameonpaper.com /etc/nginx/sites-enabled/
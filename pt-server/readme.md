Environment
------

### Install MongoDB Community Edition sur Xenial64
```
https://docs.mongodb.com/manual/installation/
```

#### Import Public Key
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

#### Version Ubuntu
cat /etc/lsb-release

#### Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

#### Update Package
sudo apt-get update

#### Install MongoDB
sudo apt-get install -y mongodb-org

#### Démarrer MongoDB
sudo service mongod start

#### Lancer MongoDB
mongo

API
------

#### Login
Route : /api/auth/login
Methode : POST
Parameter : email, password
Response : {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjRmMjE3NzNjNWY2ZDFkYjY2Mzc2MWYiLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5mciIsInJvbGUiOiJQcm9qZWN0TWFuYWdlciIsImlhdCI6MTUzMTk4Njc5MiwiZXhwIjoxNTMxOTkwMzkyfQ.G_ar6JJsKElKeSHmIG_hJLm_7U5pSX2ypJuIP77ehqM"}

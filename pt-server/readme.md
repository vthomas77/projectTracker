Environment
------
```javascript
"engines": {
	"node": "10.6.0",
	"npm": "6.1.0"
}
```

# Install MongoDB Community Edition sur Xenial64
```
https://docs.mongodb.com/manual/installation/
```

### Import Public Key
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

### Version Ubuntu
cat /etc/lsb-release

### Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

### Update Package
sudo apt-get update

### Install MongoDB
sudo apt-get install -y mongodb-org

### Démarrer MongoDB
sudo service mongod start

### Lancer MongoDB
mongo

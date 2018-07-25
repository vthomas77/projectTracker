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
### Authentication
------
#### Login
```
Route : /api/auth/login
```
```
Methode : POST
```
```
Parameter : email, password
```
```
Response OK: {"token":"***"}
```
#### Register
```
Route : /api/auth/register
```
```
Methode : POST
```
```
Parameter : username, email, password
```
```
Response OK: {"token":"***"}
```
### Project
------
#### List all projects
```
Route : /api/project/list
```
```
Methode : GET
```
```
Parameter : None
```

#### List one project and childs
```
Route : /api/project/:id
```
```
Methode : GET
```
```
Parameter : id
```


#### Create project
```
Route : /api/project/create
```
```
Methode : POST
```
```
Parameter : name, ?startDate, ?clientName, ?allocatedBudget)
```



#### Update project
```
Route : /api/:id/:name/:startDate/:clientName/:allocatedBudget
```
```
Methode : PUT
```
```
Parameter : id, name, startDate, clientName, allocatedBudget
```


#### Delete project
```
Route : /api/:id
```
```
Methode : DELETE
```
```
Parameter : id
```


### Ressource
------
#### Get all ressources
```
Route : api/ressource/getAll
```
```
Methode : POST
```
```
Parameter : None
```
```
Response OK: {"existingUsers": [
        {
            "_id": "5b51b931407d961df534c407",
            "id_user": 0,
            "username": "init",
            "email": "init",
            "password": "init",
            "cost": 0,
            "level": 0,
            "weekly_hour": 0,
            "__v": 0
        }
    ]
}
```

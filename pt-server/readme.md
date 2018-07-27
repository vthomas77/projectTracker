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

### Project
------
#### List all projects for connected user
```
Route : /api/project/list
```
```
Methode : GET
```


#### List one project and childs
```
Route : /api/project/:id
```
```
Methode : GET
```


#### Create project
```
Route : /api/project/create
```
```
Methode : POST
```
```
Parameter : data / name, startDate, clientName, allocatedBudget
```



#### Update project
```
Route : /api/project/:id/:name/:startDate/:clientName/:allocatedBudget
```
```
Methode : PUT
```
```
Parameter : id, name, startDate, clientName, allocatedBudget
```


#### Delete project
```
Route : /api/project/:id
```
```
Methode : DELETE
```


### Task group
------
#### List taskgroups for all project of connected user
```
Route : /api/taskGroup/list
```
```
Methode : GET
```



#### Create task group
```
Route : /api/taskGroup/create
```
```
Methode : POST
```
```
Parameter : data / name, projectId, position
```


### Task
------
#### List tasks for all project of connected user
```
Route : /api/task/list
```
```
Methode : GET
```



#### Create task
```
Route : /api/taskGroup/create
```
```
Methode : POST
```
```
Parameter : data / name, startDate, endDate, predecessor, taskGroupId
```


### Ressource
------
#### List developpers
```
Route : api/ressource/list
```
```
Methode : GET
```

#### Create ressource
```
Route : /api/ressource/create
```
```
Methode : POST
```
```
Parameter : data / email, username, password, cost
```

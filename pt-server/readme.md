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
```
Response OK: {status: 'OK'}
```

#### List projects
```
Route : /api/project/getAll
```
```
Methode : POST
```
```
Parameter : None
```
```
Response OK: {
    "existingProjects": [
        {
            "_id": "5b508b4f9e788e15b1aacd45",
            "name": "myp",
            "starting_date": "2018-07-19 12-59-59",
            "create_date": "2018-07-19 12-59-59",
            "client_name": "",
            "budget": 0,
            "num_invoice": 0,
            "__v": 0
        },
        {
            "_id": "5b519842a924e21bd5071fdd",
            "name": "p2",
            "starting_date": "2018-07-18",
            "create_date": "2018-07-20 08-07-30",
            "client_name": "toto",
            "budget": 50000,
            "num_invoice": 0,
            "__v": 0
        }
    ]
}
```

#### Update project
```
Route : /api/project/update
```
```
Methode : POST
```
```
Parameter : id, name, startDate, clientName, allocatedBudget
```
```
Response OK: {status: 'OK'}
```

#### Delete project
```
Route : /api/project/delete
```
```
Methode : POST
```
```
Parameter : id
```
```
Response OK: {status: 'OK'}
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

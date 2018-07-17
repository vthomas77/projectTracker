Environment
------
Install nvm for multiple node version throught directory :
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
To install new version :
```
nvm install 10.6.0 // For server
nvm install 8.11.3 // For client
```
To use it (got to base folder - like pt-server) :
```
nvm use 10.6.0 // For server
nvm use 8.11.3 // For client
```

Git Flow
------ 

[Doc Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/)

### Guidelines

- Create feature branch fore every feature and develop should be up-to-date before creating a branch
- Commit often 
- You should always merge develop into your branch before you publish your branch
- You merge your branch via pull request, so we can check
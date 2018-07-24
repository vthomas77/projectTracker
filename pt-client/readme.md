### Front-Guidelines
- Please you need to !!! TEST !!!
```bash
yarn dist
```
- And check it's valid before any pull request

- After a PR was merged in develop, you may have to run 
```bash
yarn clean:install
```

### Yarn and launch FE
- [Install](https://yarnpkg.com/lang/en/docs/install/#debian-stable)
- Go to pt-client/
```bash
yarn install or yarn clean:install
yarn dev
```

### Tech and Syntax 

- Using angular 1.7.x because we like having those kind of package : [Here](https://www.angular-gantt.com/demo/), and because due to time management it was the easier tech to use 
- Using Webpack for better handle of App (like getting remote api Url from outside the App) and better workflow (Quick reloading)
- Using ControllerAs Controller syntax (Helpful for team to locate where they are and what is going on): [Check here](https://github.com/johnpapa/angular-styleguide/tree/master/a1#controllers)
- Using ControllerAs with vm

### Structure

- One file per Controller/Directive ... 
- Modules are at most as possible self sufficient (core is Intra-App features)
- Html files are included inside module for better workflow (And works well with Controller As syntax)

```bash
.
├── main
│   └── index.js                        // Electron config and starting point
└── renderer
    ├── app
    │   ├── alert                       // Exemple of what is inside a module
    │   │   ├── controllers
    │   │   │   └── AlertController.js
    │   │   ├── directives
    │   │   │   └── alertDirective.js
    │   │   ├── module.js
    │   │   └── partials
    │   │       └── alert.html
    │   ├── common
    │   ├── core
    │   ├── entity
    │   ├── entitylist
    │   └── identity
    ├── AppConfig                       // Angular router
    ├── app.js                          // Entry point for Angular - We load dependencies here too - And some ugly jQuery

    ├── AppRun.js
    ├── css
    └── files
```
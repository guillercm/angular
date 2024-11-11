

### Construir la aplicación
```
ng build
```
```
cd dist/bases/browser
```

### http-server: a simple static HTTP server
https://www.npmjs.com/package/http-server

```
npm install --global http-server
http-server -0
```
---
### netlify
https://www.netlify.com/

--- 

https://www.npmjs.com/package/del-cli

```
npm install del-cli --save-dev
```
https://www.npmjs.com/package/copyfiles
```
npm install copyfiles --save-dev
```

```
  "scripts": {
    ...
    "build:href": "ng build --base-href ./",
    "delete:docs": "del docs",
    "copy:dist": "copyfiles dist/bases/browser/* ./docs -f",
    "build:github": "npm run delete:docs && npm run build:href && npm run copy:dist",
    ...
  },
```
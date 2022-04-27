### Iniciar Proyecto para trabajar con json-server

    $ npm init -y

### Instalar json-server

    $ npm i json-server

### Crear archivo db.json (nota puede crear una carpeta llamada data para incluir el archivo ejemplo: data/db.json)

    - api
        - data
            -db.json
        - node_modules
        - package.json
        - .gitignore


### Editar el package.json y agregar la siguiente linea de comando
    {
        ...
        "scripts": {
            ...
            "start": "json-server --watch ./data/db.json --port 3001",
            ...
        },
        ...
    }

### Iniciar servidor

    $ npm run start


        
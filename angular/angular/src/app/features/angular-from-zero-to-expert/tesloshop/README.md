# Frontend



# Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

1. Clonar proyecto
2. `yarn install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno
5. Levantar la base de datos

```
docker-compose up -d
```

6. Levantar:

```
npm run start:dev
yarn start:dev

```

7. Ejecutar SEED

```
http://localhost:3000/api/seed
```

7. Podemos ver los endpoints en swagger

```
http://localhost:3000/api
```

    users: [
        {
            email: 'admin@google.com',
            fullName: 'admin',
            password: 'Abc123',
            roles: ['admin']
        },
        {
            email: 'guille@google.com',
            fullName: 'Guille',
            password:'Abc123',
            roles: ['user','super']
        }
    ],

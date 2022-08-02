# Issue Tracker API

An issue tracker app that employees within a company can post and receive issues from each other.
This API is paired with Issue Tracker Frontend.

## Main Features

- This API contains two types of permissions, `admin` and `user` within each company.
- User is able to read, post, update issues and post comments to issues.
- User is able to update his/her own profile, like name and password.
- Admin has all the features that a user can do, plus extra permission to add a department, add a new user and reset user information like password, department, and permission.
- A user or admin can only access the information that belongs to his/her company.

You can refer to the database design [here](./db/ER.png)

## To hiring managers

This is my personal project to demonstrate my skills and knowledge in

- Relational database design
- PostgreSQL
- REST API with Express.js server
- CRUD operation
- Session authentication
- MVC structure
- Error Handling
- Docker
- Logical thinking

## How to start

1. Copy the environment variable to `.env` from `.env.example` by

```
cat .env.example >> .env
```

2. Please install [Docker](https://www.docker.com/products/docker-desktop/), don't worry, it is still free 😆 !

3. Make sure your Docker is up and running and host machine and docker environment are all available for both ports: `8080` and `5432`. Then run

```
make restart
```

You can access the API on your host machine via post `8080`. Check if the app is up and running by

```
curl -X GET http://localhost:8080/
```

4. You can log in as a non-admin user by credentials

```
curl -d "email=tom@tomandjerry.com&password=pAssword1@" -X POST http://localhost:8080/login
```

Or log in as an admin

```
curl -d "email=admin@&password=pAssword1@" -X POST http://localhost:8080/login
```

NB: As initial seeds, I put two companies in the database, you can check out [here](./db/seeds/initial_seeds.sql)

5. To stop the container, run

```
make down
```

For more come in handy commands, please refer to [Makefile](./Makefile)

✨✨✨✨✨✨Welcome any ideas to make this project better! Happy Coding 👩🏻‍💻✨✨✨✨✨✨

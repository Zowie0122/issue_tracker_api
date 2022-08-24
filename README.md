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

## Main Technologies

- PostgreSQL
- REST API with Node.js Express.js server
- CRUD operation
- Session authentication
- Docker

## How to start

**Note**: To enjoy this app, you need this [repo](https://github.com/Zowie0122/issue_tracker-front) to provide the UI, please follow the [instruction](https://github.com/Zowie0122/issue_tracker-front/blob/main/README.md) to start the frontend.

1. Copy the environment variable to `.env` from `.env.example` by

```
cat .env.example >> .env
```

2. Please install [Docker](https://www.docker.com/products/docker-desktop/), don't worry, it is still free 😆 !

3. Make sure your Docker is up and running and host machine and docker environment are all available for both ports: `5000` and `5432`. Then run

```
make restart
```

You can access the API on your host machine via post `5000`. Check if the app is up and running by

```
curl -X GET http://localhost:5000/healthcheck
```

4. You can log in as a non-admin user by credentials

```
curl -d "email=tom@tomandjerry.com&password=pAssword1@" -X POST http://localhost:5000/login
```

Or log in as an admin

```
curl -d "email=admin@tomandjerry.com@&password=pAssword1@" -X POST http://localhost:5000/login
```

NB: As initial seeds, I put two companies and each company has admin and normal users in the database, you can check out [here](./db/seeds/initial_seeds.sql)

5. To stop the container, run

```
make down
```

For more come in handy commands, please refer to [Makefile](./Makefile)

✨✨✨✨✨✨Welcome any ideas to make this project better! Happy Coding 👩🏻‍💻✨✨✨✨✨✨

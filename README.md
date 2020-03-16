# Customer Feedback Portal

## Technology Stack:

- Prisma (Data modeling and ORM)
- Mongo (DB Engine)
- GraphQL (Query language for APIs)
- React (UI and Frontend)

## How to run the project (Production Mode) ?

### Build all images and run all containers

```
docker-compose up -d
```

## Optional Steps

#### If you want to stop all containers and delete all images

```
docker-compose down --rmi all 
```

#### Restart GraphQL

```
docker-compose restart graphql
```

#### Restart React

```
docker-compose restart react
```

#### To check the status of all running services

```
docker-compose ps
```

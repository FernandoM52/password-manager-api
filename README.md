# Password Manager

Is a password manager that simplifies the task of creating, storing and accessing secure passwords. The approach is to allow users to create a single strong and secure "master" password. All other passwords, which are usually long and complex, are stored securely and encrypted within the application. This eliminates the need to memorize multiple complex passwords with no semantic meaning, which can be a challenging task.

## About this Project

Password Manager is a RESTful API to help individuals efficiently manage their passwords. Is a solution aimed at the security of users on the internet. Faced with the growing number of virtual scams, the main objective of this project is to protect the personal data and sensitive information of online users.

<h3>Implemented features:</h3>

- Sign Up
- Sign In
- Complete resource to create, read, update and delete entities like:
  - Crendentials
  - Security Notes
  - Payments Cards
- Complete deletion of data and user account

<h3>Swagger documentation</h3>
Check out the complete swagger documentation through this link: https://password-manager-api-nzr2.onrender.com/api

<h3>Next steps:</h3>

- Implement entities:
  - Wi-fi
  - Software Licenses
- Unity tests
- Front-end interface

<h3>Some observations about this App:</h3>

1. The integration tests are not complete, but as soon as they are finished, they will be posted to the repository.

## Why

Lately I've been worried about the large volume of websites and passwords that we need to create/save and it's really quite complicated to keep everything saved on something as easily accessible as your cell phone. With this in mind, I came up with the idea of ​​creating an application in which I can manage this data efficiently but at the same time securely.

So, I'm very grateful to made it and share this project, hope be very useful to you. Enjoy! 

## Technologies

<div>

  ![Typesscrypt](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
  ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
  ![Swagger](https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=black)
</div>

## How to run

<h3>Installations</h3>

1. Clone this repository and instal the dependencies:

```
git clone https://github.com/FernandoM52/password-manager-api.git

cd password-manager-api

npm i
```

2. Use the `/.env.example` to create a `/.env` file and set the environment variables as described in the example file.
3. Run the following commands to create your database with prism:

```
npm run migrate:dev
npm run prisma:generate
```

<h3>Running the app</h3>

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

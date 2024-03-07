<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://www.prisma.io/" target="blank"><img src="https://icons.veryicon.com/png/o/business/vscode-program-item-icon/prisma.png" width="200" alt="Nest Logo" /></a>
</p>

## 🚀 Description

The Optometry Management System API, developed with Prisma.js and Nest.js, serves as a comprehensive solution for optometry software applications. This versatile API facilitates seamless patient registration, efficient user administration, and meticulous tracking of clinical histories. Additionally, it simplifies eyeglass frame management, offering features for inventory tracking and order processing. Leveraging the power of Prisma.js for optimal database interactions and Nest.js for scalable server-side architecture, this API enhances optometry practices by streamlining workflows and providing a solid foundation for software integration. Whether used in small clinics or large-scale enterprises, the API ensures scalability and reliability, contributing to an elevated and user-friendly optometry software experience.

## 🔗 Installation

```bash
$ npm install
```

## Running the app

```bash
# migrations
$ npx prisma migrate dev --name initial

# seeders
$ npx prisma db seed

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🚧 Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 🤝 License

Nest is [MIT licensed](LICENSE).

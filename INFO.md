# StreamGuide
> This project is **NOT** production-ready
> The `.env` files are only provided for your convenience. It should be obvious that in a really environment, these should never be commited to any subversion system.

## Quick Start
Run `docker compose up` and go to http://127.0.0.1:3000. Press `CTRL+C` to exit.

## Details
The project consists of 3 application:
- `api` which handles the call to the database and the search index. The API is written in [Typescript](https://www.typescriptlang.org/) (a superset of Javascript) with the help of [NestJS](https://nestjs.com/).
- `frontend` which provides the user with a nice front-end. Like the `api`, the `frontend` uses Typescript but uses [Next.js](https://nextjs.org/) as its main framework.
- `connector` which synchronises the search index with the database. The connector is written also written in Typescript and using the NestJS framework like the `api`.

The search index is provided by [Typesense](https://typesense.org/) and the database runs on [MongoDB](https://www.mongodb.com/) in a single-node replica set (without sharding).


## Sample data
A sample data is provided and automatically loaded by the `connector`.

Source data is originally from the [MongoDB Sample Mflix Dataset](https://docs.atlas.mongodb.com/sample-data/sample-mflix/#std-label-sample-mflix).

Only the `movies.title` (as `name`), `movies.fullplot` (as `synopsis`), and `movies.poster` (as `image`) have been kept.

Links attached to each medias are completely fictional and do NOT work, they are made for demonstration purpose.

The size has been limited to about 3'000 entries to make the search index indexing faster

## Installation and execution
### Requirements
- [Docker](https://www.docker.com/) >= `20` (`20.10.8`)
- (*optional*) [Node.js](https://nodejs.org/en/) >= `16` (`16.9.1`)
- (*optional*) [PnPm](https://pnpm.io/fr/) >= `6` (`6.21.1`)

### Building
Run `docker compose build` at the root of the project.

### Running
Run `docker compose up` at the root of the project. You can then access the website at http://localhost:3000

You can press `CTRL+C` to exit.

### Destroying
Run `docker compose down` at the root of the project

### Development
Run `docker compose -f docker-compose.dev.yml up` to start the dev containers. If you make any changes to `api`, `frontend`, or  `connector`, it should automatically reload

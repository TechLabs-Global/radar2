> [!WARNING]  
> This project is still in development and may not be ready for production use.

# TechLabs Radar 2.0

A faithful reimplementation of the original [Semester Radar](https://github.com/techLabs-berlin/radar) built by TechLabs Berlin.

## Features

TBD

### Event Types

TBD

### Timelines

TBD

## Configuration

TBD!

## Deployment

We provide a example [docker compose file]("./compose.yml") for easy deployment in development and test environments.

Configuration of the runtime environment is done via environment variables:

> [!WARNING]  
> Most environment variables will be made required in the future.

|Variable   |Description   |Default   |Required   |Example   |
|---|---|---|---|---|
|DB_HOST   |Database host   |localhost   |No   |
|DB_PORT   |Database port   |5432   |No   |
|DB_NAME   |Database name   |radar   |No   |
|DB_USER   |Database user   |radar   |No   |
|DB_PASSWORD   |Database password   |radar123   |No   |
|INIT_DB   |Initialize the database schema on startup (idempotent). Not recommended for production use.   |false   |No   |
|SEED_DB   |Seed the database with test data on startup (idempotent). Not recommended for production use.   |false   |No   |

## Development

Start in development mode:
```bash
npm run dev
```

Build and run (near-production mode):
```bash
npm run build
node build/index.js

# or

docker-compose up --build
```


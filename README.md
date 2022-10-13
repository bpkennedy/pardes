:book: Pardes
===========
A rabbinical study tool

## :wrench: Development
> **Warning**
> Because `Yarn Workspaces` is used, you need to use `yarn` for dependencies.

### :whale2: Docker Compose :whale2:
* `docker-compose up -d`

### :white_circle: Run in Production :white_circle:
* `yarn`
* `yarn build`
* `yarn serve`
* Runs on `localhost:3001`

### :blue_circle: Run in Development :blue_circle:
* `yarn`
* `yarn build`
* `yarn dev`
* Runs on `localhost:3001`

## :briefcase: Architecture: Monorepo with Yarn Workspaces
* `client` - 
* `server` - The authoritarive server running on `NodeJS`, `Express`.
* `common` - A collection of constants and methods shared amongst `client` and `server`.

## :book: License
This project is not licensed for use.

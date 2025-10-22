# micro-panel

- [Introduction](#introduction)
- [Setup & Tech Stack](#setup-&-tech-stack)
- [Tradeoffs](#tradeoff)
- [Bonuses](#bonuses)

## Introduction

This is a micro-finance SACCO Admin Panel, to be primarly used as a member and loan management system. I am building this as a take home-assignment for the ssd(Smart Software Developers) interview. A detailed list of how the project should be structured and its deliverables can be found [here](./docs/Intern Assignment.pdf). 

## Setup & Tech Stack

This is a 3-tier application comprised of:

- Frontend: Angular with Bootstrap for styling
- Database: MySQL
- Backend: NodeJS with Express framework

More detailed info on project setup can be found within each subdirectory's README.md file, but for a brief overview on getting started, clone the project by running:

```
    $ git clone https://github.com/mbvgua/micro-panel
    $ cd micro-panel
```

>  [!IMPORTANT]
> Before proceeding on project setup, ensure that you have the individual tools installed on your system. This would include: `@angular/cli` for the frontend, `mysql` database for the db, and a node package manager of your choice, I have used `pnpm` so that might be a good place to start.
>
> The backend is also built in `typescript` and compiled to `javascript` so ensure you have it installed to prevent any possible errors. Some database scripting with `python` will be added, hence it would be nice to also have it installed on your system.

## Setup with Docker

To run the project with docker, simply add the database password of your choosing in the root project directory `.env` file, then start it:
```bash
cp .env-example .env
# open the .env file and add missing values
docker compose up
```
## Trade-offs

1. Did not use Laravel as the backend stack: due to time constraints, did not see it feasible to both understand and use laravel for building the backend. As I needed to move fast, I will employ something that I am familiar with.
1. Full frontend integration is yet to be achieved. This is with the `update` endpoint. Though present in the backend, the frontend poses some challenges. This is well discussed in this [issue](https://github.com/mbvgua/micro-panel/issues/9)

## Bonuses

1. Python scripting: build a python script to setup and teardown the db on one command. Recently learnt this and it will be fun to implement this here also.
1. Validation of inputs passed both in the frontend and the backend. Appropriate error messages and response codes also make debugging easier.
3. Basic testing of the backend module with jest.

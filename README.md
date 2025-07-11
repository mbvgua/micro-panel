# micro-panel

- [Introduction](#introduction)
- [Setup & Tech Stack](#setup-&-tech-stack)
- [Tradeoffs](#tradeoff)
- [Bonuses](#bonuses)

## Introduction

This is a micro-finance SACCO Admin Panel, to be primarly used as a member and loan management system. I am building this as a take home-assignment for the ssd(Smart Software Developers) interview. A detailed list of how the project should be structured and its deliverables can be found [here](./docs/Intern Assignment.pdf). 

My main project timeline can be found on [this](https://trello.com/invite/b/686d1e1d5e7f60328c9f56b0/ATTI0c59d0584a87888fb56d8061172ece3eB1CE65F4/micro-panel) board.

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
> The backend is also built in `typescript` and compiled to `javascript` so ensure you have it installed to prevent any possible errors. Some database scripting with `python` will be added, hence it would be nice to also have it installed on your system.

## Trade-offs

1. Did not use Laravel as the backend stack: due to time constraints, did not see it feasible to both understand and use laravel for building the backend. As I needed to move fast, I will employ something that I am familiar with.
2. Each feature will not get its own branch: say `dev/backend` and `dev/frontend`. I was the only one working on the project hence working primarily on the `dev` branch would suffice. Also helps to eliminate possible confusion from the previously stated method.
3. Integration with the frontend is not yet achieved. Gradually work on all routes.

## Bonuses

1. Python scripting: build a python script to setup and teardown the db on one command. Recently learnt this and it will be fun to implement this here also.
2. Plan workflow on Trello: this will help prevent possible confusion you will have your timeline layed out from the get go.
3. Validation of inputs passed both in the frontend and the backend. Appropriate error messages and response codes also make debugging easier.
4. Basic testing of the backend module with jest.

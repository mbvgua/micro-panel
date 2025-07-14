# Backend

## Prerequisites

The backend is built with NodeJs with the express framework. To get started, you need to first ensure that you have node and a package manager of choice installed on your machine. This project used [pnpm](https://pnpm.io) as the package manager of choice, although `npm` will also work the same.
To confirm that they are installed, run the following command:

```bash
    $ node --version
    $ pnpm --version
```

This project was built with version `v22.15.0` of node and version `10.10.0` of pnpm.

Typescript also needs to be installed on your system. One can also check for this by viewing globally installed node packages, either with `pnpm` or `npm`. This is by running the command:

```bash
    $ pnpm list -g
    # or if your using npm
    $ npm list -g
```

To manually test the backend routes, you can utilize the collections folder, and ensure you have a rest client installed on your machine. This could be either postman, bruno, rest-client extension(on VsCode) or Kulala.nvim (on Neovim)
To automatically conduct some simple tests, run `pnpm test` and you get and overview of tests that passed and failed respectively. Though currently they are no failing tests.

## Setup

To get the server up and running, simply begin by installing the desired packages, then and only then can you start the server:
```bash
    $ pnpm install
    $ pnpm start
    # or if using npm
    $ npm install
    $ npm start
```


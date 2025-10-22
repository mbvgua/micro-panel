FROM node:24-alpine

# expose the webapp server port
EXPOSE 4000

WORKDIR /usr/src/app

# configure conatiner to work with pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# allows running npm, pnpm, yarn from node without installation
RUN corepack enable

# copy the setup file for caching
COPY package* .
COPY pnpm-lock* .
COPY tsconfig* .

# install needed dependencies
RUN pnpm i -g typescript
RUN pnpm i

# copy the rest of the code
COPY . .

# stsrt the prod server, which compiles the needed js files
# else the dev server keeps you in a loop
RUN pnpm prod:build

CMD ["pnpm","prod"]

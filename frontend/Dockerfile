FROM node:24-alpine

# expose the webapp server port
EXPOSE 4200

WORKDIR /usr/src/app

# copy the package.json file for caching
COPY package* .

# install needed dependencies
RUN npm i -g typescript
RUN npm i -g @angular/cli
RUN npm i

# copy the rest of the code
COPY . .

# run the app
# added the host section too allow accessing the app outside the container
CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM node:erbium
RUN mkdir -p /app/api
WORKDIR /app/api

COPY package.json /app/api/

RUN npm install

# uninstall the current bcrypt modules
RUN npm uninstall bcrypt

# install the bcrypt modules for the machine
RUN npm install bcrypt

COPY . /app/api/

CMD ["npm", "start"]
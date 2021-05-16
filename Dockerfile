FROM node:erbium

WORKDIR /app
COPY . /app
RUN cd ./client && npm install && npm rebuild node-sass && npm run build
RUN cd ./api  && npm rebuild bcrypt --build-from-source && npm install && npm audit fix --force
WORKDIR /app/api


CMD ["npm", "start"]
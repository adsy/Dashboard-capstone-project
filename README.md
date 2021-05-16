This project was built as the concept for Rexlabs dashboards. It is developed using react and express. The application is best loaded via docker-compose. 

The following scripts need to be run from the top directory of the project. You need access to docker-compose.yml

## IMPORTANT ##
For the project to succesfully load you must setup your .env file please ask an administrator for the correct setup. 
You must also be authorised to hit the google cloud database. To do this have an administrator give add your IP.  

## Available Scripts

In the project directory, you can run:

-------------------------------------------------------------------------------
### `docker-compose up --build`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

username: dawnroth@yahoo.com.au
password: password

-------------------------------------------------------------------------------
Alternatively use this method to directly pull the images from docker hub.

To use this method you must change the file labeled 
### `docker-compose-prod.yml`
to
### `docker-compose.yml`

Then run the following cmd's from the top directory.
### `docker-compose pull` -> `docker-compose up`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

username: dawnroth@yahoo.com.au
password: password

-------------------------------------------------------------------------------

## Available Test Scripts


## Cypress (front end)
From the top directory open three terminal windows and follow the below steps. 

Terminal 1
### `cd client`
### `npm install`
### `npm start`
Terminal 2
### `cd api`
### `npm install`
### `npm start`
Terminal 3
### `cd client`
### `npm run crypress`

Cypress will open a new window and you will see the test suite run. As a note the above commands must be run in the given order. 

## Jest
From the top directory open a single terminal and run the following

### `cd api`
### `npm run test`

This is the test package for the backend and is used to test routes, these will run within the terminal and show test results.  
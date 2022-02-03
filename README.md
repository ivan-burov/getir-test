# getir-test

## Setup

To configure the project copy env file first

````
cp .env.example .env
````

Then define ``SERVER_PORT`` and ``MONGO_URL`` variables in this file

## Launch

To launch project run

````
docker-compose up -d
````

## Route

To reach a working version make a POST request 

````
http://localhost:SERVER_PORT/records
````

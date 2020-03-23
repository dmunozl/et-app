# ET APP

Test application. Simple serverless REST API using TypeScript, and AWS DynamoDB.

## Implementation

The implementation consist of a simple "api" folder, with 4 files written in TypeScript. Each file
contains a function that correspond to one api call: create, delete, list, 

The "tests" folder contains a simple file containing all the tests. Due to the usage of ts-jest it
is not necessary to compile this file to run the "jest" command.

The jest-config is a simple configuration file for jest, and the tsconfig.json is a simple configuration
file for typescript to compile the ts files.

The serverless.yml  contains the configuration for the serverless application, including functions definitios
for AWS Lambda and the database definition for AWS DynamoDB.

## How to deploy

Clone the repository. In the console, go to the cloned repository, and assuming node is installed, run the following commands:

```
npm install serverless --global
npm install jest --global
npm install
```

Here we install serverless and jest globally for ease of use. Once everything is installed, it is necessary to login into a serverless account:

```
serverless login
```

Assuming an app and a deployment profile already exist in the serverless dashboard, connect the project to the app by running:

```
serverless --org {org-name} --app {app-name}
```

The previous command will edit the contents of serverless.yml to match org and app name!

Before deploying, compile the ts files by running:

```
tsc
```

And finally deploy the application by running.

```
serverless deploy
```

## How to use

After deploying, you should get 4 urls with the following structure:

   1. POST  -   https://someurl/data
   2. GET   -   https://someurl/data/{id}/{uid}
   3. GET   -   https://someurl/data
   4. DELETE -  https://someurl/data/{id}/{uid}
   
These are the endpoints of the REST API. And they work as follow:

####1. POST Request

This endpoint adds data to the database, the request should have in its body a json with the following structure:

```
{
    "id": "UID-123",
    "name": "robert",
    "vat-number": "DE123456",	
    "user-id": "gid:robert"
}
```
A successfull creation returns a response with a 201 status code. 
Every parameter here is provided by the user, including the ids.

####2. GET request with id and uid

This endpoint receives in the url, the id and user-id parameters, and retrieves the item from the database. If the item 
does not exist it returns a 400 status code response with a "Item does not exist" message.

####3. GET request, no parameters

This endpoint return the list of all the existing items in the database. If there are no
items in the database, it still return a 200 status code response with an empty array.

####4. DELETE request with id and uid

This endpoint deletes the specified entry from the database. Deleting an item that does not exist
is considered successfull (DynamoDB returns a successfull response).

## Running tests

To run the tests, simply execute the command:

```
jest
```

This works assuming jest was installed globally as specified in the 'How to deploy' section.

The tests included here are only for the create function, and it uses the 'aws-sdk-mock' library.

Truth be told, I was unable to test deletion, list and retrieve with that library. I believe
the best way to test this is to use dynamodb-local and use the real responses (instead of mockups),
but I was unable to set it up properly (mostly due to inexperience with the used technologies). I 
have no doubt that with a bit more time I could get this working properly!
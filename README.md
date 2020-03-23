# ET APP

Test application. Simple serverless REST API using TypeScript, and AWS DynamoDB.

## Implementation

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
   
These are the endpoints of the REST API.


## Running tests

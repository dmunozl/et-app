"use strict";

import { DynamoDB } from 'aws-sdk'

export const retrieve = (event:any, context:any, callback:any) => {
    const dynamoDb = new DynamoDB.DocumentClient();
    const id = event.pathParameters.id;
    const user_id = event.pathParameters.uid;

    const params = {
        TableName: 'data',
        Key: {
            'id': id,
            'user-id': user_id
        }
    };

    return dynamoDb.get(params, (error, data) => {
        if ( error ) {
            const response = {
                statusCode: 400,
                body: JSON.stringify({message: error.message})
            };
            console.error(error.message);
            callback(null, response);
        } else if ( data.Item ) {
            const response = {
                statusCode: 200,
                body: JSON.stringify(data.Item)
            };
            callback(null, response);
        } else {
            const response = {
                statusCode: 400,
                body: JSON.stringify({message: 'Item does not exist'})
            };
            console.error('Item does not exist.');
            callback(null, response);
        }
    })
};

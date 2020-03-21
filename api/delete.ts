"use strict";

import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
    const id = event.pathParameters.id;
    const user_id = event.pathParameters.uid;

    const params = {
        TableName: 'data',
        Key: {
            'id': id,
            'user-id': user_id
        }
    };

    dynamoDb.delete(params, (error, data) => {
        if ( error ) {
            const response = {
                statusCode: 400,
                body: JSON.stringify({message: error.message})
            };
            console.error(error.message);
            callback(null, response);
        } else if ( data ) {
            const response = {
                statusCode: 200,
                body: JSON.stringify({message: 'Item deleted successfully'})
            };
            callback(null, response);
        }
    })
};

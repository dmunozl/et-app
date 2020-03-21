"use strict";

import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {

    const params = {
        TableName: 'data',
    };

    dynamoDb.scan(params, (error, data) => {
        if ( error ) {
            const response = {
                statusCode: 400,
                body: JSON.stringify({message: error.message})
            };
            console.error(error.message);
            callback(null, response);
        } else if ( data.Items ) {
            const response = {
                statusCode: 200,
                body: JSON.stringify({data: data.Items})
            };
            callback(null, response);
        } else {
            const response = {
                statusCode: 400,
                body: JSON.stringify({message: 'No Items.'})
            };
            console.error('No Items.');
            callback(null, response);
        }
    })
};

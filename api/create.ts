"use strict";

import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const data = JSON.parse(event.body);

    const expected_params = ['id', 'name', 'vat-number', 'user-id'];
    const errors = [];

    for ( const expected_param of expected_params ) {
        if (typeof data[expected_param] !== "string") {
            errors.push(`Invalid or missing ${expected_param}. Could not create entry.`);
        }
    }

    if ( errors.length > 0 ) {
        console.error('Invalid data');
        callback('Error', new Error(JSON.stringify({errors: errors})));
        return
    }

    const params = {
        TableName:  'data',
        Item: data
    };

    dynamoDb.put(params, (error, result) => {
        if ( error ) {
            console.error(error);
            callback(new Error('Could not create entry.'));
            return
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };

        callback(null, response);
        return(response);
    })
};

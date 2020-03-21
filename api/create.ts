"use strict";

import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const data = JSON.parse(event.body);

    const expected_params = ['id', 'name', 'vat-number', 'user-id'];
    const errors = [];

    for ( const expected_param of expected_params ) {
        if (typeof data[expected_param] !== "string") {
            errors.push(`Invalid or missing ${expected_param}. Could not create Item.`);
        }
    }

    if ( errors.length > 0 ) {
        const response = {
            statusCode: 400,
            body: JSON.stringify({messages: errors})
        };
        console.error('Invalid data');
        callback(null, response);
        return
    }

    const params = {
        TableName:  'data',
        Item: data
    };

    dynamoDb.put(params, (error, result) => {
        if ( error ) {
            const response = {
                statusCode: 400,
                body: JSON.stringify({message: error.message})
            };
            console.error(error.message);
            callback(null, response);
        } else {
            const response = {
                statusCode: 201,
                headers: {
                    'Location': `data/${data['id']}/${data['user-id']}`
                },
                body: JSON.stringify(params.Item)
            };
            callback(null, response);
        }
    })
};

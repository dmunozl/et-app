"use strict";
exports.__esModule = true;
var aws_sdk_1 = require("aws-sdk");
var dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
module.exports.create = function (event, context, callback) {
    var data = JSON.parse(event.body);
    var expected_params = ['id', 'name', 'vat-number', 'user-id'];
    var errors = [];
    for (var _i = 0, expected_params_1 = expected_params; _i < expected_params_1.length; _i++) {
        var expected_param = expected_params_1[_i];
        if (typeof data[expected_param] !== "string") {
            errors.push("Invalid or missing " + expected_param + ". Could not create entry.");
        }
    }
    if (errors.length > 0) {
        console.error('Invalid data');
        callback('Error', new Error(JSON.stringify({ errors: errors })));
        return;
    }
    var params = {
        TableName: 'data',
        Item: data
    };
    dynamoDb.put(params, function (error, result) {
        if (error) {
            console.error(error);
            callback(new Error('Could not create entry.'));
            return;
        }
        var response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
        callback(null, response);
        return (response);
    });
};

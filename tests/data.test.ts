import { create } from '../api/create'
import * as AWSMock from 'aws-sdk-mock'
import * as AWS from 'aws-sdk'

const mockup_callback = (error:any , response:any) => {
    if (error) return error;
    return response
};

test("Create test, bad data case", () => {
    const create_event = {
        body: JSON.stringify({"id": "UID-123"})
    };
    expect(create(create_event, {}, mockup_callback)).toMatchObject({
        statusCode: 400,
        body: JSON.stringify({
            "messages": [
                "Invalid or missing name. Could not create Item.",
                "Invalid or missing vat-number. Could not create Item.",
                "Invalid or missing user-id. Could not create Item."
            ]
        })
    });
});

test("Create test, good data case", async () => {
    AWSMock.setSDKInstance(AWS);

    const create_event = {
        body: JSON.stringify({
            "vat-number": "DE123456",
            "id": "UID-123",
            "name": "robert",
            "user-id": "gid:robert"
        })
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'put', (params: any, callback:Function) => {
        const correct_response = {
            statusCode: 201,
            headers: {
                'Location': `data/${params.Item['id']}/${params.Item['user-id']}`
            },
            body: JSON.stringify(params.Item)
        };

        return callback(null, correct_response)
    });

    const response = await create(create_event, {}, mockup_callback).promise();

    expect(response['statusCode']).toEqual(201);
    expect(response.headers['Location']).toEqual('data/UID-123/gid:robert');
    expect(response.body).toEqual(create_event.body);
    AWSMock.restore('DynamoDB.DocumentClient');
});

test("Create test, DynamoDb error case", async () => {
    AWSMock.setSDKInstance(AWS);

    const create_event = {
        body: JSON.stringify({
            "vat-number": "DE123456",
            "id": "UID-123",
            "name": "robert",
            "user-id": "gid:robert"
        })
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'put', (params: any, callback:Function) => {
        const error_response = {
            statusCode: 400,
            body: JSON.stringify({message: 'Mockup error message'})
        };

        return callback(null, error_response)
    });

    const response = await create(create_event, {}, mockup_callback).promise();

    expect(response['statusCode']).toEqual(400);
    expect(JSON.parse(response.body)['message']).toEqual('Mockup error message');
    AWSMock.restore('DynamoDB.DocumentClient');
});

import { create } from '../api/create'

const mockup_callback = (error, response) => {
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

test("Create test, good data case", () => {
    const create_event = {
        body: JSON.stringify({"id": "UID-123", "name": "robert", "vat-number": "DE123456", "user-id": "gid:robert"})
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
export type MongoError = {
    errorResponse: {
        index: number,
        code: number,
        errmsg: string,
        keyPattern: {
            Email: number,
            PhoneNumber: number
        },
        keyValue: {
            Email: string
            PhoneNumber: string
        }
    },
    index: number,
    code: number,
    keyPattern: {
        Email: number
        PhoneNumber: number
    },
    keyValue: {
        Email: string
        PhoneNumber: string
    },
    errors: {
        password: {
            name: string,
            message: string,
            properties: {
                message: string,
                type: string,
                minlength: number,
                path: string,
                value: string
            },
            kind: string,
            path: string,
            value: string
        }
    },
    _message: string,
    name: string,
    message: string
};
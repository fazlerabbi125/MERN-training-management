const HTTP_STATUS = {
    //2xx success
    OK: 200,
    CREATED: 201,
    //4xx client errors
    NOT_FOUND: 404,
    UNAUTHORIZED: 401, //when the client doesn't provide credentials or provides invalid credentials
    METHOD_NOT_ALLOWED: 405,
    UNPROCESSABLE_ENTITY: 422, //semantic errors or invalid data in the request payload
    BAD_REQUEST: 400, //general indication of a request with incorrect syntax or an invalid request structure
    FORBIDDEN: 403, //when a client has valid credentials but not enough privileges to perform an action on a resource
    //5xx server errors
    INTERNAL_SERVER_ERROR: 500,
};

export default HTTP_STATUS;
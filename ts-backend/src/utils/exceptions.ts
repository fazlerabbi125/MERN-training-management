import HTTP_STATUS from "./httpStatus";

export default class APIException extends Error {
    status: HTTP_STATUS;
    errors?: Record<string, string>;

    constructor(
        message: string,
        status: HTTP_STATUS = HTTP_STATUS.INTERNAL_SERVER_ERROR,
        errors?: Record<string, string>
    ) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.name = this.constructor.name;
    }
}

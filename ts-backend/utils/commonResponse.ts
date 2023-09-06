const success = (message: string, data: any = null) => {
    return {
        success: true,
        message,
        results: data,
    };
};

const failure = (message: string, errors: Record<string, any> = {}) => {
    return {
        success: false,
        message,
        errors,
    };
};

export { success, failure };

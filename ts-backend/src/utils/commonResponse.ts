const success = <T = any>(message: string, data: T = null as T) => {
    return {
        success: true,
        message,
        results: data,
    };
};

const failure = (message: string, errors?: Record<string, string>) => {
    return {
        success: false,
        message,
        errors,
    };
};

export { success, failure };

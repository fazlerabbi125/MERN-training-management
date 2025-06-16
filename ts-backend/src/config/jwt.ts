import ms, { StringValue } from "ms";

export const JWT_keys = {
    access: process.env.JWT_ACCESS_SECRET_KEY ?? "",
    refresh: process.env.JWT_REFRESH_SECRET_KEY ?? "",
};

export const JWT_exp = {
    access: process.env.JWT_ACCESS_EXPIRATION,
    refresh: process.env.JWT_REFRESH_EXPIRATION
        ? ms(process.env.JWT_REFRESH_EXPIRATION as StringValue)
        : 7 * 24 * 60 * 60,
};

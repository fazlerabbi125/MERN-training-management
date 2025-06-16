import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { UserDocument } from "@/models/user.model";

export function generateJwtToken<U extends Pick<UserDocument, "_id">>(
    user: U,
    secret_key: string,
    exp: SignOptions["expiresIn"]
): string {
    return jwt.sign(
        {
            user_id: user._id,
        },
        secret_key,
        { expiresIn: exp }
    );
}

export function verifyJwtToken(token: string, secret_key: string) {
    return <JwtPayload>jwt.verify(token, secret_key);
}

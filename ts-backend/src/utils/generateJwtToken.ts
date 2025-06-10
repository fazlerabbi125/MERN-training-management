import jwt, { SignOptions } from "jsonwebtoken";
import { UserDocument } from "@/models/user";

export default function generateJwtToken<U extends Pick<UserDocument, "_id">>(
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

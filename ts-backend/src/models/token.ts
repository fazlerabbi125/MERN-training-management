import mongoose, { Model, SchemaTimestampsConfig, HydratedDocument, Types } from "mongoose";
import User from "./user";
import { TokenType } from "@/utils/constants";

export type IToken = SchemaTimestampsConfig & {
    token: string;
    user: Types.ObjectId;
} & (
        | { type: TokenType.JWTRefresh }
        | {
              type: Exclude<TokenType, TokenType.JWTRefresh>;
              expiresAt: Date;
          }
    );

export type TokenDocument = HydratedDocument<IToken>;
export type TokenModel = Model<IToken>;

const tokenSchema = new mongoose.Schema<IToken, TokenModel>(
    {
        token: {
            type: String,
            unique: true,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: [true, "User is required"],
        },
        type: {
            type: String,
            enum: Object.values(TokenType),
            required: true,
        },
        expiresAt: {
            type: Date,
            required: function () {
                return this.type !== TokenType.JWTRefresh;
            },
            expires: 1,
            // if 'expiresAt' is set, then document expires at expireAt + given seconds
        },
    },
    { timestamps: true }
);

const Token = mongoose.model<IToken, TokenModel>("Token", tokenSchema);
export default Token;

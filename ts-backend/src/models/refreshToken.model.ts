import mongoose, { Model, SchemaTimestampsConfig, HydratedDocument, Types } from "mongoose";
import User from "./user.model";

export type IRefreshToken = SchemaTimestampsConfig & {
    token: string;
    user: Types.ObjectId;
    expiresAt: Date;
};

export type RefreshTokenDocument = HydratedDocument<IRefreshToken>;
export type RefreshTokenModel = Model<IRefreshToken>;

const refreshTokenSchema = new mongoose.Schema<IRefreshToken, RefreshTokenModel>(
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
        expiresAt: {
            type: Date,
            required: true,
            expires: 1,
            // if 'expiresAt' is set, then document expires at expireAt + given seconds
        },
    },
    { timestamps: true }
);

const RefreshToken = mongoose.model<IRefreshToken, RefreshTokenModel>("RefreshToken", refreshTokenSchema);
export default RefreshToken;

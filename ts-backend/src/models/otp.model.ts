import mongoose, { Model, SchemaTimestampsConfig, HydratedDocument } from "mongoose";
import { OTPTypes } from "@/utils/constants";

export type IOTP = SchemaTimestampsConfig & {
    token: string;
    email: string;
    type: OTPTypes;
    expiresAt: Date;
};

export type OTPDocument = HydratedDocument<IOTP>;
export type OTPModel = Model<IOTP>;

const otpSchema = new mongoose.Schema<IOTP, OTPModel>(
    {
        token: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(OTPTypes),
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            expires: 1,
            // if 'expireAt' is set, then document expires at expireAt + given seconds
        },
    },
    { timestamps: true }
);

const OTP = mongoose.model<IOTP, OTPModel>("OTP", otpSchema);
export default OTP;

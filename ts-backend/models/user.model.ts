// https://mongoosejs.com/docs/discriminators.html
import mongoose, { Document, Model, Types, SchemaTimestampsConfig, SchemaOptions } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document, SchemaTimestampsConfig {
    name: string;
    email: string;
    password: string;
    date_of_birth: string | Date;
    isAdmin?: boolean;
    photo?: Types.ObjectId;
    emailVerified?: boolean;
    emailVerificationToken?: string;
    emailVerificationdExpire?: string;
    refreshToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date | string;
}

const schemaOptions: SchemaOptions<UserDocument> = {
    timestamps: true,
    // discriminatorKey: "role",
};

export interface UserModel extends Model<UserDocument> {
    login(email: string, password: string): Promise<UserDocument | null>;
}

//interface for instance methods can be added as the third type here
const userSchema = new mongoose.Schema<UserDocument, UserModel>(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            trim: true,
            minlength: [6, "Password must at least contain 6 characters"],
            required: [true, "Password is required"],
        },

        date_of_birth: {
            type: Date,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        photo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: String,
        emailVerificationdExpire: Date,
        refreshToken: String,
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    schemaOptions
);

userSchema.statics.login = async function (email: string, password: string) {
    const user = await this.findOne({ email }).exec();
    if (user) {
        const passMatch: boolean = await bcrypt.compare(password, user.password);
        if (passMatch) return user;
    }
    return null;
};

export const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

// export const Admin = User.discriminator('Admin', new mongoose.Schema({}, schemaOptions));

// export interface RegUserDocument extends SchemaTimestampsConfig {
//     user: Types.ObjectId;
//     connectedMembers: Array<Types.ObjectId>;
//     groups: Array<Types.ObjectId>;
// }

// export type RegUserModel = Model<RegUserDocument>;

// const regUserSchema = new mongoose.Schema<RegUserDocument, RegUserModel>(
//     {
//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             unique: true,
//             required: true,
//         },
//         connectedMembers: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "RegUser",
//             },
//         ],
//         groups: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "Chat",
//             },
//         ],
//     },
//     schemaOptions
// );

// export const RegUser = mongoose.model<RegUserDocument, RegUserModel>("RegUser", regUserSchema);

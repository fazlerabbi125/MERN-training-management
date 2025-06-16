import mongoose, { Model, SchemaTimestampsConfig, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import { userRoles } from "@/utils/constants";

export interface IUser extends SchemaTimestampsConfig {
    name: string;
    email: string;
    password: string;
    role: userRoles;
    // gender: genderOptions;
    // birth_date: Date;
    photo?: string | null;
    emailVerified: boolean;
    lastLogin?: Date;
}

export type UserDocument = HydratedDocument<IUser>;

interface UserModel extends Model<IUser> {
    login(email: string, password: string): Promise<UserDocument | null>;
}

const userSchema = new mongoose.Schema<IUser, UserModel>(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
            minLength: [3, "Must be at least 3 characters, got {VALUE}"],
        },
        email: {
            type: String,
            trim: true,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            minLength: [6, "Must be at least 6 characters, got {VALUE}"],
        },
        role: {
            type: String,
            enum: Object.values(userRoles),
        },
        // gender: {
        //     type: String,
        //     required: [true, "Gender is required"],
        //     enum: Object.values(genderOptions),
        // },
        // birth_date: {
        //     type: Date,
        //     required: true,
        // },
        photo: String,
        emailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        lastLogin: Date,
    },
    { timestamps: true }
);

userSchema.statics.login = async function (
    email: string,
    password: string
): Promise<UserDocument | null> {
    const user = await this.findOne({ email }).exec();
    if (user) {
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) return user;
    }
    return null;
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;

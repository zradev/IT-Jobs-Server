import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    avatar_url?: string;
    cv_url?: string;
    job_title?: string;
    education?: string;
    country?: string;
    city?: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        avatar_url: { type: String, required: true },
        cv_url: { type: String, required: true },
        job_title: { type: String, required: true },
        education: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>("User", UserSchema);

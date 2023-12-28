import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    birthDate: string;
    city: string;
    country: string;
    email: string;
    password: string;
}

export interface IUserRequest extends IUser {
    confirmPassword: string;
}

export interface IUserResponse extends Omit<IUser, 'password'> {
    _id: mongoose.ObjectId;
}

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
    password?: string;
}

export interface IUserNoPassword extends Omit<IUserResponse, 'password'> {}

export interface IUserSignInRequest {
    email: string;
    password: string;
}

export interface IUserSignInResponse {
    firstName: string;
    lastName: string;
    email: string;
}

import { Schema } from 'mongoose';
import { IUser } from '../../../helpers/interfaces/user.interface';

export const UserSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        birthDate: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
    },
    { versionKey: false },
);

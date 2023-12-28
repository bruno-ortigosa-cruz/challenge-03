import { CallbackError, Schema } from 'mongoose';
import { IUser } from '../../../helpers/interfaces/user.interface';
import bcrypt from 'bcrypt';

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

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password as string, salt);

        this.password = hashedPassword;

        next();
    } catch (exception) {
        return next(exception as CallbackError);
    }
});

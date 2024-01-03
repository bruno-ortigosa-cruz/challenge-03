import { CallbackError, model } from 'mongoose';
import { IUser } from '../../../helpers/interfaces/user.interface';
import { UserSchema } from '../schemas/user.schema';
import bcrypt from 'bcrypt';

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

export const UserModel = model<IUser>('User', UserSchema);

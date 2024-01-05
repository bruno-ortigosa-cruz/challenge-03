import {
    CallbackError,
    CallbackWithoutResultAndOptionalError,
    model,
} from 'mongoose';
import { IUser } from '../../../helpers/interfaces/user.interface';
import { UserSchema } from '../schemas/user.schema';
import bcrypt from 'bcrypt';

export class hashPassword {
    public static async exec(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
}

export class PreSaveLogic {
    public static async exec(
        schema: IUser,
        next: CallbackWithoutResultAndOptionalError,
    ) {
        try {
            schema.password = await hashPassword.exec(schema.password);

            next();
        } catch (exception) {
            return next(exception as CallbackError);
        }
    }
}

UserSchema.pre('save', async function (next) {
    await PreSaveLogic.exec(this, next);
});

export const UserModel = model<IUser>('User', UserSchema);

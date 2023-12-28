import { model } from 'mongoose';
import { IUser } from '../../../helpers/interfaces/user.interface';
import { UserSchema } from '../schemas/user.schema';

export const UserModel = model<IUser>('Event', UserSchema);

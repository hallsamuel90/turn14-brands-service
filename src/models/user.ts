import mongoose from 'mongoose';
import { User } from '../interfaces/iUser';

const UserModel = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

export default mongoose.model<User>('User', UserModel);

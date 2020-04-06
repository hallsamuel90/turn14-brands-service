import mongoose from 'mongoose';
import { User } from '../interfaces/iUser';

const UserModel = new mongoose.Schema({
  siteUrl: String,
  client: String,
  secret: String,
});

export default mongoose.model<User>('User', UserModel);

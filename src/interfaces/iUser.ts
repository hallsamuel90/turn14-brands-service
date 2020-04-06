import { Document } from 'mongoose';

export interface User extends Document {
  siteUrl: string;
  client: string;
  secret: string;
}

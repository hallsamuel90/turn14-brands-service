import { Document } from 'mongoose';
export interface Brand extends Document {
  userId: string;
  siteId: string;
  brandId: string;
  brandName: string;
  active: boolean;
  firstPublished: Date;
  lastUpdated: Date;
}

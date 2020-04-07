import { Document } from 'mongoose';
export interface Brand extends Document {
  siteId: string;
  brandId: string;
  brandName: string;
  active: boolean;
  lastUpdated: Date;
}

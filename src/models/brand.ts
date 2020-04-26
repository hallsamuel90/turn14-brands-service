import mongoose from 'mongoose';
import { Brand } from '../interfaces/iBrand';

const BrandModel = new mongoose.Schema({
  userId: String,
  siteId: String,
  brandId: String,
  brandName: String,
  active: Boolean,
  firstPublished: Date,
  lastUpdated: Date,
});

export default mongoose.model<Brand>('Brand', BrandModel);

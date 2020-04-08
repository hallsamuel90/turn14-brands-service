import mongoose from 'mongoose';
import { Brand } from '../interfaces/iBrand';

const BrandModel = new mongoose.Schema({
  siteId: String,
  brandId: String,
  brandName: String,
  active: Boolean,
  lastUpdated: Date,
});

export default mongoose.model<Brand>('Brand', BrandModel);

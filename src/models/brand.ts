import mongoose from 'mongoose';

const Brand = new mongoose.Schema({
  userId: String,
  brandId: String,
  brandName: String,
  active: Boolean,
  lastUpdated: Date,
});

export default Brand;

import mongoose from 'mongoose';
import { Site } from '../interfaces/iSite';

const SiteModel = new mongoose.Schema({
  siteUrl: {
    type: String,
    unique: true,
  },
});

export default mongoose.model<Site>('Site', SiteModel);

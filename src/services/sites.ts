import { Site } from '../interfaces/iSite';
import SiteModel from '../models/site';

/**
 * Site Service
 */
export default class SiteService {
  /**
   *
   * @param {Site} siteDTO
   */
  async retrieve(siteDTO: Site): Promise<Site> {
    let site;
    try {
      site = SiteModel.findOne(siteDTO);
    } catch (e) {
      console.error('🔥 error: ' + e);
    }
    return site;
  }

  /**
   *
   * @param {Site} siteDTO
   */
  async create(siteDTO: Site): Promise<Site> {
    let site: Site;
    try {
      site = new SiteModel(siteDTO);
      await site.save();
    } catch (e) {
      console.error('🔥 error: ' + e);
      await site.remove();
      throw e;
    }
    return site;
  }
}

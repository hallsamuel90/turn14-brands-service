import { Brand } from '../interfaces/iBrand';
import BrandModel from '../models/brand';
/**
 * Brands Service
 */
export default class BrandsService {
  /**
   *
   * @param {string} siteId
   */
  async list(siteId: string): Promise<Brand[]> {
    try {
      return BrandModel.find({ _id: siteId });
    } catch (e) {
      console.error('🔥 error: ' + e);
    }
  }

  /**
   *
   * @param {Brand} brandDTO
   */
  async create(brandDTO: Brand): Promise<Brand> {
    let brand: Brand;
    try {
      brand = new BrandModel(brandDTO);
      await brand.save();
      return brand;
    } catch (e) {
      console.error('🔥 error: ' + e);
      await brand.remove();
      throw e;
    }
  }

  //   update() {}

  //   delete() {}
}

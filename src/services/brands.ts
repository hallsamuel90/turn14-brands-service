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
      return BrandModel.find({ siteId: siteId });
    } catch (e) {
      console.error('🔥 ' + e);
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
      return brand.id;
    } catch (e) {
      console.error('🔥 ' + e);
      brand.remove();
      throw e;
    }
  }

  /**
   *
   * @param {Brand[]} brandDTOs
   */
  async createMany(brandDTOs: Brand[]): Promise<void> {
    try {
      await BrandModel.insertMany(brandDTOs);
    } catch (e) {
      console.error('🔥 ' + e);
      BrandModel.deleteMany(brandDTOs);
      throw e;
    }
  }
}

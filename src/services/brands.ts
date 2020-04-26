import { Brand } from '../interfaces/iBrand';
import BrandModel from '../models/brand';
/**
 * Brands Service
 */
export default class BrandsService {
  /**
   *
   * @param {string} userId
   */
  async list(userId: string): Promise<Brand[]> {
    try {
      return BrandModel.find({ userId: userId });
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
      return brand;
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

  /**
   * @param {string} id
   * @param {Brand} brandDTO
   */
  async update(id: string, brandDTO: Brand): Promise<Brand> {
    try {
      const brand = await BrandModel.findOneAndUpdate({ _id: id }, brandDTO, {
        new: true,
      });
      return brand;
    } catch (e) {
      console.error('🔥 ' + e);
      throw e;
    }
  }
}

import { Service } from 'typedi';
import { Brand } from '../interfaces/iBrand';
import BrandModel from '../models/brand';
/**
 * Brands Service
 */
@Service()
export class BrandsService {
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
   * Updates dates a brand. If the active property is being updated, then
   * send a msg to pgmt service to update its list of active brands
   *
   * @param {string} id
   * @param {Brand} brand
   * @returns {Promise<Brand>} updated brand
   */
  async update(id: string, brand: Brand): Promise<Brand> {
    try {
      // returns brand as it was before update
      const updatedBrand = await BrandModel.findOneAndUpdate(
        { _id: id },
        brand
      );
      return updatedBrand;
    } catch (e) {
      console.error('🔥 ' + e);
      throw e;
    }
  }
}

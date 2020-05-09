import Container, { Service } from 'typedi';
import { ActiveBrandDTO } from '../dtos/activeBrandDto';
import { Brand } from '../interfaces/iBrand';
import BrandModel from '../models/brand';
import { ActiveBrandPublisher } from '../publishers/activeBrandPublisher';
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
   * @param {Brand} brandDTO
   * @returns {Promise<Brand>} updated brand
   */
  async update(id: string, brandDTO: Brand): Promise<Brand> {
    const activeBrandsPublisher = Container.get(ActiveBrandPublisher);
    try {
      const brand = await BrandModel.findOneAndUpdate({ _id: id }, brandDTO, {
        new: true,
      });
      if (brandDTO.active) {
        const activeBrandDTO = new ActiveBrandDTO(
          brand.userId,
          brand.brandId,
          brand.active
        );
        activeBrandsPublisher.queueActivateBrandSequence(activeBrandDTO);
      }
      return brand;
    } catch (e) {
      console.error('🔥 ' + e);
      throw e;
    }
  }
}

import Container from 'typedi';
import { Brand } from '../interfaces/iBrand';
import BrandsService from '../services/brands';

/**
 *
 */
export default class BrandsSequenceJob {
  /**
   * Takes in a list of brands and populates the db
   *
   * @param {Brand[]} brands
   */
  handler(brands: Brand[]): void {
    console.info('🔨 Brands Sequence Job starting!');
    const brandsService = Container.get(BrandsService);
    brandsService.createMany(brands);
  }
}

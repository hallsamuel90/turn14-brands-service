import { Inject, Service } from 'typedi';
import { Brand } from '../interfaces/iBrand';
import { BrandsService } from '../services/brands';

/**
 * Job for creating multiple brands.
 *
 * @author Sam Hall <hallsamuel90@gmail.com>
 */
@Service()
export class BrandsSequence {
  @Inject()
  private readonly brandsService: BrandsService;

  /**
   * Takes in a list of brands and populates the db.
   *
   * @param {Brand[]} brands - list of brands to add.
   */
  handler(brands: Brand[]): void {
    console.info('🔨 Brands Sequence Job starting!');
    this.brandsService.createMany(brands);
  }
}

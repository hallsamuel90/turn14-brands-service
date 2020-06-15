import {
  Body,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  QueryParam,
} from 'routing-controllers';
import { Inject } from 'typedi';
import { ActiveBrandDTO } from '../dtos/activeBrandDto';
import { Brand } from '../interfaces/iBrand';
import { ActiveBrandPublisher } from '../publishers/activeBrandPublisher';
import { BrandsService } from '../services/brands';

/**
 * BrandsController.
 *
 * @author Sam Hall <hallsamuel90@gmail.com>
 */
@JsonController('/brands')
export class BrandsController {
  @Inject()
  private readonly brandsService: BrandsService;

  @Inject()
  private readonly activeBrandsPublisher: ActiveBrandPublisher;

  /**
   * Fetches brands associated with the user.
   *
   * @param {string} userId - query parameter to filter brands.
   * @returns {Promise<Brand[]>} - list of brands.
   */
  @Get('/')
  async getUserBrands(@QueryParam('userId') userId: string): Promise<Brand[]> {
    return await this.brandsService.list(userId);
  }

  /**
   * Creates a new Brand.
   *
   * @param {Brand} brand - brand to be created.
   * @returns {Promise<Brand>} created brand.
   */
  @Post('/')
  async createBrand(@Body() brand: Brand): Promise<Brand> {
    const createdBrand = await this.brandsService.create(brand);
    return createdBrand;
  }

  /**
   * Updates a Brand.
   *
   * @param {string} id - path parameter id of the brand to be updated.
   * @param {Brand} brand - brand data to update existing brand.
   */
  @Patch('/:id')
  async updateBrand(
    @Param('id') id: string,
    @Body() brand: Brand
  ): Promise<void> {
    const originalBrand = await this.brandsService.update(id, brand);
    // trigger udpate in pmgmt if active state has changed
    if (brand.active != undefined && brand.active != originalBrand.active) {
      const activeBrandDTO = new ActiveBrandDTO(
        originalBrand.userId,
        originalBrand.brandId,
        brand.active
      );
      this.activeBrandsPublisher.queueActivateBrandSequence(activeBrandDTO);
    }
  }
}

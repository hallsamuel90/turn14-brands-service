import { Router } from 'express';
import Container from 'typedi';
import { Brand } from '../interfaces/iBrand';
import BrandService from '../services/brands';

const router = Router();

router.get('/:siteId?', async function (req, res) {
  const brandService = Container.get(BrandService);
  const siteId = req.query.siteId;
  res.send(await brandService.list(siteId));
});

router.post('/', async function (req, res) {
  const brandService = Container.get(BrandService);
  const brand: Brand = req.body;
  const createdBrand = await brandService.create(brand);
  res.send(createdBrand);
});

export default router;

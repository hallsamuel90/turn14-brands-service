import { Router } from 'express';
import Container from 'typedi';
import { Brand } from '../interfaces/iBrand';
import BrandService from '../services/brands';

const router = Router();

router.get('/:userId?', async function (req, res) {
  const brandService = Container.get(BrandService);
  const userId = req.query.userId;
  res.send(await brandService.list(userId));
});

router.post('/', async function (req, res) {
  const brandService = Container.get(BrandService);
  const brand: Brand = req.body;
  const createdBrand = await brandService.create(brand);
  res.send(createdBrand);
});

router.patch('/:id', async function (req, res) {
  const brandService = Container.get(BrandService);
  const id = req.params.id;
  const brand: Brand = req.body;
  const updatedBrand = await brandService.update(id, brand);
  res.send(updatedBrand);
});

export default router;

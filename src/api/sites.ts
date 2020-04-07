import { Router } from 'express';
import Container from 'typedi';
import { Site } from '../interfaces/iSite';
import SiteService from '../services/sites';
const router = Router();

router.post('/login', async function (req, res) {
  const siteService = Container.get(SiteService);
  const site: Site = req.body;
  res.send(await siteService.retrieve(site));
});

router.post('/register', async function (req, res) {
  const siteService = Container.get(SiteService);
  const site: Site = req.body;
  const createdSite = await siteService.create(site);
  res.send(createdSite);
});

export default router;

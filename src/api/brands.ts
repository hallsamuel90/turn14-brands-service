import { Router } from 'express';
const router = Router();

router.get('/brands', function (req, res) {
  res.send('Up and Running!');
});

export default router;

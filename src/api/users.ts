import { Router } from 'express';
import Container from 'typedi';
import { User } from '../interfaces/iUser';
import UserService from '../services/users';
const router = Router();

router.get('/', function (req, res) {
  res.send('Up and Running!');
});

router.post('/', function (req, res) {
  const userService = Container.get(UserService);
  const user: User = req.body;
  const createdUser = userService.create(user);
  res.send(createdUser);
});

export default router;

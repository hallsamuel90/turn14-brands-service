import { Router } from 'express';
import Container from 'typedi';
import { ApiRegistration } from '../interfaces/iApiRegistration';
import { User } from '../interfaces/iUser';
import RegistrationPublisher from '../publishers/registrationPublisher';
import UserService from '../services/users';
const router = Router();

router.post('/login', async function (req, res) {
  const userService = Container.get(UserService);
  const user: User = req.body;
  res.send(await userService.retrieve(user));
});

router.post('/register', async function (req, res) {
  const registraionPublisherService = Container.get(RegistrationPublisher);
  const userService = Container.get(UserService);
  const user: User = req.body.user;
  const createdUser = await userService.create(user);
  const api: ApiRegistration = req.body.api;
  api.userId = createdUser.id;
  registraionPublisherService.queueRegistrationSequence(api);
  res.send(createdUser);
});

export default router;

import 'reflect-metadata';
import { BrandsService } from '../services/brands';
import Container from 'typedi';
import { UsersService } from '../services/users';
import { ActiveBrandPublisher } from '../publishers/activeBrandPublisher';
import { RegistrationPublisher } from '../publishers/registrationPublisher';
import { BrandsSequence } from '../jobs/brandsSequence';

export default (): void => {
  Container.get(ActiveBrandPublisher);
  Container.get(RegistrationPublisher);

  Container.get(BrandsService);
  Container.get(UsersService);

  Container.get(BrandsSequence);
};

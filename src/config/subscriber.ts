import Container from 'typedi';
import { BrandsSubscriber } from '../subscribers/brandsSubscriber';

export default (): void => {
  const importSubscriberService = Container.get(BrandsSubscriber);
  importSubscriberService.subscribeBrandsSequence();
};

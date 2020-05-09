import { ApiRegistration } from '../interfaces/iApiRegistration';
import { User } from '../interfaces/iUser';

/**
 * Registration data transfer object comprised of a user and api
 * registration information.
 *
 * @author Sam Hall <hallsamuel90@gmail.com>
 */
export class RegistrationDTO {
  user: User;
  apiRegistration: ApiRegistration;
}

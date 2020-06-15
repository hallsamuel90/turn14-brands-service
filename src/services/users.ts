import { User } from '../interfaces/iUser';
import UserModel from '../models/user';
import { Service } from 'typedi';

/**
 * User Service
 */
@Service()
export class UsersService {
  /**
   *
   * @param {User} userDTO
   */
  async retrieve(userDTO: User): Promise<User> {
    let user;
    try {
      user = UserModel.findOne(userDTO);
    } catch (e) {
      console.error('🔥 error: ' + e);
    }
    return user;
  }

  /**
   *
   * @param {User} userDTO
   */
  async create(userDTO: User): Promise<User> {
    let user: User;
    try {
      user = new UserModel(userDTO);
      await user.save();
    } catch (e) {
      console.error('🔥 error: ' + e);
      await user.remove();
      throw e;
    }
    return user;
  }
}

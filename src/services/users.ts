import { User } from '../interfaces/iUser';
import UserModel from '../models/user';

/**
 * Users Service
 */
export default class UserService {
  //   list() {}

  /**
   *
   * @param {User} userDTO
   */
  async create(userDTO: User): Promise<User> {
    let user: User;
    try {
      user = new UserModel(userDTO);
      await user.save();
      return user;
    } catch (e) {
      console.error('🔥 error: ' + e);
      await user.remove();
      throw e;
    }
  }

  //   update() {}

  //   delete() {}
}

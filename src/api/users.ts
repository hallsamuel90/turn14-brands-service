import { Body, Controller, Post } from 'routing-controllers';
import { Inject } from 'typedi';
import { RegistrationDTO } from '../dtos/registrationDto';
import { ApiRegistration } from '../interfaces/iApiRegistration';
import { User } from '../interfaces/iUser';
import { RegistrationPublisher } from '../publishers/registrationPublisher';
import { UsersService } from '../services/users';

/**
 * UsersController.
 *
 * @author Sam Hall <hallsamuel90@gmail.com>
 */
@Controller('/users')
export class UsersController {
  @Inject()
  private readonly usersService: UsersService;

  @Inject()
  private readonly registraionPublisherService: RegistrationPublisher;
  /**
   * Registers a user and propogates the registration to pmgmt.
   *
   * @param {RegistrationDTO} registrationDto - dto containing user to be created and api credentials.
   * @returns {Promise<User>} created user.
   */
  @Post('/register')
  async register(@Body() registrationDto: RegistrationDTO): Promise<User> {
    const user: User = registrationDto.user;
    const createdUser = await this.usersService.create(user);
    const api: ApiRegistration = registrationDto.apiRegistration;
    api.userId = createdUser.id;
    this.registraionPublisherService.queueRegistrationSequence(api);
    return createdUser;
  }

  /**
   * Login a user with valid credentials.
   *
   * @param {User} user - user to be logged in.
   * @returns {Promise<User>} logged in user.
   */
  @Post('/login')
  async login(@Body() user: User): Promise<User> {
    return await this.usersService.retrieve(user);
  }
}

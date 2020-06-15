import { Controller, Get } from 'routing-controllers';

/**
 * Health Check Controller.
 *
 * @author Sam Hall <hallsamuel90@gmail.com>
 */
@Controller('/health')
export class HealthController {
  /**
   * Standard health check.
   *
   * @returns {string} 200 up and running if successful
   */
  @Get('/')
  gethealth(): string {
    return 'Up and Running!';
  }
}

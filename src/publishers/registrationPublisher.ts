import { connect } from 'amqplib';
import { ApiRegistration } from '../interfaces/iApiRegistration';

/**
 *
 */
export default class RegistrationPublisher {
  /**
   *
   * @param {ApiRegistration} apiRegistration
   */
  async queueRegistrationSequence(
    apiRegistration: ApiRegistration
  ): Promise<void> {
    const RECONNECT_INTERVAL = 5;
    try {
      const connection = await connect(process.env.RABBITMQ_URI);
      const channel = await connection.createChannel();
      await channel.assertQueue('registerApiQueue');
      channel.sendToQueue(
        'registerApiQueue',
        Buffer.from(JSON.stringify(apiRegistration))
      );
      console.info('✌️ Job queued!');
    } catch (e) {
      console.error('🔥 ' + e);
      console.log('💪 Retrying in ' + RECONNECT_INTERVAL + ' seconds...');
      setTimeout(() => {
        this.queueRegistrationSequence(apiRegistration);
      }, RECONNECT_INTERVAL * 1000);
    }
  }
}

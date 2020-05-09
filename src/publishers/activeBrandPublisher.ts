import { connect } from 'amqplib';
import { ActiveBrandDTO } from '../dtos/activeBrandDto';
import { Service } from 'typedi';

/**
 *
 */
@Service()
export class ActiveBrandPublisher {
  /**
   *
   * @param {ActiveBrandDTO} activeBrandDTO
   */
  async queueActivateBrandSequence(
    activeBrandDTO: ActiveBrandDTO
  ): Promise<void> {
    const RECONNECT_INTERVAL = 5;
    try {
      const connection = await connect(process.env.RABBITMQ_URI);
      const channel = await connection.createChannel();
      await channel.assertQueue('activateBrandsQueue');
      channel.sendToQueue(
        'activateBrandsQueue',
        Buffer.from(JSON.stringify(activeBrandDTO))
      );
      console.info('✌️ Active Brand Job queued!');
    } catch (e) {
      console.error('🔥 ' + e);
      console.log('💪 Retrying in ' + RECONNECT_INTERVAL + ' seconds...');
      setTimeout(() => {
        this.queueActivateBrandSequence(activeBrandDTO);
      }, RECONNECT_INTERVAL * 1000);
    }
  }
}

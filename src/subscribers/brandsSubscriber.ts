import amqp from 'amqplib';
import Container, { Service } from 'typedi';
import { BrandsSequence } from '../jobs/brandsSequence';

/**
 *
 */
@Service()
export class BrandsSubscriber {
  /**
   *
   */
  async subscribeBrandsSequence(): Promise<void> {
    const RECONNECT_INTERVAL = 5;
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URI);
      const channel = await connection.createChannel();
      await channel.assertQueue('brandsQueue');
      const brandsSequence = Container.get(BrandsSequence);
      channel.consume('brandsQueue', (message) => {
        brandsSequence.handler(JSON.parse(message.content.toString()));
        channel.ack(message);
      });
      console.info('⌚ Waiting for import brands job requests...');
    } catch (e) {
      console.error('🔥 ' + e);
      console.log('💪 Retrying in ' + RECONNECT_INTERVAL + ' seconds...');
      setTimeout(() => {
        this.subscribeBrandsSequence();
      }, RECONNECT_INTERVAL * 1000);
    }
  }
}

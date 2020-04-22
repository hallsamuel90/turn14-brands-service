import amqp from 'amqplib';
import Container from 'typedi';
import TemplateSequence from '../jobs/brandsSequence';

/**
 *
 */
export default class BrandsSubscriber {
  /**
   *
   */
  async subscribeBrandsSequence(): Promise<void> {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URI);
      const channel = await connection.createChannel();
      await channel.assertQueue('brandsQueue');
      const templateSequence = Container.get(TemplateSequence);
      channel.consume('brandsQueue', (message) => {
        templateSequence.handler(JSON.parse(message.content.toString()));
        channel.ack(message);
      });
      console.info('⌚ Waiting for import brands job requests...');
    } catch (e) {
      console.error('🔥 error: ' + e);
    }
  }
}

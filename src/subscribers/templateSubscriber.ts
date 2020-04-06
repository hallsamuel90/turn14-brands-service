import amqp from 'amqplib';
import Container from 'typedi';
import TemplateSequence from '../jobs/templateSequence';

/**
 *
 */
export default class TemplateSubscriber {
  /**
   *
   */
  async subscribeTemplateSequence(): Promise<void> {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URI);
      const channel = await connection.createChannel();
      await channel.assertQueue('importBrandsQueue');
      const templateSequence = Container.get(TemplateSequence);
      channel.consume('importBrandsQueue', (message) => {
        templateSequence.handler(JSON.parse(message.content.toString()));
        channel.ack(message);
      });
      console.info('⌚ Waiting for job requests...');
    } catch (e) {
      console.error('🔥 error: ' + e);
    }
  }
}

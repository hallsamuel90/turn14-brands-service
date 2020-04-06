import { connect } from 'amqplib';

/**
 *
 */
class TemplatePublisher {
  /**
   *
   *
   */
  async queueTemplateSequence(): Promise<void> {
    try {
      const connection = await connect(process.env.RABBITMQ_URI);
      const channel = await connection.createChannel();
      await channel.assertQueue('templateQueue');
      channel.sendToQueue(
        'templateQueue',
        Buffer.from(JSON.stringify({ msg: 'msgContent' }))
      );
      console.info('✌️ Job queued!');
    } catch (e) {
      console.error('🔥 error: ' + e);
    }
  }
}

export default TemplatePublisher;

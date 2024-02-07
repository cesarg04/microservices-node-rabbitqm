import amqp from 'amqplib';
import { ENVIRONMENT } from '../consts/env';

export async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect(ENVIRONMENT.amqp_url, (err, connection) => {
            if (err) {
                throw err
            }
            console.log('Rabbitqm running');
        });
        const channel = await connection.createChannel();
        return { connection, channel };
    } catch (error) {
        throw new Error(`Error al conectar a RabbitMQ: ${error.message}`);
    }
}

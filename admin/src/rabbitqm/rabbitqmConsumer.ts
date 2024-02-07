import { Message } from "amqplib";
import { ProductQueues as ProductQueues } from "../consts";
import { connectToRabbitMQ } from "./rabbitqmConnection";

export async function consumeMessage() {
    try {
        const { connection, channel } = await connectToRabbitMQ();
        await channel.assertQueue(ProductQueues.CONFIRM_CREATE);
        channel.consume(ProductQueues.CONFIRM_CREATE, async(message: Message) => {
            if (message !== null) {
                console.log(message.content);
                channel.ack(message);
            }
        });
    } catch (error) {
        throw new Error(`Error al consumir el mensaje: ${error.message}`);
    }
}

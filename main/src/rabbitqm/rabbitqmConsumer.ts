import { Message } from "amqplib";
import { ProductQueues as ProductQueues } from "../consts";
import { connectToRabbitMQ } from "./rabbitqmConnection";
import { IProduct } from "../interfaces/product.interface";
import { createProduct } from "../services/products.service";

export async function consumeMessage() {
    try {
        const { connection, channel } = await connectToRabbitMQ();
        await channel.assertQueue(ProductQueues.CREATE);
        console.log(`Esperando mensajes en la cola: hello`);

        channel.consume(ProductQueues.CREATE, async(message: Message) => {
            if (message !== null) {
                const msg: IProduct = JSON.parse(message.content.toString())
                channel.ack(message);
                await createProduct(msg)
            }
        });
    } catch (error) {
        throw new Error(`Error al consumir el mensaje: ${error.message}`);
    }
}

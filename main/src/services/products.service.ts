import { ProductQueues } from "../consts";
import { AppDataSource } from "../db/db";
import { Product } from "../entity/product.entity";
import { IProduct } from "../interfaces/product.interface";
import { connectToRabbitMQ } from "../rabbitqm";


const productsService = AppDataSource.getRepository(Product)

export const createProduct = async ( productPayload: IProduct ) => {
    const { channel} = await connectToRabbitMQ()
    const product = productsService.create(productPayload)
    const result = await productsService.save(product)
    if (result) {
        channel.sendToQueue(ProductQueues.CONFIRM_CREATE, Buffer.from('Create Successfully'))
    }
}
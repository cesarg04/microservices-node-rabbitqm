import { Request, Response } from 'express'
import { AppDataSource } from '../db/db'
import { Product } from '../entities/product.entity'
import { connectToRabbitMQ } from '../rabbitqm'
import { ProductQueues as ProductQueues } from '../consts'


const productRepository = AppDataSource.getRepository(Product)


export const getProduct = async(req: Request, res: Response) => {
    const products = await productRepository.find()
    return res.json(products)
}

export const createProducts = async(req: Request, res: Response) => {
    const product = productRepository.create(req.body)
    const result = await productRepository.save(product)
    const { channel } = await connectToRabbitMQ()
    channel.sendToQueue(ProductQueues.CREATE, Buffer.from(JSON.stringify(req.body)))
    return res.status(201).json(result)
}

export const getProductById = async (req:Request, res: Response) => {
    const { id } = req.params as { id: string }
    const product = await productRepository.findOneBy({ id: +id })
    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    res.json(product)
}

export const updateProduct = async(req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const product = await productRepository.findOneBy({id: +id})
    productRepository.merge(product, req.body)
    const result = await productRepository.save(product)
    return res.json(result)
}

export const deleteProduct = async(req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const product = await productRepository.delete({id: +id})
    return res.json(product)
}

export const likeProduct = async(req: Request, res: Response)  => {
    const { id } = req.params as { id: string }
    const product = await productRepository.findOneBy({id: +id})
    product.likes++
    const result = productRepository.save(product)
    return res.json(result)
}
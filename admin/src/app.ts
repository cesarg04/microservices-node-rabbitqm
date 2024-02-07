import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import { ENVIRONMENT } from './consts/env';
import { AppDataSource } from './db/db';
import productsRoutes from './routes/product.routes'
import { routes } from './consts/routes';
import * as amqp from 'amqplib/callback_api'
import { consumeMessage } from './rabbitqm/rabbitqmConsumer';


const app = express()
dotenv.config()

// Config db
AppDataSource.initialize().then(() => {
    console.log('DB runnig')
}).catch((error) => {1
    console.log(error);
})

app.use(cors({
    origin: '*'
}))
app.use(express.json())
consumeMessage()

// routes
app.use(routes.products, productsRoutes)

console.log(`App running on port ${ ENVIRONMENT.port || 9000 }`)
app.listen(ENVIRONMENT.port || 9000)
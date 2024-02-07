import { DataSource } from "typeorm";
import { ENVIRONMENT } from "../consts/env";
import { Product } from "../entities/product.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: ENVIRONMENT.db_host,
    port: +ENVIRONMENT.db_port,
    username: ENVIRONMENT.db_user,
    password: ENVIRONMENT.db_password,
    database: ENVIRONMENT.database,
    entities: [
        Product
    ],
    synchronize: true,
    logging: true,
    url: ENVIRONMENT.db_url
});
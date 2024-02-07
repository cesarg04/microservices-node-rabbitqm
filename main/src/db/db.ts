import { DataSource } from "typeorm";
import { ENVIRONMENT } from "../consts/env";
import { Product } from "../entity/product.entity";

export const AppDataSource = new DataSource({
    type: "mongodb",
    host: ENVIRONMENT.db_host,
    port: +ENVIRONMENT.db_port,
    username: ENVIRONMENT.db_user,
    password: ENVIRONMENT.db_password,
    entities: [
        Product
    ],
    synchronize: true,
    logging: false,
});
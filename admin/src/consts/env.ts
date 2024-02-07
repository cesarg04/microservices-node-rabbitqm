import dotenv from 'dotenv';

dotenv.config()

export interface IEnvironment {
    port: string,
    database: string;
    db_port: string;
    db_user: string,
    db_password: string,
    db_host: string;
    db_url: string;
    amqp_url: string;
}


export const ENVIRONMENT: IEnvironment = {
    database: process.env.DB_DATABASE,
    db_host: process.env.DB_HOST,
    db_password: process.env.DB_PASSWORD,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    amqp_url: process.env.AMQP_URL
}

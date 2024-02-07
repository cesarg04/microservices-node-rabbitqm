import dotenv from 'dotenv';

dotenv.config()

export interface IEnvironment {
    port: string,
    db_port: string;
    db_user: string,
    db_password: string,
    db_host: string;
    amqp_url: string;
}


export const ENVIRONMENT: IEnvironment = {
    db_host: process.env.DB_HOST,
    db_password: process.env.DB_PASSWORD,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    port: process.env.PORT,
    amqp_url: process.env.AMQP_URL
}

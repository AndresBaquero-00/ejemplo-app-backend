import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { APIRouter } from './classes';
import { HomeRouter, UsuarioRouter } from './routes';
import { Logger } from './util';

export class EjemploApplication {

    private static server: Express;
    private static port: number;
    private static host: string;
    private static logger: Logger;

    public static main(...args: string[]): void {
        dotenv.config();
        this.server = express();
        this.logger = Logger.getLogger();
        this.host = String(process.env['server.host']);
        this.port = Number(process.env['server.port']);

        this.config();
        this.addRouters();
        this.start();
    }

    private static config(): void {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(morgan('short', { stream: this.logger }));
    }

    private static start(): void {
        this.server.listen(this.port, this.host, () => {
            this.logger.write({
                message: `Servidor activo en: http://${this.host}:${this.port}`,
                type: 'info'
            });
        });
    }

    private static addRouters(): void {
        const homeRouter: APIRouter = new HomeRouter();
        this.server.use(homeRouter.getPath(), homeRouter.getRouter());

        const usuarioRouter: APIRouter = new UsuarioRouter();
        this.server.use(usuarioRouter.getPath(), usuarioRouter.getRouter());
    }

}
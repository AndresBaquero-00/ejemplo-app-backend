import express, { Express } from 'express';
import dotenv from 'dotenv';

import { APIRouter } from './classes';
import { HomeRouter } from './routes';

export class EjemploApplication {

    private static server: Express;
    private static port: number;
    private static host: string;

    public static main(...args: string[]): void {
        dotenv.config();
        this.server = express();
        this.host = String(process.env['server.host']);
        this.port = Number(process.env['server.port']);
        this.addRouters();
        this.start();
    }

    private static start(): void {
        this.server.listen(this.port, this.host, () => {
            console.log('Servidor activo en: http://%s:%d', this.host, this.port);
        });
    }

    private static addRouters(): void {
        const homeRouter: APIRouter = new HomeRouter();
        this.server.use(homeRouter.getPath(), homeRouter.getRouter());
    }

}
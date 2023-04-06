import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { APIRouter, APIRouterFactory, HomeRouter, UsuarioRouter } from './routes';
import { Logger } from './util';

export class EjemploApplication {

    private server: Express;
    private port: number;
    private host: string;
    private logger: Logger;
    private routerFactory: APIRouterFactory;

    public constructor() {
        dotenv.config();
        this.server = express();
        this.logger = Logger.getLogger();
        this.routerFactory = new APIRouterFactory();
        this.host = String(process.env['server.host']);
        this.port = Number(process.env['server.port']);

        this.config();
        this.addRouters();
        this.start();
    }

    public static main(...args: string[]): void {
        new EjemploApplication();
    }

    private config(): void {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(morgan('short', { stream: this.logger }));
    }

    private start(): void {
        this.server.listen(this.port, this.host, () => {
            this.logger.write({
                message: `Servidor activo en: http://${this.host}:${this.port}`,
                type: 'info'
            });
        });
    }

    private addRouters(): void {
        const homeRouter: APIRouter = this.routerFactory.obtenerRouter('home');
        this.server.use(homeRouter.getPath(), homeRouter.getRouter());

        const usuarioRouter: APIRouter = this.routerFactory.obtenerRouter('usuario');
        this.server.use(usuarioRouter.getPath(), usuarioRouter.getRouter());
    }

}
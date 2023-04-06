import { Router } from 'express';

export abstract class APIRouter {

    protected router: Router;
    protected path: string;

    public constructor(path: string) {
        this.router = Router();
        this.path = path;
    }

    public getRouter(): Router {
        return this.router;
    }

    public getPath(): string {
        return this.path;
    }

}
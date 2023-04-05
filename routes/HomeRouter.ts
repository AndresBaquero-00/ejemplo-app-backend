import { Request, Response } from 'express';

import { APIResponse, APIRouter } from '../classes';

export class HomeRouter extends APIRouter {
    
    public constructor() {
        super('');
        
        this.router.get('', (req: Request, res: Response) => this.home(req, res));
    }

    public home(req: Request, res: Response): Response {
        const response = new APIResponse();
        response.setSuccessOperation('Hello World!');

        return res.status(response.status).json(response);
    }

}
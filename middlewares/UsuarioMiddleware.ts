import { Request, Response, NextFunction } from 'express';

import { APIResponse } from '../model';

export class UsuarioMiddleware {
    
    public validarDatosRegistro(req: Request, res: Response, next: NextFunction): void {
        const response = new APIResponse();
        const { codigo, nombre, apellido, email } = req.body;

        if (!codigo || !nombre || !apellido || !email) {
            response.setBadRequest('Verifique los datos ingresados.')
            res.status(response.status).json(response);
            return;
        }

        if (isNaN(Number(codigo))) {
            response.setBadRequest('El código del usuario debe ser numérico.')
            res.status(response.status).json(response);
            return;
        }

        if (codigo <= 0) {
            response.setBadRequest('El código del usuario debe ser mayor a 0.')
            res.status(response.status).json(response);
            return;
        }

        if (!(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/).test(email)) {
            response.setBadRequest('El email no tiene un formato verdadero.')
            res.status(response.status).json(response);
            return;
        }

        next();
    }

}
import { Request, Response } from 'express';

import { APIResponse, Usuario } from '../model';
import { ConnectionError } from '../errors';
import { UsuarioMiddleware } from '../middlewares';
import { UsuarioService } from '../services';
import { Logger } from '../util';
import { APIRouter } from './APIRouter';

export class UsuarioRouter extends APIRouter {

    private usuarioMiddleware: UsuarioMiddleware;
    private usuarioService: UsuarioService;
    private logger: Logger;

    public constructor() {
        super('/user');
        this.usuarioMiddleware = new UsuarioMiddleware();
        this.usuarioService = new UsuarioService();
        this.logger = Logger.getLogger();

        this.router.post('/create', this.usuarioMiddleware.validarDatosRegistro, (req: Request, res: Response) => this.crearUsuario(req, res));
    }

    public async crearUsuario(req: Request, res: Response): Promise<Response> {
        const response = new APIResponse();

        const { codigo, nombre, apellido, email } = req.body;
        const usuario = new Usuario(codigo, nombre, apellido, email);

        try {
            this.logger.write({
                message: 'Iniciando operación de inserción de usuario.',
                type: 'info'
            });
            await this.usuarioService.crearUsuario(usuario);
            response.setSuccessOperation("Usuario insertado satisfactoriamente.");
        } catch (e) {
            if (e instanceof ConnectionError) {
                this.logger.write({
                    message: `${e.name} ${e.message}`,
                    type: 'error'
                });
                response.setFailService("Error al insertar el usuario. Intente de nuevo.");
            } else if (e instanceof Error) {
                this.logger.write({
                    message: `${e.name} ${e.message}`,
                    type: 'error'
                });
                response.setFailService("Error al insertar el usuario. Intente de nuevo.");
            }
        } finally {
            return res.status(response.status).json(response);
        }
    }

}
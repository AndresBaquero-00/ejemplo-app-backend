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

        this.router.put('/update/:codigo', this.usuarioMiddleware.validarDatosActualizacion, (req: Request, res: Response) => this.actualizarUsuario(req, res))
        this.router.get('/list', (req: Request, res: Response) => this.listarUsuarios(req, res));
        this.router.post('/create', this.usuarioMiddleware.validarDatosRegistro, (req: Request, res: Response) => this.crearUsuario(req, res));
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<Response> {
        const response = new APIResponse();

        const { codigo } = req.params;
        const { nombre, apellido, email } = req.body;
        const usuario = new Usuario(Number(codigo), nombre, apellido, email);

        try {
            this.logger.write({
                message: 'Iniciando operación de actualización de usuario.',
                type: 'info'
            });
            await this.usuarioService.actualizarUsuario(usuario);
            response.setSuccessOperation(undefined, 'Usuario modificado satisfactoriamente');
        } catch (e) {
            if (e instanceof ConnectionError) {
                this.logger.write({
                    message: `${e.name} ${e.message}`,
                    type: 'error'
                });
                response.setFailService('Error al actualizar el usuario. Intente de nuevo.');
            } else if (e instanceof Error) {
                this.logger.write({
                    message: `${e.name} ${e.message}`,
                    type: 'error'
                });
                response.setFailService('Error al actualizar el usuario. Intente de nuevo.');
            }
        } finally {
            return res.status(response.status).json(response);
        }
    }

    public async listarUsuarios(req: Request, res: Response): Promise<Response> {
        const response = new APIResponse();

        try {
            this.logger.write({
                message: 'Iniciando operación de lista de usuarios.',
                type: 'info'
            });
            const usuarios = await this.usuarioService.listarUsuarios();
            response.setSuccessOperation(usuarios, 'Usuarios consultados satisfactoriamente');
        } catch (e) {
            if (e instanceof ConnectionError) {
                this.logger.write({
                    message: `${e.name} ${e.message}`,
                    type: 'error'
                });
                response.setFailService('Error al consultar los usuarios. Intente de nuevo.');
            } else if (e instanceof Error) {
                this.logger.write({
                    message: `${e.name} ${e.message}`,
                    type: 'error'
                });
                response.setFailService('Error al consultar los usuarios. Intente de nuevo.');
            }
        } finally {
            return res.status(response.status).json(response);
        }
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
            response.setSuccessOperation('Usuario insertado satisfactoriamente.');
        } catch (e) {
            if (e instanceof ConnectionError) {
                this.logger.write({
                    message: `${e.name} ${e.message}`,
                    type: 'error'
                });
                response.setFailService('Error al insertar el usuario. Intente de nuevo.');
            } else if (e instanceof Error) {
                this.logger.write({
                    message: `${e.name} ${e.message}`,
                    type: 'error'
                });
                response.setFailService('Error al insertar el usuario. Intente de nuevo.');
            }
        } finally {
            return res.status(response.status).json(response);
        }
    }

}
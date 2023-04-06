import { APIRouter } from './APIRouter';
import { HomeRouter } from './HomeRouter';
import { UsuarioRouter } from './UsuarioRouter';

export class APIRouterFactory {
    
    public obtenerRouter(router: string): APIRouter {
        switch (router) {
            case 'home':
                return new HomeRouter();
            case 'usuario':
                return new UsuarioRouter();
            default:
                return {} as APIRouter;
        }
    }

}
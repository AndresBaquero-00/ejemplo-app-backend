import { APIConnection, Usuario } from '../classes';
import { DatabaseOperations, Logger } from '../util';

export class UsuarioService {

    private connection: APIConnection;
    private logger: Logger;

    public constructor() {
        this.connection = new APIConnection();
        this.logger = Logger.getLogger();
    }

    public async crearUsuario(usuario: Usuario): Promise<void> {
        this.logger.write({
            message: `Insertando usuario ${usuario.codigo} en la BD.`,
            type: 'info'
        });
        const cursor = this.connection.getConnection();
        const res = await cursor.execute(DatabaseOperations.INSERTAR_USUARIO, [usuario.codigo, usuario.nombre, usuario.apellido, usuario.email]);
        await cursor.commit();
        this.logger.write({
            message: `Usuario insertado. Respuesta de la BD: ${res}`,
            type: 'info'
        });
    }

}
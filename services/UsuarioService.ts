import { APIConnection } from '../connection';
import { Usuario } from '../model';
import { DatabaseOperations, Logger } from '../util';

export class UsuarioService {

    private connection: APIConnection;
    private logger: Logger;

    public constructor() {
        this.connection = new APIConnection();
        this.logger = Logger.getLogger();
    }

    public async actualizarUsuario(usuario: Usuario): Promise<void> {
        this.logger.write({
            message: `Actualizando usuario con código ${usuario.codigo}.`,
            type: 'info'
        });
        const cursor = this.connection.getConnection();
        const res = await cursor.execute(DatabaseOperations.ACTUALIZAR_USUARIO, [usuario.nombre, usuario.apellido, usuario.email, usuario.codigo]);
        await cursor.commit();
        this.logger.write({
            message: `Usuario actualizado. Respuesta de la BD: ${JSON.stringify(res)}`,
            type: 'info'
        });
    }

    public async listarUsuarios(): Promise<Usuario[]> {
        this.logger.write({
            message: `Consultando usuarios.`,
            type: 'info'
        });
        const cursor = this.connection.getConnection();
        const res = await cursor.execute<any[]>(DatabaseOperations.CONSULTAR_USUARIOS);
        const usuarios: Usuario[] = res.rows?.map(row => new Usuario(row.at(0), row.at(1), row.at(2), row.at(3))) as Usuario[];
        this.logger.write({
            message: `Usuarios consultados satisfactoriamente.`,
            type: 'info'
        });
        return usuarios;
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
            message: `Usuario insertado. Respuesta de la BD: ${JSON.stringify(res)}`,
            type: 'info'
        });
    }

}
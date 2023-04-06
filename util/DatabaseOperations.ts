
export class DatabaseOperations {
    public static readonly INSERTAR_USUARIO: string = 'insert into usuario values (:c, :n, :a, :e)';
    public static readonly CONSULTAR_USUARIOS: string = 'select * from usuario';
}
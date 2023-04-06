
export class DatabaseOperations {
    public static readonly INSERTAR_USUARIO: string = 'insert into usuario values (:c, :n, :a, :e)';
    public static readonly CONSULTAR_USUARIOS: string = 'select * from usuario';
    public static readonly ACTUALIZAR_USUARIO: string = 'update usuario set nombre = :n, apellido = :a, email = :e where codigo = :c';
}
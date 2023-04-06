import oracledb, { Connection, ConnectionAttributes } from 'oracledb';
import dotenv from 'dotenv';

export class APIConnection {

    private config: ConnectionAttributes;
    private connection: Connection | undefined;

    public constructor(username?: string, password?: string) {
        dotenv.config();
        this.config = {
            user: username ? username:process.env['db.user'],
            password: password ? password:process.env['db.password'],
            connectString: `${process.env['db.host']}:${process.env['db.port']}/${process.env['db.database']}`,
        }
    }

    public start(): void {
        oracledb.getConnection(this.config)
            .then(connection => {
                this.connection = connection;
                console.log('Base de datos conectada en: http://%s', this.config.connectString);
            }).catch(error => {
                console.log('Error al conectar la base de datos.\n', error);
                process.exit(1);
            })
    }
}
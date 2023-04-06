import oracledb, { Connection, ConnectionAttributes } from 'oracledb';
import dotenv from 'dotenv';
import { ConnectionError } from '../errors';

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

        this.start();
    }

    private start(): void {
        oracledb.getConnection(this.config)
            .then(connection => {
                this.connection = connection;
                console.log('Base de datos conectada en: http://%s con usuario %s', this.config.connectString, this.config.user);
            }).catch(error => {
                console.log('Error al conectar la base de datos.\n', error);
                process.exit(1);
            });
    }

    public getConnection(): Connection {
        if (this.connection)
            return this.connection;
        
        throw new ConnectionError('La conexión con la BD no ha sido establecida.');
    }
}
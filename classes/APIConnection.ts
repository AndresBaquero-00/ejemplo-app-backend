import oracledb, { Connection, ConnectionAttributes } from 'oracledb';
import dotenv from 'dotenv';
import { ConnectionError } from '../errors';
import { Logger } from '../util';

export class APIConnection {

    private config: ConnectionAttributes;
    private connection: Connection | undefined;
    private logger: Logger;

    public constructor(username?: string, password?: string) {
        dotenv.config();
        this.logger = Logger.getLogger();
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
                this.logger.write({
                    message: `Base de datos conectada en: http://${this.config.connectString} con usuario ${this.config.user}`,
                    type: 'info'
                });
            }).catch(error => {
                this.logger.write({
                    message: `Error al conectar la base de datos. ${error}`,
                    type: 'error'
                });
            });
    }

    public getConnection(): Connection {
        if (this.connection)
            return this.connection;
        
        throw new ConnectionError('La conexión con la BD no ha sido establecida.');
    }
}
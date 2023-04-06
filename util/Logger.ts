import { Writable } from 'stream';
import { Logger as LogStream, createLogger as createLogStream, format, transports } from 'winston';

export class Logger extends Writable {

    private static logger: Logger = new Logger();
    private logStream: LogStream;

    private constructor() {
        super();
        this.logStream = createLogStream({
            transports: [new transports.Console()],
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss.SSS A',
                }),
                format.align(),
                format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`),
                format.colorize({ all: true })
            )
        });
    }

    public write(chunk: any): boolean {
        if (typeof chunk === 'string') {
            this.logStream.warn(chunk);
            return true;
        }

        switch (chunk['type']) {
            case 'info':
                this.logStream.info(chunk['message']);
                return true;
            case 'error':
                this.logStream.error(chunk['message']);
                return true;
            case 'warn':
                this.logStream.warn(chunk['message']);
                return true;
            default:
                return false;
        }
    }

    public static getLogger(): Logger {
        return this.logger;
    }

}
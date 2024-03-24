import winston, { format } from 'winston';

const { timestamp, metadata, combine, splat, json } = format;

const myFormat = format.printf(({ timestamp, level, message, metadata }) => {
    if (metadata && metadata instanceof Error) {
        return `[${timestamp}] [${level}] : ${message} ${metadata.stack}`;
    }
    if (typeof message === "object" && message !== null) {
        return `[${timestamp}] [${level}] : ${JSON.stringify(message, null, 2)}`;
    }
    return `[${timestamp}] [${level}] : ${message}`;
});

class Logger {

    private logger: winston.Logger;

    constructor() {
        this.logger = this.initializeLogger();
    }

    private initializeLogger() {

        const logger = winston.createLogger({
            transports: Logger._getTransports(),
        });

        return logger;
    }

    private static _getTransports() {
        const transports: Array<any> = [
            new winston.transports.Console({
                format: combine(
                    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    splat(),
                    json(),
                    format.colorize({ all: false }),
                    myFormat
                ),

            }),
        ];

        return transports;
    }

    public info(message: any) {
        this.logger.info(message);
    }

    public error(message: any) {
        this.logger.error(message);
    }
}

export default Logger;
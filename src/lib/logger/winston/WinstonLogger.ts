import { Dateparser } from './../../date/Dateparser';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const LOGGER_LEVEL_INFO = 'info'
export const LOGGER_LEVEL_ERROR = 'error'
export const LOGGER_LEVEL_WARNING = 'warning'
export const LOGGER_LEVEL_DEBUG = 'debug'

// File Rotate Transport
const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: "logs/log-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
});

/**
 * Class WinstonLogger
 */
export class WinstonLogger {
    /**
     * 
     * @param input 
     */
    static winston(level: string = LOGGER_LEVEL_DEBUG): winston.Logger {
        return winston.createLogger({
            level: LOGGER_LEVEL_DEBUG,
            format: winston.format.json(),
            transports: [
                fileRotateTransport,
                new winston.transports.Console(), 
                new winston.transports.File({
                    filename: `logs/log-${Dateparser.formatDate(new Date, 'Y-m-d')}.log`,
                }),
          ],
        })
    }

    /**
     * 
     * @param level
     * @param error 
     */
    static winstonLog(level: string = LOGGER_LEVEL_DEBUG, error: any = {}) {
        // Init
        const {name, error_message, status} = error ?? {};
        
        // Check is logging into file
        if(process.env.LOG_FILE === 'true') {
            //Store log
            WinstonLogger.winston(level).log(level, JSON.stringify({
                timestamp: Dateparser.formatDate(new Date, 'Y-m-d H:i:s'),
                level: level,
                message: error_message || name || 'Unknown error',
                status: status
            }), error ?? {})
        }
    }
}
import {ConsoleLogger, Injectable} from '@nestjs/common';
import * as fs from 'fs';
import {promises as fsPromises} from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
    log(message: any, context?: string) {
        const entry = `${context}\t${message}`;
        super.log(message, context);
    }

    error(message: any, trace: string) {
        const entry = `${trace}\t${message}`;
        this.logToFile(entry);
        super.error(`LoggerService: ${message}`, trace);
    }

    warn(message: string) {
        super.warn(`LoggerService: ${message}`);
    }

    async logToFile(entry) {
        const formattedEntry = `${new Date().toISOString()}\t${entry}\n`;
        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
            }
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'app.log'), formattedEntry);
        } catch (error) {
            console.error(`Error writing to file: ${error.message}`);
        }
    }
}

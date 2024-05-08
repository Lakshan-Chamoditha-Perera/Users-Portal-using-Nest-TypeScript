import {Catch, ArgumentsHost, HttpStatus, HttpException} from "@nestjs/common";
import {BaseExceptionFilter} from "@nestjs/core";
import {Request, Response} from "express";
import {MyLoggerService} from "./my-logger/my-logger.service";
import {PrismaClientValidationError} from "@prisma/client/runtime/library";

type ExceptionResponse = {
    statusCode: number;
    timestamp: string;
    path: string;
    response: string | object;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof HttpException ? exception.getResponse() : 'Internal Server Error';

        const errorResponseObj: ExceptionResponse = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: message,
        };

        if (exception instanceof PrismaClientValidationError) {
            errorResponseObj.statusCode = 422;
            errorResponseObj.response = exception.message.replaceAll(/\n/g, '');
        } else if (exception instanceof HttpException) {
            errorResponseObj.statusCode = exception.getStatus();
            errorResponseObj.response = exception.getResponse()
        } else {
            errorResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            errorResponseObj.response = 'Internal Server Error';
        }

        response
            .status(errorResponseObj.statusCode)
            .json(errorResponseObj);

        this.logger.error(`Error: ${JSON.stringify(errorResponseObj)}`, AllExceptionsFilter.name);

        super.catch(exception, host);
    }
}
import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {AllExceptionsFilter} from "./all-exceptions.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule,
        // {bufferLogs: true} // This will buffer the logs and print them to the console when the app is ready
    );
    const {httpAdapter} = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    app.setGlobalPrefix('api');
    app.enableCors();
    // app.useLogger(app.get('MyLoggerService')); // This will use the MyLoggerService for logging in the app
    await app.listen(3000);
}

bootstrap();

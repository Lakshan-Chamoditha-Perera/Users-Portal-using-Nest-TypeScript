import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {DatabaseModule} from './database/database.module';
import {EmployeesModule} from "./employees/employees.module";
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler"; // npm i @nestjs/throttler
import {APP_GUARD} from "@nestjs/core";
import { MyLoggerModule } from './my-logger/my-logger.module';


@Module({
    imports: [
        UsersModule,
        DatabaseModule,
        EmployeesModule,
        MyLoggerModule,
        ThrottlerModule.forRoot([{
            name: 'short',
            ttl: 1000, // 1 second
            limit: 5, // limit each IP to 5 requests per ttl
        }, {
            name: 'long',
            ttl: 1000, // 1 second
            limit: 5, // limit each IP to 5 requests per ttl
        }
        ])
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_GUARD,
        useClass: ThrottlerGuard,
    }],
})
export class AppModule {
}

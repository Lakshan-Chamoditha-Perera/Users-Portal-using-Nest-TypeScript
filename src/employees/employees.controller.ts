import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Ip} from '@nestjs/common';
import {EmployeesService} from './employees.service';
import {Prisma} from '@prisma/client';
import {SkipThrottle, Throttle} from "@nestjs/throttler";
import {MyLoggerService} from "../my-logger/my-logger.service";

// @SkipThrottle() // Skip Throttle for this controller
@Controller('employees')
export class EmployeesController {
    private readonly logger = new MyLoggerService(EmployeesController.name);

    constructor(private readonly employeesService: EmployeesService) {
    }

    @Post()
    create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
        return this.employeesService.create(createEmployeeDto);
    }

    // @SkipThrottle({default: false}) // disable Throttle for this route
    @Get()
    findAll(@Ip() ip: string, @Query('role') role?: 'INTERN' | 'ENGINEER' | "ADMIN") {
        this.logger.log(`Request from IP: ${ip} for role: ${role}`);
        return this.employeesService.findAll(role);
    }

    // @Throttle({short: {ttl: 300, limit: 1}}) // override the default throttle settings
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.employeesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
        return this.employeesService.update(+id, updateEmployeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.employeesService.remove(+id);
    }
}

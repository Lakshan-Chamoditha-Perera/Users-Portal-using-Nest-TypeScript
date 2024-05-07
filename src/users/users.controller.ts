import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor() {}

    @Get()
    findAllByQuery(@Query('role' )role?:'INTERNS' | 'EMPLOYEES'){
        return 'This action returns all users';
    }

    @Get()
    findAll(): string {
        return 'This action returns all users';
    }

    @Get("interns")
    findInterns(): string {
        return 'This action returns all interns';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} user`;
    }

    @Post()
    create(@Body() user:{}): string {
        return 'This action adds a new user : ' + JSON.stringify(user);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() user:{}): string{
        return `This action updates a ${id} user : ` + JSON.stringify(user);
    }

    @Delete(':id')
    remove(@Param('id') id: string): string {
        return `This action removes a #${id} user`;
    }

}

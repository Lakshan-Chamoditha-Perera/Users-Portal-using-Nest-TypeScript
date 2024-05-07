import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor() {}

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

}

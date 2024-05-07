import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    findAllByQuery(@Query('role') role?: 'INTERNS' | 'EMPLOYEES') {
        return 'This action returns all users';
    }

    @Get()
    findAll() {
        return this.userService.getUsers();
    }

    @Get("interns")
    findInterns() {
        return this.userService.getUsers('INTERNS');
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(Number(id));
    }

    @Post()
    create(@Body() user: {
        name: string,
        email: string,
        role: 'INTERN' | 'ENGINEER' | 'ADMIN'
    }) {
        return this.userService.createUser(user);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() user: {}) {
        return this.userService.updateUser(Number(id), user);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.deleteUser(Number(id))
            ? 'User deleted successfully'
            : 'User not found';
    }

}

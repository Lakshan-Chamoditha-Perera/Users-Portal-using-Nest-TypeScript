import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    findAllByQuery(@Query('role') role?: 'ADMIN' | 'USER' | 'INTERNS') {
        return this.userService.getUsers(role);
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
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) createUser: CreateUserDto) {
        return this.userService.createUser(createUser);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, 
    @Body(ValidationPipe) updateUser: UpdateUserDto) {
        return this.userService.updateUser(id, updateUser);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id)
            ? 'User deleted successfully'
            : 'User not found';
    }

}

import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [{
        id: 1,
        name: 'John Doe',
        email: 'doe@gmail.com',
        role: 'ADMIN',
    }, {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@icloud.com',
        role: 'USER',
    }];

    getUsers(role?: 'ADMIN' | 'USER' | 'INTERNS') {
        if (role) {
            const rolesArray = this.users.filter((user) => user.role === role);
            if (rolesArray.length === 0)
                throw new NotFoundException(`No user with role ${role} found`);
            
            return rolesArray;
        }
        return this.users.sort((a, b) => a.id - b.id);
    }


    findOne(id: number) {
        let user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    createUser(user: CreateUserDto) {
        const usersByHighestId = this.users.sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user,
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map((user) => {
            if (user.id === id) {
                return {
                    ...user, ...updatedUser,
                }
            }
            return user;
        });
        return this.findOne(id);
    }

    deleteUser(id: number) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex >= 0) {
            this.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }
}

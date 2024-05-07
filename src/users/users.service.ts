import { Injectable } from '@nestjs/common';
import e from 'express';

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
        return role 
            ?   this.users.filter((user) => user.role === role) 
            :   this.users.sort((a, b) => a.id - b.id);
    }


    findOne(id: number) {
        return this.users.find((user) => user.id === id);
    }

    createUser(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        const usersByHighestId = this.users.sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user,
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        this.users = this.users.map((user) => {
            if (user.id === id) {
                return {
                    ...user,
                    ...updatedUser,
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

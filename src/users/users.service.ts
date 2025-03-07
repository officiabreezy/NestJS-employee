import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { 
            "id": 1, 
            "name": "John Doe", 
            "email": "adeola@gmail.com", 
            "role": "INTERN",
        },
        { 
            "id": 2, 
            "name": "JaneL Doe",
            "email": "jane@gmail.com",
            "role": "ADMIN",
        },
        { 
            "id": 3,
            "name": "Alice Doe",
            "email": "alice@gmail.com",
            "role": "ENGINEER",	
        },
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const roleArray = this.users.filter(user => user.role === role);
            if (roleArray.length === 0) 
            throw new NotFoundException(`User roole ${role} not found`);
        return roleArray
    }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return user;
    }

    create(user: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser };
            }
            return user;
        });
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}

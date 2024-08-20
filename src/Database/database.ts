import { user } from '../types';
import userDBMock from './users.json';
import fs from 'fs';

const filePath = './src/Database';

export class DatabaseConnection {
    fileData;

    private updateFileData() {
        this.fileData = JSON.parse(fs.readFileSync(`${filePath}/users.json`, 'utf-8'));
    }

    find(id: string) {
        this.updateFileData()
        return this.fileData.find((usr) => usr.id === id)
    }

    delete(id: string) {
        this.updateFileData()
        const users = this.fileData;

        const filteredUsers = users.filter((usr) => usr.id !== id);

        fs.writeFileSync(`${filePath}/users.json`, JSON.stringify(filteredUsers));
    }

    update(updatedUserData: user) {
        this.updateFileData()
        let originalUserData = {};
        const otherUsers = [];

        this.fileData.forEach((usr) => {
            if(usr.id === updatedUserData.id) {
                originalUserData = usr;
            } else {
                otherUsers.push(usr);
            } 
        });

        const updatedUser = {
            ...originalUserData,
            ...updatedUserData
        };

        otherUsers.push(updatedUser);

        fs.writeFileSync(`${filePath}/users.json`, JSON.stringify(otherUsers));

        return updatedUser;
    }

    create(newUser: user) {
        this.updateFileData()

        const existingUser = this.fileData.find((usr) => usr.id === newUser.id);

        if(existingUser) {
            return 'User already exists in DB';
        }

        const errors = [];

        newUser.friends.forEach((friendId) => {
            const existingFriend = this.fileData.find((usr) => usr.id === friendId);
            if(!existingFriend) {
                errors.push(`Friend with ID ${friendId} doesn't exist`)
            }
        })

        if(errors.length > 0) {
            return errors.join(', ')
        }

        this.fileData.push(newUser);

        fs.writeFileSync(`${filePath}/users.json`, JSON.stringify(this.fileData));
        
        return newUser;
    }
}
import { makeAutoObservable } from 'mobx';
import { sendGetRequest } from '../transport/request';

export interface User {
    firstName: string;
    middleName?: string;
    lastName: string;
    id: number;
    showNotification: boolean;
    group: string;
}

export interface IUserStore {
    users: User[];
    getUsers: () => Promise<void>;
}

export class UserStore implements IUserStore {
    public users = [];

    constructor() {
        makeAutoObservable(this);
        this.getUsers();
    }

    public getUsers = async () => {
        const users = await sendGetRequest('users');
        this.users = this.sortUsers(users);
    }

    public addUser = async (user: User) => {
        this.users.push(user); // TODO
    }

    private sortUsers(users: User[]) {
        return users.sort((user1, user2) => {
            let result = false;
            if (user1.firstName === user2.firstName) {
                if (user1.middleName![0] === user2.middleName![0]) {
                    result = user1.lastName < user2.lastName;
                }
                result = user1.middleName[0] < user2.middleName[0];
            }
            result = user1.firstName < user2.firstName
            return result ? 1 : 0;
        });
    }
}
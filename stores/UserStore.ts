import { makeAutoObservable } from 'mobx';
import { sendGetRequest, sendPostRequest } from '../transport/request';

export interface User {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    id: number;
    showNotification: boolean;
    group: string;
}

export interface IUserStore {
    users: User[];
    filteredUsers: User[];
    applyFilter: (applyFilter: string) => void;
}

export class UserStore implements IUserStore {
    public users = [];
    public filteredUsers = [];
    public selectedUser: User;
    private filter: string;

    constructor() {
        makeAutoObservable(this);
        this.getUsers().then(() => {
            this.selectedUser = this.users[0];
        });
    }

    public selectUser = (userId: number) => {
        this.selectedUser = this.users.find(({id}) => id === userId);
    }

    public getUsers = async () => {
        this.users = await sendGetRequest('users');
        this.sortUsers();
        this.filteredUsers = this.users;
    }

    public addUser = async (newUser: User) => {
        const user = await sendPostRequest('user', newUser);
        this.users.push(user);
        this.sortUsers();
        this.applyFilter(this.filter);
    }

    public editUser = async (user: User) => {
        const userIndex = this.users.findIndex(({ id }) => user.id === id);
        this.users[userIndex] = user;
        this.sortUsers();
        this.applyFilter(this.filter);
        this.selectedUser = user;
    }

    public deleteUser = async () => {
        this.users = this.users.filter((user) => user.id !== this.selectedUser.id);
        this.applyFilter(this.filter);
        this.selectedUser = null;
    }

    private filterTimer;
    public applyFilter = (filter: string) => {
        clearTimeout(this.filterTimer);
        this.filter = filter;
        if (!filter) {
            this.filteredUsers = this.users;
            return;
        }
        const filterTimeThrottle = 350;
        this.filterTimer = setTimeout(() => {
            this.filteredUsers = this.users.filter(({ firstName, middleName, lastName }) => {
                const filterParts = filter.toLowerCase().split(' ');
                let usedFirstName = false;
                let usedmiddleName = false;
                let usedLastName = false;
                let include = true;
                for (let part of filterParts) {
                    if (!usedFirstName && firstName.toLowerCase().includes(part)) {
                        usedFirstName = true;
                    } else if (!usedmiddleName && middleName.toLowerCase().includes(part)) {
                        usedmiddleName = true;
                    } else if (!usedLastName && lastName.toLowerCase().includes(part)) {
                        usedLastName = true;
                    } else {
                        include = false;
                    }
                }
                return include;
            });
        }, filterTimeThrottle)
    }

    private sortUsers() {
        this.users = this.users.sort((user1, user2) => {
            let result = false;
            if (user1.firstName.toLowerCase() === user2.firstName.toLowerCase()) {
                if (user1.middleName![0].toLowerCase() === user2.middleName![0].toLowerCase()) {
                    result = user1.lastName.toLowerCase() < user2.lastName.toLowerCase();
                }
                result = user1.middleName[0].toLowerCase() < user2.middleName[0].toLowerCase();
            }
            result = user1.firstName.toLowerCase() < user2.firstName.toLowerCase()
            return result ? -1 : 1;
        });
    }
}
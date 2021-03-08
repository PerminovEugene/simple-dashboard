import { users } from './mocks/users';

const urlToDataMocksMap = {
    'users': users
}

const wait = (time: number = 0) => new Promise((resolve) => {
    setTimeout(resolve, time);
})

export const sendGetRequest = async (url: string) => {
    await wait(); // Imitate request to the server
    return urlToDataMocksMap[url];
}

let newId = 1000; // Dummy mock for no backend implementation
export const sendPostRequest = async (url: string, data: any) => {
    await wait(); // Imitate request to the server
    data.id = newId++;
    return data;
}
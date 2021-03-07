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
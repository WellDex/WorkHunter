import {instance} from './instance';

export const authAPI = {
  login: (login: string, password: string) => {
    return instance
      .post('login', {login, password})
      .then((res) => console.log(res));
  },
  register: (
    login: string,
    password: string,
    name: string,
    lastName: string,
    birthDay: Date
  ) => {
    return instance
      .post('register', {login, password, name, lastName, birthDay})
      .then((res) => console.log(res));
  },
};

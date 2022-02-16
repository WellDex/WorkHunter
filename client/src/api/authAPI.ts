import {instance} from './instance';

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  birthDay: any;
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export const authAPI = {
  login: (data: ILoginForm) => {
    return instance.post('auth/login', data).then((res) => {
      console.log(res);
      //@ts-ignore
      localStorage.setItem('token', res.token);
    });
  },
  register: (data: IRegisterForm) => {
    return instance.post('auth/register', data).then((res) => {
      console.log(res);
      //@ts-ignore
      localStorage.setItem('token', res.token);
    });
  },
};

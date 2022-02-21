import {instance} from './instance';

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  birthDate: any;
  login: string;
  password: string;
}

export interface ILoginForm {
  login: string;
  password: string;
}

export const authAPI = {
  login: (data: ILoginForm) => {
    return instance.post('auth/login', data).then((res) => {
      //@ts-ignore
      localStorage.setItem('token', res.token);
      return res.data;
    });
  },
  register: (data: IRegisterForm) => {
    return instance.post('auth/register', data).then((res) => {
      return res.data;
    });
  },
};

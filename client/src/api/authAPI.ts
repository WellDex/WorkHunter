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
      localStorage.setItem('token', res.data.token);
      return res.data;
    });
  },
  register: (data: IRegisterForm) => {
    return instance.post('auth/register', data).then((res) => {
      return res.data;
    });
  },
  logout: () => {
    return instance.post('auth/logout', {}).then((res) => {
      localStorage.clear();
      return res.data;
    });
  },
  check: () => {
    return instance.post('auth/auth', {}).then((res) => {
      localStorage.setItem('token', res.data.token);
      return res.data;
    });
  },
};

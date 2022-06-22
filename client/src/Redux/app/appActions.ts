import {INotification} from './appReducer';

export const CHANGE_IS_AUTH = 'CHANGE_IS_AUTH';
export const SET_NOTIFICATON = 'SET_NOTIFICATON';
export const SET_USER_ID = 'SET_USER_ID';
export const LOGOUT = 'LOGOUT';
export const SET_USER_FIRSTNAME = 'SET_USER_FIRSTNAME';
export const SET_USER_AVATAR = 'SET_USER_AVATAR';

export const changeIsAuth = (data: boolean) => ({
  type: CHANGE_IS_AUTH,
  payload: {
    isAuth: data,
  },
});

export const setNotification = (data: INotification) => ({
  type: SET_NOTIFICATON,
  payload: data,
});

export const setUserId = (id: string) => ({
  type: SET_USER_ID,
  payload: id,
});

export const setFirstName = (firstName: string) => ({
  type: SET_USER_FIRSTNAME,
  payload: firstName,
});

export const setAvatar = (img: string) => ({
  type: SET_USER_AVATAR,
  payload: img,
});

export const logout = () => ({
  type: LOGOUT,
  payload: {
    isAuth: false,
    notification: {
      message: null,
      type: null,
    },
    userId: null,
  },
});

import {INotification} from './appReducer';

export const CHANGE_IS_AUTH = 'CHANGE_IS_AUTH';
export const SET_NOTIFICATON = 'SET_NOTIFICATON';

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

import {
  CHANGE_IS_AUTH,
  LOGOUT,
  SET_IS_ADMIN,
  SET_IS_LOADING,
  SET_NOTIFICATON,
  SET_USER_AVATAR,
  SET_USER_FIRSTNAME,
  SET_USER_ID,
} from './appActions';
import {AlertColor} from '@mui/material';

export interface INotification {
  message: string | null;
  type: AlertColor | null;
}

export interface IStateApp {
  isAuth: boolean;
  isAdmin: boolean;
  notification: INotification;
  userId: string | null;
  firstName: string | null;
  avatar: string | null;
  loading: boolean;
}

const init: IStateApp = {
  isAuth: false,
  isAdmin: false,
  notification: {
    message: null,
    type: null,
  },
  userId: null,
  firstName: null,
  avatar: null,
  loading: false,
};

const appReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case CHANGE_IS_AUTH:
      return {...state, isAuth: payload};
    case SET_NOTIFICATON:
      return {...state, notification: payload};
    case SET_USER_ID:
      return {...state, userId: payload};
    case SET_USER_FIRSTNAME:
      return {...state, firstName: payload};
    case SET_USER_AVATAR:
      return {...state, avatar: payload};
    case SET_IS_ADMIN:
      return {...state, isAdmin: payload};
    case SET_IS_LOADING:
      return {...state, loading: payload};
    case LOGOUT:
      return {...state, ...payload};
    default:
      return state;
  }
};

export default appReducer;

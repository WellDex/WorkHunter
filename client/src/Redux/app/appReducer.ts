import {
  CHANGE_IS_AUTH,
  LOGOUT,
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
  notification: INotification;
  userId: string | null;
  firstName: string | null;
  avatar: string | null;
}

const init: IStateApp = {
  isAuth: false,
  notification: {
    message: null,
    type: null,
  },
  userId: null,
  firstName: null,
  avatar: null,
};

const appReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case CHANGE_IS_AUTH:
      return {...state, isAuth: payload.isAuth};
    case SET_NOTIFICATON:
      return {...state, notification: payload};
    case SET_USER_ID:
      return {...state, userId: payload};
    case SET_USER_FIRSTNAME:
      return {...state, firstName: payload};
    case SET_USER_AVATAR:
      return {...state, avatar: payload};
    case LOGOUT:
      return payload;
    default:
      return state;
  }
};

export default appReducer;

import {CHANGE_IS_AUTH, SET_NOTIFICATON} from './appActions';
import {combineReducers} from 'redux';
import {AlertColor} from '@mui/material';

export interface INotification {
  message: string | null;
  type: AlertColor | null;
}

export interface IStateApp {
  isAuth: boolean;
  notification: INotification;
}

const init: IStateApp = {
  isAuth: false,
  notification: {
    message: null,
    type: null,
  },
};

const appReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case CHANGE_IS_AUTH:
      return {...state, isAuth: payload.isAuth};
    case SET_NOTIFICATON:
      return {...state, notification: payload};
    default:
      return state;
  }
};

export default combineReducers({
  app: appReducer,
});

import {CHANGE_IS_AUTH} from './appActions';
import {combineReducers} from 'redux';

export interface IStateApp {
  isAuth: boolean;
}

const init: IStateApp = {
  isAuth: false,
};

const appReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case CHANGE_IS_AUTH:
      return {...state, isAuth: payload.isAuth};
    default:
      return state;
  }
};

export default combineReducers({
  app: appReducer,
});

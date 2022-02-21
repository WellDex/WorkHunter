import {changeIsAuth} from './appActions';

export const login = () => (dispatch: any) => {
  dispatch(changeIsAuth(true));
};

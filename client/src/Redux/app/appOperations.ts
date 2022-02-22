import {authAPI, ILoginForm} from './../../api/authAPI';
import {changeIsAuth} from './appActions';

export const login =
  (data: ILoginForm, history: any) => async (dispatch: any) => {
    await authAPI.login(data).then((res) => {
      dispatch(changeIsAuth(true));
      history.push('/news');
    });
  };

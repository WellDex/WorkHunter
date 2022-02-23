import {INotification} from './appReducer';
import {authAPI, ILoginForm} from './../../api/authAPI';
import {changeIsAuth, setNotification} from './appActions';

export const login =
  (data: ILoginForm, history: any) => async (dispatch: any) => {
    await authAPI
      .login(data)
      .then((res) => {
        dispatch(changeIsAuth(true));
        history.push('/news');
      })
      .catch((res) => {
        dispatch(setNotification({message: res.message, type: 'error'}));
      });
  };

export const setMessage = (data: INotification) => async (dispatch: any) => {
  dispatch(setNotification(data));
};

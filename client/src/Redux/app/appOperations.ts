import {INotification} from './appReducer';
import {authAPI, ILoginForm} from './../../api/authAPI';
import {
  changeIsAuth,
  setNotification,
  setUserId,
  logout,
  setFirstName,
  setAvatar,
  setIsAdmin,
} from './appActions';

export const login =
  (data: ILoginForm, history: any, getProfile: (id: string) => void) =>
  async (dispatch: any) => {
    await authAPI
      .login(data)
      .then((res) => {
        dispatch(changeIsAuth(true));
        dispatch(setUserId(res.id));
        dispatch(setFirstName(res.firstName));
        dispatch(setAvatar(res.avatar));
        dispatch(setIsAdmin(res.isAdmin));
        getProfile(res.id);
        history.push(res.isAdmin ? '/users' : '/news');
      })
      .catch((res) => {
        dispatch(setNotification({message: res.message, type: 'error'}));
      });
  };

export const auth =
  (history: any, getProfile: (id: string) => void) => async (dispatch: any) => {
    await authAPI
      .check()
      .then((res) => {
        dispatch(changeIsAuth(true));
        dispatch(setUserId(res.id));
        dispatch(setFirstName(res.firstName));
        dispatch(setAvatar(res.avatar));
        dispatch(setIsAdmin(res.isAdmin));
        getProfile(res.id);
        history.push(res.isAdmin ? '/users' : '/news');
      })
      .catch((res) => {
        dispatch(setNotification({message: res.message, type: 'error'}));
      });
  };

export const setMessage = (data: INotification) => (dispatch: any) => {
  dispatch(setNotification(data));
};

export const logOut = () => async (dispatch: any) => {
  await authAPI
    .logout()
    .then((res) => {
      dispatch(logout());
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

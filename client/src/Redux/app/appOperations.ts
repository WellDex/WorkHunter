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
  setIsLoading,
} from './appActions';

export const login =
  (data: ILoginForm, history: any, getProfile: (id: string) => void) =>
  async (dispatch: any) => {
    dispatch(setIsLoading(true));
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
      .catch((e: any) => {
        dispatch(
          setNotification({message: e.response.data.message, type: 'error'})
        );
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

export const auth =
  (history: any, getProfile: (id: string) => void) => async (dispatch: any) => {
    dispatch(setIsLoading(true));
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
      .catch((e: any) => {
        dispatch(
          setNotification({message: e.response.data.message, type: 'error'})
        );
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

export const setMessage = (data: INotification) => (dispatch: any) => {
  dispatch(setNotification(data));
};

export const logOut = () => async (dispatch: any) => {
  dispatch(setIsLoading(true));
  await authAPI
    .logout()
    .then((res) => {
      dispatch(logout());
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const setLoading = (isLoading: boolean) => async (dispatch: any) => {
  dispatch(setIsLoading(isLoading));
};

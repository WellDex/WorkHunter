import {usersAPI} from './../../api/usersAPI';
import {setIsLoading, setNotification} from '../app/appActions';
import {setUsers} from './usersActions';

export const getUsersAll = () => async (dispatch: any) => {
  dispatch(setIsLoading(true));
  await usersAPI
    .getAllUsers()
    .then((res) => {
      dispatch(setUsers(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const getFriends = (id: string) => async (dispatch: any) => {
  dispatch(setIsLoading(true));
  await usersAPI
    .getFriends(id)
    .then((res) => {
      dispatch(setUsers(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

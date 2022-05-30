import {usersAPI} from './../../api/usersAPI';
import {setNotification} from '../app/appActions';
import {setUsers} from './usersActions';

export const getUsersAll = () => async (dispatch: any) => {
  await usersAPI
    .getAllUsers()
    .then((res) => {
      dispatch(setUsers(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

export const getFriends = (id: string) => async (dispatch: any) => {
  await usersAPI
    .getFriends(id)
    .then((res) => {
      dispatch(setUsers(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

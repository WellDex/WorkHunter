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

export const getFriends = () => async (dispatch: any) => {
  await usersAPI
    .getFriends()
    .then((res) => {
      dispatch(setUsers(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

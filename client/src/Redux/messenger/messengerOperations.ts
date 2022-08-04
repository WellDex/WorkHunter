import {setChats, setUsers} from './messengerActions';
import {messengerAPI} from '../../api/messengerAPI';
import {setNotification} from '../app/appActions';

export const getChats = (userId: string) => async (dispatch: any) => {
  await messengerAPI
    .getChatById(userId)
    .then((res) => {
      dispatch(setChats(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

export const getUsers = () => async (dispatch: any) => {
  await messengerAPI
    .getUsers()
    .then((res) => {
      dispatch(setUsers(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

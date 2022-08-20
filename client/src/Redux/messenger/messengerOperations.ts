import {setChats, setUsers} from './messengerActions';
import {messengerAPI} from '../../api/messengerAPI';
import {setIsLoading, setNotification} from '../app/appActions';

export const getChats = (userId: string) => async (dispatch: any) => {
  dispatch(setIsLoading(true));
  await messengerAPI
    .getChatById(userId)
    .then((res) => {
      dispatch(setChats(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const getUsers = () => async (dispatch: any) => {
  dispatch(setIsLoading(true));
  await messengerAPI
    .getUsers()
    .then((res) => {
      dispatch(setUsers(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

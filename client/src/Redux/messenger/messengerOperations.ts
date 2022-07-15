import {setChats, setUser} from './messengerActions';
import {messengerAPI} from '../../api/messengerAPI';
import {setNotification} from '../app/appActions';
import {MESSENGER_PATH} from '../../route/const';

export const getChats =
  (userId: string, history: any) => async (dispatch: any) => {
    await messengerAPI
      .getChatById(userId)
      .then((res) => {
        dispatch(setChats(res));
        history.push(`${MESSENGER_PATH}/${res[0]._id}`);
      })
      .catch((res) => {
        dispatch(setNotification({message: res.message, type: 'error'}));
      });
  };

export const getUser = (userId: string) => async (dispatch: any) => {
  await messengerAPI
    .getUser(userId)
    .then((res) => {
      dispatch(setUser(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

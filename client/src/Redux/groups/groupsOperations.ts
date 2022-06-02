import {groupsAPI} from '../../api/groupsAPI';
import {setNotification} from '../app/appActions';
import {setGroups} from './groupsActions';

export const getMyGroups = (id: string) => async (dispatch: any) => {
  await groupsAPI
    .getMyGroups(id)
    .then((res) => {
      dispatch(setGroups(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

export const getGroups = () => async (dispatch: any) => {
  await groupsAPI
    .getGroups()
    .then((res) => {
      dispatch(setGroups(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

export const getGroup = (id: string) => async (dispatch: any) => {
  await groupsAPI
    .getGroup(id)
    .then((res) => {
      dispatch(setGroups(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

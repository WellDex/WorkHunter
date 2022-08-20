import {groupsAPI} from '../../api/groupsAPI';
import {setIsLoading, setNotification} from '../app/appActions';
import {setGroups} from './groupsActions';

export const getMyGroups = (id: string) => async (dispatch: any) => {
  dispatch(setIsLoading(true));
  await groupsAPI
    .getMyGroups(id)
    .then((res) => {
      dispatch(setGroups(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const getGroups = () => async (dispatch: any) => {
  dispatch(setIsLoading(true));
  await groupsAPI
    .getGroups()
    .then((res) => {
      dispatch(setGroups(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const getGroup = (id: string) => async (dispatch: any) => {
  dispatch(setIsLoading(false));
  await groupsAPI
    .getGroup(id)
    .then((res) => {
      dispatch(setGroups(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

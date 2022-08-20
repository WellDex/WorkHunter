import {setIsLoading, setNotification} from '../app/appActions';
import {profileAPI} from './../../api/profileAPI';
import {setProfile} from './profileActions';

export const getProfile = (id: string) => async (dispatch: any) => {
  dispatch(setIsLoading(true));
  await profileAPI
    .getProfile(id)
    .then((res) => {
      dispatch(setProfile(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

import {setNotification} from '../app/appActions';
import {profileAPI} from './../../api/profileAPI';
import {setProfile} from './profileActions';

export const getProfile = (id: string) => async (dispatch: any) => {
  await profileAPI
    .getProfile(id)
    .then((res) => {
      dispatch(setProfile(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

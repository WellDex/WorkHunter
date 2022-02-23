import {setNotification} from '../app/appActions';
import {profileAPI} from './../../api/profileAPI';
import {setProfile} from './profileActions';

export const getProfile = () => async (dispatch: any) => {
  await profileAPI
    .getProfile()
    .then((res) => {
      console.log('5', res);
      dispatch(setProfile(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

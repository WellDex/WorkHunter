import {IStateProfile} from './profileReducer';
export const SET_PROFILE = 'SET_PROFILE';

export const setProfile = (data: IStateProfile) => ({
  type: SET_PROFILE,
  payload: data,
});

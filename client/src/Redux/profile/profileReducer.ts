import {SET_PROFILE} from './profileActions';
import {combineReducers} from 'redux';

export interface IStateProfile {
  firstName: String | null;
  lastName: String | null;
  status: String | null;
  rating: Number | null;
  isOnline: Boolean;
  birthDate: String | null;
  description: {
    city: String | null;
    skils: Array<string>;
  };
  createDate: String | null;
  owner: String | null;
}

const init: IStateProfile = {
  firstName: null,
  lastName: null,
  status: null,
  rating: null,
  isOnline: false,
  birthDate: null,
  description: {
    city: null,
    skils: [],
  },
  createDate: null,
  owner: null,
};

const profileReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case SET_PROFILE:
      return {...state, ...payload};
    default:
      return state;
  }
};

export default profileReducer;

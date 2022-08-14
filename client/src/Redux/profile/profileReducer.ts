import {SET_PROFILE} from './profileActions';

export interface IStateProfile {
  id?: string;
  avatar: string | null;
  firstName: string | null;
  lastName: string | null;
  status: string | null;
  rating: number | null;
  birthDate: string | null;
  description: string | null;
  city: string | null;
  phoneNumber: string | null;
  email: string | null;
  school: {name: string | null}[] | [];
  university:
    | {
        name: string | null;
        faculty: string | null;
        startDate: string | null;
        endDate: string | null;
      }[]
    | [];
  skills: {name: string | null}[] | [];
  career:
    | {
        placeOfWork: string | null;
        position: string | null;
        startDate: string | null;
        endDate: string | null;
      }[]
    | [];
  friends: [];
  groups: [];
  isSearchWork: boolean;
  isOnline: boolean;
}

const init: IStateProfile = {
  avatar: null,
  firstName: null,
  lastName: null,
  status: null,
  rating: null,
  birthDate: null,
  description: null,
  city: null,
  phoneNumber: null,
  email: null,
  school: [],
  university: [],
  career: [],
  friends: [],
  groups: [],
  skills: [],
  isSearchWork: false,
  isOnline: false,
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

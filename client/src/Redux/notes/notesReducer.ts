import {SET_NOTES} from './notesActions';

export interface INote {
  _id: any;
  text: string;
  subscribers: [];
  createDate: string;
}

const init: INote[] = [];

const notesReducer = (state = init, {type, payload}: any) => {
  switch (type) {
    case SET_NOTES:
      return payload;
    default:
      return state;
  }
};

export default notesReducer;

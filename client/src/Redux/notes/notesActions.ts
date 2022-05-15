import {INote} from './notesReducer';
export const SET_NOTES = 'SET_NOTES';

export const setNotes = (data: INote[]) => ({
  type: SET_NOTES,
  payload: data,
});

import {notesAPI} from '../../api/notesAPI';
import {setNotification} from '../app/appActions';
import {setNotes} from './notesActions';

export const getNotes = () => async (dispatch: any) => {
  await notesAPI
    .getNotes()
    .then((res) => {
      dispatch(setNotes(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

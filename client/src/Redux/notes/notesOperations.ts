import {notesAPI} from '../../api/notesAPI';
import {setIsLoading, setNotification} from '../app/appActions';
import {setNotes} from './notesActions';

export const getNotes = (id: string) => async (dispatch: any) => {
  dispatch(setIsLoading(true));
  await notesAPI
    .getNotes(id)
    .then((res) => {
      dispatch(setNotes(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

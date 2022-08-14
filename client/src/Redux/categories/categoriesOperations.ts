import {categoriesAPI} from '../../api/categoriesAPI';
import {setNotification} from '../app/appActions';
import {setCategories} from './categoriesActions';

export const getCategories = () => async (dispatch: any) => {
  await categoriesAPI
    .get()
    .then((res) => {
      dispatch(setCategories(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    });
};

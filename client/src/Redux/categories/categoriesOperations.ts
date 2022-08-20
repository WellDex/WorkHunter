import {categoriesAPI} from '../../api/categoriesAPI';
import {setIsLoading, setNotification} from '../app/appActions';
import {setCategories} from './categoriesActions';

export const getCategories = () => async (dispatch: any) => {
  dispatch(setIsLoading(true));
  await categoriesAPI
    .get()
    .then((res) => {
      dispatch(setCategories(res));
    })
    .catch((res) => {
      dispatch(setNotification({message: res.message, type: 'error'}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

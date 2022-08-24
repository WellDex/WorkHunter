import {Button, Dialog, Divider} from '@mui/material';
import React from 'react';
import {useForm} from 'react-hook-form';
import {categoriesAPI} from '../../api/categoriesAPI';
import {ICategory} from '../../Redux/categories/categoriesReducer';
import CustomField from '../common/CustomField';

interface IModalCategoryForm {
  category: ICategory | null;
  parent: string | null;
  open: boolean;
  handleClose: () => void;
  getCategories: () => void;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const ModalCategoryForm = ({
  category,
  parent,
  open,
  handleClose,
  getCategories,
  setLoading,
  setMessage,
}: IModalCategoryForm) => {
  const {handleSubmit, control} = useForm({
    defaultValues: category || undefined,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    if (category) {
      setLoading(true);
      await categoriesAPI
        .update(data)
        .then((res) => {
          setMessage({message: res.message, type: 'success'});
          getCategories();
          handleClose();
        })
        .catch((e: any) => {
          setMessage({message: e.response.data.message, type: 'error'});
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      await categoriesAPI
        .create({...data, parent})
        .then((res) => {
          setMessage({message: res.message, type: 'success'});
          getCategories();
          handleClose();
        })
        .catch((e: any) => {
          setMessage({message: e.response.data.message, type: 'error'});
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="groups-form">
        <h1 className="groups-form-title">Категория</h1>
        <Divider />
        <CustomField
          name={'title'}
          control={control}
          rules={{required: "Обов'язкове поле"}}
          label={'Название категории'}
          placeholder={'Введите название категории...'}
          isFullWidth={true}
        />
        <Divider />
        <div className="groups-form-btns">
          <Button variant="outlined" onClick={handleClose}>
            закрить
          </Button>
          <Button type="submit" variant="contained">
            {category ? 'обновить' : 'создать'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalCategoryForm;

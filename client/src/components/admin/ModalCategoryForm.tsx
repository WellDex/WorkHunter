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
}

const ModalCategoryForm = ({
  category,
  parent,
  open,
  handleClose,
  getCategories,
}: IModalCategoryForm) => {
  const {handleSubmit, control} = useForm({
    defaultValues: category || undefined,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    if (category) {
      await categoriesAPI
        .update(data)
        .then(() => {
          getCategories();
          handleClose();
        })
        .catch();
    } else {
      await categoriesAPI
        .create({...data, parent})
        .then(() => {
          getCategories();
          handleClose();
        })
        .catch();
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

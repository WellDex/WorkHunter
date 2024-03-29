import {
  Button,
  Dialog,
  Divider,
  ListSubheader,
  MenuItem,
  IconButton,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';
import {useForm, useFieldArray} from 'react-hook-form';
import {ICreateProject, projectAPI} from '../../api/projectAPI';
import {ICategory} from '../../Redux/categories/categoriesReducer';
import CustomField from '../common/CustomField';

interface IModalCreateProject {
  open: boolean;
  handleClose: () => void;
  categories: ICategory[];
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const ModalCreateProject = ({
  open,
  handleClose,
  categories,
  setLoading,
  setMessage,
}: IModalCreateProject) => {
  const {handleSubmit, control} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'marks',
  });

  const onSubmit = async (data: ICreateProject) => {
    setLoading(true);
    await projectAPI
      .create(data)
      .then((res) => {
        setMessage({message: res.message, type: 'success'});
      })
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  const renderSelectGroup = (category: ICategory) => {
    const items =
      category.children &&
      category.children.length > 0 &&
      category.children.map((child, index) => {
        return (
          <MenuItem key={index} value={child._id}>
            {child.title}
          </MenuItem>
        );
      });
    return [<ListSubheader>{category.title}</ListSubheader>, items];
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="projects-form">
        <h1 className="projects-form-title">Створення проекту</h1>
        <Divider />
        <CustomField
          name={'title'}
          control={control}
          rules={{required: "Обов'язкове поле"}}
          label={'Название проекта'}
          placeholder={'Введите название проекта...'}
          isFullWidth={true}
        />
        <CustomField
          name={'description'}
          control={control}
          rules={{}}
          label={'Описание проекта'}
          placeholder={'Введите описание проекта...'}
          isFullWidth={true}
        />
        <CustomField
          name={'budjet'}
          control={control}
          rules={{required: "Обов'язкове поле"}}
          label={'Бюджет'}
          type={'number'}
          placeholder={'Введите бюджет...'}
          isFullWidth={true}
        />
        <CustomField
          name={'category'}
          control={control}
          rules={{required: "Обов'язкове поле"}}
          label={'Категория'}
          type={'select'}
          select={true}
          placeholder={'Виберите категорию...'}
          isFullWidth={true}>
          {categories.length > 0 &&
            categories.map((category) => renderSelectGroup(category))}
        </CustomField>
        <>
          <h2 className="settings-title">Мітки</h2>
          <Divider />
          {fields.map((item: any, index: number) => (
            <div key={item.id} className="settings">
              <div className="settings-col">
                <CustomField
                  name={`marks.${index}.name`}
                  control={control}
                  rules={{required: "Обов'язкове поле"}}
                  label={'Метка'}
                  placeholder={'Введите метку...'}
                  isFullWidth={true}
                />
                <IconButton
                  className="settings-delete-btn-icon"
                  aria-label="delete"
                  size="small"
                  onClick={() => remove(index)}>
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            </div>
          ))}
          <Button variant="outlined" onClick={() => append({name: ''})}>
            + Додати мітку
          </Button>
        </>
        <Divider />
        <div className="projects-form-btns">
          <Button variant="contained" onClick={handleClose}>
            скасувати
          </Button>
          <Button type="submit" variant="contained">
            створити
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalCreateProject;

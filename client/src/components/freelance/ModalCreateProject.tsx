import {Button, Dialog, Divider} from '@mui/material';
import React from 'react';
import {useForm} from 'react-hook-form';
import {ICreateProject, projectAPI} from '../../api/projectAPI';
import CustomField from '../common/CustomField';

interface IModalCreateProject {
  open: boolean;
  handleClose: () => void;
}

const ModalCreateProject = ({open, handleClose}: IModalCreateProject) => {
  const {handleSubmit, control} = useForm({
    defaultValues: undefined,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: ICreateProject) => {
    console.log(data);
    projectAPI
      .create(data)
      .catch((e) => console.log(e))
      .finally(handleClose);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="projects-form">
        <h1 className="projects-form-title">Создание проекта</h1>
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
          name={'marks'}
          control={control}
          // rules={{required: "Обов'язкове поле"}}
          rules={{}}
          type={'select'}
          label={'Метки'}
          select={true}
          placeholder={'Введите ...'}
          options={[] as any}
          isFullWidth={true}
        />
        <Divider />
        <div className="projects-form-btns">
          <Button variant="contained" onClick={handleClose}>
            отменить
          </Button>
          <Button type="submit" variant="contained">
            создать
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalCreateProject;

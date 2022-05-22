import {Button, Dialog, Divider} from '@mui/material';
import React from 'react';
import {useForm} from 'react-hook-form';
import {ICreateProject, portfolioAPI} from '../../api/portfolioAPI';
// import { IPortfolio } from '../../Redux/portfolio/portfolioReducer';
import CustomField from '../common/CustomField';

interface IModalCreateProject {
  open: boolean;
  handleClose: () => void;
  getPortfolio: () => void;
  // portfolio: IPortfolio
}

const ModalCreateProject = ({
  open,
  handleClose,
  getPortfolio,
}: IModalCreateProject) => {
  const {handleSubmit, control} = useForm({
    // defaultValues: portfolio,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const onSubmit = (data: ICreateProject) => {
    portfolioAPI
      .createProject(data)
      .then((res) => {
        getPortfolio();
        handleClose();
      })
      .catch((e) => console.log(e));
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
          name={'link'}
          control={control}
          rules={{required: "Обов'язкове поле"}}
          label={'Ссылка на проект'}
          placeholder={'Вставте ссылку на проект...'}
          isFullWidth={true}
        />
        {/*todo: add img upload*/}
        <Divider />
        <div className="projects-form-btns">
          <Button variant="outlined" onClick={handleClose}>
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

import {Button, Dialog, Divider} from '@mui/material';
import React, {useState} from 'react';
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
//todo
const ModalCreateProject = ({
  open,
  handleClose,
  getPortfolio,
}: IModalCreateProject) => {
  const [file, setFile] = useState<any>(null);
  const {handleSubmit, control} = useForm({
    // defaultValues: portfolio,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const onSubmit = (data: ICreateProject) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('link', data.link);
    formData.append('img', file);
    portfolioAPI
      .createProject(formData)
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
        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            name="preview"
            type="file"
            style={{display: 'none'}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFile((e.target.files && e.target.files[0]) || null)
            }
          />
          <Button fullWidth={true} variant="contained" component="span">
            Загрузить аватар сообщества
          </Button>
        </label>
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

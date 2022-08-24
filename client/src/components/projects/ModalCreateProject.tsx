import {Button, Dialog, Divider} from '@mui/material';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ICreateProject, portfolioAPI} from '../../api/portfolioAPI';
import {IPortfolio} from '../../Redux/portfolio/portfolioReducer';
import CustomField from '../common/CustomField';

interface IModalCreateProject {
  open: boolean;
  handleClose: () => void;
  getPortfolio: () => void;
  portfolio: IPortfolio | undefined;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const ModalCreateProject = ({
  open,
  handleClose,
  getPortfolio,
  portfolio,
  setLoading,
  setMessage,
}: IModalCreateProject) => {
  const [file, setFile] = useState<any>(null);
  const {handleSubmit, control} = useForm({
    defaultValues: portfolio,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: ICreateProject) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('link', data.link);
    formData.append('img', file);
    if (portfolio) {
      portfolioAPI
        .updateProject(portfolio._id, formData)
        .then((res) => {
          setMessage({message: res.message, type: 'success'});

          getPortfolio();
          handleClose();
        })
        .catch((e: any) => {
          setMessage({message: e.response.data.message, type: 'error'});
        })
        .finally(() => setLoading(false));
    } else {
      portfolioAPI
        .createProject(formData)
        .then((res) => {
          setMessage({message: res.message, type: 'success'});

          getPortfolio();
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
      <form onSubmit={handleSubmit(onSubmit)} className="projects-form">
        <h1 className="projects-form-title">
          {portfolio ? 'Обновление' : 'Создание'} проекта
        </h1>
        <Divider />
        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            name="preview"
            type="file"
            style={{display: 'none'}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFile((e.target.files && e.target.files[0]) || null);
              e.target.value = '';
            }}
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
        <Divider />
        <div className="projects-form-btns">
          <Button variant="outlined" onClick={handleClose}>
            отменить
          </Button>
          <Button type="submit" variant="contained">
            {portfolio ? 'обновить' : 'создать'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalCreateProject;

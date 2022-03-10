import {Button, Divider} from '@mui/material';
import React from 'react';
import {useForm} from 'react-hook-form';
import CustomField from '../components/common/CustomField';
import FrameHoc from '../hoc/FrameHoc';

const SettingPage = () => {
  const {handleSubmit, control} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form className="card-container settings" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="settings-title">Настройки</h1>
      <Divider />
      <div className="settings-col">
        <CustomField
          name={'firstName'}
          control={control}
          rules={{required: "Обов'язкове поле"}}
          label={'Имя'}
          placeholder={'Введите имя...'}
          isFullWidth={false}
        />
        <CustomField
          name={'lastName'}
          control={control}
          rules={{required: "Обов'язкове поле"}}
          label={'Фамилия'}
          placeholder={'Введите фамилия...'}
          isFullWidth={false}
        />
      </div>
      <CustomField
        name={'status'}
        control={control}
        label={'Статус'}
        rules={{}}
        placeholder={'Введите статус...'}
        isFullWidth={true}
      />
      <Button variant="contained" type="submit">
        Сохранить
      </Button>
    </form>
  );
};

export default FrameHoc(SettingPage);

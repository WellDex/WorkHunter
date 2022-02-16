import {Button, Divider, TextField} from '@mui/material';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {Controller, useForm} from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {authAPI, IRegisterForm} from '../../api/authAPI';

const RegistrationForm = () => {
  const {handleSubmit, control} = useForm<IRegisterForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: IRegisterForm) => {
    try {
      const res = await authAPI.register(data);
      console.log(res);
    } catch (error) {}
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '20rem',
        }}>
        <h1 className="auth-form-title">Регистрация</h1>
        <Divider />
        <Controller
          name={'firstName'}
          control={control}
          defaultValue={''}
          rules={{required: "Обов'язкове поле"}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              variant="outlined"
              label="Имя"
              value={value}
              onChange={onChange}
              placeholder="Введите ваше имя..."
              fullWidth={true}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name={'lastName'}
          control={control}
          defaultValue={''}
          rules={{required: "Обов'язкове поле"}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              variant="outlined"
              label="Фамилия"
              value={value}
              onChange={onChange}
              placeholder="Введите вашу фамилию..."
              fullWidth={true}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name={'birthDay'}
          control={control}
          defaultValue={null}
          rules={{required: "Обов'язкове поле"}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <DatePicker
              label="Дата народженя"
              value={value}
              onChange={onChange}
              onError={(params) => (
                <TextField
                  error={true}
                  helperText={error ? error.message : null}
                  {...params}
                />
              )}
              renderInput={(params) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : null}
                  {...params}
                />
              )}
            />
          )}
        />
        <Controller
          name={'email'}
          control={control}
          defaultValue={''}
          rules={{required: "Обов'язкове поле"}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              variant="outlined"
              label="Email"
              value={value}
              onChange={onChange}
              placeholder="Введите email..."
              fullWidth={true}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name={'password'}
          control={control}
          defaultValue={''}
          rules={{required: "Обов'язкове поле"}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              variant="outlined"
              type="password"
              label="Пароль"
              value={value}
              onChange={onChange}
              placeholder="Введите пароль..."
              fullWidth={true}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Divider />
        <div className="auth-form-footer">
          <NavLink to={'login'}>
            <Button variant="outlined">Вход</Button>
          </NavLink>
          <Button variant="contained" type="submit">
            Регистрация
          </Button>
        </div>
      </form>
    </LocalizationProvider>
  );
};

export default RegistrationForm;

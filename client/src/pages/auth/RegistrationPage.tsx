import {Button, Divider, TextField} from '@mui/material';
import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {Controller, useForm} from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {authAPI, IRegisterForm} from '../../api/authAPI';
import CustomField from '../../components/common/CustomField';
import {LOGIN_PATH} from '../../route/const';
import FrameHoc from '../../hoc/FrameHoc';
import {connect} from 'react-redux';
import {setMessage} from '../../Redux/app/appOperations';

const RegistrationForm = ({setMessage}: any) => {
  const history = useHistory();
  const {handleSubmit, control} = useForm<IRegisterForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: IRegisterForm) => {
    try {
      const res = await authAPI.register(data);
      if (res) {
        setMessage({message: res.message, type: 'success'});
        history.goBack();
      }
    } catch (error) {
      setMessage({message: error, type: 'error'});
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-container auth-form">
        <h1 className="auth-form-title">Регистрация</h1>
        <Divider />
        <CustomField
          name={'firstName'}
          control={control}
          rules={{required: "Обов'язкове поле"}}
          label={'Имя'}
          placeholder={'Введите ваше имя...'}
          isFullWidth={true}
        />
        <CustomField
          name={'lastName'}
          control={control}
          rules={{required: "Обов'язкове поле"}}
          label={'Фамилия'}
          placeholder={'Введите вашу фамилию...'}
          isFullWidth={true}
        />
        <Controller
          name={'birthDate'}
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
        <CustomField
          name={'login'}
          control={control}
          rules={{required: "Обов'язкове поле"}}
          label={'Логин'}
          placeholder={'Введите email...'}
          isFullWidth={true}
        />
        <CustomField
          name={'password'}
          control={control}
          rules={{required: "Обов'язкове поле"}}
          type="password"
          label={'Пароль'}
          placeholder={'Введите пароль...'}
          isFullWidth={true}
        />
        <Divider />
        <div className="auth-form-footer">
          <NavLink to={LOGIN_PATH}>
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

const mapDispatchToProps = {
  setMessage,
};

const RegistrationContainer = connect(
  null,
  mapDispatchToProps
)(FrameHoc(RegistrationForm));

const RegistrationPage = () => {
  return (
    <div className="auth">
      <RegistrationContainer />
    </div>
  );
};
export default RegistrationPage;

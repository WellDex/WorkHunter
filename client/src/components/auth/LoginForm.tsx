import {Button, Divider} from '@mui/material';
import React from 'react';
import {useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import {authAPI, ILoginForm} from '../../api/authAPI';
import {login} from '../../Redux/app/appOperations';
import CustomField from '../common/CustomField';

const LoginForm = ({login}: any) => {
  const history = useHistory();
  const {handleSubmit, control} = useForm<ILoginForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: ILoginForm) => {
    try {
      const res = await authAPI.login(data);
      if (res) {
        alert(res.message);
        login();
        history.push('/news');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h1 className="auth-form-title">Логин</h1>
      <Divider />
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
        type={'password'}
        label={'Пароль'}
        placeholder={'Введите пароль...'}
        isFullWidth={true}
      />
      <Divider />
      <div className="auth-form-footer">
        <NavLink to={'registration'}>
          <Button variant="outlined">Регистрация</Button>
        </NavLink>
        <Button variant="contained" type="submit">
          Ввойти
        </Button>
      </div>
    </form>
  );
};

const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(LoginForm);

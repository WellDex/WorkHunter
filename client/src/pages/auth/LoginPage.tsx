import {Button, Divider} from '@mui/material';
import React from 'react';
import {useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import {ILoginForm} from '../../api/authAPI';
import {login} from '../../Redux/app/appOperations';
import {getProfile} from '../../Redux/profile/profileOperations';
import CustomField from '../../components/common/CustomField';
import {REGISTER_PATH} from '../../route/const';
import FrameHoc from '../../hoc/FrameHoc';

interface ILoginProps {
  login: (
    data: ILoginForm,
    history: any,
    getProfile: (id: string) => void
  ) => any;
  getProfile: (id: string) => void;
}

const LoginForm = ({login, getProfile}: ILoginProps) => {
  const history = useHistory();
  const {handleSubmit, control} = useForm<ILoginForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: ILoginForm) => {
    login(data, history, getProfile);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card-container auth-form">
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
        <NavLink to={REGISTER_PATH}>
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
  getProfile,
};

const LoginContainer = connect(null, mapDispatchToProps)(FrameHoc(LoginForm));

const LoginPage = () => {
  return (
    <div className="auth">
      <LoginContainer />
    </div>
  );
};
export default LoginPage;

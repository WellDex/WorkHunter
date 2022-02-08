import {Button, Divider, TextField} from '@mui/material';
import React from 'react';
import {NavLink} from 'react-router-dom';

const LoginForm = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h1 className="auth-form-title">Логин</h1>
      <Divider />
      <TextField
        variant="outlined"
        label="Логин"
        placeholder="Введите логин..."
        fullWidth={true}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Пароль"
        placeholder="Введите пароль..."
        fullWidth={true}
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

export default LoginForm;

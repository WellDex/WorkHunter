import {Button, Divider, TextField} from '@mui/material';
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const RegistrationForm = () => {
  const [date, setDate] = useState<Date | null>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '20rem',
        }}>
        <h1 className="auth-form-title">Регистрация</h1>
        <Divider />
        <TextField
          variant="outlined"
          label="Имя"
          placeholder="Введите ваше имя..."
          fullWidth={true}
        />
        <TextField
          variant="outlined"
          label="Фамилия"
          placeholder="Введите вашу фамилию..."
          fullWidth={true}
        />
        <DatePicker
          label="Дата народженя"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
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

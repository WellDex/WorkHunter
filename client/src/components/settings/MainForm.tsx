import DatePicker from '@mui/lab/DatePicker';
import {Divider, TextField} from '@mui/material';
import React from 'react';
import {Controller} from 'react-hook-form';
import {IStateProfile} from '../../Redux/profile/profileReducer';
import CustomField from '../common/CustomField';

interface IForm {
  control: any;
  profile: IStateProfile;
}

const MainForm = ({control, profile}: IForm) => (
  <>
    <h1 className="settings-title">Основное</h1>
    <Divider />
    <div className="settings-col">
      <CustomField
        name={'firstName'}
        control={control}
        rules={{required: "Обов'язкове поле"}}
        label={'Имя'}
        placeholder={'Введите имя...'}
        isFullWidth={true}
      />
      <CustomField
        name={'lastName'}
        control={control}
        rules={{required: "Обов'язкове поле"}}
        label={'Фамилия'}
        placeholder={'Введите фамилия...'}
        isFullWidth={true}
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
    <CustomField
      name={'description'}
      control={control}
      label={'О себе'}
      rules={{}}
      placeholder={'Введите информацию о себе...'}
      isFullWidth={true}
    />
    <div className="settings-col">
      <Controller
        name={'birthDate'}
        control={control}
        defaultValue={profile.birthDate || null}
        rules={{required: "Обов'язкове поле"}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <DatePicker
            label="Дата народженя"
            value={value}
            onChange={onChange}
            InputProps={{disabled: true}}
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
        name={'city'}
        control={control}
        label={'Город'}
        rules={{}}
        placeholder={'Введите город...'}
        isFullWidth={false}
      />
    </div>
    <div className="settings-col">
      <CustomField
        name={'phoneNumber'}
        control={control}
        rules={{
          pattern: {
            value: /[0-9]{12}/,
            message: 'Введите корресктный номер: 380...',
          },
        }}
        label={'Номер телефона'}
        placeholder={'Введите номер телефона...'}
        isFullWidth={true}
      />
      <CustomField
        name={'email'}
        control={control}
        rules={{
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: 'Введите корресктный email',
          },
        }}
        label={'Email'}
        placeholder={'Введите email...'}
        isFullWidth={true}
      />
    </div>
  </>
);

export default MainForm;

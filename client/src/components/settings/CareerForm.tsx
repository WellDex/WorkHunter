import DatePicker from '@mui/lab/DatePicker';
import {Button, Divider, TextField} from '@mui/material';
import React from 'react';
import {Controller} from 'react-hook-form';
import CustomField from '../common/CustomField';

interface IForm {
  control: any;
  fields: any;
  append: any;
  remove: any;
}

const CareerForm = ({control, fields, append, remove}: IForm) => (
  <>
    <h1 className="settings-title">Карьера</h1>
    <Divider />
    {fields.map((item: any, index: number) => (
      <div key={item.id} className="settings">
        <Button variant="contained" color="error" onClick={() => remove(index)}>
          Delete
        </Button>
        <div className="settings-col">
          <CustomField
            name={`career.${index}.placeOfWork`}
            control={control}
            rules={{required: "Обов'язкове поле"}}
            label={'Место работы'}
            placeholder={'Введите место работы...'}
            isFullWidth={true}
          />
          <CustomField
            name={`career.${index}.position`}
            control={control}
            rules={{required: "Обов'язкове поле"}}
            label={'Должность'}
            placeholder={'Введите должность...'}
            isFullWidth={true}
          />
        </div>
        <div className="settings-col">
          <Controller
            name={`career.${index}.startDate`}
            control={control}
            defaultValue={null}
            rules={{required: "Обов'язкове поле"}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <DatePicker
                label="Дата начала работы"
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
          <Controller
            name={`career.${index}.endDate`}
            control={control}
            defaultValue={null}
            rules={{required: "Обов'язкове поле"}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <DatePicker
                label="Дата окончания работы"
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
        </div>
      </div>
    ))}
    <Button
      variant="outlined"
      onClick={() =>
        append({placeOfWork: '', position: '', startDate: null, endDate: null})
      }>
      + Добавить место работы
    </Button>
  </>
);

export default CareerForm;

import DatePicker from '@mui/lab/DatePicker';
import {Button, Divider, Tab, Tabs, TextField} from '@mui/material';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import CustomField from '../common/CustomField';

interface IForm {
  control: any;
  fieldsUniversity: any;
  appendUniversity: any;
  removeUniversity: any;
  fieldsSchool: any;
  appendSchool: any;
  removeSchool: any;
}

const CareerForm = ({
  control,
  fieldsSchool,
  appendSchool,
  removeSchool,
  fieldsUniversity,
  appendUniversity,
  removeUniversity,
}: IForm) => {
  const [value, setValue] = useState(0);
  return (
    <>
      <h1 className="settings-title">Образование</h1>
      <Tabs
        value={value}
        onChange={(event, value) => setValue(value)}
        variant="fullWidth">
        <Tab className="users-control" label="Среднее образование" />
        <Tab className="users-control" label="Высшее образование" />
      </Tabs>
      <Divider />
      {!value
        ? fieldsSchool.map((item: any, index: number) => (
            <div key={item.id} className="settings">
              <Button variant="contained" onClick={() => removeSchool(index)}>
                Delete
              </Button>
              <CustomField
                name={`school.${index}.name`}
                control={control}
                rules={{required: "Обов'язкове поле"}}
                label={'Название школы'}
                placeholder={'Введите название школы..'}
                isFullWidth={true}
              />
            </div>
          ))
        : fieldsUniversity.map((item: any, index: number) => (
            <div key={item.id} className="settings">
              <Button
                variant="contained"
                onClick={() => removeUniversity(index)}>
                Delete
              </Button>
              <div className="settings-col">
                <CustomField
                  name={`university.${index}.name`}
                  control={control}
                  rules={{required: "Обов'язкове поле"}}
                  label={'Название университета'}
                  placeholder={'Введите название университета..'}
                  isFullWidth={true}
                />
                <CustomField
                  name={`university.${index}.faculty`}
                  control={control}
                  rules={{required: "Обов'язкове поле"}}
                  label={'Факультет'}
                  placeholder={'Введите факультет...'}
                  isFullWidth={true}
                />
              </div>
              <div className="settings-col">
                <Controller
                  name={`university.${index}.startDate`}
                  control={control}
                  defaultValue={null}
                  rules={{required: "Обов'язкове поле"}}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <DatePicker
                      label="Дата начала учебы"
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
                  name={`university.${index}.endDate`}
                  control={control}
                  defaultValue={null}
                  rules={{required: "Обов'язкове поле"}}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <DatePicker
                      label="Дата окончания учебы"
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
          !value
            ? appendSchool({name: ''})
            : appendUniversity({
                name: '',
                faculty: '',
                startDate: null,
                endDate: null,
              })
        }>
        {!value ? '+ Добавить школу' : '+ Добавить университет'}
      </Button>
    </>
  );
};

export default CareerForm;

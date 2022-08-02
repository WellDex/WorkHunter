import {TextField} from '@mui/material';
import React from 'react';
import {Controller} from 'react-hook-form';

interface ICustomField {
  name: string;
  control: any;
  defaultValue?: string;
  rules: any;
  label: string;
  placeholder?: string;
  isFullWidth: boolean;
  type?: string;
  select?: boolean;
  options?: {
    key: any;
    value: any;
    label: any;
  }[];
}

const CustomField = ({
  name,
  control,
  defaultValue = '',
  rules,
  label,
  placeholder,
  isFullWidth,
  type = 'text',
  select = false,
  options,
}: ICustomField) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({field: {onChange, value}, fieldState: {error}}) =>
        select ? (
          <TextField
            variant="outlined"
            select={select}
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            fullWidth={isFullWidth}
            error={!!error}
            helperText={error ? error.message : null}>
            {options &&
              options.length > 0 &&
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </TextField>
        ) : (
          <TextField
            variant="outlined"
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            fullWidth={isFullWidth}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )
      }
    />
  );
};

export default CustomField;

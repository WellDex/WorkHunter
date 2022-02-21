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
}: ICustomField) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({field: {onChange, value}, fieldState: {error}}) => (
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
      )}
    />
  );
};

export default CustomField;

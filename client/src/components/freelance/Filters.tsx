import {Divider, MenuItem, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {ICategory} from '../../Redux/categories/categoriesReducer';

interface IFilter {
  categories: ICategory[];
  setOptions: (options: any) => void;
}

const Filters = ({categories, setOptions}: IFilter) => {
  const [rootValue, setRootValue] = useState('');
  const [subValue, setSubValue] = useState('');
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (rootValue) {
      setSubCategories(
        categories.find((category) => category._id === rootValue)?.children ||
          []
      );
    } else {
      setSubCategories([]);
    }
    setSubValue('');
  }, [rootValue]);

  useEffect(() => {
    setOptions({rootValue, subValue});
  }, [rootValue, subValue]);

  return (
    <>
      <TextField
        variant="outlined"
        select={true}
        type={'select'}
        label={'Категория'}
        value={rootValue}
        style={{width: 200, margin: '0.5rem'}}
        onChange={(e) => setRootValue(e.target.value)}>
        <MenuItem value={''}>Все категории</MenuItem>
        {categories &&
          categories.length > 0 &&
          categories.map((category, index) => (
            <MenuItem key={index} value={category._id}>
              {category.title}
            </MenuItem>
          ))}
      </TextField>
      <TextField
        variant="outlined"
        select={true}
        type={'select'}
        label={'Подкатегория'}
        value={subValue}
        style={{width: 200, marginTop: '0.5rem', marginBottom: '0.5rem'}}
        onChange={(e) => setSubValue(e.target.value)}>
        <MenuItem value={''}>Все подкатегории</MenuItem>
        {subCategories.length > 0 &&
          subCategories.map((category, index) => (
            <MenuItem key={index} value={category._id}>
              {category.title}
            </MenuItem>
          ))}
      </TextField>
      <Divider />
    </>
  );
};

export default Filters;

import {Button, Divider, IconButton} from '@mui/material';
import React from 'react';
import CustomField from '../common/CustomField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface IForm {
  control: any;
  fields: any;
  append: any;
  remove: any;
}

const SkillsForm = ({control, fields, append, remove}: IForm) => (
  <>
    <h1 className="settings-title">Навыки</h1>
    <Divider />
    {fields.map((item: any, index: number) => (
      <div key={item.id} className="settings">
        <div className="settings-col">
          <CustomField
            name={`skills.${index}.name`}
            control={control}
            rules={{required: "Обов'язкове поле"}}
            label={'Навык'}
            placeholder={'Введите навык...'}
            isFullWidth={true}
          />
          <IconButton
            className="settings-delete-btn-icon"
            aria-label="delete"
            size="small"
            onClick={() => remove(index)}>
            <DeleteForeverIcon />
          </IconButton>
        </div>
      </div>
    ))}
    <Button variant="outlined" onClick={() => append({name: ''})}>
      + Добавить навык
    </Button>
  </>
);

export default SkillsForm;

import {Button, Dialog, Divider} from '@mui/material';
import React, {useState} from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {groupsAPI, ICreateGroup} from '../../api/groupsAPI';
import {useForm} from 'react-hook-form';
import CustomField from '../common/CustomField';
import {IGroup} from '../../Redux/groups/groupsReducer';

interface IModalCreateGroup {
  open: boolean;
  handleClose: () => void;
  group?: IGroup;
}

const ModalCreateGroup = ({open, handleClose, group}: IModalCreateGroup) => {
  const [file, setFile] = useState<any>(null);
  const {handleSubmit, control} = useForm({
    defaultValues: group || undefined,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: ICreateGroup) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description || '');
    formData.append('img', file);

    if (group) {
      groupsAPI
        .updateGroup(group._id, formData)
        .then((res) => {
          handleClose();
        })
        .catch((e) => console.log(e));
      handleClose();
      return;
    }
    groupsAPI
      .createGroup(formData)
      .then((res) => {
        handleClose();
      })
      .catch((e) => console.log(e));
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={handleSubmit(onSubmit)} className="groups-form">
          <h1 className="groups-form-title">
            {group ? 'Редактирование сообщества' : 'Создание сообщества'}
          </h1>
          <Divider />
          <label htmlFor="contained-button-file">
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              name="preview"
              type="file"
              style={{display: 'none'}}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFile((e.target.files && e.target.files[0]) || null);
                e.target.value = '';
              }}
            />
            <Button fullWidth={true} variant="contained" component="span">
              Загрузить аватар сообщества
            </Button>
          </label>
          <CustomField
            name={'title'}
            control={control}
            rules={{required: "Обов'язкове поле"}}
            label={'Название сообщества'}
            placeholder={'Введите название сообщества...'}
            isFullWidth={true}
          />
          <CustomField
            name={'description'}
            control={control}
            rules={{}}
            label={'Описание сообщества'}
            placeholder={'Введите описание сообщества...'}
            isFullWidth={true}
          />
          <Divider />
          <div className="groups-form-btns">
            <Button variant="outlined" onClick={handleClose}>
              закрить
            </Button>
            <Button type="submit" variant="contained">
              {group ? 'обновить' : 'создать'}
            </Button>
          </div>
        </form>
      </LocalizationProvider>
    </Dialog>
  );
};

export default ModalCreateGroup;

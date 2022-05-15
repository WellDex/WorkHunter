import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {Button, List, ListItem, ListItemButton} from '@mui/material';
import React from 'react';
import {useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {profileAPI} from '../api/profileAPI';
import CareerForm from '../components/settings/CareerForm';
import EducationForm from '../components/settings/EducationForm';
import MainForm from '../components/settings/MainForm';
import SkillsForm from '../components/settings/SkillsForm';
import FrameHoc from '../hoc/FrameHoc';
import {setMessage} from '../Redux/app/appOperations';
import {IStateProfile} from '../Redux/profile/profileReducer';
import * as profileSelectors from '../Redux/profile/profileSelectors';

interface ISweetcher {
  setCurrentForm: (s: string) => void;
}

const FormMenuComponent = ({setCurrentForm}: ISweetcher) => {
  return (
    <div style={{borderLeft: '1px solid rgba(0, 0, 0, 0.12)'}}>
      <List>
        <ListItem>
          <ListItemButton onClick={() => setCurrentForm('main')}>
            Основоное
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => setCurrentForm('education')}>
            Образование
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => setCurrentForm('career')}>
            Карьера
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => setCurrentForm('skills')}>
            Навыки
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

const FormMenuFrame = FrameHoc(FormMenuComponent);

interface IFormProps {
  handleSubmit: any;
  onSubmit: any;
  checkCurrentPage: () => void;
}

const Form = ({handleSubmit, onSubmit, checkCurrentPage}: IFormProps) => (
  <form className="card-container settings" onSubmit={handleSubmit(onSubmit)}>
    {checkCurrentPage()}
    <Button variant="contained" type="submit">
      Сохранить
    </Button>
  </form>
);
const FormFrame = FrameHoc(Form);

interface ISettings {
  profile: IStateProfile;
}

const SettingContainer = ({profile}: ISettings) => {
  const [currentForm, setCurrentForm] = useState<string>('main');
  const {handleSubmit, control} = useForm({
    defaultValues: profile,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const {
    fields: fieldsCareer,
    append: appendCareer,
    remove: removeCareer,
  } = useFieldArray({
    control,
    name: 'career',
  });
  const {
    fields: fieldsUniversity,
    append: appendUniversity,
    remove: removeUniversity,
  } = useFieldArray({
    control,
    name: 'university',
  });
  const {
    fields: fieldsSchool,
    append: appendSchool,
    remove: removeSchool,
  } = useFieldArray({
    control,
    name: 'school',
  });
  const {
    fields: fieldsSkills,
    append: appendSkills,
    remove: removeSkills,
  } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await profileAPI.updateProfile(data as any);
      if (res) {
        setMessage({message: res.message, type: 'success'});
      }
    } catch (error) {
      //@ts-ignore
      setMessage({message: error, type: 'error'});
    }
  };

  const checkCurrentPage = () => {
    switch (currentForm) {
      case 'main':
        return <MainForm control={control} profile={profile} />;
        break;
      case 'career':
        return (
          <CareerForm
            control={control}
            fields={fieldsCareer}
            append={appendCareer}
            remove={removeCareer}
          />
        );
        break;
      case 'education':
        return (
          <EducationForm
            control={control}
            fieldsUniversity={fieldsUniversity}
            appendUniversity={appendUniversity}
            removeUniversity={removeUniversity}
            fieldsSchool={fieldsSchool}
            appendSchool={appendSchool}
            removeSchool={removeSchool}
          />
        );
        break;
      case 'skills':
        return (
          <SkillsForm
            control={control}
            fields={fieldsSkills}
            append={appendSkills}
            remove={removeSkills}
          />
        );
        break;

      default:
        return <MainForm control={control} profile={profile} />;
        break;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{display: 'flex', gap: '1rem'}}>
        <FormFrame
          onSubmit={onSubmit}
          checkCurrentPage={checkCurrentPage}
          handleSubmit={handleSubmit}
        />
        <FormMenuFrame setCurrentForm={setCurrentForm} />
      </div>
    </LocalizationProvider>
  );
};

const mapStateToProps = (state: any) => ({
  profile: profileSelectors.getProfile(state),
});

const SettingPage = connect(mapStateToProps)(SettingContainer);

export default SettingPage;

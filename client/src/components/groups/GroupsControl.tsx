import {
  Autocomplete,
  Divider,
  Fab,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from '@mui/material';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ModalCreateGroup from './ModalCreateGroup';
import {GROUPS_PATH, MY_GROUPS_PATH} from '../../route/const';
import {IGroup} from '../../Redux/groups/groupsReducer';

interface IGroupControl {
  groups: IGroup[];
  setSearchValue: (s: string) => void;
}

const GroupsControl = ({groups, setSearchValue}: IGroupControl) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(
    history.location.pathname.includes(MY_GROUPS_PATH) ? 0 : 1
  );

  return (
    <>
      <Tabs
        value={value}
        onChange={(event, value) => setValue(value)}
        variant="fullWidth">
        <Tab
          className="users-control"
          label="Мои сообщества"
          onClick={() => history.push(MY_GROUPS_PATH)} //todo
        />
        <Tab
          className="users-control"
          label="Сообщества"
          onClick={() => history.push(GROUPS_PATH)}
        />
      </Tabs>
      <Divider />
      <Autocomplete
        freeSolo
        className="users-search"
        onInputChange={(e, value) => setSearchValue(value)}
        options={groups.map((group) => group.title)}
        renderInput={(params) => (
          <TextField {...params} placeholder="Поиск..." />
        )}
      />
      <Divider />
      <Tooltip
        title="Создать сообщество"
        style={{position: 'absolute', bottom: '3rem', right: '3rem'}}
        placement="top">
        <Fab color="primary" size="large" onClick={() => setIsOpen(true)}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <ModalCreateGroup open={isOpen} handleClose={() => setIsOpen(false)} />
    </>
  );
};

export default GroupsControl;

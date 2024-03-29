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
  userId: string;
  setSearchValue: (s: string) => void;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const GroupsControl = ({
  groups,
  setSearchValue,
  userId,
  setLoading,
  setMessage,
}: IGroupControl) => {
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
          onClick={() => history.push(`${MY_GROUPS_PATH}/${userId}`)}
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
        options={groups.length > 0 ? groups.map((group) => group.title) : []}
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
      {isOpen && (
        <ModalCreateGroup
          setMessage={setMessage}
          open={isOpen}
          handleClose={() => setIsOpen(false)}
          setLoading={setLoading}
        />
      )}
    </>
  );
};

export default GroupsControl;

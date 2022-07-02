import {Autocomplete, Divider, Tab, Tabs, TextField} from '@mui/material';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {FRIENDS_PATH, USERS_PATH} from '../../route/const';
import * as appSelectors from '../../Redux/app/appSelectors';
import {connect} from 'react-redux';
import {IUser} from '../../Redux/users/usersReducer';

interface IUserControl {
  userId?: string;
  users: IUser[];
  setSearchValue: (s: string) => void;
}

const UsersControlContainer = ({
  userId,
  users,
  setSearchValue,
}: IUserControl) => {
  const history = useHistory();
  const [value, setValue] = useState(
    history.location.pathname.includes(FRIENDS_PATH) ? 0 : 1
  );

  return (
    <>
      <Tabs
        value={value}
        onChange={(event, value) => setValue(value)}
        variant="fullWidth">
        <Tab
          className="users-control"
          label="Друзья"
          onClick={() => history.push(`${FRIENDS_PATH}/${userId}`)}
        />
        <Tab
          className="users-control"
          label="Поиск Друзей"
          onClick={() => history.push(USERS_PATH)}
        />
      </Tabs>
      <Divider />
      <Autocomplete
        freeSolo
        className="users-search"
        onInputChange={(e, value) => setSearchValue(value)}
        options={users.map((user) => `${user.firstName} ${user.lastName}`)}
        renderInput={(params) => (
          <TextField {...params} placeholder="Поиск..." />
        )}
      />
      <Divider />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userId: appSelectors.getUserId(state),
});

const UsersControl = connect(mapStateToProps, {})(UsersControlContainer);

export default UsersControl;

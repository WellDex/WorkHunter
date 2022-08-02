import {Divider, Tab, Tabs} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {
  FREELANCE_ACCEPT_PATH,
  FREELANCE_ALL_PATH,
  FREELANCE_MY_PATH,
} from '../../route/const';

const Control = () => {
  const [value, setValue] = useState(0);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === FREELANCE_ALL_PATH) {
      setValue(0);
    } else if (location.pathname === FREELANCE_ACCEPT_PATH) {
      setValue(1);
    } else {
      setValue(2);
    }
  }, [location.pathname]);

  return (
    <>
      <Tabs
        value={value}
        onChange={(event, value) => setValue(value)}
        variant="fullWidth">
        <Tab
          className="users-control"
          label="Фриланс-проекты"
          onClick={() => history.push(FREELANCE_ALL_PATH)}
        />
        <Tab
          className="users-control"
          label="Принятые проекты"
          onClick={() => history.push(FREELANCE_ACCEPT_PATH)}
        />
        <Tab
          className="users-control"
          label="Мои проекты"
          onClick={() => history.push(FREELANCE_MY_PATH)}
        />
      </Tabs>
      <Divider />
    </>
  );
};

export default Control;

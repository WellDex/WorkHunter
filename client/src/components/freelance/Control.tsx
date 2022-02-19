import {Divider, Tab, Tabs} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

const Control = () => {
  const [value, setValue] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname.includes('employee')) {
      setValue(0);
    }
  }, [history.location.pathname]);

  return (
    <>
      <Tabs
        value={value}
        onChange={(event, value) => setValue(value)}
        variant="fullWidth">
        <Tab
          className="users-control"
          label="Фриланс-проекты"
          onClick={() => history.push('/freelance/projects')}
        />
        <Tab
          className="users-control"
          label="Мои проекты"
          onClick={() => history.push('/freelance/my_projects')}
        />
      </Tabs>
      <Divider />
    </>
  );
};

export default Control;

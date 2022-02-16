import {Button, Divider, Tab, Tabs} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';

interface IParams {
  role: string;
}

const Control = () => {
  const params: IParams = useParams();
  const [isEmployer, setIsEmployer] = useState(params.role === 'employer');
  const [value, setValue] = useState(0);
  const history = useHistory();

  useEffect(() => {
    setIsEmployer(params.role === 'employer');
  }, [params]);

  return (
    <>
      <Tabs
        value={value}
        onChange={(event, value) => setValue(value)}
        variant="fullWidth">
        <Tab
          className="users-control"
          label="Фриланс-проекты"
          onClick={() => history.push('/freelance/employee')}
        />
        <Tab
          className="users-control"
          label="Мои проекты"
          onClick={() => history.push('/freelance/employer')}
        />
      </Tabs>
      <Divider />
    </>
  );
};

export default Control;

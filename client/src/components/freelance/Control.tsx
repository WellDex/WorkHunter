import {Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

interface IParams {
  role: string;
}

const Control = () => {
  const params: IParams = useParams();
  const [isEmployer, setIsEmployer] = useState(params.role === 'employer');

  useEffect(() => {
    setIsEmployer(params.role === 'employer');
  }, [params]);

  return (
    <div className="card-container freelance-control">
      <Link to={'/freelance/employee'}>
        <Button variant={isEmployer ? 'outlined' : 'contained'}>
          Фриланс-проекты
        </Button>
      </Link>
      {isEmployer ? <h2>Мои проекты</h2> : <h2>Фриланс-проекты</h2>}
      <Link to={'/freelance/employer'}>
        <Button variant={isEmployer ? 'contained' : 'outlined'}>
          Мои проекты
        </Button>
      </Link>
    </div>
  );
};

export default Control;

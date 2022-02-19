import {Button, Tooltip} from '@mui/material';
import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import ProjectsList from './ProjectsList';
import ModalCreateProject from './ModalCreateProject';

const createData = (
  title: string,
  budget: number,
  rates: number,
  date: string
) => {
  return {title, budget, rates, date};
};

const rows = [
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
];

const Employer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card-container">
      <div className="freelance-employer-head">
        <h1 className="freelance-employer-head-title">Мои проекты</h1>
        <Tooltip title="Создать проект" placement="left">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => setIsOpen(true)}>
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
      <ProjectsList rows={rows} />
      <ModalCreateProject open={isOpen} handleClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Employer;

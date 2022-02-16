import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import {useHistory} from 'react-router-dom';

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
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
  createData('project1', 1000, 12, '12/06'),
];

const Employee = () => {
  const history = useHistory();
  return (
    <div className="card-container">
      <TableContainer className="freelance-table-container customScroll">
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Фриланс-проект</TableCell>
              <TableCell align="center">Бюджет</TableCell>
              <TableCell align="center">Ставок</TableCell>
              <TableCell align="center">Открыт</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                hover={true}
                onClick={() => history.push('/freelance/project/1')}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell className="freelance-table-cell-title">
                  {row.title}
                </TableCell>
                <TableCell
                  className="freelance-table-cell-budget"
                  align="center">
                  {row.budget + '$'}
                </TableCell>
                <TableCell
                  className="freelance-table-cell-rates"
                  align="center">
                  {row.rates}
                </TableCell>
                <TableCell className="freelance-table-cell-date" align="center">
                  {row.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Employee;

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

const ProjectsList = ({rows}: any) => {
  const history = useHistory();

  return (
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
          {rows.map((row: any, index: number) => (
            <TableRow
              key={index}
              hover={true}
              onClick={() => history.push('/freelance/project/1')}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}>
              <TableCell className="freelance-table-cell-title">
                {row.title}
              </TableCell>
              <TableCell className="freelance-table-cell-budget" align="center">
                {row.budget + '$'}
              </TableCell>
              <TableCell className="freelance-table-cell-rates" align="center">
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
  );
};

export default ProjectsList;

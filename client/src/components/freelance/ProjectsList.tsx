import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {useHistory} from 'react-router-dom';
import NoData from '../common/NoData';

const ProjectsList = ({rows, isShowActions, onDelete}: any) => {
  const history = useHistory();

  return (
    <TableContainer className="freelance-table-container customScroll">
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Фріланс-проект</TableCell>
            <TableCell align="center">Бюджет</TableCell>
            <TableCell align="center">Ставок</TableCell>
            <TableCell align="center">Відкритий</TableCell>
            {isShowActions && <TableCell align="center" />}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row: any, index: number) => (
              <TableRow
                key={index}
                hover={true}
                onClick={() => history.push(`/freelance/project/${row._id}`)}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell className="freelance-table-cell-title">
                  {row.title}
                </TableCell>
                <TableCell
                  className="freelance-table-cell-budget"
                  align="center">
                  {row.budjet + '$'}
                </TableCell>
                <TableCell
                  className="freelance-table-cell-rates"
                  align="center">
                  {row.rate.length}
                </TableCell>
                <TableCell className="freelance-table-cell-date" align="center">
                  {moment(row.date).format('DD/MM')}
                </TableCell>
                {isShowActions && (
                  <TableCell align="center">
                    <IconButton
                      size="large"
                      onClick={(e) => onDelete(e, row._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!rows.length && <NoData />}
    </TableContainer>
  );
};

export default ProjectsList;

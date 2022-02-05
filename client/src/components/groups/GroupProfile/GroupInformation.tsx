import {Divider, Table, TableBody, TableCell, TableRow} from '@mui/material';
import React from 'react';
import FrameHoc from '../../../hoc/FrameHoc';

const GroupInformation = () => {
  return (
    <div className="card-container">
      <div className="title">
        <h2>WellDex Group</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  );
};

export default FrameHoc(GroupInformation);

import {Divider, Table, TableBody, TableCell, TableRow} from '@mui/material';
import React from 'react';
import FrameHoc from '../../hoc/FrameHoc';
import {IStateProfile} from '../../Redux/profile/profileReducer';

const ProfileInformation = (props: IStateProfile) => {
  const {firstName, lastName, isOnline} = props;
  return (
    <div className="card-container">
      <div className="profile-status">{isOnline ? 'online' : 'offline'}</div>
      <div className="title">
        <h2>{`${firstName} ${lastName}`}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <Divider className="divider" />
      <Table className="profile-info-table">
        <TableBody>
          <TableRow>
            <TableCell className="profile-info-table-row-title">день</TableCell>
            <TableCell>rb]d</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell className="profile-info-table-row-title">день</TableCell>
            <TableCell>kuiv</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell className="profile-info-table-row-title">день</TableCell>
            <TableCell>19.06.2000</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell className="profile-info-table-row-title">день</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell className="profile-info-table-row-title">день</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Divider className="divider" />
      <ul className="profile-info-list">
        <li className="profile-info-list-item">
          <span className="profile-info-list-count">46</span> друзей
        </li>
        <li className="profile-info-list-item">
          <span className="profile-info-list-count">46</span> друзей
        </li>
        <li className="profile-info-list-item">
          <span className="profile-info-list-count">46</span> друзей
        </li>
        <li className="profile-info-list-item">
          <span className="profile-info-list-count">46</span> друзей
        </li>
        <li className="profile-info-list-item">
          <span className="profile-info-list-count">46</span> друзей
        </li>
      </ul>
    </div>
  );
};

export default FrameHoc(ProfileInformation);

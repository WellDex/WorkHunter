import {
  Avatar,
  Chip,
  IconButton,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {adminAPI} from '../../api/adminAPI';
import FrameHoc from '../../hoc/FrameHoc';
import {IStateProfile} from '../../Redux/profile/profileReducer';
import {PROFILE_PATH} from '../../route/const';
import {getImgUrl} from '../../utils/getImgUrl';
import BlockIcon from '@mui/icons-material/Block';
import PersonOffIcon from '@mui/icons-material/PersonOff';

const UsersPage = () => {
  const [users, setUsers] = useState<IStateProfile[]>([]);
  useEffect(() => {
    adminAPI.getUsers().then(setUsers);
  }, []);

  const blockToogle = async (id: string, isBlocked: boolean) =>
    await adminAPI
      .blockUserToogle(id, isBlocked)
      .then(async () => await adminAPI.getUsers().then(setUsers));

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Avatar</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Rating</TableCell>
          <TableCell>BirthDate</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Skills</TableCell>
          <TableCell align="right" />
        </TableRow>
      </TableHead>
      <TableBody>
        {users.length > 0 &&
          users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.avatar ? (
                  <Avatar src={getImgUrl(user.avatar)} sizes="small" />
                ) : (
                  <Avatar sizes="small" />
                )}
              </TableCell>
              <TableCell>
                <Link to={`${PROFILE_PATH}/${user.id}`}>
                  {`${user.firstName} ${user.lastName}`}
                </Link>
              </TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Rating
                  name="rating"
                  defaultValue={0}
                  precision={0.5}
                  value={user.rating || 0}
                  readOnly
                />
              </TableCell>
              <TableCell>
                {moment(user.birthDate).locale('ru').format('DD MMMM YYYY')}
              </TableCell>
              <TableCell>{user.city}</TableCell>
              <TableCell>
                {user.skills.map((item, index) => (
                  <Chip key={index} label={item.name} />
                ))}
              </TableCell>
              <TableCell align="right">
                {user.isBlocked ? (
                  <IconButton
                    onClick={() => user.id && blockToogle(user.id, false)}>
                    <PersonOffIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => user.id && blockToogle(user.id, true)}>
                    <BlockIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default FrameHoc(UsersPage);

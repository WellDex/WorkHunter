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
import {setLoading} from '../../Redux/app/appOperations';
import {connect} from 'react-redux';

interface IUsersPage {
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
}

const UsersPage = ({setLoading, setMessage}: IUsersPage) => {
  const [users, setUsers] = useState<IStateProfile[]>([]);
  useEffect(() => {
    setLoading(true);
    adminAPI
      .getUsers()
      .then(setUsers)
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  }, []);

  const blockToogle = async (id: string, isBlocked: boolean) => {
    setLoading(true);
    await adminAPI
      .blockUserToogle(id, isBlocked)
      .then(async (res) => {
        setMessage({message: res.message, type: 'success'});
        await adminAPI
          .getUsers()
          .then(setUsers)
          .catch((e: any) => {
            setMessage({message: e.response.data.message, type: 'error'});
          });
      })
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  };

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

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  setLoading,
};

export default FrameHoc(
  connect(mapStateToProps, mapDispatchToProps)(UsersPage)
);

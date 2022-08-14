import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {adminAPI} from '../../api/adminAPI';
import FrameHoc from '../../hoc/FrameHoc';
import {IGroup} from '../../Redux/groups/groupsReducer';
import {GROUP_PATH} from '../../route/const';
import {getImgUrl} from '../../utils/getImgUrl';

const GroupsPage = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  useEffect(() => {
    adminAPI.getGroups().then(setGroups);
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Avatar</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Subscribers</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {groups.length > 0 &&
          groups.map((group, index) => (
            <TableRow key={index}>
              <TableCell>
                {group.avatar ? (
                  <Avatar src={getImgUrl(group.avatar)} sizes="small" />
                ) : (
                  <Avatar sizes="small" />
                )}
              </TableCell>
              <TableCell>
                <Link to={`${GROUP_PATH}/${group._id}`}>{group.title}</Link>
              </TableCell>
              <TableCell>{group.description}</TableCell>
              <TableCell>{group.subscribers.length}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default FrameHoc(GroupsPage);
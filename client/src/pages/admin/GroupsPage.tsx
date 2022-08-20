import {
  Avatar,
  IconButton,
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
import BlockIcon from '@mui/icons-material/Block';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {connect} from 'react-redux';
import {setLoading} from '../../Redux/app/appOperations';

interface IGroupsPage {
  setLoading: (b: boolean) => void;
}

const GroupsPage = ({setLoading}: IGroupsPage) => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  useEffect(() => {
    setLoading(true);
    adminAPI
      .getGroups()
      .then(setGroups)
      .finally(() => setLoading(false));
  }, []);

  const blockToogle = async (id: string, isBlocked: boolean) => {
    setLoading(true);
    await adminAPI
      .blockGroupToogle(id, isBlocked)
      .then(async () => await adminAPI.getGroups().then(setGroups))
      .finally(() => setLoading(false));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Avatar</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Subscribers</TableCell>
          <TableCell align="right" />
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
              <TableCell align="right">
                {group.isBlocked ? (
                  <IconButton onClick={() => blockToogle(group._id, false)}>
                    <PersonOffIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => blockToogle(group._id, true)}>
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
  connect(mapStateToProps, mapDispatchToProps)(GroupsPage)
);

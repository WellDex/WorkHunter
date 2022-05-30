import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';
import {IGroup} from '../../Redux/groups/groupsReducer';

interface IGroupsListProps {
  groups: IGroup[];
}

const GroupsList = ({groups}: IGroupsListProps) => {
  return (
    <List className="groups-list">
      {groups.length > 0 &&
        groups.map((group) => (
          <>
            <ListItem className="groups-list-item">
              <Link to={`/group/${group._id}`} className="groups-link">
                <ListItemAvatar className="groups-list-item-avatar">
                  <Avatar className="groups-avatar" />
                </ListItemAvatar>
                <ListItemText
                  primary={group.title}
                  secondary={group.description}
                />
              </Link>
            </ListItem>
            <Divider />
          </>
        ))}
    </List>
  );
};

export default GroupsList;

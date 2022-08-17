import {Divider, List} from '@mui/material';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Messenger from '../components/messenger/Messenger';
import ChatItem from '../components/messenger/ChatItem';
import FrameHoc from '../hoc/FrameHoc';
import * as appSelectors from '../Redux/app/appSelectors';
import * as messengerSelectors from '../Redux/messenger/messengerSelectors';
import * as profileSelectors from '../Redux/profile/profileSelectors';
import {getChats, getUsers} from '../Redux/messenger/messengerOperations';
import {IChat, IChatUser} from '../Redux/messenger/messengerReducer';
import {Route} from 'react-router-dom';
import {MESSENGER_PATH} from '../route/const';
import {IStateProfile} from '../Redux/profile/profileReducer';
import {getProfile} from '../Redux/profile/profileOperations';
import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeList} from 'react-window';
import NoData from '../components/common/NoData';

interface IMessengerPage {
  userId: string;
  getChats: (id: string) => void;
  getProfile: (id: string) => void;
  chats: IChat[];
  getUsers: () => void;
  users: IChatUser[];
  profile: IStateProfile;
}

const MessengerContainer = ({
  userId,
  getChats,
  getUsers,
  chats,
  users,
  profile,
  getProfile,
}: IMessengerPage) => {
  useEffect(() => {
    getChats(userId);
    getUsers();
    getProfile(userId);
  }, []);

  const Row = ({index, style}: any) => {
    return (
      <div style={style}>
        <ChatItem
          key={index}
          chat={chats[index]}
          user={
            users.find((user) => chats[index].members.includes(user._id)) ||
            null
          }
        />
      </div>
    );
  };

  if (!chats.length) {
    return <NoData />;
  }

  return (
    <div className="messenger">
      <AutoSizer>
        {({height, width}) => (
          <FixedSizeList
            className="customScroll"
            height={height}
            width={352}
            itemSize={76}
            itemCount={chats.length}>
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
      <Divider
        orientation="vertical"
        flexItem={true}
        style={{marginLeft: '352px'}}
      />
      <Route
        path={`${MESSENGER_PATH}/:id`}
        component={() => (
          <Messenger
            userId={userId}
            profile={profile}
            users={users}
            chats={chats}
          />
        )}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userId: appSelectors.getUserId(state),
  profile: profileSelectors.getProfile(state),
  chats: messengerSelectors.getChats(state),
  users: messengerSelectors.getUsers(state),
});

const mapDispatchToProps = {
  getChats,
  getUsers,
  getProfile,
};

const MessengerPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessengerContainer);

export default FrameHoc(MessengerPage);

import {Divider, List} from '@mui/material';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Messenger from '../components/messenger/Messenger';
import ChatItem from '../components/messenger/ChatItem';
import FrameHoc from '../hoc/FrameHoc';
import * as appSelectors from '../Redux/app/appSelectors';
import * as messengerSelectors from '../Redux/messenger/messengerSelectors';
import * as profileSelectors from '../Redux/profile/profileSelectors';
import {getChats, getUser} from '../Redux/messenger/messengerOperations';
import {IChat, IChatUser} from '../Redux/messenger/messengerReducer';
import {Route, useHistory} from 'react-router-dom';
import {MESSENGER_PATH} from '../route/const';
import {IStateProfile} from '../Redux/profile/profileReducer';

interface IMessengerPage {
  userId: string;
  getChats: (id: string, history: any) => void;
  chats: IChat[];
  getUser: (id: string) => void;
  user: IChatUser;
  profile: IStateProfile;
}

const MessengerContainer = ({
  userId,
  getChats,
  getUser,
  chats,
  user,
  profile,
}: IMessengerPage) => {
  const history = useHistory();
  useEffect(() => {
    getChats(userId, history);
  }, []);

  return (
    <div className="messenger">
      <List className="messenger-chatsList customScroll">
        {chats &&
          chats.length > 0 &&
          chats.map((chat: IChat, index) => (
            <ChatItem
              key={index}
              chat={chat}
              userId={userId}
              getUser={getUser}
              user={user}
            />
          ))}
      </List>
      <Divider orientation="vertical" flexItem={true} />
      <Route
        path={`${MESSENGER_PATH}/:id`}
        component={() => (
          <Messenger
            userId={userId}
            profile={profile}
            user={user}
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
  user: messengerSelectors.getUser(state),
});

const mapDispatchToProps = {
  getChats,
  getUser,
};

const MessengerPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessengerContainer);

export default FrameHoc(MessengerPage);

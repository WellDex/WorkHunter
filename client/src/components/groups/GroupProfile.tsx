import React from 'react';
import GroupAvatar from './GroupProfile/GroupAvatar';
import GroupGallery from './GroupProfile/GroupGallery';
import GroupInformation from './GroupProfile/GroupInformation';
import GroupsNotes from './GroupProfile/GroupsNotes';
import GroupsSubscribers from './GroupProfile/GroupsSubscribers';

const GroupProfile = () => {
  return (
    <div className="groupProfile">
      <div className="groupProfile-col">
        <GroupInformation />
        <GroupGallery />
        <GroupsNotes />
      </div>
      <div className="groupProfile-col">
        <GroupAvatar />
        <GroupsSubscribers />
      </div>
    </div>
  );
};

export default GroupProfile;

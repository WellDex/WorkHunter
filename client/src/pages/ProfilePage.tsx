import React from 'react';
import ProfileAvatar from '../components/profile/ProfileAvatar';
import ProfileFriends from '../components/profile/ProfileFriends';
import ProfileGallery from '../components/profile/ProfileGallery';
import ProfileInformation from '../components/profile/ProfileInformation';
import ProfileNotes from '../components/profile/ProfileNotes';

const ProfilePage = () => {
  return (
    <div className="profile">
      <div className="profile-col">
        <ProfileAvatar />
        <ProfileFriends />
      </div>
      <div className="profile-col">
        <ProfileInformation />
        <ProfileGallery />
        <ProfileNotes />
      </div>
    </div>
  );
};

export default ProfilePage;

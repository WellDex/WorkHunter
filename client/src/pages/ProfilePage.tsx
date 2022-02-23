import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import ProfileAvatar from '../components/profile/ProfileAvatar';
import ProfileFriends from '../components/profile/ProfileFriends';
import ProfileGallery from '../components/profile/ProfileGallery';
import ProfileInformation from '../components/profile/ProfileInformation';
import ProfileNotes from '../components/profile/ProfileNotes';
import * as profileSelectors from '../Redux/profile/profileSelectors';
import {getProfile} from '../Redux/profile/profileOperations';
import {IStateProfile} from '../Redux/profile/profileReducer';

interface IProfile {
  profile: IStateProfile;
  getProfile: () => void;
}

const ProfileContainer = ({profile, getProfile}: IProfile) => {
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="profile">
      <div className="profile-col">
        <ProfileAvatar />
        <ProfileFriends />
      </div>
      <div className="profile-col">
        <ProfileInformation {...profile} />
        <ProfileGallery />
        <ProfileNotes />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  profile: profileSelectors.getProfile(state),
});

const mapDispatchToProps = {
  getProfile,
};

const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);

export default ProfilePage;

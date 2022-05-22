import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import ProfileAvatar from '../components/profile/ProfileAvatar';
import ProfileFriends from '../components/profile/ProfileFriends';
import ProfileGallery from '../components/profile/ProfileGallery';
import ProfileInformation from '../components/profile/ProfileInformation';
import ProfileNotes from '../components/profile/ProfileNotes';
import * as profileSelectors from '../Redux/profile/profileSelectors';
import * as notesSelectors from '../Redux/notes/notesSelectors';
import {getProfile} from '../Redux/profile/profileOperations';
import {IStateProfile} from '../Redux/profile/profileReducer';
import {INote} from '../Redux/notes/notesReducer';
import {getNotes} from '../Redux/notes/notesOperations';

interface IProfile {
  profile: IStateProfile;
  getProfile: () => void;
  notes: INote[];
  getNotes: () => void;
}

const ProfileContainer = ({profile, getProfile, notes, getNotes}: IProfile) => {
  useEffect(() => {
    getProfile();
    getNotes();
  }, []);

  return (
    <div className="profile">
      <div className="profile-col">
        <ProfileAvatar img={''} />
        <ProfileFriends countFriends={profile.friends.length} />
      </div>
      <div className="profile-col">
        <ProfileInformation {...profile} />
        <ProfileGallery />
        <ProfileNotes notes={notes} profile={profile} getNotes={getNotes} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  profile: profileSelectors.getProfile(state),
  notes: notesSelectors.getNotes(state),
});

const mapDispatchToProps = {
  getProfile,
  getNotes,
};

const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);

export default ProfilePage;

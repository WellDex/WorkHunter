import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import ProfileAvatar from '../components/profile/ProfileAvatar';
import ProfileFriends from '../components/profile/ProfileFriends';
import ProfileGallery from '../components/profile/ProfileGallery';
import ProfileInformation from '../components/profile/ProfileInformation';
import ProfileNotes from '../components/profile/ProfileNotes';
import * as profileSelectors from '../Redux/profile/profileSelectors';
import * as notesSelectors from '../Redux/notes/notesSelectors';
import * as appSelectors from '../Redux/app/appSelectors';
import {getProfile} from '../Redux/profile/profileOperations';
import {IStateProfile} from '../Redux/profile/profileReducer';
import {INote} from '../Redux/notes/notesReducer';
import {getNotes} from '../Redux/notes/notesOperations';
import {useParams} from 'react-router-dom';
import ProfileGroups from '../components/profile/ProfileGroups';
import ProfilePortfolio from '../components/profile/ProfilePortfolio';
import {portfolioAPI} from '../api/portfolioAPI';

interface IProfile {
  profile: IStateProfile;
  notes: INote[];
  getProfile: (id: string) => void;
  getNotes: (id: string) => void;
  userId: string;
}

const options = {
  top: 6,
  count: true,
};

const ProfileContainer = ({
  profile,
  getProfile,
  notes,
  getNotes,
  userId,
}: IProfile) => {
  const params: {id: string} = useParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [countProjects, setCountProjects] = useState<number>(0);

  useEffect(() => {
    getProfile(params.id);
    getNotes(params.id);
    portfolioAPI.getPortfolio(params.id, options).then((res) => {
      if (res.portfolio && res.count) {
        setProjects(res.portfolio);
        setCountProjects(res.count);
      }
    });
  }, [params.id]);

  return (
    <div className="profile">
      <div className="profile-col">
        <ProfileAvatar
          img={''}
          isOwner={params.id === userId}
          userId={userId}
        />
        <ProfileFriends id={params.id} countFriends={profile.friends.length} />
        <ProfileGroups id={params.id} countGroups={profile.groups.length} />
        <ProfilePortfolio
          id={params.id}
          projects={projects}
          countProjects={countProjects}
        />
      </div>
      <div className="profile-col">
        <ProfileInformation {...profile} countProjects={countProjects} />
        <ProfileGallery id={params.id} />
        <ProfileNotes
          userId={userId}
          notes={notes}
          profile={profile}
          getNotes={() => getNotes(params.id)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  profile: profileSelectors.getProfile(state),
  notes: notesSelectors.getNotes(state),
  userId: appSelectors.getUserId(state),
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

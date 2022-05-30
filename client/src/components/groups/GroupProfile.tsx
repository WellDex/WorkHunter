import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {IGroup} from '../../Redux/groups/groupsReducer';
import GroupAvatar from './GroupProfile/GroupAvatar';
import GroupGallery from './GroupProfile/GroupGallery';
import GroupInformation from './GroupProfile/GroupInformation';
import GroupsNotes from './GroupProfile/GroupNotes';
import GroupsSubscribers from './GroupProfile/GroupSubscribers';
import * as groupsSelectors from '../../Redux/groups/groupsSelectors';
import * as notesSelectors from '../../Redux/notes/notesSelectors';
import * as appSelectors from '../../Redux/app/appSelectors';
import {useParams} from 'react-router-dom';
import {getGroup} from '../../Redux/groups/groupsOperations';
import {getNotes} from '../../Redux/notes/notesOperations';
import {INote} from '../../Redux/notes/notesReducer';
import ModalSubscribers from './GroupProfile/ModalSubscribers';

interface IGroupProfileProps {
  group: IGroup;
  notes: INote[];
  getGroup: (id: string) => void;
  getNotes: (id: string) => void;
  userId: string;
}

const GroupProfileContainer = ({
  group,
  getGroup,
  getNotes,
  userId,
  notes,
}: IGroupProfileProps) => {
  const params: {id: string} = useParams();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    getGroup(params.id);
    getNotes(params.id);
  }, [params.id]);

  return (
    <div className="groupProfile">
      <div className="groupProfile-col">
        <GroupInformation group={group} />
        <GroupGallery />
        <GroupsNotes
          userId={userId}
          notes={notes}
          profile={group}
          getNotes={() => getNotes(params.id)}
        />
      </div>
      <div className="groupProfile-col">
        <GroupAvatar
          group={group}
          userId={userId}
          getGroup={() => getGroup(params.id)}
        />
        <GroupsSubscribers
          setOpenModal={() => setOpenModal(true)}
          groupId={group._id}
          subscribers={group.subscribers}
        />
      </div>
      {openModal && (
        <ModalSubscribers
          open={openModal}
          handleClose={() => setOpenModal(false)}
          isOwner={group.owner === userId}
          groupId={group._id}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  group: groupsSelectors.getGroups(state),
  notes: notesSelectors.getNotes(state),
  userId: appSelectors.getUserId(state),
});

const mapDispatchToProps = {
  getGroup,
  getNotes,
};

const GroupProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupProfileContainer);

export default GroupProfile;

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
import {IGallery} from '../../pages/GalleryPage';
import {galleryAPI} from '../../api/galleryAPI';
import {setLoading, setMessage} from '../../Redux/app/appOperations';

interface IGroupProfileProps {
  group: IGroup;
  notes: INote[];
  getGroup: (id: string) => void;
  getNotes: (id: string) => void;
  setLoading: (b: boolean) => void;
  setMessage: (a: any) => void;
  userId: string;
}

const GroupProfileContainer = ({
  group,
  getGroup,
  getNotes,
  userId,
  notes,
  setLoading,
  setMessage,
}: IGroupProfileProps) => {
  const params: {id: string} = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [gallery, setGallery] = useState<IGallery[]>([]);
  const [countGallery, setCountGallery] = useState<number>(0);

  useEffect(() => {
    getGroup(params.id);
    getNotes(params.id);
    setLoading(true);
    galleryAPI
      .getGallery(params.id, {top: 4, count: true})
      .then((res) => {
        if (res.gallery && res.count) {
          setGallery(res.gallery);
          setCountGallery(res.count);
        }
      })
      .catch((e: any) => {
        setMessage({message: e.response.data.message, type: 'error'});
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div className="groupProfile">
      <div className="groupProfile-col">
        <GroupInformation group={group} />
        <GroupGallery
          id={params.id}
          gallery={gallery}
          countGallery={countGallery}
        />
        <GroupsNotes
          userId={userId}
          notes={notes}
          profile={group}
          getNotes={() => getNotes(params.id)}
          setLoading={setLoading}
          setMessage={setMessage}
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
          setLoading={setLoading}
        />
      </div>
      {openModal && (
        <ModalSubscribers
          setMessage={setMessage}
          setLoading={setLoading}
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
  setLoading,
  setMessage,
};

const GroupProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupProfileContainer);

export default GroupProfile;

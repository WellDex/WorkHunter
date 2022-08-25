import React, {useEffect, useRef, useState} from 'react';
import {IGroup} from '../../../Redux/groups/groupsReducer';
import {INote} from '../../../Redux/notes/notesReducer';
import CreateNote from '../../note/CreateNote';
import Note from '../../note/Note';
import AutoSizer from 'react-virtualized-auto-sizer';
import {VariableSizeList} from 'react-window';
import NoData from '../../common/NoData';

interface IGroupNotes {
  notes: INote[];
  profile: IGroup;
  getNotes: () => void;
  userId: string;
}

const GroupNotes = ({notes, profile, getNotes, userId}: IGroupNotes) => {
  const listRef = useRef<any>({});
  const rowHeights = useRef<any>({});
  const [totalHeight, setTotalHeight] = useState(0);

  const getRowHeight = (index: any) => {
    return rowHeights.current[index] + 8 || 82;
  };

  const Row = ({index, style}: any) => {
    const rowRef = useRef<any>({});

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
    }, [rowRef]);

    return (
      <div style={style}>
        <Note
          rowRef={rowRef}
          key={index}
          note={notes[index]}
          profile={profile}
          getNotes={getNotes}
          isOwner={profile.owner === userId}
          isGroup={true}
          userId={userId}
        />
      </div>
    );
  };

  const setRowHeight = (index: any, size: any) => {
    listRef.current.resetAfterIndex(0);
    rowHeights.current = {...rowHeights.current, [index]: size};
  };

  useEffect(() => {
    if (rowHeights.current) {
      const keys = Object.keys(rowHeights.current);

      const total = keys.reduceRight((prev, current) => {
        return prev + +rowHeights.current[current] + 10;
      }, 0);
      setTotalHeight(total);
    }
  }, [rowHeights, notes]);

  return (
    <>
      {profile.owner === userId && (
        <CreateNote
          avatar={profile.avatar}
          getNotes={getNotes}
          id={profile._id}
          isGroup={true}
        />
      )}
      <AutoSizer>
        {({height, width}) => (
          <VariableSizeList
            height={totalHeight}
            width={width}
            itemSize={getRowHeight}
            ref={listRef}
            itemCount={notes.length}>
            {Row}
          </VariableSizeList>
        )}
      </AutoSizer>
      {!notes.length && <NoData />}
    </>
  );
};

export default GroupNotes;

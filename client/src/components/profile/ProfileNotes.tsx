import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {INote} from '../../Redux/notes/notesReducer';
import {IStateProfile} from '../../Redux/profile/profileReducer';
import CreateNote from '../note/CreateNote';
import Note from '../note/Note';
import AutoSizer from 'react-virtualized-auto-sizer';
import {VariableSizeList} from 'react-window';

interface IProfileNotes {
  notes: INote[];
  profile: IStateProfile;
  getNotes: () => void;
  userId: string;
}

const ProfileNotes = ({notes, profile, getNotes, userId}: IProfileNotes) => {
  const params: {id: string} = useParams();
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
          getNotes={getNotes}
          isOwner={params.id === userId}
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
        return prev + +rowHeights.current[current] + 20;
      }, 0);
      setTotalHeight(total);
    }
  }, [rowHeights, notes]);

  return (
    <>
      {params.id === userId && (
        <CreateNote avatar={profile.avatar} getNotes={getNotes} />
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
    </>
  );
};

export default ProfileNotes;

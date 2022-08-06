import React, {useEffect, useRef, useState} from 'react';
import {notesAPI} from '../api/notesAPI';
import CreateNote from '../components/note/CreateNote';
import Note from '../components/note/Note';
import {INote} from '../Redux/notes/notesReducer';
import AutoSizer from 'react-virtualized-auto-sizer';
import {VariableSizeList} from 'react-window';

const NewsPage = () => {
  const [news, setNews] = useState<INote[]>([]);
  const listRef = useRef<any>({});
  const rowHeights = useRef<any>({});

  useEffect(() => {
    notesAPI.getNews().then((res) => {
      setNews(res);
    });
  }, []);

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
          note={news[index]}
          isGroup={news[index].refOwner === 'Group'}
        />
      </div>
    );
  };

  const setRowHeight = (index: any, size: any) => {
    listRef.current.resetAfterIndex(0);
    rowHeights.current = {...rowHeights.current, [index]: size};
  };

  return (
    <AutoSizer>
      {({height, width}) => (
        <VariableSizeList
          height={height}
          width={width}
          itemSize={getRowHeight}
          ref={listRef}
          itemCount={news.length}>
          {Row}
        </VariableSizeList>
      )}
    </AutoSizer>
  );
};

export default NewsPage;

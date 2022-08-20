import React, {useEffect, useRef, useState} from 'react';
import {notesAPI} from '../api/notesAPI';
import CreateNote from '../components/note/CreateNote';
import Note from '../components/note/Note';
import {INote} from '../Redux/notes/notesReducer';
import AutoSizer from 'react-virtualized-auto-sizer';
import {VariableSizeList} from 'react-window';
import NoData from '../components/common/NoData';
import {setLoading} from '../Redux/app/appOperations';
import {connect} from 'react-redux';

interface INews {
  setLoading: (b: boolean) => void;
}

const NewsPage = ({setLoading}: INews) => {
  const [news, setNews] = useState<INote[]>([]);
  const listRef = useRef<any>({});
  const rowHeights = useRef<any>({});

  useEffect(() => {
    setLoading(false);
    notesAPI
      .getNews()
      .then((res) => {
        setNews(res);
      })
      .finally(() => setLoading(false));
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

  if (!news.length) {
    return <NoData />;
  }

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

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);

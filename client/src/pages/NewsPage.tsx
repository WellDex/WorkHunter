import React, {useEffect, useState} from 'react';
import {notesAPI} from '../api/notesAPI';
import CreateNote from '../components/note/CreateNote';
import Note from '../components/note/Note';
import {INote} from '../Redux/notes/notesReducer';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    notesAPI.getNews().then((res) => {
      setNews(res);
    });
  }, []);

  return (
    <div className="news">
      {news.length > 0 &&
        news.map((note: INote, index) => (
          <Note key={index} note={note} isGroup={note.refOwner === 'Group'} />
        ))}
      {/* <CreateNote /> todo
      <Histories />*/}
    </div>
  );
};

export default NewsPage;

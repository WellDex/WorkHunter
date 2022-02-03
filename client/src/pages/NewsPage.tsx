import React from 'react';
import Histories from '../components/news/Histories';
import CreateNote from '../components/note/CreateNote';
import Note from '../components/note/Note';

const NewsPage = () => {
  return (
    <div className="news">
      <CreateNote />
      <Histories />
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((el: any) => (
        <Note />
      ))}
    </div>
  );
};

export default NewsPage;

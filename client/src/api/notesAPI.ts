import {instance} from './instance';

export const notesAPI = {
  getNotes: (id: string) => {
    return instance.get(`notes/${id}`).then((res) => {
      return res.data;
    });
  },
  createNote: (text: string) => {
    return instance.post('notes/create', {text}).then((res) => {
      return res.data;
    });
  },
  createGroupNote: (text: string, id: string) => {
    return instance
      .post(`notes/create`, {text, id, type: 'Group'})
      .then((res) => {
        return res.data;
      });
  },
  getNews: () => {
    return instance.get('news/').then((res) => {
      return res.data;
    });
  },
  deleteNote: (id: string) => {
    return instance.delete(`notes/delete/${id}`).then((res) => {
      return res.data;
    });
  },
};

import {instance} from './instance';

export const notesAPI = {
  getNotes: () => {
    return instance.get('notes/').then((res) => {
      return res.data;
    });
  },
  createNote: (text: string) => {
    return instance.post('notes/create', {text}).then((res) => {
      return res.data;
    });
  },
  deleteNote: (id: number) => {
    return instance.delete(`notes/delete/${id}`).then((res) => {
      return res.data;
    });
  },
};

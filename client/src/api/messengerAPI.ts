import {instance} from './instance';

interface ICreateMessage {
  chatId: string;
  text: string;
}

export const messengerAPI = {
  getChatById: (id: string) => {
    return instance.get(`messenger/chat/${id}`).then((res) => {
      return res.data;
    });
  },
  createChat: (id: string) => {
    return instance.post('messenger/chat/create', {id}).then((res) => {
      return res.data;
    });
  },
  getMessegesByChat: (chatId: string) => {
    return instance.get(`messenger/message/${chatId}`).then((res) => {
      return res.data;
    });
  },
  createMessege: (data: ICreateMessage) => {
    return instance.post('messenger/message/create', {...data}).then((res) => {
      return res.data;
    });
  },
  getUsers: () => {
    return instance.get(`messenger/chat/users`).then((res) => {
      return res.data;
    });
  },
};

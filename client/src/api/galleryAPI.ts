import {instance} from './instance';

export const galleryAPI = {
  getGallery: (id: string, options?: object) => {
    let params = {};
    if (options) {
      params = new URLSearchParams({...options});
    }
    return instance
      .get(`gallery/${id}${options ? `?${params.toString()}` : ''}`)
      .then((res) => {
        return res.data;
      });
  },
  addImages: (data: any) => {
    return instance.post(`gallery/add`, data).then((res) => {
      return res.data;
    });
  },
  deleteImage: (id: string) => {
    return instance.delete(`gallery/delete/${id}`).then((res) => {
      return res.data;
    });
  },
};

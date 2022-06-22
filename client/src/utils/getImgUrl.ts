export const getImgUrl = (img: string | null) => {
  if (!img) {
    return undefined;
  }
  return `${process.env.REACT_APP_IMG_URL}${img}`;
};

export const homepage = 'https://thegameonpaper.com'
export const origin = new URL(homepage);
const localApiOrigin = new URL('http://127.0.0.1:3000');
export const pyOrigin = 'https://thegameonpaper.com/py';
export const localPyApiOrigin =  'http://127.0.0.1:7000/py';



export const apiOrigin =
  process.env.NODE_ENV === 'production' ?  origin : localApiOrigin;

export const pyApiOrigin =
process.env.NODE_ENV === 'production' ? pyOrigin : localPyApiOrigin ;
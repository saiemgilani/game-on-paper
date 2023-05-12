export const homepage = 'https://thegameonpaper.com'
export const origin = new URL(homepage);
const localApiOrigin = new URL('http://127.0.0.1:3000');
export const pyOrigin = 'http://python:7000/py';
export const localPyApiOrigin = 'http://127.0.0.1:7000/py';



export const apiOrigin =
  process.env.NODE_ENV === 'development' ? localApiOrigin : origin;

export const pyApiOrigin =
process.env.NODE_ENV === 'development' ? localPyApiOrigin: pyOrigin ;
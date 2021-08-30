
export const homepage = 'https://gameonpaper.com'
export const origin = new URL(homepage);
const localApiOrigin = new URL('http://localhost:3000');
export const pyOrigin = 'https://thegameonpaper.com/py';
export const localPyApiOrigin = 'http://localhost:7000/py';



export const apiOrigin =
  process.env.NODE_ENV === 'development' ? localApiOrigin : origin;

export const pyApiOrigin =
  process.env.NODE_ENV === 'development' ? localPyApiOrigin : pyOrigin;

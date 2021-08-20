
export const homepage = 'https://gameonpaper.com'
export const origin = new URL(homepage);
const localApiOrigin = new URL('http://localhost:3000');
export const pyOrigin = `http://${process.env.PY_HOST}:7000`;
export const localPyApiOrigin = 'http://localhost:7000';



export const apiOrigin =
  process.env.NODE_ENV === 'development' ? localApiOrigin : origin;

export const pyApiOrigin = pyOrigin;

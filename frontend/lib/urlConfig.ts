import * as os from 'os';
export const homepage = 'https://thegameonpaper.com'
export const origin = new URL(homepage);
const localApiOrigin = new URL('http://127.0.0.1:3000');
export const pyOrigin = process.env.RDATA_BASE_URL;
export const localPyApiOrigin = 'http://127.0.0.1:7000/py';

function nodeEnv(){
  if (os.hostname().includes('localhost')) {
    console.log(os.hostname())
    return 'development';
  }
  return 'production';
}

export const NODE_ENV = nodeEnv();

export const apiOrigin = NODE_ENV === 'development' ? localApiOrigin : origin;

export const pyApiOrigin = NODE_ENV === 'development' ? localPyApiOrigin: pyOrigin ;
import * as antd from 'antd';
import middleware from './middleware';

type Libs = {
  [key: string]: any
}

export default function useCode(displayName: string, fn: () => void, libs: Libs = antd) {
  window.ecodeSDK.overwritePropsFnQueueMapSet('Button', {
    //组件名
    fn: fn,
    order: 1,
    desc: 'rewrite the props of Button',
  });

  return middleware(libs[displayName], displayName);
}

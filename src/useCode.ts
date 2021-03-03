import * as antd from 'antd';
import middleware from './middleware';

export default function useCode(displayName, fn, libs = antd) {
  window.ecodeSDK.overwritePropsFnQueueMapSet('Button', {
    //组件名
    fn: fn,
    order: 1,
    desc: 'rewrite the props of Button',
  });
  return middleware(libs[displayName], displayName);
}

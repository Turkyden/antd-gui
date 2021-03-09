import { ReactElement } from 'react';
import middleware from './middleware';

export default function useCode<T>(Com: any, fn: () => void) {
  const { displayName } = Com;
  window.ecodeSDK.overwritePropsFnQueueMapSet(displayName, {
    //组件名
    fn: fn,
    order: 1,
    desc: 'rewrite the props of Button',
  });
  return middleware(Com, displayName);
}

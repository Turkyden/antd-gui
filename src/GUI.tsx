import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';

export function GUI() {
  return <h2>Halo i am Antd GUI</h2>;
}

export function useGui() {
  let rootElement: HTMLElement | null = null;

  useEffect(() => {
    rootElement = document.querySelector('#antd-gui__root');
    if (!rootElement) {
      rootElement = Object.assign(document.createElement('div'), {
        id: 'antd-gui__root',
      });
      document.body.appendChild(rootElement);
      ReactDOM.render(GUI as any, rootElement);
    }
  }, []);
}

## Button 按钮

You can import to your app with default export.

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { ViewEditor, useControls, useCode } from 'antd-gui';
import 'antd/dist/antd.css';

export default () => {
  const newProps = useControls({
    block: false,
    danger: false,
    disaled: false,
    ghost: false,
    href: '',
    htmlType: 'button',
    icon: '',
    loading: false,
    shape: {
      value: '',
      options: ['circle', 'round'],
    },
    size: {
      value: 'middle',
      options: ['large', 'middle', 'small'],
    },
    target: '',
    type: {
      value: 'default',
      options: ['primary', 'ghost', 'dashed', 'link', 'text', 'default'],
    },
  });

  const Button = useCode('Button', oldProps => {
    // update the props of your component
    return {
      ...oldProps,
      ...newProps,
    };
  });

  return (
    <>
      <div className="App">
        <div>
          <Button onClick={(e: Event) => window.alert('Hello World !')}>
            Button
          </Button>
        </div>
      </div>
    </>
  );
};
```

## useControl

You can import to your app with default export.

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { useControl } from 'antd-gui';
import { Button } from 'antd';
import 'antd/dist/antd.css';

export default () => {
  const props = useControl({
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

  return (
    <Button {...props} onClick={e => window.alert('Hello World !')}>
      Button
    </Button>
  );
};
```

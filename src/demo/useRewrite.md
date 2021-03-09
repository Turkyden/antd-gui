## useRewrite

You can import to your app with default export.

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { useRewrite } from 'antd-gui';
import * as antd from 'antd';
import 'antd/dist/antd.css';

export default () => {
  const Button = useRewrite(antd.Button, props => {
    return {
      ...props,
      danger: true,
      onClick: e => window.alert('Rewite It!'),
    };
  });

  return <Button onClick={e => window.alert('Hello World!')}>Button</Button>;
};
```

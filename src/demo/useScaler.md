## useScaler

You can import to your app with default export.

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { Scaler, useScaler } from 'antd-gui';
import * as antd from 'antd';
import 'antd/dist/antd.css';

export default () => {
  const [scale, action] = useScaler(100);

  return (
    <div className="relative" style={{ height: 400 }}>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <img
          src="https://jdc.jd.com/img/600x400"
          width="200"
          style={{ transform: `scale(${scale / 100})` }}
        />
      </div>
      <Scaler {...action} />
    </div>
  );
};
```

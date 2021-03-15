import React, {
  ReactElement,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

declare var window: Window & { pcComponentsConfig: PcComponentsConfig };

window.ecodeSDK = {
  overwritePropsFnQueueMap: {},
  overwritePropsFnQueueInit: function() {
    if (!window.pcComponentsConfig) window.pcComponentsConfig = {};
    var map = window.ecodeSDK.overwritePropsFnQueueMap;
    for (let k in map) {
      if (!window.pcComponentsConfig[k]) window.pcComponentsConfig[k] = {};
      window.pcComponentsConfig[k]['overwritePropsFn'] = function(
        newProps: any,
        name: string,
      ) {
        var objMap = map[name];
        if (objMap && objMap.queue) {
          var arr = objMap.queue;
          arr = window.ecodeSDK.ecodeQueueSort(arr);
          for (var j = 0; j < arr.length; j++) {
            var obj = arr[j];
            if (obj && typeof obj.fn === 'function') {
              var result = obj.fn(newProps, name);
              if (result) {
                newProps = result;
              }
            }
          }
          return newProps;
        }
      };
    }
  },
  overwritePropsFnQueueMapSet: function(k: string, v: any) {
    if (!window.ecodeSDK.overwritePropsFnQueueMap[k])
      window.ecodeSDK.overwritePropsFnQueueMap[k] = { queue: [] };
    var map = window.ecodeSDK.overwritePropsFnQueueMap[k];
    map.queue.push(v);
    window.ecodeSDK.overwritePropsFnQueueMap[k] = map;
    window.ecodeSDK.overwritePropsFnQueueInit();
  },
  ecodeQueueSort: function(arr: any[]) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
        if (arr[j].order > arr[j + 1].order) {
          var temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  },
};

type PcComponentsConfig = {
  [K in string]?: OverwriteInRender;
};

type OverwriteInRender = {
  overwriteRenderFn: () => void;
  overwritePropsJson: () => void;
  overwritePropsFn: (newProps: NewProps, name: string) => any;
  overwriteClassFn: () => void;
};

type NewProps = any;

function isObject(obj: Object) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isFunction(fn: Function) {
  return typeof fn === 'function';
}

/**
 * The component middleware for dev2
 * @param com lib component
 * @param name the name of lib component
 */
function middleware(
  com: ReactElement,
  name: string,
): ForwardRefExoticComponent<RefAttributes<any>> | ReactElement {
  const overwriteInRender =
    window.pcComponentsConfig && window.pcComponentsConfig[name];

  let result;

  if (overwriteInRender) {
    result = React.forwardRef((props, ref) => {
      let newProps = { ...props };

      // overwrite props lev 2
      if (isObject(overwriteInRender)) {
        const propsJson = overwriteInRender.overwritePropsJson;
        if (isObject(propsJson)) {
          newProps = { ...newProps, ...propsJson };
        }
        const propsFn = overwriteInRender.overwritePropsFn;
        if (isFunction(propsFn)) {
          const overwriteProps = propsFn(newProps, name);
          if (isObject(overwriteProps)) {
            newProps = { ...newProps, ...overwriteProps };
          }
        }
      }

      return React.createElement(com as any, { ...newProps, ref });
    });
  } else {
    result = com;
  }

  return result;
}

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

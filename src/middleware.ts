import React, {
  ReactElement,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

declare var window: Window & { pcComponentsConfig: PcComponentsConfig };

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
export default function middleware(
  com: ReactElement,
  name: string,
): ForwardRefExoticComponent<RefAttributes<any>> {
  debugger;

  const overwriteInRender =
    window.pcComponentsConfig && window.pcComponentsConfig[name];

  let result = com;

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

      return React.createElement(com, { ...newProps, ref });
    });
  }

  return result;
}

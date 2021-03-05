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

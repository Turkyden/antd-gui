// import { useControls } from 'leva';

import { useEffect } from 'react';
import { useGui } from './Gui';

function useControls(options: any) {
  useGui();

  return options;
}

export default useControls;

import React from 'react';

import Idle from './Idle';
import Phoning from './Phoning';
import Receiving from './Receiving';
import { useAppContext } from '../../app';

export default function CallBox() {
  const [state] = useAppContext();
  const { screen } = state;
  return (
    <div className="px-2 flex flex-col gap-2 h-full ">
      {screen === 'idle' && <Idle />}
      {screen === 'phoning' && <Phoning />}
      {screen === 'receiving' && <Receiving />}
    </div>
  );
}

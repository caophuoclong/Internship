import React from 'react';
import { BsMic, BsMicMute } from 'react-icons/bs';
import { MdDialpad, MdOutlinePhoneForwarded } from 'react-icons/md';
import { useAppContext } from '../../../app';
import { setCallPropertyAction } from '../../../app/reducer/Action';

export default function Function() {
  const [state, dispatch] = useAppContext();
  const {
    callProperty: { isMute, isDialPad },
  } = state;
  const handleMute = () => {
    dispatch(
      setCallPropertyAction({
        isMute: !isMute,
        isDialPad,
      })
    );
  };
  const handleDialPad = () => {
    dispatch(
      setCallPropertyAction({
        isMute,
        isDialPad: !isDialPad,
      })
    );
  };
  return (
    <div className="flex w-full gap-2 justify-center">
      <button
        onClick={handleMute}
        className="w-16 h-16 rounded-full flex items-center justify-center"
      >
        {isMute ? <BsMicMute size="32px" /> : <BsMic size="32px" />}
      </button>
      <button
        onClick={handleDialPad}
        className="w-16 h-16 rounded-full flex items-center justify-center"
      >
        <MdDialpad size="32px" />
      </button>
    </div>
  );
}

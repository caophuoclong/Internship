import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import Function from './Function';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../../app';
import { MdCallEnd } from 'react-icons/md';
import DialPad from '../Idle/DialPad';
import { FiDelete } from 'react-icons/fi';
export default function Phoning() {
  const [state, dispatch] = useAppContext();
  const [phoneNumber, setPhoneNumber] = useState('');
  const { session } = state;
  const handleClick = (data) => {
    setPhoneNumber(phoneNumber + data);
  };
  const handleDelete = () => {
    setPhoneNumber(phoneNumber.slice(0, -1));
  };
  const handleEndCall = () => {
    session.terminate();
  };
  useEffect(() => {
    if (phoneNumber !== '') {
      let i = 0;
      const interval = setTimeout(() => {
        console.log('Calling...');
      }, 1000);
      return () => clearTimeout(interval);
    }
  }, [phoneNumber]);
  const { call, callProperty, callStatus } = state;

  return (
    <div className="flex flex-col items-center justify-between h-full py-8">
      {/* {contactName} */}
      <div>
        <p className="text-2xl font-bold text-center">{call.phoneNumber}</p>
        <div className="text-lg font-semibold text-center">
          {callStatus === 'progress' && 'Calling'}
          {callStatus === 'confirmed' && <Timer start={true} />}
        </div>
      </div>
      <div
        className={`flex flex-col absolute translate-y-[15%] z-[1] transition-all duration-1000 ${
          callProperty.isDialPad ? 'opacity-100' : 'opacity-0'
        } ${callProperty.isDialPad ? 'top-10' : 'top-40'}`}
      >
        <div className="w-full flex items-center justify-center gap-2">
          <input
            className="outline-none bg-transparent w-auto max-w-[120px] text-lg font-bold text-center select-none ml-8 caret-transparent"
            readOnly
            value={phoneNumber}
          />
          {phoneNumber.length > 0 && (
            <button onClick={handleDelete}>
              <FiDelete size="24px" />
            </button>
          )}
        </div>
        <DialPad handleClick={handleClick} />
      </div>
      <div className="w-full flex justify-center flex-col items-center z-[5]">
        <Function />
        <button
          onClick={handleEndCall}
          className="w-1/3 h-16 bg-red-400 rounded-full flex items-center justify-center"
        >
          <MdCallEnd size="40px" />
        </button>
      </div>
    </div>
  );
}

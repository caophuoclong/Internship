import React, { useEffect } from 'react';
import { useAppContext } from '../../../app';
import { MdCall, MdCallEnd } from 'react-icons/md';
export default function Receiving() {
  const [state, dispatch] = useAppContext();
  const { call, session } = state;
  const handleEndCall = () => {
    session.terminate();
  };
  const handleAnswerCall = () => {
    session.answer();
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="font-bold text-2xl">{call.phoneNumber}</p>
      <div className="flex justify-evenly w-full mt-60">
        <button
          onClick={handleEndCall}
          className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center"
        >
          <MdCallEnd size="40px" />
        </button>
        <button
          onClick={handleAnswerCall}
          className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center"
        >
          <MdCall size="40px" />
        </button>
      </div>
    </div>
  );
}

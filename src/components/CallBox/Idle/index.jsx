import React from 'react';
import { useAppContext } from '../../../app';
import SIPInformation from './SIPInformation';
import { FiDelete } from 'react-icons/fi';
import { MdCall } from 'react-icons/md';
import DialPad from './DialPad';
import {
  setCallAction,
  setPhoneNumberAction,
  setSessionAction,
} from '../../../app/reducer/Action';

export default function Idle() {
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [state, dispatch] = useAppContext();
  const { phoneNumber, screen, sipStatus, UA } = state;
  // idle, phoning, receiving
  const handleAddPhoneNumber = (data) => {
    const newPhoneNumber =
      phoneNumber.length < 11 ? phoneNumber + data : phoneNumber;
    dispatch(setPhoneNumberAction(newPhoneNumber));
  };
  const handleDelete = () => {
    const newPhoneNumber = phoneNumber.slice(0, phoneNumber.length - 1);
    dispatch(setPhoneNumberAction(newPhoneNumber));
  };
  const handleMakePhoneCall = () => {
    const session = UA.call(phoneNumber, {
      mediaConstraints: { audio: true, video: false },
      // eventHandlers,
    });
    dispatch(
      setCallAction({
        phoneNumber,
        startTime: Date.now(),
      })
    );
    dispatch(setSessionAction(session));
  };
  return (
    <React.Fragment>
      <SIPInformation />
      <br />
      <div className="flex justify-center items-center">
        <input
          readOnly
          className="w-[80%] outline-none bg-transparent border-0 border-b text-3xl text-center font-bold text-white l"
          value={phoneNumber}
          // onChange={handleChangePhoneNumber}
          onKeyDown={(e) => {
            if (!isNaN(e.key)) {
              handleAddPhoneNumber(e.key);
            } else if (e.key === 'Backspace') {
              handleDelete();
            }
          }}
        />
        <button onClick={handleDelete}>
          <FiDelete size="24px" />
        </button>
      </div>
      <DialPad handleClick={(data) => handleAddPhoneNumber(data.toString())} />
      <button
        onClick={handleMakePhoneCall}
        disabled={sipStatus.registered && phoneNumber.length > 0 ? false : true}
        className="bg-green-300  rounded-full w-[45%] text-center mx-auto mt-auto mb-6"
      >
        <MdCall className="mx-auto" size="60px" />
      </button>
    </React.Fragment>
  );
}

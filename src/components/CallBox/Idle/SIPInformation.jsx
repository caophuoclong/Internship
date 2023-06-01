import React, { useContext } from 'react';
import { AppContext } from '../../../app';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../../app/reducer/Action';
import { FaInfoCircle } from 'react-icons/fa';
export default function SIPInformation() {
  const [state, dispatch] = useContext(AppContext);
  const {
    sipStatus: { registered, registeredFailureMessage },
  } = state;
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <div className="p-4 ">
      {Object.keys(state.sip).length > 0 ? (
        <div className="flex justify-between">
          <div className="font-bold flex items-center gap-1 ">
            <span>SIP</span>:{' '}
            <span className={registered ? 'text-green-500' : 'text-red-500'}>
              {state.sip.sipAddress}
            </span>
            {!registered &&
              Object.keys(registeredFailureMessage).length > 0 && (
                <div
                  title={registeredFailureMessage.reason_phrase}
                  className="w-4 h-4 rounded-full bg-white flex justify-center items-center"
                >
                  <FaInfoCircle fill="#fccf55" size="20px" />
                </div>
              )}
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="text-right">
          <Link to="/register">R</Link>
        </div>
      )}
    </div>
  );
}

import { createContext, useContext, useReducer } from 'react';
import React from 'react';
import { reducer } from './reducer';

export const AppContext = createContext();

const initialState = {
  sip: {},
  sipStatus: {
    registered: false,
    registeredFailureMessage: {},
  },
  phoneNumber: '',
  // idle, phoning, receiving
  screen: 'idle',
  call: {
    phoneNumber: '',
    startTime: 0,
    endTime: 0,
  },
  // null, progress, confirmed
  callStatus: null,
  callProperty: {
    isMute: false,
    isDialPad: false,
  },
  session: null,
  UA: null,
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

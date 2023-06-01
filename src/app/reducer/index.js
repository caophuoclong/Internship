import {
  LOGOUT,
  SET_CALL,
  SET_CALL_PROPERTY,
  SET_CALL_STATUS,
  SET_PHONE_NUMBER,
  SET_SCREEN,
  SET_SESSION,
  SET_SIP,
  SET_SIP_STATUS,
  SET_UA,
} from './Constant';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('TEST_ACTION');
      return {
        ...state,
      };
    case LOGOUT:
      localStorage.removeItem('sip');
      return {
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
      };
    case SET_SIP:
      return {
        ...state,
        sip: action.payload,
      };
    case SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case SET_SCREEN:
      return {
        ...state,
        screen: action.payload,
      };
    case SET_SIP_STATUS:
      return {
        ...state,
        sipStatus: action.payload,
      };
    case SET_CALL:
      return {
        ...state,
        call: action.payload,
      };
    case SET_CALL_PROPERTY:
      return {
        ...state,
        callProperty: action.payload,
      };
    case SET_SESSION:
      return {
        ...state,
        session: action.payload,
      };
    case SET_CALL_STATUS:
      return {
        ...state,
        callStatus: action.payload,
      };
    case SET_UA:
        return {
            ...state,
            UA: action.payload
        }
  }
};

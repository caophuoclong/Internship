import { SET_CALL, SET_CALL_PROPERTY, SET_CALL_STATUS, SET_SCREEN, SET_SESSION, SET_SIP_STATUS, SET_UA } from "./Constant"
import {LOGOUT, SET_PHONE_NUMBER, SET_SIP, TEST} from "./Constant"
export const testAction = ()=>{
    return {
        type: TEST,
        payload: 'test'
    }
}

export const logoutAction = ()=>{
    return {
        type: LOGOUT,
    }
}
export const setSipAction = (sip)=>{
    return {
        type: SET_SIP,
        payload: sip
    }
}

export const setPhoneNumberAction = (phoneNumber)=>{
    return {
        type: SET_PHONE_NUMBER,
        payload: phoneNumber
    }
}

export const setScreenAction = (screen)=>{
    return {
        type: SET_SCREEN,
        payload: screen
    }
}
export const setSipStatus = (status)=>{
    return {                                                                                                                
        type: SET_SIP_STATUS,
        payload: status
    }
}

export const setCallAction = (call)=>{
    return {
        type: SET_CALL,
        payload:call                                    
    }
}

export const setCallPropertyAction = (property)=>{
    return {
        type: SET_CALL_PROPERTY,
        payload:property                                    
    }
}

export const setSessionAction = (session)=>{
    return {
        type: SET_SESSION,
        payload:session
    }
}

export const setCallStatusAction = (status)=>{
    return {
        type: SET_CALL_STATUS,
        payload:status
    }
}
export const setUAAction = (ua)=>{
    return {
        type: SET_UA,
        payload:ua
    }
}
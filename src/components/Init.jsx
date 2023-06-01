import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../app';
import {
  setCallAction,
  setCallStatusAction,
  setScreenAction,
  setSessionAction,
  setSipAction,
  setSipStatus,
  setUAAction,
} from '../app/reducer/Action';
import * as JsSIP from 'jssip';
import ringing from '../assets/ringing.mp3';

export default function Init() {
  const [state, dispatch] = useAppContext();
  const [audioElement, setAudioElement] = useState(null);
  useEffect(() => {
    const audioElement = document.createElement('audio');
    setAudioElement(audioElement);
  }, []);

  const { sip, session, UA } = state;
  useEffect(() => {
    const sip = localStorage.getItem('sip');
    if (sip) {
      dispatch(setSipAction(JSON.parse(sip)));
    }
  }, []);
  useEffect(() => {
    if (Object.keys(sip).length > 0) {
      const socket = new JsSIP.WebSocketInterface(`wss://${sip.websocket}`);
      const configuration = {
        sockets: [socket],
        uri: `sip:${sip.sipAddress}`,
        password: sip.password,
        register: true,
      };
      const ua = new JsSIP.UA(configuration);
      ua.start();
      dispatch(setUAAction(ua));
    }
  }, [sip]);
  const eventHandlers = {
    progress: (e) => {
      console.log('Progress', e);
      if (e.originator === 'local') {
        audioElement.src = ringing;
        audioElement.play();
        dispatch(setScreenAction('receiving'));
        dispatch(setSessionAction(e.session));
      } else {
        dispatch(setScreenAction('phoning'));
        dispatch(setCallStatusAction('progress'));
      }
    },
    failed: (e) => {
      console.log('Failed', e);
      audioElement.pause();
      dispatch(setScreenAction('idle'));
    },
    confirmed: (e) => {
      console.log('Confirmed', e);
      audioElement.pause();
      dispatch(setScreenAction('phoning'));
      dispatch(setCallStatusAction('confirmed'));
    },
    ended: (e) => {
      console.log('Ended', e);
      audioElement.pause();
      dispatch(setScreenAction('idle'));
      console.log(session);
    },
  };
  useEffect(() => {
    if (UA && audioElement) {
      UA.on('connected', (e) => {
        console.log('Connected', e);
      });
      UA.on('connecting', (e) => {
        console.log('On Connecting...', e);
      });
      UA.on('registered', (e) => {
        dispatch(
          setSipStatus({
            registered: true,
            registeredFailureMessage: {},
          })
        );
      });
      UA.on('newRTCSession', (e) => {
        e.session.on('progress', eventHandlers.progress);
        e.session.on('failed', eventHandlers.failed);
        e.session.on('confirmed', eventHandlers.confirmed);
        e.session.on('ended', eventHandlers.ended);
      });
      UA.on('registrationFailed', (e) => {
        dispatch(
          setSipStatus({
            registered: false,
            registeredFailureMessage: {
              status_code: e.response.status_code,
              reason_phrase: e.response.reason_phrase,
            },
          })
        );
      });
    }
  }, [UA, audioElement]);

  useEffect(() => {
    if (session && session.connection) {
      // TODO: Notice here, remember to add event listener for addstream
      session.connection.addEventListener('addstream', (e) => {
        const audioElement = document.createElement('audio');
        audioElement.srcObject = e.stream;
        audioElement.play();
      });
    }
  }, [session]);
  return <Outlet />;
}

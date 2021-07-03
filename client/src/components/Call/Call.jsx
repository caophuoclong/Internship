import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import JsSIP from "jssip";

import CallUI from "./CallUI";
var incomingSession = null;
var currentSession = null;

var socket = new JsSIP.WebSocketInterface("wss://sbc03.tel4vn.com:7444");
var configuration = {
  sockets: [socket],
  uri: "108@2-test1.gcalls.vn:50061",
  password: "test1108",
};
const coolPhone = new JsSIP.UA(configuration);
coolPhone.on("registered", (data) => {
  console.log("Status code: " + data.response.status_code);
});
coolPhone.on("newRTCSession", (data) => {
  console.log("On newRTCSession");
  if (data.originator === "remote") {
    //incoming call
    console.log("Incoming call");
    data.session.answer({ mediaConstraints: { audio: true } });
  } else {
    console.log("Outgoing Call");
    const outGoingSession = data.session;
    outGoingSession.on("connection", (data) => {
      console.log(data.request);
    });
  }
  //Fired when accepting a call
  data.session.on("accepted", function (data) {
    console.info("onAccepted - ", data);
    if (data.originator === "remote" && currentSession === null) {
      currentSession = incomingSession;
      incomingSession = null;
      console.info("setCurrentSession - ", currentSession);
    }
  });
  //Fire after confirming the call
  data.session.on("confirmed", function (data) {
    console.info("onConfirmed - ", data);
    if (data.originator === "remote" && currentSession === null) {
      currentSession = incomingSession;
      incomingSession = null;
      console.info("setCurrentSession - ", currentSession);
    }
  });
  // Fired before the remote SDP is passed to the RTC engine and before the local SDP is sent. This event provides a mechanism to modify the incoming and outgoing SDP.
  data.session.on("sdp", function (data) {
    // console.info("onSDP, type - ", data.type, " sdp - ", data.sdp);
    //data.sdp = data.sdp.replace('UDP/TLS/RTP/SAVPF', 'RTP/SAVPF');
    //console.info('onSDP, changed sdp - ', data.sdp);
  });
  //Fired when receiving or generating a 1XX SIP response (>100) to an invitation request. This event is triggered before SDP processing (if it exists), so that it can be fine-tuned when needed, or even deleted by deleting the body of the response parameter in the data object
  data.session.on("progress", function (data) {
    console.info("onProgress - ", data.originator);
    if (data.originator === "remote") {
      console.info("onProgress, response - ", data.response);
    }
  });
  //Fire after creating a basic RTCPeerConnection. The application has the opportunity to change the peerconnection by adding RTCDataChannel or setting the corresponding event listener on the peerconnection.
  data.session.on("peerconnection", function (data) {
    console.log("peer connection", data);
    data.peerconnection.onaddstream = function (ev) {
      console.info("onaddstream from remote - ", ev);
    };
  });
});
coolPhone.start();

Call.propTypes = {
  value: PropTypes.string.isRequired,
};
function handleEndCall() {
  coolPhone.stop();
}

function Call(props) {
  const [sipStatus, setSipStatus] = useState("");
  const [description, setDescription] = useState("");
  const eventHandlers = {
    // bắt sự kiện mỗi khi thực hiện call
    progress: (e) => {
      console.log("call is in progress");
      setSipStatus("progress");
    },
    failed: (e) => {
      console.log("call failed with cause: ", e);
      if (e.cause === "Unavailable") {
        setDescription("Wrong number");
      } else {
        setDescription(e.cause);
      }
      setSipStatus("failed");
    },
    ended: (e) => {
      console.log("call ended with cause: ", e);
      setDescription(e.cause);
      setSipStatus("ended");
    },
    confirmed: (e) => {
      console.log("confirmed: ", e.cause);
      setSipStatus("confirmed");
    },
  };
  const option = {
    // option cho hàm call
    eventHandlers: eventHandlers,
    extraHeaders: ["X-Foo: foo", "X-Bar: bar"],
    mediaConstraints: { audio: true, video: false },
    sessionTimersExpires: 120,
  };

  const { value } = useParams();
  if (
    sipStatus !== "progress" &&
    sipStatus !== "failed" &&
    sipStatus !== "confirmed" &&
    sipStatus !== "ended"
  ) {
    let session = coolPhone.call(value, option);
    session.on("peerconnection", (data) => {
      console.log(data);
    });
    session.connection.addEventListener("addstream", function (e) {
      // đặt stream audio
      const remoteAudio = document.createElement("audio");
      remoteAudio.srcObject = e.stream;
      remoteAudio.play();
    });
  }

  return (
    <CallUI
      phoneNumber={value}
      endCall={handleEndCall}
      sipStatus={sipStatus}
      description={description}
    />
  );
}

export default Call;

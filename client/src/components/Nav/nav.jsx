import React, { useState } from "react";
import JsSIP from "jssip";
import PropTypes from "prop-types";

import "./nav.scss";
import Keyboard from "../Keyboard/Keyboard";
import Uri from "../URI/Uri";
import Callog from "../Callog/Callog";
import CallUI from "../Call/CallUI";
import ReciveCall from "../ReciveCall/ReciveCall";
var socket = new JsSIP.WebSocketInterface("wss://sbc03.tel4vn.com:7444");
var configuration = {
  sockets: [socket],
  uri: `109@2-test1.gcalls.vn:50061`,
  password: "test1109",
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
  }
});
coolPhone.start();

Nav.propTypes = {
  token: PropTypes.string,
};
Nav.defaultProps = {
  token: "",
};

function Nav(props) {
  const [UI, setUI] = useState(true);
  const [callBy, setCallBy] = useState(true);
  const [callClicked, setCallClicked] = useState(false);
  const [callLog, setCallLog] = useState(false);
  const [sipStatus, setSipStatus] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [reciveCall, setReciveCall] = useState(false);
  const { token } = props;

  function handleEndCall() {
    coolPhone.stop();
  }
  function handleCall(value) {
    setCallClicked(true);
    setUI(false);
    setValue(value);
  }
  function handleChangeDialPad(e) {
    setUI(true);
  }
  function handleChangeCallog(e) {
    setCallLog(true);
    setUI(false);
  }
  function handleChangeTypeDialpad() {
    setCallBy(true);
  }
  function handleChangeTypeURI() {
    setCallBy(false);
  }
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
  if (
    sipStatus !== "progress" &&
    sipStatus !== "failed" &&
    sipStatus !== "confirmed" &&
    sipStatus !== "ended"
  ) {
    if (value !== "") {
      let session = coolPhone.call(value, option);
      session.connection.addEventListener("addstream", function (e) {
        // đặt stream audio
        const remoteAudio = document.createElement("audio");
        remoteAudio.srcObject = e.stream;
        remoteAudio.play();
      });
    }
  }
  function handleLogOut() {
    sessionStorage.clear();

    window.location.reload();
  }
  return (
    <div className="home">
      <button
        className="change-ui"
        id="change-type"
        onClick={handleChangeDialPad}
      >
        Keyboard
        <div id="type">
          <div onClick={handleChangeTypeDialpad}>Dial pad</div>
          <div onClick={handleChangeTypeURI} style={{ marginLeft: "5px" }}>
            URI
          </div>
        </div>
      </button>
      <button className="change-ui" onClick={handleChangeCallog}>
        Call log
      </button>
      <input
        value={token.id}
        style={{
          fontSize: "1.5em",
          border: "none",
          margin: "15px",
          width: "40px",
        }}
      />
      <input type="button" value="Log out" onClick={handleLogOut} />

      {UI && callBy && <Keyboard call={handleCall} />}
      {UI && !callBy && <Uri call={handleCall} />}
      {!UI && callClicked && (
        <CallUI
          phoneNumber={value}
          endCall={handleEndCall}
          sipStatus={sipStatus}
          description={description}
        />
      )}
      {!UI && !callClicked && callLog && !reciveCall && <Callog />}
      {reciveCall && <ReciveCall coolPhone={coolPhone} />}
    </div>
  );
}

export default Nav;

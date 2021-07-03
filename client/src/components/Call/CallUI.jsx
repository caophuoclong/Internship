import React, { useState } from "react";
import "./call.css";
import api from "../../api/api";
import endcall from "../../assets/img/end-call.png";
import PropTypes from "prop-types";
import Timer from "../Timer/timer";
CallUI.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  description: PropTypes.string,
  sipStatus: PropTypes.string.isRequired,
  endCall: PropTypes.func,
  muteCall: PropTypes.func,
};
CallUI.defaultProps = {
  description: "",
  endCall: null,
  muteCall: null,
};
function reload() {
  window.location.href = "/";
}

function CallUI(props) {
  const { phoneNumber, description, sipStatus, endCall } = props;
  const [callAt] = useState(Date.now());
  let callEnd = "";
  if (sipStatus === "failed" || sipStatus === "canceled") {
    callEnd = Date.now();
  }
  const handleSaveDB = () => {
    try {
      const saveDB = async () => {
        const params = {
          phoneNumber,
          callAt,
          callEnd,
          callStatus: sipStatus,
          statusDescription: description,
        };
        const response = await api.post("/createacallog", params);
        console.log(response);
      };

      saveDB();

      console.log("Save db successfully");
    } catch (error) {
      console.log(error);
    }
  };
  function handleEndCall() {
    if (endCall) {
      endCall();
    }
  }

  if (description !== "") {
    return (
      <div className="call">
        <h3>{phoneNumber}</h3>
        <h4>{sipStatus}</h4>
        <h5>{description}</h5>
        <div className="function">
          <button className="functionKey" id="mute">
            <img
              className="iconsFunction"
              alt="xinchao"
              src="https://img.icons8.com/ios-filled/50/000000/room-sound.png"
            />{" "}
          </button>
          <button className="functionKey" id="keyboard">
            <img
              className="iconsFunction"
              alt="xinchao"
              src="https://img.icons8.com/metro/26/000000/pincode-keyboard.png"
            />
          </button>

          <button className="functionKey" id="pause">
            <img
              className="iconsFunction"
              alt="xinchao"
              src="https://img.icons8.com/ios-filled/50/000000/pause--v1.png"
            />
          </button>
        </div>

        <button
          onClick={() => {
            handleEndCall();
            handleSaveDB();
            reload();
          }}
          id="endcallFunction"
        >
          <img alt="endcall" id="endcall" src={endcall} />
        </button>
      </div>
    );
  }
  if (sipStatus === "confirmed") {
    return (
      <div className="call">
        <h3>{phoneNumber}</h3>
        <h4>{sipStatus}</h4>
        <h5>
          <Timer />
        </h5>
        <div className="function">
          <button className="functionKey" id="mute">
            <img
              className="iconsFunction"
              alt="xinchao"
              src="https://img.icons8.com/ios-filled/50/000000/room-sound.png"
            />{" "}
          </button>
          <button className="functionKey" id="keyboard">
            <img
              className="iconsFunction"
              alt="xinchao"
              src="https://img.icons8.com/metro/26/000000/pincode-keyboard.png"
            />
          </button>
          <button className="functionKey" id="pause">
            <img
              className="iconsFunction"
              alt="xinchao"
              src="https://img.icons8.com/ios-filled/50/000000/pause--v1.png"
            />
          </button>
        </div>
        <button onClick={handleEndCall} id="endcallFunction">
          <img alt="endcall" id="endcall" src={endcall} />
        </button>
      </div>
    );
  }
  return (
    <div className="call">
      <h3>{phoneNumber}</h3>
      <h4>{sipStatus}</h4>
      <div className="function">
        <button className="functionKey" id="mute">
          <img
            className="iconsFunction"
            alt="xinchao"
            src="https://img.icons8.com/ios-filled/50/000000/room-sound.png"
          />{" "}
        </button>
        <button className="functionKey" id="keyboard">
          <img
            className="iconsFunction"
            alt="xinchao"
            src="https://img.icons8.com/metro/26/000000/pincode-keyboard.png"
          />
        </button>
        <button className="functionKey" id="pause">
          <img
            className="iconsFunction"
            alt="xinchao"
            src="https://img.icons8.com/ios-filled/50/000000/pause--v1.png"
          />
        </button>
      </div>
      <button
        onClick={handleEndCall}
        id="endcallFunction"
        style={{ cursor: "pointer" }}
      >
        <img alt="endcall" id="endcall" src={endcall} />
      </button>
    </div>
  );
}

export default CallUI;

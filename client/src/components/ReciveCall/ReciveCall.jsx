import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

ReciveCall.propTypes = {
  coolPhone: PropTypes.any,
};
ReciveCall.defaultProps = {
  coolPhone: null,
};

function ReciveCall(props) {
  const [accept, setAccept] = useState(false);
  const { coolPhone } = props;
  coolPhone.on("newRTCSession", (data) => {
    console.log("xin chao long dep trai");
    if (data.originator === "remote") {
      if (accept === true) {
        console.log("xin chao");
        data.session.answer({ mediaConstraints: { audio: true } });
      }
    }
  });
  function handleAccept() {
    console.log("xin chao");
    setAccept(true);
  }
  return (
    <div>
      <button onClick={handleAccept}>Answer</button>
      <button>Reject</button>
    </div>
  );
}

export default ReciveCall;

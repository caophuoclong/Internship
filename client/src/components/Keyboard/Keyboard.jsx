import React, { useState } from "react";
import "./keyboard.css";
import PropTypes from "prop-types";
Keyboard.propTypes = {
  call: PropTypes.func,
};
Keyboard.defaultProps = {
  call: null,
};

function Keyboard(props) {
  const [value, setValue] = useState("");
  const { call } = props;
  function handleClick() {
    if (call) {
      call(value);
    }
  }
  function handleKeyPress(key) {
    if (key.key === "Enter") {
      handleClick();
    }
  }
  function handleDelete(value) {
    setValue(value.slice(0, -1));
  }
  function handleChangeValue(e) {
    const oldValue = value;
    setValue(oldValue + e.target.value);
  }
  function handleOnChange(e) {
    const re = /^[0-9\b]+$/;
    console.log(e.target.value);
    if (e.target.value === "" || re.test(e.target.value)) {
      setValue(e.target.value);
    }
  }

  return (
    <div className="Keyboard">
      <div className="showText" id="showNumber">
        <input
          className="button-input"
          type="text"
          id="phoneNumber"
          value={value}
          required
          onChange={handleOnChange}
          onKeyPress={handleKeyPress}
        />
        <img
          alt="this is camera"
          id="btnClear"
          onClick={() => handleDelete(value)}
          src="https://img.icons8.com/material-rounded/24/000000/clear-symbol--v2.png"
        />
      </div>

      <div className="Number">
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="1"
        >
          1
        </button>
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="2"
        >
          2
        </button>
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="3"
        >
          3
        </button>
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="4"
        >
          4
        </button>
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="5"
        >
          5
        </button>
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="6"
        >
          6
        </button>
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="7"
        >
          7
        </button>
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="8"
        >
          8
        </button>
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="9"
        >
          9
        </button>
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="*"
        >
          *
        </button>
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="0"
        >
          0
        </button>
        <button
          className="button-input btnNumber"
          onClick={handleChangeValue}
          value="#"
        >
          #
        </button>
      </div>
      <div style={{ width: "50%" }}>
        <button onClick={handleClick} className="callPhone">
          <img
            alt="this is camera"
            src="https://img.icons8.com/ios-filled/50/000000/phone.png"
          />
        </button>
      </div>
    </div>
  );
}

export default Keyboard;

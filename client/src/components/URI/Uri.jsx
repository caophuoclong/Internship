import React from "react";
import "./uri.scss";
import PropTypes from "prop-types";
import $ from "jquery";

Uri.propTypes = {
  call: PropTypes.func,
};
Uri.defaultProps = {
  call: null,
};

function Uri(props) {
  const { call } = props;
  function handleKeyPress(key) {
    if (key.key === "Enter") {
      handleClick();
    }
  }
  function handleClick() {
    const value = $("#inp-uri").val();
    if (call) {
      call(value);
    }
  }

  return (
    <div className="uri-form">
      <label
        style={{ marginBottom: "15px", cursor: "pointer" }}
        htmlFor="inp-uri"
      >
        Type numberPhone or URI
      </label>
      <div className="break"></div>
      <input
        name="inp-uri"
        className="inp"
        id="inp-uri"
        onKeyPress={handleKeyPress}
      />
      <input onClick={handleClick} type="button" className="inp" value="Call" />
    </div>
  );
}

export default Uri;

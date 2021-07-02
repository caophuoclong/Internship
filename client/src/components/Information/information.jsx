import React, { useState } from "react";
import PropTypes from "prop-types";

Information.propTypes = {};

function Information(props) {
  const [ipAddress, setIpAddress] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [browser, setBrowser] = useState("");
  const [networkSpeed, setNetworkSpeed] = useState("");

  return <div></div>;
}

export default Information;

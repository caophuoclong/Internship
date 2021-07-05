import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import axios from "axios";
import PropTypes from "prop-types";

Login.propTypes = {
  setToken: PropTypes.func,
};
Login.defaultProps = {
  setToken: null,
};
function Login(props) {
  const { register, handleSubmit } = useForm();
  const { setToken } = props;

  const handleOnSubmit = async (data, e) => {
    e.preventDefault();
    const uri = "https://api-server-intern.herokuapp.com/api/auth/login";
    const response = await axios.post(uri, data);
    setToken(response.data);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <input {...register("id")} placeholder="id" />
      <input
        {...register("pass")}
        name="pass"
        id="pass"
        placeholder="passowrd"
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;

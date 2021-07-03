import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import axios from "axios";
import api from "../../api/api";
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
    const response = await api.post("/auth/login", data);
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

import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";

import './login.scss'

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
    const response = await api.post(uri, data);
    setToken(response.data);
  };

  return (
    <div className="login-form">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div>
      <input {...register("id")} placeholder="id" id="id"/>
      </div>
      <div>
      <input
        {...register("pass")}
        name="pass"
        id="pass"
        placeholder="password"
      />
      </div>
      <div style={{textAlign: "center", margin: "15px"}}>
      <input type="submit" value="Submit" />
      </div>
    </form>
    </div>
    
  );
}

export default Login;

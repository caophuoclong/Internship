import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav/nav";
import Login from "./Login/login";

const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};
function App() {
  const [token, setToken] = useState(getToken());
  const [id, setID] = useState("");
  const [pass, setPass] = useState("");
  const handleSetToken = (e) => {
    const tokenAfter = JSON.stringify(e);
    sessionStorage.setItem("token", tokenAfter);
    console.log(tokenAfter);
    setToken(tokenAfter);
  };

  if (!token) {
    return <Login setToken={handleSetToken} />;
  }
  return (
    <div>
      <Router>
        <Route exact path="/">
          <Nav token={token} />
        </Route>
      </Router>
    </div>
  );
}

export default App;

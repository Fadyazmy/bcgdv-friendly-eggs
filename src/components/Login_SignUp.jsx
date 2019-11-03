import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../providers/UserProvider";
import Login from "./Login";

const Login_SignUp = () => {
  const user = useContext(UserContext);

  if (user) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <Login />
      </div>
    );
  }
};

export default Login_SignUp;

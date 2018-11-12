import React from "react";
import { Button } from "@material-ui/core";

const LoginButton = ({ onLoginUserClick }) => {
  return (
    <Button color="inherit" onClick={event => onLoginUserClick(event)}>
      Login with UPort
    </Button>
  );
};

export default LoginButton;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { saveToken } from "./localStorage";

function SigninSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);
  let params = useParams();
  saveToken(params.token);
  console.log(params.token);
  return <div>Login Success</div>;
}

export default SigninSuccess;

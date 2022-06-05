import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { saveToken } from "../localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../authSlice";
import { getCurrentUser } from "../auth";

function SigninSuccess() {
  let params = useParams();
  saveToken(params.token);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getCurrentUser();
      dispatch(setUser(data.user));
      setTimeout(() => {
        window.close();
      }, 1000);
    };
    getData();
  }, []);

  console.log(params.token);
  return <div>Login Success! Hello {user ? user.fullName : ""}</div>;
}

export default SigninSuccess;

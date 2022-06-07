import { Card, Link } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verify } from "../auth";
import AuthPageLayout from "./AuthPageLayout";
import { saveToken } from "../localStorage";
import { useDispatch } from "react-redux";
import { setUser } from "../authSlice";

const titleStyle = {
  fontSize: 32,
  fontWeight: 700,
  lineHeight: "39px",
  color: "#040E53",
  display: "flex",
  justifyContent: "center",
  marginBottom: "36px",
};

const cardStyle = {
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
  padding: "40px 80px",
  borderRadius: "10px",
  width: 610,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

function VerifyAccount() {
  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyAcc = async () => {
      try {
        const { data } = await verify(params.id);
        if (data && data.token && data.user) {
          saveToken(data.token);
          dispatch(setUser(data.user));
          setVerified(true);
          setLoading(false);
          console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    verifyAcc();
  }, []);

  return (
    <AuthPageLayout isSignIn={false} hideNavBar={true}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Box
          marginTop="50px"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          {verified ? (
            <Card sx={cardStyle}>
              <p style={titleStyle}>Verify Succeeded!</p>
              <Link sx={{ display: "flex", justifyContent: "center" }} href="/">
                Go Home Now
              </Link>
            </Card>
          ) : (
            <Card sx={cardStyle}>
              <p style={{ ...titleStyle, color: "red" }}>Verified Failed!</p>
              <Link
                sx={{ display: "flex", justifyContent: "center" }}
                href="/sign-up"
              >
                Sign Up Again
              </Link>
            </Card>
          )}
        </Box>
      )}
    </AuthPageLayout>
  );
}

export default VerifyAccount;

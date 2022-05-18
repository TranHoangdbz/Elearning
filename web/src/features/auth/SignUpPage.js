import React, { useState } from "react";
import { Card, Box, Button, Link, Divider, Avatar } from "@mui/material";
import AuthPageLayout from "./AuthPageLayout";
import CTextField from "./components/CTextField";

const cardStyle = {
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
  gap: 36,
  padding: "40px 80px",
  borderRadius: "10px",
  width: 610,
};
const cardTitleStyle = {
  fontSize: 32,
  fontWeight: 700,
  lineHeight: "39px",
  color: "#040E53",
  display: "flex",
  justifyContent: "center",
  marginBottom: "36px",
};

const submitButtonStyle = {
  borderRadius: "6px",
  background: "#040E53",
  color: "white",
  height: "58px",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: "17px",
  marginBottom: "18px",
};

function SignUpPage() {
  const [email, setEmail] = useState(null);
  const [fullName, setFullname] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  return (
    <AuthPageLayout isSignIn={false}>
      <Box mx="auto" marginTop="10px" marginBottom="86px">
        <Card sx={cardStyle}>
          <p style={cardTitleStyle}>Get's Go!</p>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CTextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email-textfield"
              sx={{ marginBottom: "18px" }}
            ></CTextField>
            <CTextField
              label="Full name"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              id="fullname-textfield"
              sx={{ marginBottom: "18px" }}
            ></CTextField>
            <CTextField
              label="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="phonenumber-textfield"
              sx={{ marginBottom: "18px" }}
            ></CTextField>
            <CTextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password-textfield"
              sx={{ marginBottom: "18px" }}
            ></CTextField>
            <CTextField
              label="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              id="confirm-password-textfield"
              sx={{ marginBottom: "18px" }}
            ></CTextField>
            <Button type="submit" variant="contained" sx={submitButtonStyle}>
              Sign Up and Login
            </Button>
          </form>
        </Card>
      </Box>
    </AuthPageLayout>
  );
}

export default SignUpPage;

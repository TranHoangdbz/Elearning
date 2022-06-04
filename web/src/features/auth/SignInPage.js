import { Card, Box, Button, Link, Divider, Avatar } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AuthPageLayout from "./AuthPageLayout";
import CTextField from "./components/CTextField";
import { signin } from "./auth";
import { saveToken } from "./localStorage";

const facebook = require("../../assets/images/facebook.png");
const google = require("../../assets/images/google.png");

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

const imageButtonStyle = {
  marginTop: "28px",
  width: "100%",
  height: "58px",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: "17px",
  border: "2px solid #040E53",
  borderRadius: "10px",
  color: "black",
};

const forgotPasswordStyle = {
  color: "#040E53",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: "17px",
  display: "flex",
  justifyContent: "center",
};

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function SignInPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      signin(email, password).then(({data}) => {
        console.log(data);
        if (data && data.token) {
          saveToken(data.token);
          navigate("/exam");
        }
      }).catch(({response}) => alert(response.data.message));
      // console.log({ email, password });
    },
  });

  return (
    <AuthPageLayout isSignIn>
      <Box mx="auto" marginTop="56px" marginBottom="86px">
        <Card sx={cardStyle}>
          <p style={cardTitleStyle}>Welcome Back!</p>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={formik.handleSubmit}
          >
            <CTextField
              id="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ marginBottom: "18px" }}
            ></CTextField>
            <CTextField
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type="password"
              id="password"
              sx={{ marginBottom: "18px" }}
            ></CTextField>
            <Button type="submit" variant="contained" sx={submitButtonStyle}>
              Login
            </Button>
            <Link href="#top" underline="none" style={forgotPasswordStyle}>
              ForgotPassword?
            </Link>
          </form>
          <Divider sx={{ marginTop: "36px", fontWeight: 700, fontSize: 13 }}>
            OR
          </Divider>
          <Button
            sx={imageButtonStyle}
            startIcon={
              <Avatar
                alt="facebook"
                src={facebook}
                sx={{ width: 31, height: 31, left: "-80px" }}
              />
            }
          >
            Continue With Facebook
          </Button>
          <Button
            sx={imageButtonStyle}
            startIcon={
              <Avatar
                alt="google"
                src={google}
                sx={{ width: 31, height: 31, left: "-90px" }}
              />
            }
          >
            Continue With Google
          </Button>
        </Card>
      </Box>
    </AuthPageLayout>
  );
}

export default SignInPage;

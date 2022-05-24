import React from "react";
import { Card, Box, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import AuthPageLayout from "./AuthPageLayout";
import CTextField from "./components/CTextField";
import { register } from "./auth";
import { saveToken } from "./localStorage";

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

const initialValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  fullName: yup
    .string("Enter your full name")
    .required("Full name is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Confirm password is invalid"),
    }),
});

function SignUpPage() {
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { email, fullName, phoneNumber, password } = values;
      register(email, fullName, phoneNumber, password)
        .then((result) => {
          alert("Check your email to verify account");
        })
        .catch(({ response }) => alert(response.data.msg));
      // console.log({ email, fullName, phoneNumber, password });
    },
  });

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
              label="Full name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              type="text"
              id="fullName"
              sx={{ marginBottom: "18px" }}
            ></CTextField>
            <CTextField
              label="Phone number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              id="phoneNumber"
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
            <CTextField
              label="Confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              type="password"
              id="confirmPassword"
              sx={{ marginBottom: "18px" }}
            ></CTextField>
            <Button
              type="submit"
              variant="contained"
              sx={submitButtonStyle}
              onClick={() => console.log(formik.values)}
            >
              Sign Up and Login
            </Button>
          </form>
        </Card>
      </Box>
    </AuthPageLayout>
  );
}

export default SignUpPage;

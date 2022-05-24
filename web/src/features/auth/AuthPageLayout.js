import React from "react";
import {
  AppBar,
  Box,
  Container,
  Button,
  Toolbar,
  Typography,
  Link,
  IconButton,
  Avatar
} from "@mui/material";

const logo = require("../../assets/images/logo.png");

const navbarStyle = {
  height: 40,
  marginTop: 18,
  marginLeft: 48,
  marginRight: 48,
};
const navbarTitleStyle = {
  fontSize: 19,
  fontWeight: 800,
  lineHeight: "22.5px",
  color: "#040E53",
};

const navbarSubtitleStyle = {
  fontSize: 9,
  fontWeight: 600,
  lineHeight: "10.5px",
  color: "#040E53",
};

const navbarRightTextStyle = {
  fontSize: 16,
  fontWeight: 600,
  marginRight: "12px",
  marginBottom: 0,
  color: "#040E53",
};

const navbarButtonStyle = {
  height: "40px",
  padding: "10px",
  backgroundColor: "#040E53",
  color: "white",
  fontWeight: 700,
  fontSize: 16,
};

function AuthPageLayout({ children, isSignIn }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      {/* background begin */}
      <Box
        sx={{
          bottom: 0,
          left: 0,
          right: 0,
          position: "absolute",
          zIndex: -1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <svg
          width="1520px"
          height="578"
          viewBox="0 0 1512 577"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-1 577L125.083 480.893C251.167 384.066 503.333 192.934 755.5 153.807C1007.67 115.4 1259.83 230.8 1385.92 288.5L1512 346.2V577H1385.92C1259.83 577 1007.67 577 755.5 577C503.333 577 251.167 577 125.083 577H-1Z"
            fill="#040E53"
          />
        </svg>
      </Box>
      {/* background end */}

      <Container maxWidth="xl" sx={{ height: "100%" }}>
        {/* navbar begin */}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{ backgroundColor: "white", boxShadow: 0 }}
          >
            <Toolbar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton href="/">
                  <Avatar src={logo} alt="logo" sx={{width: 33, height: 31}} variant="square"/>
                </IconButton>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    marginLeft: "7px",
                  }}
                  
                >
                  <Link underline="none" sx={navbarTitleStyle} href="/">
                    ProCourse
                  </Link>
                  <Link underline="none" sx={navbarSubtitleStyle} href="/">
                    Curiosity is the key
                  </Link>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Typography component="p" sx={navbarRightTextStyle}>
                {isSignIn ? "Do you have an account?" : "Have an account?"}
              </Typography>
              <Button sx={navbarButtonStyle} variant="contained" href={isSignIn ? "/signup" : "/signin"}>
                {isSignIn ? "Sign Up" : "Sign In"}
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        {/* navbar-left end */}
      </Container>
      {children}
    </Box>
  );
}

export default AuthPageLayout;

import React from "react";
import { Alert, AlertTitle, Snackbar, IconButton } from "@mui/material";
import { CheckCircle, Error, Close } from "@mui/icons-material";
function Toast(props) {
  const { open, setOpen, message, isError } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        sx={{
          fontSize: "12px",
          fontWeight: "400",
        }}
        iconMapping={{
          success: (
            <CheckCircle fontSize="inherit" sx={{ alignSelf: "center" }} />
          ),
          error: <Error fontSize="inherit" sx={{ alignSelf: "center" }} />,
        }}
        severity={isError ? "error" : "success"}
        variant="filled"
        action={
          <IconButton sx={{ alignSelf: "center" }} onClick={handleClose}>
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle
          sx={{
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {isError ? "Fail!" : "Success!"}
        </AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;

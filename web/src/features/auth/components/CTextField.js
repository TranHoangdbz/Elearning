import { useState, useEffect } from "react";
import {
  FormControl,
  InputBase,
  InputLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const labelStyle = {
  fontWeight: 600,
  fontSize: 15,
  lineHeight: "15px",
  color: "black",
  left: "-12px",
};

const CInputBase = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: "5px",
  },
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    backgroundColor: "white",
    border: "2.5px solid rgba(4, 14, 83, 0.23)",
    width: "auto",
    height: "43px",
    minWidth: "407px",
    padding: "5px 20px",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "17px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

function CTextField(props) {
  const { label, id, sx, type, inputProps } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("text");
  useEffect(() => {
    if (type === "password" && showPassword) {
      setInputType("text");
    } else if (type) {
      setInputType(type);
    }
  }, [type, showPassword]);

  const adornment =
    type === "password" ? (
      <InputAdornment
        position="end"
        sx={{ position: "absolute", right: "3px" }}
      >
        <IconButton
          aria-label="toggle password visibility"
          edge="start"
          onClick={() => setShowPassword((preState) => !preState)}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ) : null;

  return (
    <FormControl sx={sx}>
      <InputLabel shrink htmlFor={id} sx={labelStyle}>
        {label}
      </InputLabel>
      <CInputBase
        id={id}
        {...inputProps}
        endAdornment={adornment}
        type={inputType}
      />
    </FormControl>
  );
}

export default CTextField;

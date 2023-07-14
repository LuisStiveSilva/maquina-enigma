const textFieldStyle = {
  "& label.Mui-focused": {
    color: "black",
  },
  "& label": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ff6392",
  },
  "& .MuiOutlinedInput-root": {
    background: "#ff6392",
    color: "white",
    "& fieldset": {
      borderColor: "#ff6392",
    },
    "&:hover fieldset": {
      borderColor: "#ff6392",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff6392",
    },
  },
};

export default textFieldStyle;
